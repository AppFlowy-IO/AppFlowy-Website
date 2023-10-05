'use client';

import React from 'react';
import Image from 'next/image';
import MainImage from '@/assets/images/mobile/img-1.png';
import Readme from '@/assets/images/mobile/img-2.png';
import Grid from '@/assets/images/mobile/img-3.png';
import Tag from '@/assets/images/mobile/img-4.png';
import Toolbar from '@/assets/images/mobile/img-5.png';
import Board from '@/assets/images/mobile/img-6.png';
import darkMainImage from '@/assets/images/mobile/dark/img-1.png';
import darkReadme from '@/assets/images/mobile/dark/img-2.png';
import darkGrid from '@/assets/images/mobile/dark/img-3.png';
import darkTag from '@/assets/images/mobile/dark/img-4.png';
import darkToolbar from '@/assets/images/mobile/dark/img-5.png';
import darkBoard from '@/assets/images/mobile/dark/img-6.png';

function MobileAnimation({ dark }: { dark?: boolean }) {
  return (
    <div className={'mobile-images'}>
      <div className={'image main'}>
        <Image src={dark ? darkMainImage.src : MainImage.src} alt={''} width={341} height={683} />
      </div>
      <div className={'image'}>
        <Image src={dark ? darkReadme.src : Readme.src} alt={''} width={236} height={348} />
      </div>
      <div className={'image'}>
        <Image src={dark ? darkGrid.src : Grid.src} alt={''} width={291} height={431} />
      </div>
      <div className={'image '}>
        <Image src={dark ? darkTag.src : Tag.src} alt={''} width={290} height={97} />
      </div>
      <div className={'image'}>
        <Image src={dark ? darkToolbar.src : Toolbar.src} alt={''} width={252} height={269} />
      </div>
      <div className={'image'}>
        <Image src={dark ? darkBoard.src : Board.src} alt={''} width={234} height={338} />
      </div>
    </div>
  );
}

export default MobileAnimation;
