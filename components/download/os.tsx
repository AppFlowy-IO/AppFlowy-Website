'use client';
import React, { useContext } from 'react';
import { downloadPageConfig } from '@/lib/config/pages';
import DownloadOsBtn from '@/components/download/os-btn';
import Image from 'next/image';
import image0 from '@/assets/images/download/img-0.svg';
import darkImage0 from '@/assets/images/download/dark/img-0.svg';
import { DarkContext } from '@/lib/hooks/use-dark-context';

function DownloadOS() {
  const isDark = useContext(DarkContext);

  return (
    <>
      <div className={'title'}>
        {downloadPageConfig.downloadOSTitle}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 362 12' fill='none'>
            <path
              d='M1.99996 6.04368C23.9123 4.27734 74.3301 1.13852 100.703 2.71392C127.076 4.28932 100.48 7.92493 83.8856 9.54581C148.926 6.73405 295.122 2.41503 359.583 7.63304'
              stroke='#9327FF'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </div>
      </div>
      <DownloadOsBtn />
      <div className={'image relative z-[1]'}>
        <div
          className={
            'bg-primary pointer-events-none absolute left-1/3 top-[-20%] h-screen w-[500px] rotate-[51deg] transform opacity-[10%] blur-[150px] dark:opacity-[40%] max-sm:h-[300px]'
          }
        />
        <Image
          className={'relative'}
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
