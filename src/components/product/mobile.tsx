import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import AppStoreButton from '@/components/shared/app-store-button';
import GooglePlayButton from '@/components/shared/google-play-button';

function Mobile() {
  const { t } = useTranslation();

  return (
    <div className={'mobile flex w-full flex-col items-center justify-center px-16 py-56'}>
      <div className={'panel-title'}>
        <span>
          {t('home.mobile.title.prefix')}
          <span className={'relative'}>
            {t('home.mobile.title.main')}
            <span className={'bg-primary absolute -bottom-1 left-0 h-1 w-full'}></span>
          </span>
        </span>
        <div>{t('home.mobile.title.suffix')}</div>
      </div>
      <div className={'my-16 flex items-center justify-center'}>
        <AppStoreButton />
        <GooglePlayButton />
      </div>
      <div className={'my-16 min-h-screen'}></div>
    </div>
  );
}

export default Mobile;
