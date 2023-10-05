import React from 'react';
import DownloadBtns from '@/components/home/mobile/download-btns';
import { mobileApplicationConfig } from '@/lib/config/home';
import MobileAnimation from '@/components/shared/mobile-animation';

function Mobile({ dark }: { dark: boolean }) {
  return (
    <div className={'mobile'}>
      <div className={'bg'} />
      <div className={'title'}>{mobileApplicationConfig.title}</div>
      <div className={'desc'}>Coming in December</div>
      <DownloadBtns />
      <MobileAnimation dark={dark} />
    </div>
  );
}

export default Mobile;
