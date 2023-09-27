'use client';

import React, { useContext } from 'react';
import { downloadPageConfig } from '@/lib/config/pages';
import DownloadBtns from '@/components/home/mobile/download-btns';
import Image from 'next/image';
import image1 from '@/assets/images/download/img-1.svg';
import darkImage1 from '@/assets/images/download/dark/img-1.svg';
import MobileAnimation from '@/components/shared/mobile-animation';
import { DarkContext } from '@/lib/hooks/use-dark-context';
import OverTitle from '@/components/shared/over-title';

function DownloadMobile() {
  const isDark = useContext(DarkContext);

  return (
    <div id={'ios-and-android'} className={'download-mobile'}>
      <div className={'title mobile-title'}>
        {downloadPageConfig.downloadMobileApplicationTitle}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 346 19' fill='none'>
            <path
              d='M1.92521 14.1304C22.9559 10.1921 71.3122 2.78488 96.4922 4.66252C121.672 6.54016 96.0934 13.9873 80.1565 17.4762C142.493 10.1331 282.541 -2.79452 344.038 4.23962'
              stroke='#9327FF'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </div>
      </div>
      <div className={'desc'}>{downloadPageConfig.mobileSubtitle}</div>
      <DownloadBtns />
      <div className={'image mobile-image relative'}>
        <div
          className={
            'bg-primary pointer-events-none absolute left-0 top-0 h-[600px] w-full transform opacity-[10%] blur-[150px] dark:opacity-[20%] max-sm:h-[300px]'
          }
        />
        <Image
          className={'relative'}
          src={isDark ? darkImage1.src : image1.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={820}
          height={838}
        />
      </div>
      <div className={'image notes-tasks-projects relative w-full'}>
        <div
          className={
            'bg-primary pointer-events-none absolute left-0 top-2/3 h-[80vw] w-2/3 transform opacity-[5%] blur-[250px] dark:opacity-[50%] max-sm:h-[1200px] max-sm:blur-[150px]'
          }
        />
        <OverTitle title='notes-tasks-projects' />
      </div>
      <MobileAnimation dark={isDark} />
    </div>
  );
}

export default DownloadMobile;
