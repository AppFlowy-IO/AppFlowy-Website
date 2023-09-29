'use client';

import React from 'react';
import image from '@/assets/images/community/start-for-free.png';
import darkImage from '@/assets/images/community/dark/start-for-free.svg';

import Image from 'next/image';
import Link from 'next/link';
import { startForFree } from '@/lib/config/home';

function StartForFree({ dark }: { dark?: boolean }) {
  return (
    <div className={'start-for-free'}>
      <div className={'title'}>{startForFree.title}</div>
      <div className={'desc'}>{startForFree.subtitle}</div>
      <div className={'btn-group'}>
        <Link href={'/download'}>
          <button className={'download-btn'}>Download</button>
        </Link>
      </div>
      <div className={'image'}>
        <Image src={dark ? darkImage.src : image.src} width={963} height={547} alt={startForFree.imageAlt} />
      </div>
    </div>
  );
}

export default StartForFree;
