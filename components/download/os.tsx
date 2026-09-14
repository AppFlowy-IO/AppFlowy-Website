'use client';
import React from 'react';
import { downloadPageConfig } from '@/lib/config/pages';
import DownloadOsBtn from '@/components/download/os-btn';
import Image from 'next/image';
import DownloadIllustration from '@/assets/images/download/download-illustration.webp';

function DownloadOS() {
  return (
    <>
      <DownloadOsBtn />
      <div className={'download-os image relative z-[1] aspect-video h-fit w-full max-w-screen-xl'}>
        <div className={'absolute-image aspect-auto h-fit'}>
          <Image
            className={'relative mx-[28px]'}
            src={DownloadIllustration}
            alt={downloadPageConfig.downloadOSImageAlt}
            width={1280}
            height={740}
          />
        </div>
      </div>
    </>
  );
}

export default DownloadOS;
