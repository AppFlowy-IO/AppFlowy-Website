'use client';

import { useTemplatesContext } from '@/components/template-center/templates-context';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { TemplateCategory } from '@/lib/interface';
import React, { useMemo } from 'react';

function CategoryTemplatesHeader({ category }: { category?: TemplateCategory }) {
  const { searchText, searchResults } = useTemplatesContext();
  const hasSearchResults = !!searchText;
  const title = useMemo(() => {
    if (hasSearchResults) return 'Search Results';
    return (
      <span>
        <span className={'text-primary'}>{category?.name}</span> templates
      </span>
    );
  }, [category, hasSearchResults]);

  const desc = useMemo(() => {
    if (hasSearchResults) return `${searchResults.length} templates`;
    return category?.description;
  }, [category, hasSearchResults, searchResults]);

  return (
    <div className={'header'}>
      {category ? (
        <Breadcrumbs
          className='mb-8'
          items={[
            { label: 'Home', href: '/' },
            { label: 'Templates', href: '/templates' },
            { label: `${category.name} templates` },
          ]}
        />
      ) : null}
      <h1 className={'title'}>{title}</h1>
      <div className={'description'}>{desc}</div>
    </div>
  );
}

export default CategoryTemplatesHeader;
