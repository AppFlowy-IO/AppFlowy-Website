import CategoryTemplatesHeader from '@/components/template-center/category-templates-header';
import Sidebar from '@/components/template-center/sidebar';
import TemplateList from '@/components/template-center/template-list';
import { TemplatesProvider } from '@/components/template-center/templates-context';
import { slugify } from '@/components/template-center/utils';
import { getCategories, getCategoryTemplateList } from '@/lib/templateAPI';
import { notFound } from 'next/navigation';
import React from 'react';
import Community from '@/components/template-center/community';

import '@/styles/template.scss';
import { Metadata } from 'next';
import OpenGraphImage from '../../../public/images/og-image.png';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL!;

interface Props {
  params: { category_name: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let category;

  try {
    ({ category } = await getData(params.category_name));
  } catch (error) {
    // Unknown category slugs render notFound(); returning nothing keeps them
    // from inheriting the root canonical and claiming to be the homepage.
    return {};
  }

  const title = `${category.name} Templates | AppFlowy`;
  const description = category.description.trim().slice(0, 160);
  const canonicalUrl = `${site_url}/templates/${slugify(category.name)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'AppFlowy',
      images: [
        {
          url: OpenGraphImage.src,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OpenGraphImage.src],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [`${category.name} templates`, 'AppFlowy templates', 'notion alternative templates'],
  };
}

async function Page({ params }: { params: { category_name: string } }) {
  const name = params.category_name;

  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
    return null;
  }

  let data = null;

  try {
    data = await getData(name);
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <div className={'template-center'}>
      <div className={'main'}>
        <TemplatesProvider
          selectedCategoryId={data.category.id}
          categoryTemplates={data.data}
          categories={data.categories}
        >
          <CategoryTemplatesHeader category={data.category} />
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

export const revalidate = 10;

export default Page;

async function getData(name: string) {
  const categories = await getCategories();
  const category = categories.find((item) => slugify(item.name) === name);

  if (!category) {
    throw new Error(`Failed to fetch category ${name}`);
  }

  const data = await getCategoryTemplateList(category.id);

  if (!data) {
    throw new Error(`Failed to fetch category data ${category.id}`);
  }

  return { data, category, categories };
}
