import React from 'react';
import Image from 'next/image';
import icon1 from '@/assets/images/download/icon-1.png';
import icon2 from '@/assets/images/download/icon-2.png';
import icon3 from '@/assets/images/download/icon-3.png';
import darkIcon1 from '@/assets/images/download/dark/icon-1.png';
import darkIcon2 from '@/assets/images/download/dark/icon-2.png';
import darkIcon3 from '@/assets/images/download/dark/icon-3.png';
import { downloadPageConfig } from '@/lib/config/pages';
import { Manrope } from 'next/font/google';
import { useDarkContext } from '@/lib/hooks/use-dark-context';

const manrope = Manrope({ subsets: ['latin'] });

function OverTitle({ title }: { title: string }) {
  const dark = useDarkContext();

  return (
    <div className={`over-title ${manrope.className}`}>
      <div className={'title-text'}>{title}</div>
      <div className={'icons'}>
        <Image
          className={'icon icon-1'}
          src={dark ? darkIcon1.src : icon1.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={183}
          height={196}
        />
        <Image
          className={'icon icon-2'}
          src={dark ? darkIcon2.src : icon2.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={171}
          height={188}
        />
        <Image
          className={'icon icon-3'}
          src={dark ? darkIcon3.src : icon3.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={204}
          height={174}
        />
      </div>
    </div>
  );
}

export default OverTitle;
