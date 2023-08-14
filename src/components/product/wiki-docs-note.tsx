import React from 'react';
import useTranslation from 'next-translate/useTranslation';

function WikiDocsNote() {
  const { t } = useTranslation();

  return (
    <div className={'relative flex min-h-screen w-full flex-col'}>
      <div className={'relative w-full py-20 '}>
        <div
          className={
            'flex h-[300px] items-center justify-center overflow-hidden whitespace-nowrap  text-[300px] font-medium'
          }
        >
          {t('home.wiki-docs-note')}
        </div>

        <div className={'absolute left-12 top-1/2 h-[200px] w-[300px] rotate-3 '}></div>
        <div className={'rotate-4 absolute left-1/2 top-0 h-[200px] w-[200px] '}></div>
        <div className={'absolute right-12 top-1/2 h-[235px] w-[235px] -rotate-3 '}></div>
      </div>
      <div className={'flex h-screen items-center justify-between px-20'}>
        <div className={'mr-6 flex w-[260px] flex-col justify-center'}>
          <div className={'mb-6 h-10 w-10'}></div>
          <div className={'inline-block'}>
            <span className={'font-bold'}>{t('home.wiki-docs-note-desc.prefix')}</span>
            {t('home.wiki-docs-note-desc.suffix')}
          </div>
        </div>
        <div className={'h-[570px] w-[1000px] flex-1'}></div>
      </div>
    </div>
  );
}

export default WikiDocsNote;
