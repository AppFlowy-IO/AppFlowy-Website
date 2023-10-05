'use client';

import { aboutPageConfig } from '@/lib/config/pages';
import React, { useMemo } from 'react';
import img0 from '@/assets/images/about/the-start-of-thing.png';
import darkImg0 from '@/assets/images/about/dark/the-start-of-thing.svg';
import Image from 'next/image';
import icon0 from '@/assets/images/download/icon-1.png';
import icon1 from '@/assets/images/download/icon-3.png';
import darkIcon0 from '@/assets/images/download/dark/icon-1.png';
import darkIcon1 from '@/assets/images/download/dark/icon-3.png';
import mission1 from '@/assets/images/about/mission-1.png';
import mission2 from '@/assets/images/about/mission-2.png';
import mission3 from '@/assets/images/about/mission-3.png';
import mission4 from '@/assets/images/about/mission-4.png';
import darkMission1 from '@/assets/images/about/dark/mission-1.png';
import darkMission2 from '@/assets/images/about/dark/mission-2.png';
import darkMission3 from '@/assets/images/about/dark/mission-3.png';
import darkMission4 from '@/assets/images/about/dark/mission-4.png';
import { useDarkContext } from '@/lib/hooks/use-dark-context';

export default function Missions() {
  const dark = useDarkContext();

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
      <div className={'title'}>{aboutPageConfig.ourMissionTitle}</div>
      <div className={'image relative aspect-[1440/500]'}>
        <div className={'ellipse'} />
        <div className={'absolute-image aspect-auto h-fit'}>
          <Image src={img0.src} alt={''} width={1440} height={500} />
        </div>
        <div className={'absolute-image dark-image aspect-auto h-fit'}>
          <Image src={darkImg0.src} alt={''} width={1440} height={500} />
        </div>

        <Image className={'icon icon-0'} src={dark ? darkIcon0.src : icon0.src} alt={''} width={183} height={196} />
        <Image className={'icon icon-1'} src={dark ? darkIcon1.src : icon1.src} alt={''} width={204} height={174} />
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
