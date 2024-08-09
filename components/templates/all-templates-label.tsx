import { ApplicationIcon } from '@/components/templates/icons';
import { useTemplatesContext } from '@/components/templates/templates-context';
import Link from 'next/link';
import React from 'react';

function AllTemplatesLabel() {
  const { searchText, selectedCategoryId, setSearchText } = useTemplatesContext();

  return (
    <Link
      href={'/templates'}
      onClick={() => {
        setSearchText('');
      }}
      className={`${
        searchText || selectedCategoryId ? '' : 'text-primary'
      } flex cursor-pointer items-center gap-[10px] font-medium`}
    >
      <ApplicationIcon />
      All Templates
    </Link>
  );
}

export default AllTemplatesLabel;
