export const CANONICAL_BLOG_CATEGORIES = [
  'Announcement',
  'Company',
  'Comparisons',
  'Developers',
  'Enterprise',
  'Knowledge management',
  'Open source',
  'Private AI',
  'Product',
  'Productivity',
  'Project management',
  'Self-hosting',
  'Using AppFlowy',
] as const;

export type BlogCategory = (typeof CANONICAL_BLOG_CATEGORIES)[number];

const categoryAliases = new Map<string, BlogCategory>([
  ['announcement', 'Announcement'],
  ['company', 'Company'],
  ['comparison', 'Comparisons'],
  ['comparisons', 'Comparisons'],
  ['developer', 'Developers'],
  ['developers', 'Developers'],
  ['enterprise', 'Enterprise'],
  ['knowledge management', 'Knowledge management'],
  ['open source', 'Open source'],
  ['private ai', 'Private AI'],
  ['product', 'Product'],
  ['productivity', 'Productivity'],
  ['project management', 'Project management'],
  ['self hosting', 'Self-hosting'],
  ['self-hosting', 'Self-hosting'],
  ['using appflowy', 'Using AppFlowy'],
]);

function cleanWhitespace(value: string) {
  return value.trim().replace(/\s+/g, ' ');
}

export function normalizeBlogCategory(value: string): string {
  const cleaned = cleanWhitespace(value);
  const lookupKey = cleaned.toLowerCase().replace(/_/g, ' ');

  return categoryAliases.get(lookupKey) ?? cleaned;
}

export function normalizeBlogCategories(values: unknown): string[] {
  if (!Array.isArray(values)) return [];

  return [...new Set(values.filter((value): value is string => typeof value === 'string').map(normalizeBlogCategory))];
}

/**
 * Tags are free-form search phrases rather than display labels. Normalizing
 * underscores, whitespace, and case keeps matching and metadata consistent
 * without forcing authors to choose from a long, brittle allowlist.
 */
export function normalizeBlogTag(value: string): string {
  return cleanWhitespace(value.replace(/_/g, ' ')).toLowerCase();
}

export function normalizeBlogTags(values: unknown): string[] {
  if (!Array.isArray(values)) return [];

  return [
    ...new Set(
      values
        .filter((value): value is string => typeof value === 'string')
        .map(normalizeBlogTag)
        .filter(Boolean)
    ),
  ];
}
