'use client';

import AiIcon from '@/components/product/ai-icon';
import BookIcon from '@/components/product/book-icon';
import CalendarIcon from '@/components/product/calendar-icon';
import KanbanIcon from '@/components/product/kanban-icon';
import ProjectsIcon from '@/components/product/projects-icon';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import Image from 'next/image';
import React, { useMemo } from 'react';
import AIImage from '@/assets/images/product/ai.png';

function MainProducts() {
  const [value, setValue] = React.useState('ai');
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      { value: 'ai', label: 'AI', icon: <AiIcon /> },
      { value: 'kanban', label: 'Kanban', icon: <KanbanIcon /> },
      { value: 'wikis', label: 'Wikis', icon: <BookIcon /> },
      { value: 'projects', label: 'Projects', icon: <ProjectsIcon /> },
      { value: 'calendar', label: 'Calendar', icon: <CalendarIcon /> },
    ];
  }, []);
  return (
    <div className={'main-product'}>
      <MuiTabs value={value} onChange={handleChange}>
        {tabOptions.map((tab) => (
          <MuiTab
            className={`product-tab ${value === tab.value ? 'selected' : ''}`}
            key={tab.value}
            value={tab.value}
            label={<span className={'tab-label'}>{tab.label}</span>}
            icon={tab.icon}
          />
        ))}
      </MuiTabs>
      <TabPanel value={value} index={'ai'}>
        <div className={'ai-title'}>
          <span className={'text-primary'}>Supercharge your teams</span> with AI assistance
        </div>
        <div className={'ai-image'}>
          <Image src={AIImage.src} alt={''} width={734} height={496} />
        </div>
      </TabPanel>
    </div>
  );
}

export default MainProducts;

export function TabPanel(props: { children: React.ReactNode; value: string; index: string }) {
  const { children, value, index } = props;

  return (
    <div
      style={{
        display: value === index ? undefined : 'none',
      }}
      className={`tab-panel tab-panel-${index}`}
    >
      {value === index && children}
    </div>
  );
}
