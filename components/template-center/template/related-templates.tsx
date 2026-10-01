'use client';

import TemplateItem from '@/components/template-center/template-item';
import { TemplateSummary } from '@/lib/interface';
import React from 'react';

function RelatedTemplates({ templates }: { templates: TemplateSummary[] }) {
  return (
    <div className='related-template'>
      <h2 className='title'>Related templates</h2>
      <div className='related-template__grid'>
        {templates.slice(0, 4).map((template) => {
          const category = template.categories[0];

          if (!category) return null;

          return (
            <div className='template-item' key={template.view_id}>
              <TemplateItem category={category} template={template} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RelatedTemplates;
