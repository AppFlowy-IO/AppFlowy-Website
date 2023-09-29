'use client';
import React, { useContext } from 'react';
import { downloadPageConfig } from '@/lib/config/pages';
import DownloadOsBtn from '@/components/download/os-btn';
import Image from 'next/image';
import image0 from '@/assets/images/download/img-0.png';
import darkImage0 from '@/assets/images/download/dark/img-0.svg';
import { DarkContext } from '@/lib/hooks/use-dark-context';

function DownloadOS() {
  const isDark = useContext(DarkContext);

  return (
    <>
      <DownloadOsBtn />
      <div className={'image relative z-[1]'}>
        <div
          className={
            'bg-primary pointer-events-none absolute left-1/3 top-[-20%] h-screen w-[500px] rotate-[51deg] transform opacity-[10%] blur-[150px] dark:opacity-[40%] max-lg:h-[300px]'
          }
        />
        <Image
          className={'relative max-w-[1162px] max-lg:w-full'}
          src={isDark ? darkImage0.src : image0.src}
          alt={downloadPageConfig.downloadOSImageAlt}
          width={1162}
          height={613.8}
        />
      </div>
    </>
  );
}

export default DownloadOS;
