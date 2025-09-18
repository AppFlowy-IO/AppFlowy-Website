'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="py-8 sm:py-9 md:py-10 lg:py-10 xl:py-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-[1100px] mx-auto">
        <div className="relative flex items-center justify-center">
        {/* Left: Yearly Label with Save 20% Tag */}
        <div className="absolute right-1/2 flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-3 xl:gap-3" style={{ marginRight: '34px' }}>
          <AnimatePresence>
            {billingCycle === 'yearly' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center px-1.5 py-1 sm:px-2 sm:py-1 md:px-2 md:py-1 lg:px-2 lg:py-1 xl:px-2 xl:py-1 rounded-md bg-[rgba(200,154,250,0.20)]"
              >
                <span className="text-[#8427E0] font-inter font-medium leading-[150%] text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs whitespace-nowrap">
                  Save 20%
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={() => onBillingChange('yearly')}
            className="transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <span className={`font-inter font-medium leading-[160%] text-sm sm:text-base md:text-base lg:text-base xl:text-base transition-all duration-200 whitespace-nowrap ${
              billingCycle === 'yearly' 
                ? 'text-[#9327FF]' 
                : 'text-[#101012] opacity-40'
            }`}>
              Yearly
            </span>
          </button>
        </div>

        {/* Center: Switch Component - Absolutely centered */}
        <button 
          onClick={toggleBilling}
          className="relative z-10 flex-shrink-0 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <motion.div
            className={`flex items-center p-0.5 sm:p-0.5 md:p-0.5 lg:p-0.5 xl:p-0.5 rounded-full transition-colors duration-300 ${
              billingCycle === 'yearly' ? 'bg-[#8427E0]' : 'bg-[#000]'
            }`}
            style={{ width: '44px', height: '26px' }}
          >
            <motion.div
              className="bg-white rounded-full"
              style={{ width: '20px', height: '20px' }}
              animate={{
                x: billingCycle === 'yearly' ? '3px' : '21px'
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            />
          </motion.div>
        </button>

        {/* Right: Monthly Label */}
        <div className="absolute left-1/2" style={{ marginLeft: '34px' }}>
          <button
            onClick={() => onBillingChange('monthly')}
            className="transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <span className={`font-inter font-medium leading-[160%] text-sm sm:text-base md:text-base lg:text-base xl:text-base transition-all duration-200 whitespace-nowrap ${
              billingCycle === 'monthly' 
                ? 'text-[#101012]' 
                : 'text-[#101012] opacity-40'
            }`}>
              Monthly
            </span>
          </button>
        </div>
      </div>
      </div>
    </motion.div>
  );
}