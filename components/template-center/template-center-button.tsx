import BackIcon from '@/components/icons/back-icon';
import Link from 'next/link';
import React from 'react';

function TemplateCenterButton() {
  return (
    <Link
      href={'/templates'}
      className={
        'text-primary hover:border-primary flex w-fit items-center gap-[10px] rounded-[15px] border border-transparent bg-white px-[30px] py-[20px] text-base max-md:w-full max-md:bg-transparent max-md:px-0 max-md:py-0'
      }
    >
      <BackIcon />
      <div className={'text-base font-medium'}>Templates</div>
    </Link>
  );
}

export default TemplateCenterButton;
