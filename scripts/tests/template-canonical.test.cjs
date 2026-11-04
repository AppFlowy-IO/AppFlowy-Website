const test = require('node:test');
const assert = require('node:assert/strict');
const {
  buildTemplateSlugMap,
  canonicalTemplateCategory,
  canonicalTemplatePath,
  slugify,
} = require('../../lib/template-canonical');
const { getTemplateRoutes } = require('../generate-sitemap');

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
    const routes = await getTemplateRoutes();
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
