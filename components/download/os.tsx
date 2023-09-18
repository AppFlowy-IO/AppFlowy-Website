import React from 'react';
import { downloadPageConfig } from '@/lib/config/pages';
import DownloadOsBtn from '@/components/download/os-btn';
import Image from 'next/image';
import image0 from '@/assets/images/download/img-0.svg';
import image0Bg from '@/assets/images/download/img-0-bg.svg';

function DownloadOS() {
  return (
    <>
      <div className={'title'}>
        {downloadPageConfig.title}
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
      <div className={'image'}>
        <Image
          className={'absolute -bottom-[80px] right-0 hidden max-sm:block'}
          src={image0Bg.src}
          alt={downloadPageConfig.imageAlt}
          width={1162}
          height={613.8}
        />
        <Image className={'relative'} src={image0.src} alt={downloadPageConfig.imageAlt} width={1162} height={613.8} />
      </div>
    </>
  );
}

export default DownloadOS;
