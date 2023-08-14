import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import data from '@/data/home.json';
import GradientCard from '@/components/shared/gradient-card';

function EasyToUse() {
  const { t } = useTranslation();

  return (
    <div className={'easy-to-use my-16 flex flex-col items-center justify-between px-16'}>
      <div className={'panel-title'}>
        <span className={'relative'}>
          {t('home.easy-to-use.title.prefix')}
          <span className={'bg-primary absolute bottom-0 left-0 h-[5px] w-full'}></span>
        </span>
        {t('home.easy-to-use.title.suffix')}
        <span className={'absolute -right-[28px] -top-4 h-[54px] w-[38px]'}></span>
      </div>
      <div className={'mb-48 mt-32 flex w-full justify-center'}>
        {data['easy-to-use'].map((item) => (
          <div key={item.title} className={`mx-3 h-[665px] flex-1`}>
            <GradientCard type={'purple'} className={'px-10'}>
              <div className={'h-[400px]'}></div>
              <div className={'text-center text-[40px] font-medium leading-[44px]'}>{t(item.title)}</div>
            </GradientCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EasyToUse;
