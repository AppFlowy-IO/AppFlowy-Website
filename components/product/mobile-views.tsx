'use client';

import {
  CardsThree,
  ChatTeardrop,
  DocIcon,
  HomeIcon,
  ListStart,
  SpaceIcon,
} from '@/components/product/mobile-views-icons';
import { TabPanel } from '@/components/shared/tab-panel';
import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useMemo } from 'react';
import HomeImage from '@/assets/images/product/home.png';
import DocImage from '@/assets/images/product/doc.png';
import SpaceImage from '@/assets/images/product/space.png';
import BlockImage from '@/assets/images/product/block.png';
import CardViewImage from '@/assets/images/product/database_card_view.png';
import AiChatImage from '@/assets/images/product/ai_chat.png';

function MobileViews() {
  const [value, setValue] = React.useState('home');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      {
        value: 'home',
        label: 'Home',
        icon: <HomeIcon />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
      {
        value: 'ai_chat',
        label: 'AI chat',
        icon: <ChatTeardrop />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
      {
        value: 'space',
        label: 'Spaces',
        icon: <SpaceIcon />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
      {
        value: 'doc',
        label: 'Doc',
        icon: <DocIcon />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
      {
        value: 'block',
        label: 'Block',
        icon: <ListStart />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
      {
        value: 'database_card_view',
        label: 'Database card view',
        icon: <CardsThree />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
    ];
  }, []);

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  useAutoPlay({
    options: tabOptions,
    onChange: setValue,
    play: inView,
    defaultOption: 'home',
  });

  const panels = useMemo(() => {
    return [
      {
        value: 'home',
        title: tabOptions[0].desc,
        image: HomeImage,
      },
      {
        value: 'ai_chat',
        title: tabOptions[1].desc,
        image: AiChatImage,
      },
      {
        value: 'space',
        title: tabOptions[2].desc,
        image: SpaceImage,
      },
      {
        value: 'doc',
        title: tabOptions[3].desc,
        image: DocImage,
      },
      {
        value: 'block',
        title: tabOptions[4].desc,
        image: BlockImage,
      },
      {
        value: 'database_card_view',
        title: tabOptions[5].desc,
        image: CardViewImage,
      },
    ];
  }, [tabOptions]);

  return (
    <div ref={ref} className={'mobile-views'}>
      <div className={'mobile-view-panels'}>
        {panels.map((panel) => (
          <TabPanel key={panel.value} index={panel.value} value={value}>
            <div className={'tab-panel-title'}>{panel.title}</div>
            <div className={'tab-panel-image'}>
              <Image loading={'eager'} width={532} height={660} src={panel.image.src} alt={''} />
            </div>
          </TabPanel>
        ))}
      </div>
      <MuiTabs className={'mobile-view-tabs'} orientation={'vertical'} value={value} onChange={handleChange}>
        {tabOptions.map((tab) => (
          <MuiTab
            className={`mobile-view-tab ${value === tab.value ? 'selected' : ''} transform`}
            key={tab.value}
            value={tab.value}
            label={
              <div className={'flex w-full flex-col gap-2 max-md:w-[20px] max-md:gap-0'}>
                <div className={'tab-title'}>
                  <div className={'tab-title-icon'}>{tab.icon}</div>
                  <div className={'tab-title-name'}>{tab.label}</div>
                </div>
                {value === tab.value && <div className={'tab-desc'}>{tab.desc}</div>}
              </div>
            }
          />
        ))}
      </MuiTabs>
    </div>
  );
}

export default MobileViews;
