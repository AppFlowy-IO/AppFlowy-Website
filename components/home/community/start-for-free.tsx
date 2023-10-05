'use client';

import React from 'react';
import image from '@/assets/images/community/start-for-free.png';
import darkImage from '@/assets/images/community/dark/start-for-free.png';

import Image from 'next/image';
import Link from 'next/link';
import { startForFree } from '@/lib/config/home';

function StartForFree() {
  return (
    <div className={'start-for-free'}>
      <div className={'title'}>{startForFree.title}</div>
      <div className={'desc'}>{startForFree.subtitle}</div>
      <div className={'btn-group'}>
        <Link href={'/download'}>
          <button className={'download-btn'}>Download</button>
        </Link>
      </div>
      <div className={'relative w-full flex-1'}>
        <div className={'image aspect-[770/434] w-full'}>
          <div className={'absolute-image'}>
            <Image src={image.src} width={770} height={434} alt={startForFree.imageAlt} />
          </div>
          <div className={'absolute-image dark-image h-fit'}>
            <Image src={darkImage.src} width={770} height={434} alt={startForFree.imageAlt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartForFree;
