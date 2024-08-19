'use client';

import SearchIcon from '@/components/icons/search-icon';
import { useTemplatesContext } from '@/components/template-center/templates-context';
import { InputBase } from '@mui/material';
import CloseIcon from '@/components/icons/close';
import React from 'react';

function Search() {
  const { searchText, setSearchText } = useTemplatesContext();

  return (
    <div className={'search-input'}>
      <SearchIcon />
      <InputBase
        placeholder={'Search'}
        className={'flex-1  text-base'}
        inputProps={{
          className: 'py-0 text-base',
        }}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {searchText.length > 0 && (
        <button
          className={'search-clear'}
          onClick={() => {
            setSearchText('');
          }}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

export default Search;
