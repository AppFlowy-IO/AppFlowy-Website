import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import DownloadButton from '@/components/shared/download-button';
import LiveDemoButton from '@/components/shared/live-demo-button';

function GetStarted() {
  const { t } = useTranslation();

  return (
    <div id='get-started' className={'flex w-full flex-col items-center px-16 py-16'}>
      <div className={'panel-title'}>
        {t('home.get-started.title.prefix')}
        <span className={'relative'}>
          {t('home.get-started.title.main')}
          <span className={'bg-primary absolute -bottom-1 left-0 h-1 w-full'}></span>
        </span>
      </div>
      <div className={'-mt-10'}>{t('home.get-started.desc')}</div>
      <div className={'my-16 flex items-center justify-center'}>
        <DownloadButton />
        <LiveDemoButton />
      </div>
      <div className={'h-[550px] w-[1000px]'}></div>
    </div>
  );
}

export default GetStarted;
