import { TemplateCategory } from '@/lib/interface';
import { TemplateSlugRedirect, TemplateSlugRegistry, buildTemplateSlugMap, slugify } from '@/lib/template-canonical';
import registryFile from '@/lib/template-slug-registry.json';
import { getAllTemplates, getCategories } from '@/lib/templateAPI';
import { unstable_cache } from 'next/cache';

/**
 * Templates and categories share the `/templates/[slug]` segment, so a slug has to be
 * resolved against both before a page can decide what to render.
 *
 * The slug -> view_id direction only exists in this repository: the template-center
 * detail endpoint takes a view_id and 404s on a slug. Slugs are pinned by
 * lib/template-slug-registry.json, so a renamed template keeps its URL; templates
 * published since the registry was last synced get a computed slug until it is.
 * The live list is one unfiltered request, cached so the ~70KB payload is fetched per
 * revalidation window rather than per request.
 */
const registry = registryFile.templates as TemplateSlugRegistry;

// Part of the cache key, so a registry change is never answered from an index that was
// computed with the previous registry.
const registryVersion = String(
  [...JSON.stringify(registry)].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) | 0, 0)
);

const loadTemplateIndex = unstable_cache(
  async () => {
    const [templates, categories] = await Promise.all([getAllTemplates(), getCategories()]);
    const { slugToViewId, viewIdToSlug, redirects } = buildTemplateSlugMap(templates, categories, registry);

    return {
      categories,
      // unstable_cache serializes its result, and a Map does not survive that.
      slugToViewId: Object.fromEntries(slugToViewId),
      viewIdToSlug: Object.fromEntries(viewIdToSlug),
      redirects: Object.fromEntries(redirects),
    };
  },
  ['template-index', registryVersion],
  // Short enough that a newly published template resolves without a redeploy, long
  // enough that the full list is fetched about once a minute rather than per request.
  { revalidate: 60, tags: ['templates'] }
);

export interface TemplateIndex {
  categories: TemplateCategory[];
  slugToViewId: Record<string, string>;
  viewIdToSlug: Record<string, string>;
  redirects: Record<string, TemplateSlugRedirect>;
}

export function getTemplateIndex(): Promise<TemplateIndex> {
  return loadTemplateIndex();
}

export type ResolvedTemplatesSlug =
  | { kind: 'category'; category: TemplateCategory; categories: TemplateCategory[] }
  | { kind: 'template'; viewId: string }
  | ({ kind: 'redirect' } & TemplateSlugRedirect);

/**
 * Categories are matched first. That ordering is the guarantee that a newly added
 * template can never take over a category page — buildTemplateSlugMap() reserves the
 * category slugs, and this keeps the route honest even if the two ever disagree.
 */
export async function resolveTemplatesSlug(slug: string): Promise<ResolvedTemplatesSlug | null> {
  const { categories, slugToViewId, redirects } = await getTemplateIndex();
  const category = categories.find((item) => slugify(item.name) === slug);

  if (category) return { kind: 'category', category, categories };

  const viewId = slugToViewId[slug];

  if (viewId) return { kind: 'template', viewId };

  const redirect = redirects[slug];

  if (redirect) return { kind: 'redirect', ...redirect };

  return null;
}

/**
 * Where a legacy `/templates/<category>/<view_id>` URL should go, or null for a 404.
 *
 * A registered id always maps to its pinned slug, even after the template is withdrawn
 * — that slug's own redirect then takes over. Only ids the site never registered fall
 * back to the category in the URL, and only when that category exists.
 */
export async function resolveLegacyTemplateUrl(categorySlug: string, viewId: string): Promise<string | null> {
  const { categories, viewIdToSlug } = await getTemplateIndex();
  const slug = viewIdToSlug[viewId] ?? registry[viewId]?.slug;

  if (slug) return `/templates/${slug}`;

  return categories.some((category) => slugify(category.name) === categorySlug) ? `/templates/${categorySlug}` : null;
}
