'use client';
import CategoryTemplates from '@/components/template-center/category-templates';
import { useTemplatesContext } from '@/components/template-center/templates-context';
import React from 'react';
import GroupByCategory from './group-by-category';
import SearchResult from './search-result';

function TemplateList() {
  const { searchText, selectedCategoryId } = useTemplatesContext();

  if (searchText) {
    return <SearchResult />;
  }

  if (selectedCategoryId) {
    return <CategoryTemplates />;
  }

  return <GroupByCategory />;
}

export default TemplateList;
