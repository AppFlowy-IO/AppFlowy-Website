import { TemplateSummary } from '@/lib/interface';
import { getCategoryTemplateList, getTemplateById } from '@/lib/templateAPI';
import { ResolvedTemplatesSlug, TemplateIndex, getTemplateIndex, resolveTemplatesSlug } from '@/lib/template-slugs';
import { Metadata } from 'next';
import { notFound, permanentRedirect, redirect } from 'next/navigation';
import React from 'react';

import '@/styles/template.scss';
// Both stylesheets belong to this route because categories and templates share the
// segment; the two pages cannot be split into separate CSS bundles.
import '@/styles/template-home.scss';

import CategoryView, { categoryMetadata } from './components/category-view';
import TemplateView, { templateMetadata } from './components/template-view';

interface Props {
  params: { slug: string };
}

/**
 * `/templates/<slug>` is either a category or a single template.
 *
 * They have to share one dynamic segment — Next.js allows only one segment name per
 * level — which is what makes the flat `/templates/bug-tracker` shape possible.
 * resolveTemplatesSlug() checks categories first, so a template can never shadow a
 * category page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolved = await resolveTemplatesSlug(params.slug);

    if (!resolved || resolved.kind === 'redirect') return {};

    if (resolved.kind === 'category') return categoryMetadata(resolved.category);

    const template = await getTemplateById(resolved.viewId);

    if (!template) return {};

    return templateMetadata(template, params.slug);
  } catch (error) {
    // The page renders notFound() for this slug. Returning nothing keeps it from
    // inheriting the root canonical and claiming to be the homepage.
    return {};
  }
}

async function Page({ params }: Props) {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
    return null;
  }

  let resolved: ResolvedTemplatesSlug | null = null;
  let index: TemplateIndex | null = null;

  try {
    [resolved, index] = await Promise.all([resolveTemplatesSlug(params.slug), getTemplateIndex()]);
  } catch (error) {
    console.error(error);
    notFound();
  }

  if (!resolved || !index) notFound();

  // An earlier slug of a renamed template moves permanently; a withdrawn template's slug
  // points at its category only until the template is republished.
  if (resolved.kind === 'redirect') {
    if (resolved.permanent) permanentRedirect(resolved.destination);
    redirect(resolved.destination);
  }

  if (resolved.kind === 'category') {
    let templates: TemplateSummary[] | null = null;

    try {
      templates = await getCategoryTemplateList(resolved.category.id);
    } catch (error) {
      console.error(error);
      notFound();
    }

    if (!templates) notFound();

    return (
      <CategoryView
        category={resolved.category}
        categories={resolved.categories}
        templates={templates}
        templateSlugs={index.viewIdToSlug}
      />
    );
  }

  let template: Awaited<ReturnType<typeof getTemplateById>> | null = null;

  try {
    template = await getTemplateById(resolved.viewId);
  } catch (error) {
    console.error(error);
    notFound();
  }

  if (!template) notFound();

  return <TemplateView template={template} slug={params.slug} templateSlugs={index.viewIdToSlug} />;
}

export const revalidate = 10;

export default Page;
