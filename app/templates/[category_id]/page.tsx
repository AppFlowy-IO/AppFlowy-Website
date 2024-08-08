import Sidebar from '@/components/templates/sidebar';
import TemplateCenterButton from '@/components/templates/template-center-button';
import TemplateList from '@/components/templates/template-list';
import { TemplatesProvider } from '@/components/templates/templates-context';
import { getCategories, getCategoryTemplateList } from '@/lib/templateAPI';
import React from 'react';
import Community from '@/components/templates/community';

import '@/styles/template.scss';

async function Page({ params }: { params: { category_id: string } }) {
  const id = params.category_id;

  const data = await getData(id);
  const categories = await getCategories();
  return (
    <div className={'template-center'}>
      <div className={'main'}>
        <div className={'header'}>
          <TemplateCenterButton />
        </div>
        <TemplatesProvider selectedCategoryId={id} categoryTemplates={data} categories={categories}>
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
  try {
    const data = await getCategoryTemplateList(id);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}
