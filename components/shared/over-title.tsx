import React from 'react';
import Image from 'next/image';
import icon1 from '@/assets/images/download/icon-1.png';
import { downloadPageConfig } from '@/lib/config/pages';
import icon2 from '@/assets/images/download/icon-2.png';
import icon3 from '@/assets/images/download/icon-3.png';
import { Manrope } from 'next/font/google';

const manrope = Manrope({ subsets: ['latin'] });

function OverTitle({ title }: { title: string }) {
  return (
    <div className={`over-title ${manrope.className}`}>
      <div className={'title-text'}>{title}</div>
      <div className={'icons'}>
        <Image
          className={'icon icon-1'}
          src={icon1.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={183}
          height={196}
        />
        <Image
          className={'icon icon-2'}
          src={icon2.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={171}
          height={188}
        />
        <Image
          className={'icon icon-3'}
          src={icon3.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={204}
          height={174}
        />
      </div>
    </div>
  );
}

export default OverTitle;
