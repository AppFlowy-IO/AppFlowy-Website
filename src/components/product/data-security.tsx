import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import data from '@/data/home.json';
import GradientCard from '@/components/shared/gradient-card';

function DataSecurity() {
  const { t } = useTranslation();

  return (
    <div className={'data-security flex min-h-screen w-full flex-col items-center justify-center px-16'}>
      <div className={'panel-title'}>
        {t('home.data-security.title.prefix')}
        <span className={'relative'}>
          {t('home.data-security.title.main')}
          <span className={'bg-primary absolute -bottom-1 left-0 h-1 w-full'}></span>
        </span>
      </div>
      <div className={'my-32 flex w-full justify-center'}>
        {data['data-security'].map((item, index) => (
          <div key={item.title} className={`card card-${index + 1} mx-3 flex-1`}>
            <GradientCard type={item.color}>
              <div className={'px-12 py-16'}>
                <div className={'text-[40px] font-medium leading-[44px]'}>{t(item.title)}</div>
                <div className={'mt-6'}>{t(item.desc)}</div>
              </div>
              <div className={'w-full pl-4'}>
                <div className={'h-[250px] -rotate-2'}></div>
              </div>
            </GradientCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataSecurity;
