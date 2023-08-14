'use client';

import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import DownloadAppButton from '@/components/shared/download-app-button';

function Introduce() {
  const { t } = useTranslation();

  return (
    <div className={'flex min-h-screen flex-col items-center pt-[96px]'}>
      <div className='panel-title max-w-screen-lg'>
        <span>
          {t('home.title.prefix')}{' '}
          <span className={'relative'}>
            {t('home.title.main')}
            <span className={'absolute bottom-0 left-0 h-1 w-full bg-purple-400'}></span>
          </span>{' '}
          {t('home.title.suffix')}
        </span>
      </div>
      <DownloadAppButton />
      <div className={'relative mt-4 flex w-full overflow-visible px-20'}>
        <div className={'absolute left-20 top-0 flex flex-col overflow-hidden'}>
          <div className={'mb-6 flex h-10 w-10'}></div>

          <div className={'inline-block w-[220px]'}>
            <span className={'font-bold'}>AppFlowy</span> {t('home.desc')}
          </div>
        </div>
        <div className={'h-screen w-full'}></div>
      </div>
    </div>
  );
}

export default Introduce;
