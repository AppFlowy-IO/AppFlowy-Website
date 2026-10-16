'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type DeploymentMode = 'cloud' | 'self-hosted';

interface DeploymentTabsProps {
  deploymentMode: DeploymentMode;
  onDeploymentChange: (mode: DeploymentMode) => void;
}

export function DeploymentTabs({ deploymentMode, onDeploymentChange }: DeploymentTabsProps) {
  const reduceMotion = useReducedMotion();
  const isCloud = deploymentMode === 'cloud';

  return (
    <div className='flex justify-center'>
      <div className='relative isolate flex h-14 w-[310px] max-w-[calc(100vw-32px)] items-center gap-1 rounded-full border border-[#E6E6E6] bg-white p-1'>
        <motion.div
          aria-hidden='true'
          className='pointer-events-none absolute left-1 top-1/2 -z-10 h-12 overflow-hidden rounded-full bg-[#140F28]'
          style={{ marginTop: -24 }}
          initial={false}
          animate={{ x: isCloud ? 0 : 170, width: isCloud ? 166 : 132 }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 35 }}
        >
          <motion.div
            className='absolute inset-0 bg-gradient-to-r from-[#4AAEFF] to-[#6F44FE]'
            initial={false}
            animate={{ opacity: isCloud ? 0 : 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          />
        </motion.div>
        <motion.button
          type='button'
          aria-pressed={isCloud}
          className='flex h-12 w-[166px] flex-shrink-0 touch-manipulation select-none items-center justify-center rounded-full bg-transparent px-3 sm:px-5'
          style={{ WebkitTapHighlightColor: 'transparent' }}
          onClick={() => onDeploymentChange('cloud')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className={`whitespace-nowrap font-inter text-base font-medium leading-6 transition-colors duration-200 ${
              deploymentMode === 'cloud' ? 'text-white' : 'text-[#140F28]'
            }`}
          >
            AppFlowy Cloud
          </span>
        </motion.button>

        <motion.button
          type='button'
          aria-pressed={!isCloud}
          className='flex h-12 w-[132px] flex-shrink-0 touch-manipulation select-none items-center justify-center rounded-full bg-transparent px-3 sm:px-5'
          style={{ WebkitTapHighlightColor: 'transparent' }}
          onClick={() => onDeploymentChange('self-hosted')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className={`whitespace-nowrap font-inter text-base font-medium leading-6 transition-colors duration-200 ${
              deploymentMode === 'self-hosted' ? 'text-white' : 'text-[#140F28]'
            }`}
          >
            Self-Hosted
          </span>
        </motion.button>
      </div>
    </div>
  );
}
