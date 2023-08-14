'use client';

import React, { useState } from 'react';
import Popover from '@/components/shared/popover';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Locale } from '@/lib/interface';
import data from '@/data/language.json';

function LocaleSwitch() {
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<Locale>(data[0]);

  return (
    <Popover
      content={
        <div className='w-full rounded-md bg-white p-2 sm:w-40'>
          {data.map((locale) => (
            <button
              onClick={() => {
                setSelectedLocale(locale);
                setOpenPopover(false);
              }}
              key={locale.code}
              className='text-text-title flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200'
            >
              {locale.name}
            </button>
          ))}
        </div>
      }
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <button onClick={() => setOpenPopover(!openPopover)} className='flex w-36 items-center justify-between px-4 py-2'>
        <p className='text-white'>{selectedLocale.name}</p>
        <ChevronDownIcon className={`h-4 w-4 text-white transition-all ${openPopover ? 'rotate-180' : ''}`} />
      </button>
    </Popover>
  );
}

export default LocaleSwitch;
