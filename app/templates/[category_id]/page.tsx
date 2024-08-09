import Sidebar from '@/components/templates/sidebar';
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
  const category = categories.find((item) => item.id === id);
  return (
    <div className={'template-center'}>
      <div className={'main'}>
        <div className={'header'}>
          <div className={'title'}>
            <span className={'text-primary'}>{category?.name}</span> templates
          </div>
          <div className={'description'}>{category?.desc}</div>
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
