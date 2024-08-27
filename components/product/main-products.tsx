'use client';

import AIImage from '@/assets/images/product/ai.png';
import Grid from '@/assets/images/product/Grid.png';
import Sites from '@/assets/images/product/sites.png';
import Tasks from '@/assets/images/product/tasks.png';
import Templates from '@/assets/images/product/template.png';
import Website from '@/components/icons/website';
import AiIcon from '@/components/product/ai-icon';
import CalendarIcon from '@/components/product/calendar-icon';
import KanbanIcon from '@/components/product/kanban-icon';
import ProjectsIcon from '@/components/product/projects-icon';
import { TabPanel } from '@/components/shared/tab-panel';
import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';

function MainProducts() {
  const [value, setValue] = React.useState('tasks');
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

  return (
    <div ref={ref} className={'main-product'}>
      <MuiTabs value={value} onChange={handleChange}>
        {tabOptions.map((tab) => (
          <MuiTab
            onClick={() => start()}
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
          <Image src={AIImage.src} loading={'eager'} className={'object-cover'} alt={''} width={1024} height={648} />
        </div>
      </TabPanel>

      <TabPanel value={value} index={'projects'}>
        <div className={'ai-image'}>
          <Image src={Grid.src} loading={'eager'} className={'object-cover'} alt={''} width={1024} height={652} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'tasks'}>
        <div className={'ai-image'}>
          <Image src={Tasks.src} priority={true} className={'object-cover'} alt={''} width={1024} height={648} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'templates'}>
        <div className={'ai-image'}>
          <Image src={Templates.src} loading={'eager'} className={'object-cover'} alt={''} width={1024} height={648} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'sites'}>
        <div className={'ai-image'}>
          <Image src={Sites.src} loading={'eager'} className={'object-cover'} alt={''} width={1024} height={648} />
        </div>
      </TabPanel>
    </div>
  );
}

export default MainProducts;
