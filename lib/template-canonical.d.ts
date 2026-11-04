import { Template, TemplateCategory, TemplateSummary } from './interface';

export function slugify(text: string): string;
export function canonicalTemplateCategory(
  categories: TemplateCategory[],
  primaryCategoryId?: string | null
): TemplateCategory | null;
/** A template has exactly one URL, so the path is just its slug. */
export function canonicalTemplatePath(slug?: string | null): string | null;
export function isUnpublished(template: Pick<TemplateSummary, 'publish_info'>): boolean;
export interface TemplateSlugRegistryEntry {
  slug: string;
  /** Earlier slugs of this template. Each one permanently redirects to `slug`. */
  aliases?: string[];
  /** The template's name when the registry was last synced. Informational only. */
  name?: string;
  /**
   * Where this template's URLs send visitors if it is withdrawn. Not its category
   * membership — a template can be in many categories, and that still comes from the API.
   */
  fallbackCategory?: string;
}
export type TemplateSlugRegistry = Record<string, TemplateSlugRegistryEntry>;
export interface TemplateSlugRedirect {
  destination: string;
  permanent: boolean;
}
export interface TemplateSlugMap {
  slugToViewId: Map<string, string>;
  viewIdToSlug: Map<string, string>;
  redirects: Map<string, TemplateSlugRedirect>;
  shadowed: { viewId: string; slug: string }[];
}
export function buildTemplateSlugMap(
  templates: (TemplateSummary | Template)[],
  categories: TemplateCategory[],
  registry?: TemplateSlugRegistry
): TemplateSlugMap;
