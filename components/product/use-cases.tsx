'use client';

import Visualize from '@/assets/images/product/Visualize-filter.png';
import Content from '@/assets/images/product/Content-blocks.png';
import Custom from '@/assets/images/product/Customized-themes.png';

import { CircleThree, CustomViewsIcon, Sliders } from '@/components/product/use-cases-icons';
import { TabPanel } from '@/components/shared/tab-panel';
import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';

function UseCases() {
  const [value, setValue] = React.useState('2');
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      {
        value: '1',
        label: 'Custom views',
        icon: <CustomViewsIcon />,
      },
      {
        value: '2',
        label: 'Blocks & properties',
        icon: <CircleThree />,
      },
      {
        value: '3',
        label: 'Customization',
        icon: <Sliders />,
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

  return (
    <div ref={ref} className={'use-cases'}>
      <MuiTabs value={value} onChange={handleChange}>
        {tabOptions.map((tab) => (
          <MuiTab
            onClick={() => start()}
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
          <span className={'text-primary'}>Organize and visualize data</span> any way you want.
        </div>
        <div className={'tab-panel-image'}>
          <Image loading={'eager'} className={'shadow-img'} src={Visualize} alt={''} width={1040} height={652} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'2'}>
        <div className={'tab-panel-title'}>
          <span className={'text-primary'}>Beautiful and intuitive</span> content types and data labels.
        </div>
        <div className={'tab-panel-image'}>
          <Image loading={'eager'} className={'shadow-img'} src={Content} alt={''} width={1040} height={652} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'3'}>
        <div className={'tab-panel-title'}>
          <span className={'text-primary'}>Customize themes</span>, fonts, and page styles.
        </div>
        <div className={'tab-panel-image'}>
          <Image loading={'eager'} src={Custom} alt={''} width={1040} height={652} />
        </div>
      </TabPanel>
    </div>
  );
}

export default UseCases;
