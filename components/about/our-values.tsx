'use client';
import React from 'react';
import { aboutPageConfig } from '@/lib/config/pages';
import ValueItem from '@/components/about/value-item';

function OurValues() {
  return (
    <div className={'our-values-panel'}>
      <div className={'title'}>
        {aboutPageConfig.ourValuesTitle}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 251 19' fill='none'>
            <path
              d='M248.856 13.9724C181.017 6.84029 133.594 -2.95915 22.2285 5.23773C19.8194 5.41505 19.7308 8.82335 22.1317 9.08995L93.8764 17.0566C50.0473 10.2341 26.0864 10.2301 2.19853 13.8939'
              stroke='#9327FF'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </div>
      </div>
      <div className={'values'}>
        {aboutPageConfig.values.map((item, index) => (
          <ValueItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default OurValues;
