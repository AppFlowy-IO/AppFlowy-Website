'use client';

import Image1 from '@/assets/images/product/use-case-1.png';

import { TabPanel } from '@/components/product/main-products';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import Image from 'next/image';
import React, { useMemo } from 'react';

function UseCases() {
  const [value, setValue] = React.useState('1');
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const tabOptions = useMemo(() => {
    return [
      {
        value: '1',
        label: 'Visualize & filter',
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M10.5 2.8125C9.11929 2.8125 8 3.93179 8 5.3125C8 6.69321 9.11929 7.8125 10.5 7.8125C11.8807 7.8125 13 6.69321 13 5.3125C13 3.93179 11.8807 2.8125 10.5 2.8125ZM6.75 5.3125C6.75 3.24143 8.42893 1.5625 10.5 1.5625C12.5711 1.5625 14.25 3.24143 14.25 5.3125C14.25 7.38357 12.5711 9.0625 10.5 9.0625C8.42893 9.0625 6.75 7.38357 6.75 5.3125Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M15.1875 10.9375C13.8068 10.9375 12.6875 12.0568 12.6875 13.4375C12.6875 14.8182 13.8068 15.9375 15.1875 15.9375C16.5682 15.9375 17.6875 14.8182 17.6875 13.4375C17.6875 12.0568 16.5682 10.9375 15.1875 10.9375ZM11.4375 13.4375C11.4375 11.3664 13.1164 9.6875 15.1875 9.6875C17.2586 9.6875 18.9375 11.3664 18.9375 13.4375C18.9375 15.5086 17.2586 17.1875 15.1875 17.1875C13.1164 17.1875 11.4375 15.5086 11.4375 13.4375Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M5.8125 10.9375C4.43179 10.9375 3.3125 12.0568 3.3125 13.4375C3.3125 14.8182 4.43179 15.9375 5.8125 15.9375C7.19321 15.9375 8.3125 14.8182 8.3125 13.4375C8.3125 12.0568 7.19321 10.9375 5.8125 10.9375ZM2.0625 13.4375C2.0625 11.3664 3.74143 9.6875 5.8125 9.6875C7.88357 9.6875 9.5625 11.3664 9.5625 13.4375C9.5625 15.5086 7.88357 17.1875 5.8125 17.1875C3.74143 17.1875 2.0625 15.5086 2.0625 13.4375Z'
              fill='currentColor'
            />
          </svg>
        ),
      },
      {
        value: '2',
        label: 'Customize the info',
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M10.5 7.8125C10.8452 7.8125 11.125 8.09232 11.125 8.4375V16.875C11.125 17.2202 10.8452 17.5 10.5 17.5C10.1548 17.5 9.875 17.2202 9.875 16.875V8.4375C9.875 8.09232 10.1548 7.8125 10.5 7.8125Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M10.5 2.5C10.8452 2.5 11.125 2.77982 11.125 3.125V5.3125C11.125 5.65768 10.8452 5.9375 10.5 5.9375C10.1548 5.9375 9.875 5.65768 9.875 5.3125V3.125C9.875 2.77982 10.1548 2.5 10.5 2.5Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M10.5 5.9375C9.98223 5.9375 9.5625 6.35723 9.5625 6.875C9.5625 7.39277 9.98223 7.8125 10.5 7.8125C11.0178 7.8125 11.4375 7.39277 11.4375 6.875C11.4375 6.35723 11.0178 5.9375 10.5 5.9375ZM8.3125 6.875C8.3125 5.66688 9.29188 4.6875 10.5 4.6875C11.7081 4.6875 12.6875 5.66688 12.6875 6.875C12.6875 8.08312 11.7081 9.0625 10.5 9.0625C9.29188 9.0625 8.3125 8.08312 8.3125 6.875Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M16.125 14.0625C16.4702 14.0625 16.75 14.3423 16.75 14.6875V16.875C16.75 17.2202 16.4702 17.5 16.125 17.5C15.7798 17.5 15.5 17.2202 15.5 16.875V14.6875C15.5 14.3423 15.7798 14.0625 16.125 14.0625Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M16.125 2.5C16.4702 2.5 16.75 2.77982 16.75 3.125V11.5625C16.75 11.9077 16.4702 12.1875 16.125 12.1875C15.7798 12.1875 15.5 11.9077 15.5 11.5625V3.125C15.5 2.77982 15.7798 2.5 16.125 2.5Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M16.125 12.1875C15.6072 12.1875 15.1875 12.6072 15.1875 13.125C15.1875 13.6428 15.6072 14.0625 16.125 14.0625C16.6428 14.0625 17.0625 13.6428 17.0625 13.125C17.0625 12.6072 16.6428 12.1875 16.125 12.1875ZM13.9375 13.125C13.9375 11.9169 14.9169 10.9375 16.125 10.9375C17.3331 10.9375 18.3125 11.9169 18.3125 13.125C18.3125 14.3331 17.3331 15.3125 16.125 15.3125C14.9169 15.3125 13.9375 14.3331 13.9375 13.125Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.875 11.5625C5.22018 11.5625 5.5 11.8423 5.5 12.1875V16.875C5.5 17.2202 5.22018 17.5 4.875 17.5C4.52982 17.5 4.25 17.2202 4.25 16.875V12.1875C4.25 11.8423 4.52982 11.5625 4.875 11.5625Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.875 2.5C5.22018 2.5 5.5 2.77982 5.5 3.125V9.0625C5.5 9.40768 5.22018 9.6875 4.875 9.6875C4.52982 9.6875 4.25 9.40768 4.25 9.0625V3.125C4.25 2.77982 4.52982 2.5 4.875 2.5Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4.875 9.6875C4.35723 9.6875 3.9375 10.1072 3.9375 10.625C3.9375 11.1428 4.35723 11.5625 4.875 11.5625C5.39277 11.5625 5.8125 11.1428 5.8125 10.625C5.8125 10.1072 5.39277 9.6875 4.875 9.6875ZM2.6875 10.625C2.6875 9.41688 3.66688 8.4375 4.875 8.4375C6.08312 8.4375 7.0625 9.41688 7.0625 10.625C7.0625 11.8331 6.08312 12.8125 4.875 12.8125C3.66688 12.8125 2.6875 11.8331 2.6875 10.625Z'
              fill='currentColor'
            />
          </svg>
        ),
      },
      {
        value: '3',
        label: 'Communicate any idea',
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' width='21' height='20' viewBox='0 0 21 20' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2.74114 4.11612C2.97556 3.8817 3.2935 3.75 3.62502 3.75H17.375C17.7065 3.75 18.0245 3.8817 18.2589 4.11612C18.4933 4.35054 18.625 4.66848 18.625 5V15C18.625 15.3315 18.4933 15.6495 18.2589 15.8839C18.0245 16.1183 17.7065 16.25 17.375 16.25H6.98944L6.90829 16.2785L4.42192 18.3643C4.23982 18.515 4.0187 18.611 3.78425 18.6411C3.5498 18.6712 3.31162 18.6342 3.09734 18.5345C2.88306 18.4347 2.70146 18.2762 2.57361 18.0774C2.44577 17.8786 2.37691 17.6476 2.37504 17.4112L2.375 17.4062L2.37502 5C2.37502 4.66848 2.50672 4.35054 2.74114 4.11612ZM17.375 5L3.62502 5V17.4013L6.19208 15.2477C6.24972 15.1994 6.31561 15.1618 6.38659 15.1369L6.67565 15.0353C6.74222 15.0119 6.81227 15 6.88283 15H17.375V5Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7.375 8.75C7.375 8.40482 7.65482 8.125 8 8.125H13C13.3452 8.125 13.625 8.40482 13.625 8.75C13.625 9.09518 13.3452 9.375 13 9.375H8C7.65482 9.375 7.375 9.09518 7.375 8.75Z'
              fill='currentColor'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7.375 11.25C7.375 10.9048 7.65482 10.625 8 10.625H13C13.3452 10.625 13.625 10.9048 13.625 11.25C13.625 11.5952 13.3452 11.875 13 11.875H8C7.65482 11.875 7.375 11.5952 7.375 11.25Z'
              fill='currentColor'
            />
          </svg>
        ),
      },
    ];
  }, []);

  return (
    <div className={'use-cases'}>
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
          <Image src={Image1.src} alt={''} width={734} height={496} />
        </div>
      </TabPanel>
    </div>
  );
}

export default UseCases;
