'use client';

import TemplateItem from '@/components/template-center/template-item';
import { hasTemplateSlug, useTemplateSlugs } from '@/components/template-center/template-slug-context';
import { TemplateSummary } from '@/lib/interface';
import React from 'react';

function RelatedTemplates({ templates }: { templates: TemplateSummary[] }) {
  const slugs = useTemplateSlugs();
  const related = templates.filter(hasTemplateSlug(slugs)).slice(0, 4);

  // Owns its own section wrapper: the list can empty out after filtering even when the
  // template reports related entries, and an empty styled section would still take up space.
  if (!related.length) return null;

  return (
    <section className='template-related'>
      <div className='template-details__inner'>
        <div className='related-template'>
          <h2 className='title'>Related templates</h2>
          <div className='related-template__grid'>
            {related.map((template) => {
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
      </div>
    </section>
  );
}

export default RelatedTemplates;
