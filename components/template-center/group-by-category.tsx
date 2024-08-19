import { CategoryIcon, FeaturedIcon, NewTemplatesIcon } from '@/components/template-center/icons';
import Templates from '@/components/template-center/templates';
import { useTemplatesContext } from '@/components/template-center/templates-context';
import Link from 'next/link';
import React, { useMemo } from 'react';

function GroupByCategory() {
  const { homepageTemplates } = useTemplatesContext();
  const categoryTemplateList = useMemo(() => {
    return (
      homepageTemplates?.template_groups
        .filter((item) => item.templates.length > 0)
        .map((item) => {
          return {
            category: item.category,
            templates: item.templates.slice(0, 2),
          };
        }) || []
    );
  }, [homepageTemplates]);
  const featuredTemplates = useMemo(() => {
    return homepageTemplates?.featured_templates.slice(0, 4) || [];
  }, [homepageTemplates]);
  const newTemplates = useMemo(() => {
    return homepageTemplates?.new_templates.slice(0, 2) || [];
  }, [homepageTemplates]);

  return (
    <div className={'template-list'}>
      {featuredTemplates.length > 0 && (
        <div className={'template-category'}>
          <div className={'category-item'}>
            <div className={'category-icon-name'}>
              <div className={'icon flex items-center justify-center  '}>
                <FeaturedIcon />
              </div>
              <div className={'name'}>
                <div>Featured</div>
              </div>
            </div>
            <div className={'category-desc'}>
              Try our most popular pre-built templates for getting work done on Airtable. You can always customize any of
              these options for your team.
            </div>
          </div>
          <Templates templateList={featuredTemplates} />
        </div>
      )}
      {newTemplates.length > 0 && (
        <div className={'template-category'}>
          <div className={'category-item'}>
            <div className={'category-icon-name'}>
              <div className={'icon flex items-center justify-center  '}>
                <NewTemplatesIcon />
              </div>
              <div className={'name'}>
                <div>New templates</div>
              </div>
            </div>
          </div>
          <Templates templateList={newTemplates} />
        </div>
      )}
      {categoryTemplateList.map((item) => (
        <div key={item.category.name} id={`category-${item.category.id}`} className={'template-category'}>
          <div className={'category-item'}>
            <div className={'category-icon-name'}>
              <div className={'icon flex items-center justify-center  '}>
                <CategoryIcon icon={item.category.icon} />
              </div>
              <div className={'name'}>
                <div>{item.category.name}</div>
                <Link href={`/template-center/${item.category.id}`}>
                  <button className={'text-primary flex gap-2 text-base font-medium hover:underline max-md:text-xs'}>
                    View all
                    <div
                      className={
                        'bg-primary flex h-6 w-6 items-center justify-center rounded-full p-1 max-md:h-4 max-md:w-4'
                      }
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'>
                        <path
                          d='M0.950195 0.949951H9.0502M9.0502 0.949951V9.04995M9.0502 0.949951L0.950195 9.04995'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
            {item.category.description && <div className={'category-desc'}>{item.category.description}</div>}
          </div>
          <Templates templateList={item.templates} category={item.category} />
        </div>
      ))}
    </div>
  );
}

export default GroupByCategory;
