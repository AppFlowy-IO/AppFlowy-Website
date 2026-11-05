import { getCategoryTemplateList, getTemplateById } from '@/lib/templateAPI';
import { getTemplateIndex, resolveTemplatesSlug } from '@/lib/template-slugs';
import { isAxiosError } from 'axios';
import { Metadata } from 'next';
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import React, { cache } from 'react';

import '@/styles/template.scss';
// Both stylesheets belong to this route because categories and templates share the
// segment; the two pages cannot be split into separate CSS bundles.
import '@/styles/template-home.scss';

import CategoryView, { categoryMetadata } from './components/category-view';
import TemplateView, { templateMetadata } from './components/template-view';

interface Props {
  params: { slug: string };
}

const isBuildPhase = () => process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build';

/** The detail endpoint answers 404 for a template that is gone; anything else is an outage. */
async function getTemplateOrNull(viewId: string) {
  try {
    return await getTemplateById(viewId);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
}

/**
 * `/templates/<slug>` is either a category or a single template.
 *
 * They have to share one dynamic segment — Next.js allows only one segment name per
 * level — which is what makes the flat `/templates/bug-tracker` shape possible.
 *
 * generateMetadata and Page both call this, and cache() makes it one lookup per request,
 * so the two can never describe different content. notFound() is reserved for content
 * that is confirmed missing. An API failure is allowed to throw: that renders a 5xx, which
 * crawlers retry, and ISR keeps serving the last good page — a 404 would tell them the
 * page is gone.
 */
const loadTemplatesPage = cache(async (slug: string) => {
  const index = await getTemplateIndex();
  const resolved = resolveTemplatesSlug(index, slug);

  if (!resolved) notFound();

  // An earlier slug of a renamed template moves permanently; a withdrawn template's slug
  // points at its category only until the template is republished.
  if (resolved.kind === 'redirect') {
    if (resolved.permanent) permanentRedirect(resolved.destination);
    redirect(resolved.destination);
  }

  if (resolved.kind === 'category') {
    const templates = await getCategoryTemplateList(resolved.category.id);

    return { ...resolved, templates, templateSlugs: index.viewIdToSlug };
  }

  const template = await getTemplateOrNull(resolved.viewId);

  // Registered a moment ago but withdrawn since: the index catches up within a minute.
  if (!template) notFound();

  return { kind: 'template' as const, template, templateSlugs: index.viewIdToSlug };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (isBuildPhase()) return {};

  const page = await loadTemplatesPage(params.slug);

  return page.kind === 'category' ? categoryMetadata(page.category) : templateMetadata(page.template, params.slug);
}

async function Page({ params }: Props) {
  if (isBuildPhase()) return null;

  const page = await loadTemplatesPage(params.slug);

  if (page.kind === 'category') {
    return (
      <CategoryView
        category={page.category}
        categories={page.categories}
        templates={page.templates}
        templateSlugs={page.templateSlugs}
      />
    );
  }

  return <TemplateView template={page.template} slug={params.slug} templateSlugs={page.templateSlugs} />;
}

export const revalidate = 10;

export default Page;
