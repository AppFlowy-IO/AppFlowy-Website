'use client';

import { createContext, useContext } from 'react';

/**
 * view_id -> slug, handed to the client by whichever route renders template cards.
 *
 * Cards are rendered in three places (the home grid, a category grid, and the related
 * list on a detail page) and search results are fetched in the browser, so there is no
 * single server boundary that could attach a slug to every template object. Resolving
 * through one context instead keeps every card's href identical to what the route
 * itself serves.
 */
const TemplateSlugContext = createContext<Record<string, string>>({});

export function TemplateSlugProvider({ slugs, children }: { slugs: Record<string, string>; children: React.ReactNode }) {
  return <TemplateSlugContext.Provider value={slugs}>{children}</TemplateSlugContext.Provider>;
}

export function useTemplateSlugs() {
  return useContext(TemplateSlugContext);
}

export function useTemplateSlug(viewId: string): string | null {
  return useContext(TemplateSlugContext)[viewId] ?? null;
}

/**
 * A template with no slug is one the slug map deliberately dropped — currently an
 * unpublished one, which the search endpoint still returns. Hiding it keeps dead cards
 * out of every grid.
 */
export function hasTemplateSlug(slugs: Record<string, string>) {
  return (template: { view_id: string }) => Boolean(slugs[template.view_id]);
}
