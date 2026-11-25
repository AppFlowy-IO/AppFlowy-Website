// Keep page metadata, internal links, and the sitemap on the same slug rule.
// Templates and categories share /templates/<slug>; categorySlug() is the only way to
// build a category URL, so a registered template URL is never taken over by a category.
export {
  slugify,
  categorySlug,
  canonicalTemplateCategory,
  canonicalTemplatePath,
  buildTemplateSlugMap,
} from '@/lib/template-canonical';
