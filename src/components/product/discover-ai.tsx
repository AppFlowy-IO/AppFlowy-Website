import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Logo from '@/components/shared/icons/logo';
import data from '@/data/home.json';

function DiscoverAi() {
  const { t } = useTranslation();

  return (
    <div className={'discover-ai flex flex-col items-center justify-center px-16 py-56'}>
      <div
        className={
          'flex h-[62px] w-[290px] items-center justify-center rounded-xl border border-[var(--color-purple-border)] bg-[rgba(var(--body),0.5)]'
        }
      >
        <Logo />
        {' + '}
        <Logo />
      </div>
      <div className={'panel-title max-w-screen-lg'}>
        {t('home.discover-ai.title.prefix')}
        <span className={'relative'}>
          {t('home.discover-ai.title.main')}
          <span className={'absolute -right-[18px] -top-3 h-[37px] w-[26px]'}></span>
          <span className={'bg-primary absolute -bottom-1 left-0 h-1 w-full'}></span>
        </span>
        {t('home.discover-ai.title.suffix')}
      </div>
      <div className={'mb-16 flex w-full items-center justify-center'}>
        <div className={'h-[536px] w-[900px]'}></div>
      </div>
      <div className={'flex w-full justify-center'}>
        {data['discover-ai'].map((item) => (
          <div
            key={item.title}
            className={
              'flex w-[404px] flex-col border-[rgba(var(--primary),0.2)] px-16 py-2 first:border-r last:border-l'
            }
          >
            <div className={'mb-6 h-10 w-10'}></div>
            <div className={'mb-5 whitespace-break-spaces text-[40px] font-medium leading-[43px]'}>{t(item.title)}</div>
            <div>{t(item.desc)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoverAi;
