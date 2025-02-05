import Community from '@/components/template-center/community';
import HomeListHeader from '@/components/template-center/home-list-header';
import Sidebar from '@/components/template-center/sidebar';
import TemplateList from '@/components/template-center/template-list';
import { TemplatesProvider } from '@/components/template-center/templates-context';
import { getCategories, getTemplateHomeList } from '@/lib/templateAPI';
import { Metadata } from 'next';
import React from 'react';
import '@/styles/template.scss';
import { notFound } from 'next/navigation';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${site_url}/templates`,
    },
  };
}

async function Page() {
  let data = null;

  if(process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
    return null;
  }

  try {
    data = await getData();
  } catch(error) {
    console.error(error);
    notFound();
  }

  const { homepageTemplates, categories } = data;

  return (
    <div className={'template-center'}>
      <div className={'main'}>
        <TemplatesProvider
          homepageTemplates={homepageTemplates}
          categories={categories}
        >
          <HomeListHeader />
          <div className={'content'}>
            <Sidebar />
            <TemplateList />
          </div>
        </TemplatesProvider>
      </div>
      <Community />
    </div>
  );
}

export default Page;

export const revalidate = 10;

async function getData() {
  const homepageTemplates = await getTemplateHomeList();
  const categories = await getCategories();

  if(!homepageTemplates || !categories) {
    throw new Error('Failed to fetch templates');
  }

  return {
    homepageTemplates,
    categories,
  };
}
