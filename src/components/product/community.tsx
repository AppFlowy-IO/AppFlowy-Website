import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import data from '@/data/home.json';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

function Community() {
  const { t } = useTranslation();

  return (
    <div className={'flex w-full flex-col items-center justify-center px-16 py-56'}>
      <div className={'panel-title'}>
        {t('home.community.title.prefix')}
        <span className={'relative'}>
          {t('home.community.title.main')}
          <span className={'bg-primary absolute -bottom-1 left-0 h-1 w-full'}></span>
        </span>
      </div>
      <div className={'my-24 flex w-full justify-between px-36'}>
        {data.community.increase.map((item) => (
          <div key={item.title} className={`relative mx-6 flex flex-col overflow-visible`}>
            <div className={'text-[120px] font-medium leading-[144px]'}>{item.number}</div>
            <div className={'mt-6'}>{t(item.title)}</div>
            <div className={'text-primary absolute -right-8 top-0 text-[60px]'}>+</div>
          </div>
        ))}
      </div>
      <div className={'mb-40 flex w-full flex-col items-center justify-center'}>
        {data.community.introduce.map((item) => (
          <div className={'my-6 flex w-full items-center justify-center'} key={item.title}>
            <div
              className={'h-[510px] w-[700px] overflow-hidden rounded-2xl border border-[var(--color-purple-border)]'}
            ></div>
            <div className={'flex w-[40%] flex-col justify-center pl-32'}>
              <div className={'mb-8 text-[40px] font-medium leading-[44px]'}>{t(item.title)}</div>
              <div className={'mb-8 whitespace-break-spaces'}>{t(item.desc)}</div>
              <button className={'text-primary flex items-center text-lg font-semibold hover:underline'}>
                {t(item.link.title)}
                <span className={'ml-2'}>
                  <ArrowTopRightIcon />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={'h-[50vh]'}></div>
    </div>
  );
}

export default Community;
