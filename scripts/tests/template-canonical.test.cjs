const test = require('node:test');
const assert = require('node:assert/strict');
const {
  buildTemplateSlugMap,
  canonicalTemplateCategory,
  canonicalTemplatePath,
  categorySlug,
  slugify,
} = require('../../lib/template-canonical');
const { getTemplateRoutes } = require('../generate-sitemap');
const { readRegistry, syncRegistry, validateRegistry } = require('../template-slug-registry');

const categories = [
  { id: 'docs', name: 'Docs' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'design', name: 'Product & Design' },
  { id: 'pm', name: 'Project Management' },
];

const template = (overrides) => ({
  view_id: 'aaaaaaaa-0000-0000-0000-000000000000',
  created_at: '2024-01-01T00:00:00Z',
  name: 'Bug Tracker',
  categories,
  publish_info: { publish_name: 'bug-tracker', unpublished_timestamp: null },
  ...overrides,
});

test('slugify keeps separated digits apart', () => {
  // "Effective 1:1 Meeting" used to collapse to effective-11-meeting, which reads as
  // eleven rather than one-on-one.
  assert.equal(slugify('Effective 1:1 Meeting'), 'effective-1-1-meeting');
  assert.equal(slugify('Teaching: Weekly Planning'), 'teaching-weekly-planning');
  assert.equal(slugify('  Sales & CRM  '), 'sales-crm');
  assert.equal(slugify('AI-powered'), 'ai-powered');
});

test('every category slug is unchanged by the separator rule', () => {
  // Category URLs are live; the slugify fix must not move any of them.
  const expected = {
    Docs: 'docs',
    Engineering: 'engineering',
    'Product & Design': 'product-design',
    'Project Management': 'project-management',
    'Human Resources': 'human-resources',
    'Sales & CRM': 'sales-crm',
    'Team Meetings': 'team-meetings',
    'AI-powered': 'ai-powered',
  };

  Object.entries(expected).forEach(([name, slug]) => assert.equal(slugify(name), slug));
});

test('a template gets one flat URL with no category in the path', () => {
  const { slugToViewId, viewIdToSlug } = buildTemplateSlugMap([template()], categories);

  assert.equal(canonicalTemplatePath(viewIdToSlug.get(template().view_id)), '/templates/bug-tracker');
  assert.equal(slugToViewId.get('bug-tracker'), template().view_id);
  assert.equal(canonicalTemplatePath(null), null);
});

test('a category slug is reserved, so a template cannot shadow a category page', () => {
  // "Project Management" exists as both a category and a template.
  const { slugToViewId, viewIdToSlug } = buildTemplateSlugMap(
    [template({ view_id: '708b487d-da38-400b-be35-25f977b43406', name: 'Project Management' })],
    categories
  );

  assert.equal(slugToViewId.get('project-management'), undefined);
  assert.equal(viewIdToSlug.get('708b487d-da38-400b-be35-25f977b43406'), 'project-management-template');
});

test('unpublished templates get no slug at all', () => {
  const live = template({ view_id: 'live-id', created_at: '2026-01-01T00:00:00Z' });
  const withdrawn = template({
    view_id: 'withdrawn-id',
    created_at: '2024-01-01T00:00:00Z',
    publish_info: { publish_name: 'bug-tracker', unpublished_timestamp: '2026-08-12T06:38:47Z' },
  });
  const { slugToViewId, viewIdToSlug } = buildTemplateSlugMap([live, withdrawn], categories);

  // The withdrawn one is older, so without the filter it would have taken the bare slug.
  assert.equal(slugToViewId.get('bug-tracker'), 'live-id');
  assert.equal(viewIdToSlug.has('withdrawn-id'), false);
});

test('two live templates sharing a name are disambiguated by view id, oldest keeping the bare slug', () => {
  const older = template({ view_id: 'd9085311-1d32-426f-95d4-1e2db3b64fbe', created_at: '2024-09-15T10:11:30Z' });
  const newer = template({ view_id: '223f4605-0cf2-4f8f-8e12-d1f3b93704b8', created_at: '2026-08-18T06:21:19Z' });
  const { viewIdToSlug } = buildTemplateSlugMap([older, newer], categories);

  assert.equal(viewIdToSlug.get(older.view_id), 'bug-tracker');
  assert.equal(viewIdToSlug.get(newer.view_id), 'bug-tracker-223f4605');
});

test('slug assignment is independent of API response order', () => {
  // created_at never changes, so a bare slug must never migrate between templates just
  // because the API returned them in a different order.
  const templates = [
    template({ view_id: 'b-id', created_at: '2026-01-01T00:00:00Z' }),
    template({ view_id: 'a-id', created_at: '2024-01-01T00:00:00Z' }),
    template({ view_id: 'c-id', created_at: '2025-01-01T00:00:00Z' }),
  ];
  const forward = buildTemplateSlugMap(templates, categories).viewIdToSlug;
  const reversed = buildTemplateSlugMap([...templates].reverse(), categories).viewIdToSlug;

  assert.equal(forward.get('a-id'), 'bug-tracker');
  assert.deepEqual([...forward.entries()].sort(), [...reversed.entries()].sort());
});

