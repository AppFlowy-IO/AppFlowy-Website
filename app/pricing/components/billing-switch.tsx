'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type BillingCycle = 'yearly' | 'monthly';

interface BillingCycleSwitchProps {
  billingCycle: BillingCycle;
  onBillingChange: (cycle: BillingCycle) => void;
  show: boolean;
}

export function BillingCycleSwitch({ billingCycle, onBillingChange, show }: BillingCycleSwitchProps) {
  const toggleBilling = () => {
    onBillingChange(billingCycle === 'yearly' ? 'monthly' : 'yearly');
  };

  if (!show) {
    return null;
  }

  return (
    <motion.div
      className='mx-auto w-full max-w-screen-xl px-4 pt-10 sm:px-6 lg:px-8'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex items-center justify-center gap-5'>
        <div className='flex items-center gap-3'>
          <div className='flex shrink-0 items-center justify-center rounded-[4px] bg-[rgba(141,66,203,0.1)] px-[6px] py-1'>
            <span className='whitespace-nowrap font-inter text-[10px] font-semibold leading-3 text-[#8D42CB]'>
              Save 20%
            </span>
          </div>
          <button
            type='button'
            aria-pressed={billingCycle === 'yearly'}
            onClick={() => onBillingChange('yearly')}
            className='touch-manipulation select-none whitespace-nowrap font-inter text-sm leading-5 transition-colors duration-200'
            style={{
              color: billingCycle === 'yearly' ? '#854CFF' : '#AAA',
              fontWeight: billingCycle === 'yearly' ? 700 : 400,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            Yearly
          </button>
        </div>

        <button
          type='button'
          aria-label={`Switch to ${billingCycle === 'yearly' ? 'monthly' : 'yearly'} billing`}
          aria-pressed={billingCycle === 'monthly'}
          onClick={toggleBilling}
          className='flex h-5 w-11 shrink-0 touch-manipulation items-center rounded-full bg-[#854CFF] p-0.5'
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <motion.span
            className='block h-4 w-7 shrink-0 rounded-full bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
            animate={{ x: billingCycle === 'yearly' ? 0 : 12 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>

        <button
          type='button'
          aria-pressed={billingCycle === 'monthly'}
          onClick={() => onBillingChange('monthly')}
          className='w-[108px] touch-manipulation select-none text-left font-inter text-sm leading-5 transition-colors duration-200'
          style={{
            color: billingCycle === 'monthly' ? '#854CFF' : '#AAA',
            fontWeight: billingCycle === 'monthly' ? 700 : 400,
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          Monthly
        </button>
      </div>
    </motion.div>
  );
}
