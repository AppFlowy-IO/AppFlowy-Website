'use client';

import React from 'react';
import row1 from '@/assets/images/community/row-1.svg';
import darkRow1 from '@/assets/images/community/dark/row-1.svg';
import row2 from '@/assets/images/community/row-2.svg';
import darkRow2 from '@/assets/images/community/dark/row-2.svg';
import row3 from '@/assets/images/community/row-3.svg';
import darkRow3 from '@/assets/images/community/dark/row-3.svg';
import row4 from '@/assets/images/community/row-4.svg';
import darkRow4 from '@/assets/images/community/dark/row-4.svg';
import center from '@/assets/images/community/row-center.svg';
import darkCenter from '@/assets/images/community/dark/row-center.svg';
import Image from 'next/image';

function Icons({ dark }: { dark?: boolean }) {
  return (
    <div className={'icons'}>
      <div className={'row-item py-[15px]'}>
        <Image src={dark ? darkRow1 : row1.src} alt={''} width={1660} height={100} />
      </div>
      <div className={'row-item py-[15px]'}>
        <Image src={dark ? darkRow2 : row2.src} alt={''} width={1660} height={100} />
      </div>
      <div className={'row-item py-[15px]'}>
        <Image src={dark ? darkRow3 : row3.src} alt={''} width={1660} height={100} />
      </div>
      <div className={'row-item py-[15px]'}>
        <Image src={dark ? darkRow4 : row4.src} alt={''} width={1660} height={100} />
      </div>
      <div className={'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/3'}>
        <Image src={dark ? darkCenter : center.src} alt={''} width={200} height={200} />
      </div>
    </div>
  );
}

export default Icons;
