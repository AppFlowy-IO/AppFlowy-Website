import { Template, TemplateCategory, TemplateSummary } from './interface';

export function slugify(text: string): string;
export function canonicalTemplateCategory(
  categories: TemplateCategory[],
  primaryCategoryId?: string | null
): TemplateCategory | null;
/** A template has exactly one URL, so the path is just its slug. */
export function canonicalTemplatePath(slug?: string | null): string | null;
export function isUnpublished(template: Pick<TemplateSummary, 'publish_info'>): boolean;
export interface TemplateSlugMap {
  slugToViewId: Map<string, string>;
  viewIdToSlug: Map<string, string>;
}
export function buildTemplateSlugMap(
  templates: (TemplateSummary | Template)[],
  categories: TemplateCategory[]
): TemplateSlugMap;
