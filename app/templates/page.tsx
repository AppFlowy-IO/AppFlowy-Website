import Community from '@/components/templates/community';
import Sidebar from '@/components/templates/sidebar';
import TemplateList from '@/components/templates/template-list';
import { TemplatesProvider } from '@/components/templates/templates-context';
import { getCategories, getTemplateHomeList } from '@/lib/templateAPI';
import React from 'react';
import '@/styles/template.scss';

async function Page() {
  const templateList = await getTemplateHomeList();
  const categories = await getCategories();
  return (
    <div className={'template-center'}>
      <div className={'main'}>
        <div className={'header'}>
          <div className={'title'}>
            Ready to use <span className={'text-primary'}>templates</span> for your teams
          </div>
          <div className={'description'}>Product specs, company handbooks, meeting notes, and more</div>
        </div>
        <TemplatesProvider templateList={templateList} categories={categories}>
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
