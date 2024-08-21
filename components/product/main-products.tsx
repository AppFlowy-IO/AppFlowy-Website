'use client';

import Website from '@/components/icons/website';
import AiIcon from '@/components/product/ai-icon';
import CalendarIcon from '@/components/product/calendar-icon';
import KanbanIcon from '@/components/product/kanban-icon';
import ProjectsIcon from '@/components/product/projects-icon';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import Image from 'next/image';
import React, { useMemo } from 'react';
import AIImage from '@/assets/images/product/ai.png';
import Grid from '@/assets/images/product/Grid.png';
import Tasks from '@/assets/images/product/tasks.png';
import Templates from '@/assets/images/product/template.png';
import Sites from '@/assets/images/product/sites.png';

function MainProducts() {
  const [value, setValue] = React.useState('ai');
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      { value: 'ai', label: 'AI', icon: <AiIcon /> },
      { value: 'projects', label: 'Projects', icon: <ProjectsIcon /> },
      { value: 'tasks', label: 'Tasks', icon: <KanbanIcon /> },
      { value: 'templates', label: 'Templates', icon: <CalendarIcon /> },
      { value: 'sites', label: 'Sites', icon: <Website /> },
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
        <div className={'ai-image'}>
          <Image src={AIImage.src} className={'object-cover'} alt={''} width={1040} height={648} />
        </div>
      </TabPanel>

      <TabPanel value={value} index={'projects'}>
        <div className={'ai-image'}>
          <Image src={Grid.src} className={'object-cover'} alt={''} width={1040} height={652} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'tasks'}>
        <div className={'ai-image'}>
          <Image src={Tasks.src} className={'object-cover'} alt={''} width={1040} height={648} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'templates'}>
        <div className={'ai-image'}>
          <Image src={Templates.src} className={'object-cover'} alt={''} width={1040} height={648} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'sites'}>
        <div className={'ai-image'}>
          <Image src={Sites.src} className={'object-cover'} alt={''} width={1040} height={648} />
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
