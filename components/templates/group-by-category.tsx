import { CategoryIcon } from '@/components/templates/icons';
import Templates from '@/components/templates/templates';
import { useTemplatesContext } from '@/components/templates/templates-context';
import Link from 'next/link';
import React from 'react';

function GroupByCategory() {
  const { templateList = [] } = useTemplatesContext();

  return (
    <div className={'template-list'}>
      {templateList.map((item) => (
        <div
          key={item.category.name}
          id={`category-${item.category.id}`}
          className={'template-category'}
          style={{
            scrollMarginTop: '100px',
          }}
        >
          <div className={'category-item'}>
            <div className={'category-icon-name'}>
              <div className={'icon flex items-center justify-center  '}>
                <CategoryIcon icon={item.category.icon} />
              </div>
              <div className={'name'}>
                <div>{item.category.name}</div>
                <Link href={`/templates/${item.category.id}`}>
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
            {item.category.desc && <div className={'category-desc'}>{item.category.desc}</div>}
          </div>
          <Templates templateList={item.templateList} category={item.category} />
        </div>
      ))}
    </div>
  );
}

export default GroupByCategory;
