'use client';

import pageKeys from '@/data/contact-us.json';
import Button from '@/components/shared/button';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import useTranslation from 'next-translate/useTranslation';

export default function Form() {
  const { t } = useTranslation();

  return (
    <form
      target={'_blank'}
      action='https://formsubmit.co/dc52d86703bfc738c7e68036375e8944'
      method='POST'
      className={'flex flex-col items-center max-sm:w-full max-sm:px-6 md:w-[675px]'}
    >
      {pageKeys.form.map((item) => (
        <div
          key={item.label}
          className={
            'border-primary-divider bg-bg relative flex w-full items-center rounded-2xl border max-sm:mb-4 max-sm:p-6 md:mb-6 md:p-8'
          }
        >
          {item.type === 'textarea' ? (
            <textarea
              name={item.label}
              className={'w-full pr-10 focus:outline-0 max-sm:text-base md:text-[20px]'}
              placeholder={t(item.label)}
              rows={3}
              required={item.required}
            />
          ) : (
            <input
              name={item.label}
              className={'w-full pr-10 focus:outline-0 max-sm:text-base md:text-[20px]'}
              placeholder={t(item.label)}
              required={item.required}
            />
          )}
          <div className={'text-primary absolute right-0 h-10 w-10 text-[40px] max-sm:top-8 md:top-10'}>*</div>
        </div>
      ))}
      <Button type={'submit'} className={'w-full'} variant={'contained'}>
        {t(pageKeys.send)}
        <ArrowOutward />
      </Button>
    </form>
  );
}
