'use client';

import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import pricingData from '@/data/pricing.json';
import { CheckIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import GetStartedButton from '@/components/shared/get-started-button';

function OneTool() {
  const { t } = useTranslation();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div id='one-tool' className={'flex min-h-screen w-full flex-col items-center justify-center'}>
      <div className={'panel-title'}>
        <span className={'relative'}>
          {t('pricing.one-tool.title.main')}
          <span className={'bg-primary absolute -bottom-1 left-0 h-1 w-full'}></span>
        </span>
        {t('pricing.one-tool.title.suffix')}
      </div>
      <div className={'flex w-full flex-1 justify-center'}>
        {Object.keys(pricingData).map((type, index) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[type];

          return (
            <div
              onMouseEnter={() => setActiveIndex(index)}
              style={{
                background: activeIndex === index ? 'var(--gradient-pick)' : undefined,
              }}
              key={type}
              className={`border-border-gray mx-[8px] flex w-[calc(25%-16px)] max-w-[360px] flex-col overflow-hidden rounded-3xl border p-10`}
            >
              <div className={'text-[30px] font-medium leading-[36px]'}>{t(`pricing.${type}.name`)}</div>
              <div className={'mt-6 h-[48px] overflow-y-visible'}>{t(`pricing.${type}.desc`)}</div>
              <div className={'border-border-gray my-10 border-b'} />
              <div className={'text-[40px] font-medium leading-[44px]'}>
                {type === 'free' ? t(`pricing.free.name`) : `$${item.price}`}
              </div>
              <div className={'text-text-gray mt-4 h-[48px] overflow-y-visible text-sm'}>
                {t(`pricing.${type}.price-desc`)}
              </div>
              <div className={'my-10 w-full max-w-[240px] text-center'}>
                <GetStartedButton onClick={() => router.push(item['get-started-url'])} />
              </div>
              {type !== 'free' ? (
                <div className={'text-md mb-2 font-bold'}>
                  {t('everything-in', {
                    type: t(`pricing.${Object.keys(pricingData)[index - 1]}.name`),
                  })}
                </div>
              ) : null}
              <div className={'flex flex-col'}>
                {Array.from({ length: item['item-count'] }).map((_, index) => (
                  <div key={index} className={'mt-2 flex'}>
                    <div className={'mr-2'}>
                      <CheckIcon width={18} height={18} />
                    </div>
                    <div className={'text-text-gray text-sm'}>{t(`pricing.${type}.features.item-${index + 1}`)}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OneTool;
