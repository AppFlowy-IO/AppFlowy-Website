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
