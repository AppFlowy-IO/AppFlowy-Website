import React from 'react';

import { dataSecurityConfig } from '@/lib/config/home';

function Data() {
  return (
    <div className={'data'}>
      <div className={'title'}>
        {dataSecurityConfig.title}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 181 7' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M180.155 3.01482C147.99 0.0147388 74.8378 3.86944 42.248 6.17644L42.0985 5.07575C46.2635 4.48206 51.6214 3.54557 54.284 2.66408C54.8084 2.49046 55.1824 2.33312 55.4159 2.20179C55.3798 2.18844 55.3393 2.17443 55.294 2.15988C55.0603 2.08482 54.7394 2.00812 54.3156 1.93343C53.4684 1.78412 52.2614 1.65158 50.623 1.54475C37.5031 0.689275 12.3034 3.10218 1.31562 4.42139L0.714657 4.49354L0.547451 3.39401L1.14841 3.32186C12.1218 2.00438 37.4394 -0.42605 50.7001 0.43861C52.3593 0.546799 53.6208 0.683216 54.5365 0.844597C54.9941 0.92525 55.3782 1.01433 55.6884 1.11395C55.9884 1.2103 56.2664 1.33101 56.4723 1.49668C56.6943 1.67539 56.8827 1.95572 56.8163 2.30678C56.7601 2.60392 56.5408 2.81559 56.3616 2.951C55.9914 3.23081 55.3911 3.47995 54.7051 3.70706C54.0099 3.9372 53.1481 4.16897 52.1816 4.39644C87.9348 2.10823 150.967 -0.82141 180.269 1.9116L180.873 1.96794L180.759 3.07116L180.155 3.01482Z'
              fill='#9327FF'
            />
          </svg>
        </div>
      </div>
      <div className={'cards'}>
        {dataSecurityConfig.cards.map((item) => (
          <div className={'card'} key={item.title}>
            <div className={'bg'} />
            <div className={'text'}>
              <div className={'title'}>{item.title}</div>
              <div className={'desc'}>{item.desc}</div>
            </div>
            <div className={'image'}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
