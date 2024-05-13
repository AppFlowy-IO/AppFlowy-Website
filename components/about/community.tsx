import React from 'react';
import { aboutPageConfig } from '@/lib/config/pages';
import Plus from '@/components/icons/plus';
import Link from 'next/link';
import { formatNumber } from '@/lib/format-number';
import ScrollLogos from '@/components/about/scroll-logos';

function Community() {
  return (
    <div className={'community-panel'}>
      <div className={'ellipse'} />
      <div className={'title'}>{aboutPageConfig.communityTitle}</div>
      <div className={'numbers'}>
        {aboutPageConfig.communityData.map((item) => (
          <div className={'number-item'} key={item.label}>
            <div className={'value'}>
              {formatNumber(item.value)}
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
      <ScrollLogos />
    </div>
  );
}

export default Community;
