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
              <div className={'icon'}>
                <img src={item.category.icon} alt={''} />
              </div>
              <div className={'name'}>
                <div>{item.category.name}</div>
                <Link href={`/templates/${item.category.id}`}>
                  <button className={'text-primary text-base font-medium max-md:text-xs'}>View all</button>
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
