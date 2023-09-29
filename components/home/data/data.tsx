import React from 'react';

import { dataSecurityConfig } from '@/lib/config/home';

function Data() {
  return (
    <div className={'data'}>
      <div className={'title'}>{dataSecurityConfig.title}</div>
      <div className={'cards'}>
        {dataSecurityConfig.cards.map((item) => (
          <div className={'card'} key={item.title}>
            <div className={'text'}>
              <div className={'title'}>{item.title}</div>
              <div className={'desc'}>{item.desc}</div>
            </div>
            <div className={'icon'} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
