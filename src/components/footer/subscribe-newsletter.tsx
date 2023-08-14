import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Button from '@/components/shared/button';

function SubscribeNewsletter() {
  const { t } = useTranslation();

  return (
    <div className={'flex w-full items-center justify-between p-8'}>
      <div className={'flex flex-col'}>
        <div className={'text-[30px] font-medium leading-[33px]'}>{t('subscribe-newsletter')}</div>
        <div className={'text-text-placeholder mt-2'}>{t('subscribe-newsletter-desc')}</div>
      </div>
      <div className={'flex flex-1 items-center justify-end pl-20'}>
        <div
          className={
            'w-[50%] rounded-2xl border border-[var(--color-footer-input-border)] bg-[var(--color-footer-input-bg)] '
          }
        >
          <div contentEditable={true} className={'px-6 py-3 text-[20px] outline-0 focus:outline-0'} />
        </div>
        <div className={'ml-4'}>
          <Button className={'px-6 py-3'} type={'contained'}>
            {t('subscribe')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SubscribeNewsletter;
