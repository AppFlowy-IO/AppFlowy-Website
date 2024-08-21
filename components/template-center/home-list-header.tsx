'use client';
import { useTemplatesContext } from '@/components/template-center/templates-context';
import React, { useMemo } from 'react';

function HomeListHeader() {
  const { searchResults, searchText } = useTemplatesContext();
  const hasSearchResults = !!searchText;
  const title = useMemo(() => {
    if (hasSearchResults) return 'Search Results';
    return (
      <span>
        Ready to use <span className={'text-primary'}>templates</span> for your teams
      </span>
    );
  }, [hasSearchResults]);

  const desc = useMemo(() => {
    if (hasSearchResults) return `${searchResults.length} templates`;
    return 'Product specs, company handbooks, meeting notes, and more';
  }, [searchResults, hasSearchResults]);

  return (
    <div className={'header'}>
      <div className={'title'}>{title}</div>
      <div className={'description'}>{desc}</div>
    </div>
  );
}

export default HomeListHeader;
