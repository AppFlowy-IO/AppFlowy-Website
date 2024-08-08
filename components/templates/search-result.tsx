import Templates from '@/components/templates/templates';
import { useTemplatesContext } from '@/components/templates/templates-context';
import React from 'react';

function SearchResult() {
  const { searchResults } = useTemplatesContext();
  return (
    <div className={'search-result'}>
      <div className={'search-result-header'}>
        <div className={'search-result-title'}>Search results</div>
        <div className={'search-result-count'}>{`${searchResults.length} templates`}</div>
      </div>
      <Templates templateList={searchResults} />
    </div>
  );
}

export default SearchResult;
