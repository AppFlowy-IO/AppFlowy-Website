'use client';

import { useTemplatesContext } from '@/components/templates/templates-context';
import { TemplateCategoryType } from '@/lib/interface';
import { groupBy } from 'lodash-es';
import Link from 'next/link';
import React, { useMemo } from 'react';

function Categories() {
  const { categories } = useTemplatesContext();
  const groupedCategories = useMemo(() => {
    return groupBy(categories, 'type');
  }, [categories]);

  return (
    <div className={'categories'}>
      {Object.keys(groupedCategories).map((type) => {
        return (
          <div key={type} className={'flex flex-col'}>
            <div className={'category-type'}>
              {Number(type) === TemplateCategoryType.ByUseCase ? 'By Use Case' : 'By Feature'}
            </div>
            <div className={'category-list'}>
              {groupedCategories[type].map((category) => {
                return (
                  <Link className={'category'} href={`/templates#category-${category.id}`} key={category.id}>
                    <div className={'icon'}>
                      <img src={category.icon} alt={category.name} />
                    </div>
                    <div className={'name'}>{category.name}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
