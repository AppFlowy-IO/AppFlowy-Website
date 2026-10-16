import { TemplateCategory } from './interface';

export function slugify(text: string): string;
export function canonicalTemplateCategory(
  categories: TemplateCategory[],
  primaryCategoryId?: string | null
): TemplateCategory | null;
export function canonicalTemplatePath(
  categories: TemplateCategory[],
  viewId: string,
  primaryCategoryId?: string | null
): string | null;
