import { ApplicationIcon } from '@/components/template-center/icons';
import { useTemplatesContext } from '@/components/template-center/templates-context';
import Link from 'next/link';
import React from 'react';

function AllTemplatesLabel() {
  const { selectedCategoryId, setSearchText } = useTemplatesContext();

  return (
    <Link
      href={'/templates'}
      onClick={() => {
        setSearchText('');
      }}
      className={`${
        selectedCategoryId ? '' : 'text-primary'
      } hover:text-primary flex cursor-pointer items-center gap-[10px] text-base font-medium`}
    >
      <ApplicationIcon />
      <span>All Templates</span>
    </Link>
  );
}

export default AllTemplatesLabel;
