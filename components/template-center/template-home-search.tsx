'use client';

import { useRef } from 'react';
import { useTemplatesContext } from './templates-context';

export default function TemplateHomeSearch() {
  const { searchText, setSearchText } = useTemplatesContext();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`template-home__search${searchText ? ' template-home__search--filled' : ''}`}
      onClick={() => inputRef.current?.focus()}
    >
      <span aria-hidden='true' className='template-home__search-icon' />
      <input
        ref={inputRef}
        aria-label='Search templates'
        type='search'
        placeholder='Search template...'
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />
      {searchText && (
        <button
          type='button'
          aria-label='Clear search'
          className='template-home__search-clear'
          onClick={() => {
            setSearchText('');
            inputRef.current?.focus();
          }}
        >
          <span aria-hidden='true' />
        </button>
      )}
    </div>
  );
}
