'use client';

import { TabPanel } from '@/components/product/main-products';
import {
  AppWindow,
  CardsThree,
  ChatTeardrop,
  DocIcon,
  HomeIcon,
  ListStart,
  SearchIcon,
} from '@/components/product/mobile-views-icons';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import Image from 'next/image';
import React, { useMemo } from 'react';
import HomeImage from '@/assets/images/product/home.png';
import DocImage from '@/assets/images/product/doc.png';
import SearchImage from '@/assets/images/product/search.png';
import KanbanImage from '@/assets/images/product/kanban.png';
import DatabaseFieldTypesImage from '@/assets/images/product/database_field_types.png';
import DatabaseCardViewImage from '@/assets/images/product/database_card_view.png';
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
        value: 'search',
        label: 'Search',
        icon: <SearchIcon />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
      {
        value: 'doc',
        label: 'Doc',
        icon: <DocIcon />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
      {
        value: 'kanban',
        label: 'Kanban card',
        icon: <AppWindow />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
      {
        value: 'database_field_types',
        label: 'Database field types',
        icon: <ListStart />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
      {
        value: 'database_card_view',
        label: 'Database card view',
        icon: <CardsThree />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
      {
        value: 'ai_chat',
        label: 'AI chat',
        icon: <ChatTeardrop />,
        desc: 'Customize the project for yourself and invite your colleagues to join in.',
      },
    ];
  }, []);

  const panels = useMemo(() => {
    return [
      {
        value: 'home',
        title: tabOptions[0].desc,
        bgColor: '#E7F5FF',
        image: HomeImage,
      },
      {
        value: 'search',
        title: tabOptions[1].desc,
        bgColor: '#FFF5F5',
        image: SearchImage,
      },
      {
        value: 'doc',
        title: tabOptions[2].desc,
        bgColor: '#FFF9DB',
        image: DocImage,
      },
      {
        value: 'kanban',
        title: tabOptions[3].desc,
        bgColor: '#FFF0F6',
        image: KanbanImage,
      },
      {
        value: 'database_field_types',
        title: tabOptions[4].desc,
        bgColor: '#FFF4E6',
        image: DatabaseFieldTypesImage,
      },
      {
        value: 'database_card_view',
        title: tabOptions[5].desc,
        bgColor: '#F3F0FF',
        image: DatabaseCardViewImage,
      },
      {
        value: 'ai_chat',
        title: tabOptions[6].desc,
        bgColor: '#EBFBEE',
        image: AiChatImage,
      },
    ];
  }, [tabOptions]);

  return (
    <div className={'mobile-views'}>
      <div className={'mobile-view-panels'}>
        {panels.map((panel) => (
          <TabPanel key={panel.value} index={panel.value} value={value}>
            <div className={'tab-panel-title'}>{panel.title}</div>
            <div className={'tab-panel-content'} style={{ backgroundColor: panel.bgColor }}>
              <div className={'tab-panel-image'}>
                <Image width={228} height={494} src={panel.image.src} alt={''} />
              </div>
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
