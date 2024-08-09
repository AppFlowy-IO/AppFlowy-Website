'use client';
import GetAnswer from '@/assets/images/product/get-answer.png';
import AutomateIcon from '@/components/product/automate-icon';
import GetAnswersIcon from '@/components/product/get-answers-icon';
import { TabPanel } from '@/components/product/main-products';
import WriteBetterIcon from '@/components/product/write-better-icon';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import Image from 'next/image';
import React, { useMemo } from 'react';

function AiExamples() {
  const [value, setValue] = React.useState('get');
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      { value: 'get', label: 'Get answers', icon: <GetAnswersIcon /> },
      { value: 'write', label: 'Write better', icon: <WriteBetterIcon /> },
      { value: 'automate', label: 'Automate work', icon: <AutomateIcon /> },
    ];
  }, []);
  return (
    <div className={'ai-examples'}>
      <MuiTabs value={value} onChange={handleChange}>
        {tabOptions.map((tab) => (
          <MuiTab
            className={`ai-example-tab ${value === tab.value ? 'selected' : ''}`}
            key={tab.value}
            value={tab.value}
            label={<span className={'tab-label'}>{tab.label}</span>}
            icon={tab.icon}
          />
        ))}
      </MuiTabs>
      <TabPanel value={value} index={'get'}>
        <div className={'get-answer-title'}>
          <span className={'text-[#C89AFA]'}>Just ask AI Assistant</span> to generate one of several possible
          context-dependent replies.
        </div>
        <Image src={GetAnswer.src} alt={''} width={734} height={496} />
      </TabPanel>
    </div>
  );
}

export default AiExamples;
