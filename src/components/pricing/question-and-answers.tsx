'use client';
import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import data from '@/data/q&a.json';
import Accordion from '@/components/shared/accordion';

function QuestionAndAnswers() {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className={'flex min-h-screen w-full max-w-screen-lg flex-col items-center justify-center py-36'}>
      <div className={'panel-title'}>
        {t('q&a.title.prefix')}
        <span className={'relative'}>
          {t('q&a.title.main')}
          <span className={'bg-primary absolute -bottom-1 left-0 h-1 w-full'}></span>
        </span>
      </div>
      <div className={'w-full'}>
        {data.map((item, index) => (
          <Accordion
            key={index}
            header={<div className={'text-[25px] font-medium leading-[30px]'}>{item.q}</div>}
            index={index}
            expandedIndex={expandedIndex}
            setExpandedIndex={setExpandedIndex}
          >
            <div className={'flex items-center justify-between pt-4 '}>{item.a}</div>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default QuestionAndAnswers;
