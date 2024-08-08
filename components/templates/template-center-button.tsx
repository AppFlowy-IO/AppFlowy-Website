import BackIcon from '@/components/icons/back-icon';
import Link from 'next/link';
import React from 'react';

function TemplateCenterButton() {
  return (
    <Link
      href={'/templates'}
      className={'flex w-fit items-center gap-[10px] rounded-[5px] bg-[#F5F5FA] px-5 py-[10px] hover:bg-[#E5E5EA]'}
    >
      <BackIcon />
      <div className={'text-base font-medium'}>Template center</div>
    </Link>
  );
}

export default TemplateCenterButton;
