'use client';

import Visualize from '@/assets/images/product/Visualize-filter.png';
import Content from '@/assets/images/product/Content-blocks.png';
import Custom from '@/assets/images/product/Customized-themes.png';

import { ChatTexts, CircleThree, Sliders } from '@/components/product/use-cases-icons';
import { TabPanel } from '@/components/shared/tab-panel';
import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useMemo } from 'react';

function UseCases() {
  const [value, setValue] = React.useState('2');
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      {
        value: '1',
        label: 'Visualize & filter',
        icon: <CircleThree />,
      },
      {
        value: '2',
        label: 'Content blocks',
        icon: <Sliders />,
      },
      {
        value: '3',
        label: 'Customized themes',
        icon: <ChatTexts />,
      },
    ];
  }, []);

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  useAutoPlay({
    options: tabOptions,
    onChange: setValue,
    play: inView,
    defaultOption: '2',
  });

  return (
    <div ref={ref} className={'use-cases'}>
      <MuiTabs value={value} onChange={handleChange}>
        {tabOptions.map((tab) => (
          <MuiTab
            className={`use-case-tab ${value === tab.value ? 'selected' : ''}`}
            key={tab.value}
            value={tab.value}
            label={<span className={'tab-label'}>{tab.label}</span>}
            icon={tab.icon}
          />
        ))}
      </MuiTabs>
      <TabPanel value={value} index={'1'}>
        <div className={'tab-panel-title'}>
          <span className={'text-primary'}>Organize and visualize data</span> any way you want
        </div>
        <div className={'tab-panel-image'}>
          <Image loading={'eager'} className={'shadow-img'} src={Visualize} alt={''} width={1040} height={652} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'2'}>
        <div className={'tab-panel-title'}>
          <span className={'text-primary'}>Organize and visualize data</span> any way you want
        </div>
        <div className={'tab-panel-image'}>
          <Image loading={'eager'} className={'shadow-img'} src={Content} alt={''} width={1040} height={652} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'3'}>
        <div className={'tab-panel-title'}>
          <span className={'text-primary'}>Organize and visualize data</span> any way you want
        </div>
        <div className={'tab-panel-image'}>
          <Image loading={'eager'} src={Custom} alt={''} width={1040} height={652} />
        </div>
      </TabPanel>
    </div>
  );
}

export default UseCases;
