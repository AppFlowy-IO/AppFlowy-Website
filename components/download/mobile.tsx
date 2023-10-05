'use client';

import React from 'react';
import { downloadPageConfig } from '@/lib/config/pages';
import DownloadBtns from '@/components/home/mobile/download-btns';
import Image from 'next/image';
import image1 from '@/assets/images/download/img-1.png';
import darkImage1 from '@/assets/images/download/dark/img-1.png';
import MobileAnimation from '@/components/shared/mobile-animation';
import { useDarkContext } from '@/lib/hooks/use-dark-context';
import OverTitle from '@/components/shared/over-title';

function DownloadMobile() {
  const isDark = useDarkContext();

  return (
    <div id={'ios-and-android'} className={'download-mobile'}>
      <div className={'title mobile-title'}>
        <span className={'primary-word'}>
          {`Stay in sync`}
          <span className={'primary-line'}>
            <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 437 17' fill='none'>
              <path
                d='M2.00041 11.1304C28.5773 7.42928 89.7051 0.5683 121.6 2.73315C153.496 4.898 121.202 12.058 101.068 15.3673C179.893 8.72945 357.026 -2.61212 434.952 5.12465'
                stroke='currentColor'
                strokeWidth='3'
                strokeLinecap='square'
              />
            </svg>
          </span>
        </span>
        <br />
        on the go
      </div>
      <div className={'desc'}>Perform and look great</div>
      <DownloadBtns />
      <div className={'image mobile-image relative'}>
        <div className={'ellipse'} />
        <Image
          className={'relative'}
          src={isDark ? darkImage1.src : image1.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={820}
          height={838}
        />
      </div>
      <div className={'image notes-tasks-projects relative w-full'}>
        <div className={'ellipse'} />
        <OverTitle title='notes-tasks-projects' />
      </div>
      <MobileAnimation dark={isDark} />
    </div>
  );
}

export default DownloadMobile;
