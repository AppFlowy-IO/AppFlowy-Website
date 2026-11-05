const { templates: committedRegistry } = require('./template-slug-registry.json');

/** Shared by page metadata, template links, and the build-time sitemap. */
function slugify(text) {
  return (
    text
      .toString()
      .toLowerCase()
      .trim()
      // Collapse every run of non-alphanumerics into a single separator rather than
      // deleting it, so "Effective 1:1 Meeting" reads as effective-1-1-meeting instead
      // of running the digits together as effective-11-meeting.
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  );
}

const registeredSlugs = new WeakMap();

/** Every slug and alias in a registry: URLs that already belong to a template. */
function claimedSlugs(registry) {
  if (!registeredSlugs.has(registry)) {
    registeredSlugs.set(
      registry,
      new Set(Object.values(registry).flatMap((entry) => [entry.slug, ...(entry.aliases || [])]))
    );
  }

  return registeredSlugs.get(registry);
}

/**
 * A category's URL slug.
 *
 * Categories and templates share `/templates/<slug>`, and a registered template URL may
 * already have backlinks and citations pointing at it, so it outranks a category added
 * later: a new "Bug Tracker" category becomes /templates/bug-tracker-templates instead of
 * taking /templates/bug-tracker. Every existing category keeps its plain slug, because the
 * registry was built around them. Defaults to the committed registry so client links, the
 * route and the sitemap all agree without passing it around.
 */
function categorySlug(name, registry = committedRegistry) {
  const base = slugify(name);
  const claimed = claimedSlugs(registry);

  if (!claimed.has(base)) return base;

  for (let n = 1; ; n += 1) {
    const candidate = n === 1 ? `${base}-templates` : `${base}-templates-${n}`;

    if (!claimed.has(candidate)) return candidate;
  }
}

function canonicalTemplateCategory(categories, primaryCategoryId) {
  return (
    categories.find((category) => category.id === primaryCategoryId) ||
    [...categories].sort((a, b) => a.name.localeCompare(b.name))[0] ||
    null
  );
}

/** A template has exactly one URL, so the path is just its slug. */
function canonicalTemplatePath(slug) {
  return slug ? `/templates/${slug}` : null;
}

function isUnpublished(template) {
  return Boolean(template.publish_info && template.publish_info.unpublished_timestamp);
}

/**
 * Assigns every live template a single slug under /templates/.
 *
 * `registry` is lib/template-slug-registry.json's `templates` object: every slug a
 * template has ever been given, keyed by view id. A registered slug is pinned — renaming
 * the template upstream does not move its URL — and it is never handed to another
 * template, even after its own template is unpublished. That is what keeps old URLs alive.
 *
 * Templates and categories share one route segment. Registered slugs come first — see
 * categorySlug() — and category slugs are reserved against everything else: an
 * unregistered template named "Project Management" must not take over the Project
 * Management category page.
 *
 * Templates that are not registered yet (published since the registry was last synced)
 * get a computed slug: the bare name, then a `-template` suffix if a category owns it,
 * then the view id. They are ordered by `created_at`, so the result is the same in the
 * Next runtime and the sitemap script regardless of API response order.
 */
function buildTemplateSlugMap(templates, categories, registry = {}) {
  const reserved = new Set((categories || []).map((category) => categorySlug(category.name, registry)));
  const owners = new Map();

  Object.keys(registry)
    .sort()
    .forEach((viewId) => {
      const entry = registry[viewId];

      [entry.slug, ...(entry.aliases || [])].forEach((slug) => {
        if (!owners.has(slug)) owners.set(slug, viewId);
      });
    });

  const slugToViewId = new Map();
  const viewIdToSlug = new Map();
  const assign = (slug, viewId) => {
    slugToViewId.set(slug, viewId);
    viewIdToSlug.set(viewId, slug);
  };
  const live = [...templates]
    .filter((template) => !isUnpublished(template))
    .sort(
      (a, b) =>
        new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime() ||
        a.view_id.localeCompare(b.view_id)
    );

  // Pinned slugs first, so a newer template can never take one.
  live.forEach((template) => {
    const entry = registry[template.view_id];

    if (entry && owners.get(entry.slug) === template.view_id) assign(entry.slug, template.view_id);
  });

  live.forEach((template) => {
    if (viewIdToSlug.has(template.view_id)) return;

    const base = slugify(template.name) || 'template';
    const candidates = [
      // A category owns the bare slug, so say what the page is instead:
      // "Project Management" the template becomes project-management-template.
      ...(reserved.has(base) ? [`${base}-template`] : [base]),
      // Two templates sharing a name need telling apart, and a `-template` suffix
      // would not do that. view ids are unique, so this always terminates.
      `${base}-${template.view_id.slice(0, 8)}`,
      `${base}-${template.view_id}`,
    ];
    const isFree = (candidate) =>
      !reserved.has(candidate) &&
      !slugToViewId.has(candidate) &&
      (!owners.has(candidate) || owners.get(candidate) === template.view_id);

    assign(candidates.find(isFree), template.view_id);
  });

  // Every registered slug that is not a live template's current slug still answers:
  // an old slug of a live template moves permanently, and a withdrawn template's slug
  // points at its category temporarily, since the template may be republished.
  const redirects = new Map();

  owners.forEach((viewId, slug) => {
    const current = viewIdToSlug.get(viewId);

    if (current === slug) return;

    if (current) {
      redirects.set(slug, { destination: `/templates/${current}`, permanent: true });
      return;
    }

    const { fallbackCategory } = registry[viewId];

    redirects.set(slug, {
      destination: fallbackCategory && reserved.has(fallbackCategory) ? `/templates/${fallbackCategory}` : '/templates',
      permanent: false,
    });
  });

  return { slugToViewId, viewIdToSlug, redirects };
}

module.exports = {
  slugify,
  categorySlug,
  canonicalTemplateCategory,
  canonicalTemplatePath,
  buildTemplateSlugMap,
  isUnpublished,
};
