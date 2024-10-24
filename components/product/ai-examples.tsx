'use client';
import GetAnswer from '@/assets/images/product/get-answer.png';
import WriteBetter from '@/assets/images/product/write-better.png';
import AutofillTables from '@/assets/images/product/autofill-tables.png';
import AutomateIcon from '@/components/product/automate-icon';
import GetAnswersIcon from '@/components/product/get-answers-icon';
import WriteBetterIcon from '@/components/product/write-better-icon';
import { TabPanel } from '@/components/shared/tab-panel';
import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';

function AiExamples() {
  const [value, setValue] = React.useState('write');
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      { value: 'get', label: 'Get answers', icon: <GetAnswersIcon /> },
      { value: 'write', label: 'Write better', icon: <WriteBetterIcon /> },
      { value: 'auto', label: 'Autofill tables', icon: <AutomateIcon /> },
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
    <div ref={ref} className={'ai-examples'}>
      <MuiTabs value={value} onChange={handleChange}>
        {tabOptions.map((tab) => (
          <MuiTab
            onClick={() => start()}
            className={`ai-example-tab ${value === tab.value ? 'selected' : ''}`}
            key={tab.value}
            value={tab.value}
            label={<span className={'tab-label'}>{tab.label}</span>}
            icon={tab.icon}
          />
        ))}
      </MuiTabs>
      <TabPanel value={value} index={'get'}>
        <div className={'panel-title'}>
          Ask AI to
          <span className={'text-[#C89AFA]'}> unblock your work</span>, {`\nfind answers, and get inspiration.`}
        </div>
        <div className={'panel-image'}>
          <Image
            loading={'eager'}
            src={GetAnswer.src}
            width={1040}
            height={648}
            alt={'Get answers, find inspiration, and unblock your work'}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'write'}>
        <div className={'panel-title'}>
          Get rid of blank pages, improve writing, and brainstorm ideas—
          <span className={'text-[#C89AFA]'}>all without switching tools.</span>
        </div>
        <div className={'panel-image'}>
          <Image
            loading={'eager'}
            src={WriteBetter}
            alt={'Write better, brainstorm ideas, and improve writing'}
            width={1040}
            height={648}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={'auto'}>
        <div className={'panel-title'}>
          <span className={'text-[#C89AFA]'}>Never write progress updates again.</span> Turn databases of any size into
          actionable insights.
        </div>
        <div className={'panel-image'}>
          <Image
            loading={'eager'}
            src={AutofillTables}
            alt={'Autofill tables and turn databases into actionable insights'}
            width={1040}
            height={648}
          />
        </div>
      </TabPanel>
    </div>
  );
}

export default AiExamples;
