import React from 'react';
import { aboutPageConfig } from '@/lib/config/pages';

function OurInvestors() {
  return (
    <div className={'our-investors'}>
      <div className={'title'}>
        {aboutPageConfig.ourInvestorsTitle}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 336 19' fill='none'>
            <path
              d='M334.171 12.9724C242.919 6.30643 179.161 -3.16766 29.2258 5.79597C26.7526 5.94382 26.68 9.46567 29.1502 9.65698L125.565 17.1239C66.623 10.6021 34.3743 10.763 2.19861 14.5918'
              stroke='#9327FF'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </div>
      </div>
      <div className={'investors'}>
        {aboutPageConfig.investors.map((item, index) => (
          <div key={index} className={'investor-item'}>
            <div className={'investor-item-child'}>
              <div className={'investor-item-name'}>{item.name}</div>
              <div className={'investor-item-desc'}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurInvestors;
