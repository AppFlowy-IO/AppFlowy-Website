'use client';

import React from 'react';
import icon1 from '@/assets/images/support-ai/icon-1.svg';
import icon2 from '@/assets/images/support-ai/icon-2.svg';
import icon3 from '@/assets/images/support-ai/icon-3.svg';
import darkIcon1 from '@/assets/images/support-ai/dark/icon-1.svg';
import darkIcon2 from '@/assets/images/support-ai/dark/icon-2.svg';
import darkIcon3 from '@/assets/images/support-ai/dark/icon-3.svg';
import Image from 'next/image';

function Background({ dark }: { dark?: boolean }) {
  return (
    <div className={'bg'}>
      <div className={'icon'}>
        <Image src={dark ? darkIcon1.src : icon1.src} alt={''} width={100} height={100} />
      </div>

      <div className={'icon'}>
        <Image src={dark ? darkIcon2.src : icon2.src} alt={''} width={100} height={100} />
      </div>
      <div className={'icon'}>
        <Image src={dark ? darkIcon3.src : icon3.src} alt={''} width={100} height={100} />
      </div>
    </div>
  );
}

export default Background;
