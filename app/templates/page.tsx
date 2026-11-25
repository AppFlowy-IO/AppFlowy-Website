import TemplateHome from '@/components/template-center/template-home';
import { TemplateSlugProvider } from '@/components/template-center/template-slug-context';
import { TemplatesProvider } from '@/components/template-center/templates-context';
import { getTemplateIndex } from '@/lib/template-slugs';
import { getCategories, getTemplateHomeList } from '@/lib/templateAPI';
import { Metadata } from 'next';
import React from 'react';
import '@/styles/template.scss';
import '@/styles/template-home.scss';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://appflowy.com';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Free Templates for Docs, Wikis and Projects | AppFlowy',
    description:
      'Browse free AppFlowy templates for documents, team wikis, project boards and databases. Add a ready-made setup to your workspace and start working right away.',
    alternates: {
      canonical: `${site_url}/templates`,
    },
  };
}

async function Page() {
  if(process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
    return null;
  }

  // An API failure throws rather than 404ing: the index page always exists, so a 5xx
  // (retried by crawlers, and covered by the last good ISR page) is the honest answer.
  const { homepageTemplates, categories, templateSlugs } = await getData();

  return (
    <div className='template-center template-home'>
      <TemplateSlugProvider slugs={templateSlugs}>
        <TemplatesProvider homepageTemplates={homepageTemplates} categories={categories}>
          <TemplateHome />
        </TemplatesProvider>
      </TemplateSlugProvider>
    </div>
  );
}

export default Page;

export const revalidate = 10;

async function getData() {
  // Cards link by slug, so the view_id -> slug map has to reach the client alongside them.
  const [homepageTemplates, categories, { viewIdToSlug }] = await Promise.all([
    getTemplateHomeList(),
    getCategories(),
    getTemplateIndex(),
  ]);

  if(!homepageTemplates || !categories) {
    throw new Error('Failed to fetch templates');
  }

  return {
    homepageTemplates,
    categories,
    templateSlugs: viewIdToSlug,
  };
}
