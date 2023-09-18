import React from 'react';
import { downloadPageConfig } from '@/lib/config/pages';
import DownloadBtns from '@/components/home/mobile/download-btns';
import Image from 'next/image';
import image1 from '@/assets/images/download/img-1.svg';
import image1Bg from '@/assets/images/download/img-1-bg.svg';
import image2 from '@/assets/images/download/notes-tasks-projects.svg';
import icon1 from '@/assets/images/download/icon-1.svg';
import icon2 from '@/assets/images/download/icon-2.svg';
import icon3 from '@/assets/images/download/icon-3.svg';
import MobileAnimation from '@/components/shared/mobile-animation';

function DownloadMobile() {
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
      <div className={'image mobile-image'}>
        <Image
          className={'absolute bottom-0 right-0 max-sm:hidden'}
          src={image1Bg.src}
          alt={downloadPageConfig.imageAlt}
          width={799}
          height={985}
        />
        <Image className={'relative'} src={image1.src} alt={downloadPageConfig.imageAlt} width={1069} height={957} />
      </div>
      <div className={'image notes-tasks-projects'}>
        <Image src={image2.src} alt={downloadPageConfig.imageAlt} width={2672} height={299} />
        <Image className={'icon'} src={icon1.src} alt={downloadPageConfig.imageAlt} width={183} height={196} />
        <Image className={'icon'} src={icon2.src} alt={downloadPageConfig.imageAlt} width={171} height={188} />
        <Image className={'icon'} src={icon3.src} alt={downloadPageConfig.imageAlt} width={204} height={174} />
      </div>
      <MobileAnimation />
    </div>
  );
}

export default DownloadMobile;
