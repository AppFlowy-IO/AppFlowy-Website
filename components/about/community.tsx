import React from 'react';
import { aboutPageConfig } from '@/lib/config/pages';
import AnimateNumber from '@/components/shared/animate-number';
import Plus from '@/components/icons/plus';
import Link from 'next/link';

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
            <Link target={'_blank'} href={item.link.href} className={'link'}>
              {item.link.text}
              <svg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11' fill='none'>
                <path d='M1 1H10M10 1V10M10 1L1 10' stroke='#9327FF' strokeWidth='1.8'></path>
              </svg>
            </Link>
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
