import React from 'react';
import { aboutPageConfig } from '@/lib/config/pages';
import AnimateNumber from '@/components/shared/animate-number';
import Plus from '@/components/icons/plus';

function Community() {
  return (
    <div className={'community-panel'}>
      <div className={'title'}>
        {aboutPageConfig.title2}
        <div className={'circle'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 194 92' fill='none'>
            <path
              d='M0.491297 30.7697C147.062 -19.929 187.724 7.76295 192.036 29.5091C197.083 54.9642 160.15 80.0439 92.0711 88.221C23.9919 96.398 11.9303 76.6518 11.615 59.8615C11.2488 40.3544 30.9777 27.6029 84.6975 18.4985'
              stroke='#9327FF'
              strokeWidth='3'
            />
          </svg>
        </div>
      </div>
      <div className={'numbers'}>
        {aboutPageConfig.communityData.map((item) => (
          <div className={'number-item'} key={item.label}>
            <div className={'value'}>
              <AnimateNumber value={item.value} />
              <div className={'plus-icon'}>
                <Plus />
              </div>
            </div>

            <div className={'label'}>{item.label}</div>
          </div>
        ))}
      </div>
      <div className={'developers'}>
        <div className={'developers-title'}>{aboutPageConfig.developers.title}</div>
        <div className={'developers-logos'}>
          <div className={'logo-wrapper'}>
            {aboutPageConfig.developers.logos.map((logo, index) => (
              <div key={index} className={'logo'}>
                <img src={logo} alt={''} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
