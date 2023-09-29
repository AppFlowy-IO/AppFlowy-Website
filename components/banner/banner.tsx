'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useBanner } from '@/components/banner/banner.hooks';

function Banner() {
  const { show, onClickLearnMore, version } = useBanner();

  if (!show) return null;
  return (
    <motion.div
      className={`banner`}
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{ height: '36px', opacity: 1 }}
    >
      <span>
        {`What's New: `}
        <span className='max-lg:hidden'>AppFlowy launches</span> v{version}
      </span>
      <span className={'mx-2'}>
        <svg xmlns='http://www.w3.org/2000/svg' width='2' height='13' viewBox='0 0 2 13' fill='none'>
          <path opacity='0.4' d='M1 0.5V12.5' stroke='white' />
        </svg>
      </span>
      <span onClick={onClickLearnMore} className={'learn-more-link'}>
        Learn more
        <span className={'ml-1'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='9' height='9' viewBox='0 0 9 9' fill='none'>
            <path d='M1 1H8M8 1V8M8 1L1 8' stroke='white' strokeWidth='1.5' />
          </svg>
        </span>
      </span>
    </motion.div>
  );
}

export default Banner;
