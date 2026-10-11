/** Shared by page metadata, template links, and the build-time sitemap. */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function canonicalTemplateCategory(categories, primaryCategoryId) {
  return (
    categories.find((category) => category.id === primaryCategoryId) ||
    [...categories].sort((a, b) => a.name.localeCompare(b.name))[0] ||
    null
  );
}

function canonicalTemplatePath(categories, viewId, primaryCategoryId) {
  const category = canonicalTemplateCategory(categories, primaryCategoryId);
  return category ? `/templates/${slugify(category.name)}/${viewId}` : null;
}

module.exports = { slugify, canonicalTemplateCategory, canonicalTemplatePath };
