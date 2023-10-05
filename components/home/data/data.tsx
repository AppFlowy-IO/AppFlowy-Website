import React from 'react';

import { dataSecurityConfig } from '@/lib/config/home';
import Image from 'next/image';
import { useDarkContext } from '@/lib/hooks/use-dark-context';

function Data() {
  const dark = useDarkContext();

  return (
    <div className={'data'}>
      <div className={'title'}>{dataSecurityConfig.title}</div>
      <div className={'cards'}>
        {dataSecurityConfig.cards.map((item) => (
          <div className={'card'} key={item.title}>
            <div className={'text'}>
              <div className={'title'}>{item.title}</div>
              <div className={'desc whitespace-pre-line leading-[160%]'}>{item.desc}</div>
            </div>
            <Image
              src={dark ? item.icon.darkSrc : item.icon.src}
              alt={item.icon.alt}
              width={item.icon.width}
              height={item.icon.height}
              className={'icon'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
