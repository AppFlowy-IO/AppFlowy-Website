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
import React, { useEffect, useMemo } from 'react';
import HomeImage from '@/assets/images/product/home.png';
import DocImage from '@/assets/images/product/doc.png';
import ToolbarImage from '@/assets/images/product/toolbar.png';
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
        label: 'Work across all your devices',
        icon: <HomeIcon />,
        desc: 'Seamlessly transition from laptop to phone.\nEasily navigate your entire workspace.',
      },
      {
        value: 'ai_chat',
        label: 'Chat with AI & GPT-4',
        icon: <ChatTeardrop />,
        desc: 'Just ask AI. Get the answers you need\nwithout interrupting a colleague.',
      },
      {
        value: 'space',
        label: 'Collaborate from anywhere',
        icon: <SpaceIcon />,
        desc: 'Stay in sync with your team while you’re away from your desk. Always know where everything stands.',
      },
      {
        value: 'doc',
        label: 'Read and edit on the go',
        icon: <DocIcon />,
        desc: 'Stay on top of daily tasks.\nCapture ideas anytime, anywhere.',
      },
      {
        value: 'block',
        label: 'Beautiful content types',
        icon: <ListStart />,
        desc: 'Simple. Fast. Beautiful.\nCommunicate efficiently with rich content types.',
      },
      {
        value: 'database_card_view',
        label: 'Designed and built for Mobile',
        icon: <CardsThree />,
        desc: 'Deep dive into task details with card views. Easily manage database records on the go.',
      },
    ];
  }, []);

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const { start, stop } = useAutoPlay({
    options: tabOptions,
    onChange: setValue,
  });

  useEffect(() => {
    if (!inView) {
      stop();
    } else {
      start();
    }
  }, [inView, start, stop]);

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
        image: DocImage,
      },
      {
        value: 'doc',
        title: tabOptions[3].desc,
        image: ToolbarImage,
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
              <Image loading={'eager'} width={532} height={660} src={panel.image.src} alt={'Mobile View'} />
            </div>
          </TabPanel>
        ))}
      </div>
      <MuiTabs className={'mobile-view-tabs'} orientation={'vertical'} value={value} onChange={handleChange}>
        {tabOptions.map((tab) => (
          <MuiTab
            onClick={() => start()}
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
