'use client';

import { TabPanel } from '@/components/shared/tab-panel';
import { Tick } from '@/components/v2/pricing/icons';
import { monthlyPrice, yearlyPrice } from '@/components/v2/pricing/price-config';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';

function Prices() {
  const [value, setValue] = React.useState('yearly');
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      {
        value: 'yearly',
        label: (
          <div className={'flex items-center gap-2'}>
            <span>Yearly</span>
            <svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'>
              <path
                d='M4.83824 0.106982C4.89891 -0.0356604 5.10109 -0.0356606 5.16176 0.106981L5.74139 1.46983C6.27529 2.72514 7.27486 3.72471 8.53017 4.25861L9.89302 4.83824C10.0357 4.89891 10.0357 5.10109 9.89302 5.16176L8.53017 5.74139C7.27486 6.27529 6.27529 7.27486 5.74139 8.53017L5.16176 9.89302C5.10109 10.0357 4.89891 10.0357 4.83824 9.89302L4.25861 8.53017C3.72471 7.27486 2.72514 6.27529 1.46983 5.74139L0.106982 5.16176C-0.0356604 5.10109 -0.0356606 4.89891 0.106981 4.83824L1.46983 4.25861C2.72514 3.72471 3.72471 2.72514 4.25861 1.46983L4.83824 0.106982Z'
                fill='#8427E0'
              />
            </svg>
            <span>SAVE 25%</span>
          </div>
        ),
      },
      {
        value: 'monthly',
        label: 'Monthly',
      },
    ];
  }, []);

  const renderPrice = useCallback(
    (item: {
      label: string;
      desc: string;
      price: string;
      duration: string;
      contentTitle: string;
      content: string[];
      isMostPopular?: boolean;
    }) => {
      return (
        <div className={`price ${item.isMostPopular ? 'most-popular' : ''}`}>
          <div className={'flex flex-col gap-2'}>
            <div className={'price-label'}>{item.label}</div>
            <div className={'price-desc'}>{item.desc}</div>
          </div>
          <div className={'flex flex-col gap-2'}>
            <div className={'price-num'}>{item.price}</div>
            <div className={'price-duration'}>{item.duration}</div>
          </div>
          <Link href={'/download'} className={'w-full'}>
            <button className={`get-started-btn w-full`}>Get Started</button>
          </Link>
          <div className={'flex flex-col gap-2'}>
            {item.contentTitle && <div className={'price-content-title'}>{item.contentTitle}</div>}
            {item.content.map((content, index) => (
              <div key={index} className={'price-content-item'}>
                <Tick />
                <div className={'flex-1 whitespace-pre-wrap break-words'}>{content}</div>
              </div>
            ))}
          </div>
        </div>
      );
    },
    []
  );

  return (
    <div className={'prices flex flex-col gap-5'}>
      <div className={'mb-4 flex items-end justify-between gap-4 max-sm:items-center'}>
        <MuiTabs value={value} onChange={handleChange}>
          {tabOptions.map((tab) => (
            <MuiTab
              className={`pricing-tab ${value === tab.value ? 'selected' : ''}`}
              key={tab.value}
              value={tab.value}
              label={<span className={'tab-label'}>{tab.label}</span>}
            />
          ))}
        </MuiTabs>
        <div className={'text-base max-sm:text-xs'}>
          Prices in <span className={'font-bold'}>$ USD</span>
        </div>
      </div>
      <TabPanel value={value} index={'yearly'}>
        {renderPrice(yearlyPrice[0])}
        {renderPrice(yearlyPrice[1])}
      </TabPanel>
      <TabPanel value={value} index={'monthly'}>
        {renderPrice(monthlyPrice[0])}
        {renderPrice(monthlyPrice[1])}
      </TabPanel>
    </div>
  );
}

export default Prices;
