'use client';

import React, { useEffect } from 'react';
import { useDownload } from '@/lib/hooks/use-download';
import { cn } from '@/lib/utils';
import { collectEvent, EventName } from '@/lib/collect';

const badgeClassName =
  'flex h-10 items-center gap-2 rounded-[8px] border border-[#a6a6a6] bg-black px-3 text-white transition-opacity hover:opacity-85';

function AppleLogo() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='24' viewBox='0 0 18 22' fill='none' aria-hidden={true}>
      <path
        d='M12.0713 4.13312C12.4659 3.69379 12.7669 3.1835 12.9568 2.63154C13.1467 2.07958 13.2218 1.49683 13.1779 0.916748C11.9662 1.01121 10.8414 1.56159 10.0459 2.44931C9.66497 2.87478 9.37629 3.36974 9.19696 3.90489C9.01764 4.44004 8.95132 5.00451 9.00194 5.56486C9.59299 5.56961 10.1772 5.44295 10.7095 5.19468C11.2417 4.94641 11.7077 4.58318 12.0713 4.13312ZM14.7021 11.6346C14.7091 10.862 14.9198 10.1039 15.3144 9.43176C15.7089 8.75963 16.2743 8.19568 16.9571 7.79312C16.5262 7.19345 15.9565 6.69899 15.2933 6.34896C14.63 5.99893 13.8914 5.80296 13.1361 5.77659C11.5075 5.61527 10.0042 6.69411 9.13766 6.69411C8.27114 6.69411 7.04968 5.79676 5.69249 5.81692C4.80524 5.84515 3.9407 6.09498 3.18321 6.54205C2.42572 6.98913 1.80114 7.61817 1.37038 8.36784C-0.467035 11.4531 0.900589 16.0407 2.73801 18.5312C3.5732 19.7512 4.61719 21.1325 5.99525 21.0821C7.37332 21.0317 7.82223 20.2553 9.41953 20.2553C11.0168 20.2553 11.5075 21.0821 12.8647 21.0518C14.2219 21.0216 15.1823 19.8016 16.0593 18.5816C16.6805 17.6958 17.1658 16.728 17.5 15.708C16.6726 15.3672 15.9667 14.7999 15.4695 14.0759C14.9723 13.352 14.7055 12.5033 14.7021 11.6346Z'
        fill='currentColor'
      />
    </svg>
  );
}

function GooglePlayLogo() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='22' height='24' viewBox='0 0 28 30' aria-hidden={true}>
      <path d='M1 1L15 15L1 29Z' fill='#4285F4' />
      <path d='M1 1L20.5 11.5L15 15Z' fill='#34A853' />
      <path d='M1 29L15 15L20.5 18.5Z' fill='#EA4335' />
      <path d='M20.5 11.5L27 15L20.5 18.5L15 15Z' fill='#FBBC04' />
    </svg>
  );
}

function AppStoreBadges({ className }: { className?: string }) {
  const { downloadIOS, downloadAndroid } = useDownload();

  useEffect(() => {
    collectEvent(EventName.downloadAppleBtn, {
      type: 'view',
    });
    collectEvent(EventName.downloadAndroidBtn, {
      type: 'view',
    });
  }, []);

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <button type='button' onClick={downloadIOS} className={badgeClassName} aria-label={'Download on the App Store'}>
        <AppleLogo />
        <span className='flex flex-col items-start leading-none'>
          <span className='text-[9px] font-medium'>Download on the</span>
          <span className='text-[17px] font-semibold tracking-[-0.02em]'>App Store</span>
        </span>
      </button>
      <button type='button' onClick={downloadAndroid} className={badgeClassName} aria-label={'Get it on Google Play'}>
        <GooglePlayLogo />
        <span className='flex flex-col items-start leading-none'>
          <span className='text-[9px] font-medium uppercase'>Get it on</span>
          <span className='text-[17px] font-semibold tracking-[-0.02em]'>Google Play</span>
        </span>
      </button>
    </div>
  );
}

export default AppStoreBadges;