test('saved primary category still drives the breadcrumb, regardless of ordering', () => {
  for (const values of [categories, [...categories].reverse()]) {
    assert.equal(canonicalTemplateCategory(values, 'design').name, 'Product & Design');
  }

  // Legacy and invalid assignments retain the alphabetically first category.
  for (const primary of [undefined, null, 'removed-category']) {
    assert.equal(canonicalTemplateCategory(categories, primary).name, 'Docs');
  }
  assert.equal(canonicalTemplateCategory([], 'design'), null);
});

test('sitemap lists each template once, at the same flat URL the page declares', async () => {
  const originalFetch = global.fetch;
  const live = template({ view_id: 'live-id', primary_category_id: 'design' });
  const withdrawn = template({
    view_id: 'withdrawn-id',
    name: 'Retired Template',
    publish_info: { publish_name: 'retired', unpublished_timestamp: '2026-08-12T06:38:47Z' },
  });

  global.fetch = async (url) => ({
    ok: true,
    json: async () => ({
      data: url.endsWith('/category') ? { categories } : { templates: [live, withdrawn] },
    }),
  });

  try {
    // An empty registry, so the test does not depend on the committed one.
    const { routes } = await getTemplateRoutes({});
    const paths = routes.map(({ path }) => `/${path}`);
    const { viewIdToSlug } = buildTemplateSlugMap([live, withdrawn], categories);

    assert.deepEqual(
      paths.filter((path) => path.includes('bug-tracker')),
      [canonicalTemplatePath(viewIdToSlug.get('live-id'))]
    );
    // Every category page is listed, and nothing withdrawn is.
    categories.forEach((category) => assert.ok(paths.includes(`/templates/${slugify(category.name)}`)));
    assert.equal(
      paths.some((path) => path.includes('retired')),
      false
    );
    // No UUID survives in any template URL.
    assert.equal(
      paths.some((path) => /[0-9a-f]{8}-[0-9a-f]{4}/.test(path)),
      false
    );
  } finally {
    global.fetch = originalFetch;
  }
});

// --- Slug registry: every URL the site has served keeps resolving -------------------

const BUG_TRACKER_ID = '13a84186-588d-4eb9-b62c-c06222a72c4f';
const EISENHOWER_LIVE = '223f4605-0cf2-4f8f-8e12-d1f3b93704b8';
const EISENHOWER_OLD = 'd9085311-1d32-426f-95d4-1e2db3b64fbe';

test('a renamed template keeps its registered URL', () => {
  const renamed = template({ view_id: BUG_TRACKER_ID, name: 'Issue Tracker' });
  const registry = { [BUG_TRACKER_ID]: { slug: 'bug-tracker', name: 'Bug Tracker', fallbackCategory: 'engineering' } };
  const { viewIdToSlug, redirects } = buildTemplateSlugMap([renamed], categories, registry);

  assert.equal(viewIdToSlug.get(BUG_TRACKER_ID), 'bug-tracker');
  assert.equal(redirects.size, 0);

  const { registry: synced, notes } = syncRegistry(registry, [renamed], categories);

  assert.equal(synced[BUG_TRACKER_ID].slug, 'bug-tracker');
  assert.equal(synced[BUG_TRACKER_ID].name, 'Issue Tracker');
  assert.ok(notes.some((note) => note.includes('renamed')));
});

test('republishing an older same-named template cannot take a registered slug', () => {
  // Without the registry, the older Eisenhower Matrix would win the bare slug on created_at.
  const live = template({ view_id: EISENHOWER_LIVE, name: 'Eisenhower Matrix', created_at: '2026-08-18T06:21:19Z' });
  const republished = template({
    view_id: EISENHOWER_OLD,
    name: 'Eisenhower Matrix',
    created_at: '2024-09-15T10:11:30Z',
  });
  const registry = { [EISENHOWER_LIVE]: { slug: 'eisenhower-matrix' } };
  const { viewIdToSlug } = buildTemplateSlugMap([live, republished], categories, registry);

  assert.equal(viewIdToSlug.get(EISENHOWER_LIVE), 'eisenhower-matrix');
  assert.equal(viewIdToSlug.get(EISENHOWER_OLD), 'eisenhower-matrix-d9085311');
});

