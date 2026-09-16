'use client';
import React from 'react';
import { downloadPageConfig } from '@/lib/config/pages';
import DownloadOsBtn from '@/components/download/os-btn';
import Image from 'next/image';
import DownloadIllustration from '@/assets/images/download/download-illustration.webp';

function DownloadOS() {
  return (
    <>
      <div className={'hero-blob hero-blob-left'} />
      <div className={'hero-blob hero-blob-right'} />
      <DownloadOsBtn />
      <div className={'download-os image relative z-[1] mx-auto w-full max-w-[1280px] px-[80px] max-xl:px-[4vw]'}>
        <Image
          className={'relative aspect-[1280/740] h-auto w-full'}
          src={DownloadIllustration}
          alt={downloadPageConfig.downloadOSImageAlt}
          width={1280}
          height={740}
        />
      </div>
    </>
  );
}

export default DownloadOS;
