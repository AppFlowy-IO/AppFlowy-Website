'use client';

import Templates from '@/components/template-center/templates';
import { TemplateSummary } from '@/lib/interface';
import React from 'react';

function RelatedTemplates({ templates }: { templates: TemplateSummary[] }) {
  return (
    <div className={'related-template'}>
      <div className={'title'}>Related templates</div>
      <Templates templateList={templates} />
    </div>
  );
}

export default RelatedTemplates;
