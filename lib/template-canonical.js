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
 * Assigns every live template a single stable slug under /templates/.
 *
 * Templates and categories share one route segment, so category slugs are reserved:
 * a template named "Project Management" must not take over the Project Management
 * category page. Ties fall back to a `-template` suffix, then to the view id.
 *
 * Ordering is by `created_at`, which never changes — that is what keeps a bare slug
 * attached to the same template across deploys. Ordering by API response order, or
 * letting the newest template win, would silently move live URLs.
 */
function buildTemplateSlugMap(templates, categories) {
  const reserved = new Set((categories || []).map((category) => slugify(category.name)));
  const slugToViewId = new Map();
  const viewIdToSlug = new Map();

  [...templates]
    .filter((template) => !isUnpublished(template))
    .sort(
      (a, b) =>
        new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime() ||
        a.view_id.localeCompare(b.view_id)
    )
    .forEach((template) => {
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
      const slug = candidates.find((candidate) => !reserved.has(candidate) && !slugToViewId.has(candidate));

      slugToViewId.set(slug, template.view_id);
      viewIdToSlug.set(template.view_id, slug);
    });

  return { slugToViewId, viewIdToSlug };
}

module.exports = {
  slugify,
  canonicalTemplateCategory,
  canonicalTemplatePath,
  buildTemplateSlugMap,
  isUnpublished,
};
