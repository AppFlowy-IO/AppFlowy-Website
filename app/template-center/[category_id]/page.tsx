import CategoryTemplatesHeader from '@/components/template-center/category-templates-header';
import Sidebar from '@/components/template-center/sidebar';
import TemplateList from '@/components/template-center/template-list';
import { TemplatesProvider } from '@/components/template-center/templates-context';
import { getCategories, getCategoryTemplateList } from '@/lib/templateAPI';
import { notFound } from 'next/navigation';
import React from 'react';
import Community from '@/components/template-center/community';

import '@/styles/template.scss';

async function Page({ params }: { params: { category_id: string } }) {
  const id = params.category_id;

  let data = null;

  try {
    data = await getData(id);
  } catch (error) {
    console.error(error);
    notFound();
  }

  const categories = await getCategories();
  const category = categories.find((item) => item.id === id);

  return (
    <div className={'template-center'}>
      <div className={'main'}>
        <TemplatesProvider selectedCategoryId={id} categoryTemplates={data} categories={categories}>
          <CategoryTemplatesHeader category={category} />
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

async function getData(id: string) {
  const data = await getCategoryTemplateList(id);

  if (!data) {
    throw new Error(`Failed to fetch category data ${id}`);
  }

  return data;
}
