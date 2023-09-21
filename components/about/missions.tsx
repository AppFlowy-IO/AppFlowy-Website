'use client';

import { aboutPageConfig } from '@/lib/config/pages';
import React, { useContext, useMemo } from 'react';
import img0 from '@/assets/images/about/the-start-of-thing.svg';
import darkImg0 from '@/assets/images/about/dark/the-start-of-thing.svg';
import Image from 'next/image';
import icon0 from '@/assets/images/download/icon-1.svg';
import icon1 from '@/assets/images/download/icon-3.svg';
import mission1 from '@/assets/images/about/mission-1.svg';
import mission2 from '@/assets/images/about/mission-2.svg';
import mission3 from '@/assets/images/about/mission-3.svg';
import mission4 from '@/assets/images/about/mission-4.svg';
import darkMission1 from '@/assets/images/about/dark/mission-1.svg';
import darkMission2 from '@/assets/images/about/dark/mission-2.svg';
import darkMission3 from '@/assets/images/about/dark/mission-3.svg';
import darkMission4 from '@/assets/images/about/dark/mission-4.svg';
import { DarkContext } from '@/lib/hooks/use-dark-context';

export default function Missions() {
  const dark = useContext(DarkContext);

  const missions = useMemo(() => {
    return [
      {
        icon: <Image alt='' src={dark ? darkMission1 : mission1.src} width={550} height={550} />,
        title: aboutPageConfig.missions[0].title,
        desc: aboutPageConfig.missions[0].desc,
      },
      {
        icon: <Image alt='' src={dark ? darkMission2 : mission2.src} width={550} height={550} />,
        title: aboutPageConfig.missions[1].title,
        desc: aboutPageConfig.missions[1].desc,
      },
      {
        icon: <Image alt='' src={dark ? darkMission3 : mission3.src} width={550} height={550} />,
        title: aboutPageConfig.missions[2].title,
        desc: aboutPageConfig.missions[2].desc,
      },
      {
        icon: <Image alt='' src={dark ? darkMission4 : mission4.src} width={550} height={550} />,
        title: aboutPageConfig.missions[3].title,
        desc: aboutPageConfig.missions[3].desc,
      },
    ];
  }, [dark]);

  return (
    <div className={'mission-panel'}>
      <div className={'title'}>
        {aboutPageConfig.title1}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 318 19' fill='none'>
            <path
              d='M315.402 12.9724C229.301 6.2039 169.137 -3.34175 27.6868 5.45314C25.2248 5.60622 25.1498 9.10811 27.608 9.31281L118.594 16.8891C62.9766 10.3012 32.5512 10.4258 2.19871 14.2183'
              stroke='#9327FF'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </div>
      </div>
      <div className={'image relative'}>
        <div
          className={
            'bg-primary pointer-events-none absolute h-screen w-1/2 rotate-[-51deg] transform rounded-full opacity-10 blur-[150px] dark:opacity-20'
          }
        />
        <Image src={dark ? darkImg0.src : img0.src} alt={''} width={1440} height={500} />
        <Image className={'icon icon-0'} src={icon0.src} alt={''} width={183} height={196} />
        <Image className={'icon icon-1'} src={icon1.src} alt={''} width={204} height={174} />
      </div>
      <div className={'missions'}>
        {missions.map((item) => (
          <div className={'mission-item'} key={item.title}>
            <div className={'ellipse'} />
            <div className={'icon'}>{item.icon}</div>

            <div className={'right'}>
              <div className={'mission-title'}>{item.title}</div>
              <div className={'mission-desc'}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
