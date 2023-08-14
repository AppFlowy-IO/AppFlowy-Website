import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import CentralizedCarousel from '@/components/centralized/centralized-carousel';

function Centralized() {
  const { t } = useTranslation();

  return (
    <div className={' flex min-h-screen flex-col items-center p-20'}>
      <div className={'panel-title max-w-screen-xl'}>
        {t('home.centralized.title.prefix')}
        <span className={'text-primary relative'}>
          {t('home.centralized.title.main')}
          <span className={'absolute -right-6 -top-6 h-[48px] w-[48px]'}></span>
        </span>
        {t('home.centralized.title.suffix.prefix')}
        <span className={'text-text-placeholder'}>{t('home.centralized.title.suffix.suffix')}</span>
      </div>
      <div className={'my-16 flex h-screen flex-col items-center justify-between py-20'}>
        <CentralizedCarousel />
      </div>
    </div>
  );
}

export default Centralized;
