import React from 'react';
import { aboutPageConfig } from '@/lib/config/pages';
import AnimateNumber from '@/components/shared/animate-number';
import Plus from '@/components/icons/plus';

function Community() {
  return (
    <div className={'community-panel'}>
      <div className={'ellipse'} />
      <div className={'title'}>{aboutPageConfig.communityTitle}</div>
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
      {/*<div className={'developers'}>*/}
      {/*  <div className={'developers-title'}>{aboutPageConfig.developers.title}</div>*/}
      {/*  <div className={'developers-logos'}>*/}
      {/*    <div className={'logo-wrapper'}>*/}
      {/*      {aboutPageConfig.developers.logos.map((logo, index) => (*/}
      {/*        <div key={index} className={'logo'}>*/}
      {/*          <img src={logo} alt={''} />*/}
      {/*        </div>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}

export default Community;
