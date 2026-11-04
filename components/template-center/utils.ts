// Keep page metadata, internal links, and the sitemap on the same slug rule.
// Category slugs are reserved, so a template can never take over a category page.
export {
  slugify,
  canonicalTemplateCategory,
  canonicalTemplatePath,
  buildTemplateSlugMap,
} from '@/lib/template-canonical';