test('an alias moves permanently, and a withdrawn template falls back to its category temporarily', () => {
  const live = template({ view_id: BUG_TRACKER_ID, name: 'Issue Tracker' });
  const registry = {
    [BUG_TRACKER_ID]: { slug: 'issue-tracker', aliases: ['bug-tracker'] },
    [EISENHOWER_OLD]: { slug: 'eisenhower-matrix', fallbackCategory: 'project-management' },
    'bbbbbbbb-0000-0000-0000-000000000000': { slug: 'orphan', fallbackCategory: 'removed-category' },
  };
  const { redirects } = buildTemplateSlugMap([live], categories, registry);

  assert.deepEqual(redirects.get('bug-tracker'), { destination: '/templates/issue-tracker', permanent: true });
  // Temporary, because a republished template should get its URL back.
  assert.deepEqual(redirects.get('eisenhower-matrix'), {
    destination: '/templates/project-management',
    permanent: false,
  });
  assert.deepEqual(redirects.get('orphan'), { destination: '/templates', permanent: false });
});

test('a withdrawn template keeps its slug reserved', () => {
  const newcomer = template({ view_id: BUG_TRACKER_ID, name: 'Eisenhower Matrix' });
  const registry = { [EISENHOWER_OLD]: { slug: 'eisenhower-matrix' } };
  const { viewIdToSlug } = buildTemplateSlugMap([newcomer], categories, registry);

  assert.equal(viewIdToSlug.get(BUG_TRACKER_ID), 'eisenhower-matrix-13a84186');
});

test('a new category cannot take a registered template URL', () => {
  // Backlinks and citations to /templates/bug-tracker must keep landing on the template.
  const live = template({ view_id: BUG_TRACKER_ID });
  const registry = { [BUG_TRACKER_ID]: { slug: 'bug-tracker', name: 'Bug Tracker' } };
  const withCategory = [...categories, { id: 'bugs', name: 'Bug Tracker' }];
  const { viewIdToSlug, slugToViewId } = buildTemplateSlugMap([live], withCategory, registry);

  assert.equal(categorySlug('Bug Tracker', registry), 'bug-tracker-templates');
  assert.equal(viewIdToSlug.get(BUG_TRACKER_ID), 'bug-tracker');
  assert.equal(slugToViewId.get('bug-tracker-templates'), undefined);

  // Aliases count too: an old URL that redirects is still a URL someone links to.
  assert.equal(
    categorySlug('Old Bug Tracker', { [BUG_TRACKER_ID]: { slug: 'x', aliases: ['old-bug-tracker'] } }),
    'old-bug-tracker-templates'
  );

  const { registry: synced, notes } = syncRegistry(registry, [live], withCategory);

  assert.deepEqual(synced[BUG_TRACKER_ID].slug, 'bug-tracker');
  assert.ok(notes.some((note) => note.includes('/templates/bug-tracker-templates')));
});

test('every live category keeps its plain slug under the committed registry', () => {
  // The registry was seeded around the existing category URLs, so none of them may move.
  [
    'Project Management',
    'Engineering',
    'Startups',
    'Education',
    'Marketing',
    'Management',
    'Human Resources',
    'Sales & CRM',
    'Team Meetings',
    'AI-powered',
    'Docs',
    'Wiki',
    'Database',
    'Kanban',
    'Product & Design',
  ].forEach((name) => assert.equal(categorySlug(name), slugify(name)));
});

test('sync registers new templates once and is idempotent', () => {
  const live = template({ view_id: BUG_TRACKER_ID, primary_category_id: 'engineering' });
  const withdrawn = template({
    view_id: EISENHOWER_OLD,
    publish_info: { publish_name: 'x', unpublished_timestamp: '2026-08-12T06:38:47Z' },
  });
  const first = syncRegistry({}, [live, withdrawn], categories);

  assert.deepEqual(first.registry, {
    [BUG_TRACKER_ID]: { slug: 'bug-tracker', name: 'Bug Tracker', fallbackCategory: 'engineering' },
  });

  const second = syncRegistry(first.registry, [live, withdrawn], categories);

  assert.deepEqual(second.registry, first.registry);
  assert.deepEqual(second.notes, []);
});

test('the registry check rejects anything that would kill a URL', () => {
  const base = { [BUG_TRACKER_ID]: { slug: 'bug-tracker', aliases: ['old-bug-tracker'] } };

  assert.match(validateRegistry({}, base).join('\n'), /was removed/);
  assert.match(
    validateRegistry({ [BUG_TRACKER_ID]: { slug: 'bug-tracker' } }, base).join('\n'),
    /old-bug-tracker was dropped/
  );
  assert.match(
    validateRegistry({ [BUG_TRACKER_ID]: { slug: 'bug-tracker' }, [EISENHOWER_OLD]: { slug: 'bug-tracker' } }).join(
      '\n'
    ),
    /claimed by both/
  );
  assert.match(validateRegistry({ [BUG_TRACKER_ID]: { slug: 'Bug Tracker' } }).join('\n'), /malformed slug/);
  // Renaming with the old slug kept as an alias is allowed.
  assert.deepEqual(
    validateRegistry({ [BUG_TRACKER_ID]: { slug: 'issue-tracker', aliases: ['bug-tracker', 'old-bug-tracker'] } }, base),
    []
  );
});

test('the committed registry is valid', () => {
  assert.deepEqual(validateRegistry(readRegistry()), []);
});
