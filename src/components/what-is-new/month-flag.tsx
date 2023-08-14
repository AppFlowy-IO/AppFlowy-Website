import React from 'react';

function MonthFlag({ title }: { title: string }) {
  return (
    <div className={'absolute -left-[13px] -top-6  flex items-center '}>
      <div
        className={
          'flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-purple-border)] p-1.5'
        }
      >
        <div className={'bg-primary h-full w-full rounded-full rounded-full'} />
      </div>
      <div className={'ml-2 font-bold'}>{title}</div>
    </div>
  );
}

export default MonthFlag;
