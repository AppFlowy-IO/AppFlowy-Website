'use client';
import AllTemplatesLabel from '@/components/templates/all-templates-label';
import Categories from '@/components/templates/categories';
import Search from '@/components/templates/search';
import React from 'react';

function Sidebar() {
  return (
    <div className={'sidebar'}>
      <Search />
      <AllTemplatesLabel />
      <Categories />
      <button
        className={'live-demo-btn whitespace-nowrap px-9 py-4 text-base font-medium max-xl:text-sm max-md:text-xs'}
      >
        Share your template
      </button>
    </div>
  );
}

export default Sidebar;
