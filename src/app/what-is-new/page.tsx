import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import data from '@/data/what-is-new.json';
import MonthFlag from '@/components/what-is-new/month-flag';
import Version from '@/components/what-is-new/version';

function WhatIsNewPage() {
  const { t } = useTranslation();

  return (
    <div className='what-is-new flex w-full flex-col items-center px-16 pt-[84px]'>
      <div className={'panel-title'}>
        {t('what-is-new.title.prefix')}
        <span className={'relative'}>
          {t('what-is-new.title.main')}
          <span className={'bg-primary absolute -bottom-1 left-0 h-1 w-full'}></span>
        </span>
      </div>
      <div className={'flex min-h-screen w-full'}>
        <div className={'timeline ml-4 border-l border-[var(--color-purple-border)]'} />
        <div className={'flex-1 pb-36'}>
          <div className={'flex w-full flex-col'}>
            {data.map(({ month, versions }) => (
              <div key={month} className={'relative w-full py-6'}>
                <MonthFlag title={month} />
                <div className={'mb-6 flex flex-col'}>
                  {versions.map((version, index) => (
                    <div key={version.version} className={'relative'}>
                      {index !== 0 && index !== versions.length - 1 && (
                        <div
                          className={
                            'absolute -left-[8px] top-0 h-[14px] w-[14px] rounded-full bg-[var(--color-purple-body)]'
                          }
                        />
                      )}
                      <Version
                        version={version.version}
                        image={version.image}
                        desc={version.desc}
                        time={version.time}
                        update={version.update}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatIsNewPage;
