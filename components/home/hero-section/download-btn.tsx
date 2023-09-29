'use client';

import React from 'react';
import { useClient } from '@/lib/hooks/use-client';
import Link from 'next/link';

function HeroDownloadBtn() {
  const { isClient, os } = useClient();

  return (
    <Link href={'/download'}>
      <button className={'download-btn col gap-0'}>
        <div className={'title'}>{`Download app`}</div>
        <div className={`desc text-[12px] leading-[15px] opacity-60 ${!isClient || !os ? 'hidden' : ''}`}>
          {os?.name + ' X ' + os?.version}
        </div>
      </button>
    </Link>
  );
}

export default HeroDownloadBtn;
