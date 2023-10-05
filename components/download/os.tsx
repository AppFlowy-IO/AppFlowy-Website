'use client';
import React from 'react';
import { downloadPageConfig } from '@/lib/config/pages';
import DownloadOsBtn from '@/components/download/os-btn';
import Image from 'next/image';
import image0 from '@/assets/images/download/img-0.png';
import darkImage0 from '@/assets/images/download/dark/img-0.png';

function DownloadOS() {
  return (
    <>
      <DownloadOsBtn />
      <div className={'download-os image relative z-[1] aspect-video h-fit w-full max-w-screen-xl'}>
        <div className={'ellipse'} />
        <div className={'absolute-image aspect-auto h-fit'}>
          <Image
            className={'relative mx-[20px]'}
            src={image0.src}
            alt={downloadPageConfig.downloadOSImageAlt}
            width={1162}
            height={613.8}
          />
        </div>
        <div className={'absolute-image dark-image aspect-auto h-fit'}>
          <Image
            className={'relative mx-[20px]'}
            src={darkImage0.src}
            alt={downloadPageConfig.downloadOSImageAlt}
            width={1162}
            height={613.8}
          />
        </div>
      </div>
    </>
  );
}

export default DownloadOS;
