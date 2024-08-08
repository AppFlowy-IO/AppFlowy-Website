'use client';
import Categories from '@/components/templates/categories';
import Search from '@/components/templates/search';
import React from 'react';

function Sidebar() {
  return (
    <div className={'sidebar'}>
      <Search />
      <Categories />
      <button className={'live-demo-btn px-9 py-4 text-base font-medium'}>Share your template</button>
    </div>
  );
}

export default Sidebar;
