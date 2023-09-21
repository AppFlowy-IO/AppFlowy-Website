'use client';

import React, { useContext } from 'react';
import { downloadPageConfig } from '@/lib/config/pages';
import DownloadBtns from '@/components/home/mobile/download-btns';
import Image from 'next/image';
import image1 from '@/assets/images/download/img-1.svg';
import darkImage1 from '@/assets/images/download/dark/img-1.svg';
import image2 from '@/assets/images/download/notes-tasks-projects.svg';
import darkImage2 from '@/assets/images/download/dark/notes-tasks-projects.svg';

import icon1 from '@/assets/images/download/icon-1.svg';
import icon2 from '@/assets/images/download/icon-2.svg';
import icon3 from '@/assets/images/download/icon-3.svg';
import MobileAnimation from '@/components/shared/mobile-animation';
import { DarkContext } from '@/lib/hooks/use-dark-context';

function DownloadMobile() {
  const isDark = useContext(DarkContext);

  return (
    <div id={'ios-and-android'} className={'download-mobile'}>
      <div className={'title mobile-title'}>
        {downloadPageConfig.mobileTitle}
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
          alt={downloadPageConfig.imageAlt}
          width={820}
          height={838}
        />
      </div>
      <div className={'image notes-tasks-projects relative'}>
        <div
          className={
            'bg-primary pointer-events-none absolute left-0 top-2/3 h-[80vw] w-2/3 transform opacity-[5%] blur-[250px] dark:opacity-[50%] max-sm:h-[1200px] max-sm:blur-[150px]'
          }
        />
        <Image src={isDark ? darkImage2.src : image2.src} alt={downloadPageConfig.imageAlt} width={2672} height={299} />
        <Image className={'icon'} src={icon1.src} alt={downloadPageConfig.imageAlt} width={183} height={196} />
        <Image className={'icon'} src={icon2.src} alt={downloadPageConfig.imageAlt} width={171} height={188} />
        <Image className={'icon'} src={icon3.src} alt={downloadPageConfig.imageAlt} width={204} height={174} />
      </div>
      <MobileAnimation dark={isDark} />
    </div>
  );
}

export default DownloadMobile;
