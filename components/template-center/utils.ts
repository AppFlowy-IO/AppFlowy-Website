import { TemplateCategory } from '@/lib/interface';

export function slugify(text: string) {
  return text
    .toString() // ensure the text is a string
    .toLowerCase() // make the text lowercase
    .trim() // remove leading and trailing whitespaces
    .replace(/\s+/g, '-') // replace all whitespaces with '-'
    .replace(/[^\w-]+/g, '') // remove all non-word characters
    .replace(/--+/g, '-'); // replace multiple '-' with single '-'
}

/**
 * A template belongs to several categories and is reachable under each of them
 * (`/templates/engineering/<id>`, `/templates/startups/<id>`, ...), which means
 * the same content is served from several URLs.
 *
 * Pick one deterministically — the alphabetically first category — so every
 * variant can point its canonical tag at the same URL and search engines
 * consolidate them instead of treating them as duplicates.
 *
 * scripts/generate-sitemap.js mirrors this rule so the sitemap lists exactly
 * the URL each page declares as canonical. Keep the two in sync.
 *
 * Returns null when the template has no categories, since there is no category
 * segment to build a path from.
 */
export function canonicalTemplatePath(categories: TemplateCategory[], viewId: string): string | null {
  const canonicalCategory = [...categories].sort((a, b) => a.name.localeCompare(b.name))[0];

  if (!canonicalCategory) return null;

  return `/templates/${slugify(canonicalCategory.name)}/${viewId}`;
}
