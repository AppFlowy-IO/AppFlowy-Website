import { TemplateCategory, TemplateSummary } from '@/lib/interface';
import { buildTemplateSlugMap, slugify } from '@/lib/template-canonical';
import { getAllTemplates, getCategories } from '@/lib/templateAPI';
import { unstable_cache } from 'next/cache';

/**
 * Templates and categories share the `/templates/[slug]` segment, so a slug has to be
 * resolved against both before a page can decide what to render.
 *
 * The slug -> view_id direction only exists in this repository: the template-center
 * detail endpoint takes a view_id and 404s on a slug. Both directions come from one
 * unfiltered list request, cached so the ~70KB payload is fetched per revalidation
 * window rather than per request.
 */
const loadTemplateIndex = unstable_cache(
  async () => {
    const [templates, categories] = await Promise.all([getAllTemplates(), getCategories()]);
    const { slugToViewId, viewIdToSlug } = buildTemplateSlugMap(templates, categories);

    return {
      categories,
      // unstable_cache serializes its result, and a Map does not survive that.
      slugToViewId: Object.fromEntries(slugToViewId),
      viewIdToSlug: Object.fromEntries(viewIdToSlug),
    };
  },
  ['template-index'],
  // Short enough that a newly published template resolves without a redeploy, long
  // enough that the full list is fetched about once a minute rather than per request.
  { revalidate: 60, tags: ['templates'] }
);

export interface TemplateIndex {
  categories: TemplateCategory[];
  slugToViewId: Record<string, string>;
  viewIdToSlug: Record<string, string>;
}

export function getTemplateIndex(): Promise<TemplateIndex> {
  return loadTemplateIndex();
}

export async function resolveTemplateSlug(slug: string): Promise<string | null> {
  const { slugToViewId } = await getTemplateIndex();

  return slugToViewId[slug] ?? null;
}

export async function templateSlugForViewId(viewId: string): Promise<string | null> {
  const { viewIdToSlug } = await getTemplateIndex();

  return viewIdToSlug[viewId] ?? null;
}

export type ResolvedTemplatesSlug =
  | { kind: 'category'; category: TemplateCategory; categories: TemplateCategory[] }
  | { kind: 'template'; viewId: string };

/**
 * Categories are matched first. That ordering is the guarantee that a newly added
 * template can never take over a category page — buildTemplateSlugMap() reserves the
 * category slugs, and this keeps the route honest even if the two ever disagree.
 */
export async function resolveTemplatesSlug(slug: string): Promise<ResolvedTemplatesSlug | null> {
  const { categories, slugToViewId } = await getTemplateIndex();
  const category = categories.find((item) => slugify(item.name) === slug);

  if (category) return { kind: 'category', category, categories };

  const viewId = slugToViewId[slug];

  if (viewId) return { kind: 'template', viewId };

  return null;
}

/** Attaches the canonical slug to each summary so cards cannot disagree with the route. */
export async function withTemplateSlugs<T extends Pick<TemplateSummary, 'view_id'>>(
  templates: T[]
): Promise<(T & { slug: string | null })[]> {
  const { viewIdToSlug } = await getTemplateIndex();

  return templates.map((template) => ({ ...template, slug: viewIdToSlug[template.view_id] ?? null }));
}
