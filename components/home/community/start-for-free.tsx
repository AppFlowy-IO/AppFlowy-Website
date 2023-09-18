'use client';

import React from 'react';
import image from '@/assets/images/community/start-for-free.svg';
import Image from 'next/image';
import Link from 'next/link';
import { startForFree } from '@/lib/config/home';

function StartForFree() {
  return (
    <div className={'start-for-free'}>
      <div className={'title'}>
        {startForFree.title}
        <div className={'circle'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 193 80' fill='none'>
            <path
              d='M0.503462 14.4901C151.501 -15.9788 189.001 14.0126 191.001 34.5102C193.342 58.5039 154 77.5099 85.4809 77.5101C16.9614 77.5103 7.0495 57.997 8.50098 42.5039C10.1873 24.5039 31.135 14.9456 85.4809 12.5039'
              stroke='#9327FF'
              strokeWidth='3'
            />
          </svg>
        </div>
      </div>
      <div className={'desc'}>{startForFree.desc}</div>
      <div className={'btn-group'}>
        <Link href={'/download'}>
          <button className={'download-btn'}>Download</button>
        </Link>

        <button disabled className={'live-demo-btn'}>
          Live Demo
          <svg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11' fill='none'>
            <path d='M1 1H10M10 1V10M10 1L1 10' stroke='#9327FF' strokeWidth='1.8' />
          </svg>
        </button>
      </div>
      <div className={'image'}>
        <Image src={image.src} width={963} height={547} alt={startForFree.imageAlt} />
      </div>
    </div>
  );
}

export default StartForFree;
