import Templates from '@/components/template-center/templates';
import { useTemplatesContext } from '@/components/template-center/templates-context';
import { CircularProgress } from '@mui/material';
import React from 'react';

function SearchResult() {
  const { searchResults, loading } = useTemplatesContext();

  return (
    <div className={'search-result'}>
      {loading ? (
        <div className={'flex h-full w-full justify-center'}>
          <CircularProgress size={40} />
        </div>
      ) : (
        <Templates templateList={searchResults} />
      )}
    </div>
  );
}

export default SearchResult;
