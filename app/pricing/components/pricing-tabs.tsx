'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type DeploymentMode = 'cloud' | 'self-hosted';

interface DeploymentTabsProps {
  deploymentMode: DeploymentMode;
  onDeploymentChange: (mode: DeploymentMode) => void;
}

export function DeploymentTabs({ deploymentMode, onDeploymentChange }: DeploymentTabsProps) {
  return (
    <div className='flex justify-center'>
      <div className='flex h-14 w-[310px] max-w-[calc(100vw-32px)] items-center gap-1 rounded-full border border-[#E6E6E6] bg-white p-1'>
        <motion.button
          className={`flex h-12 w-[166px] flex-shrink-0 touch-manipulation select-none items-center justify-center rounded-full px-3 transition-all duration-200 sm:px-5 ${
            deploymentMode === 'cloud' ? 'bg-[#140F28]' : 'bg-white'
          }`}
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
          className={`flex h-12 w-[132px] flex-shrink-0 touch-manipulation select-none items-center justify-center rounded-full px-3 transition-all duration-200 sm:px-5 ${
            deploymentMode === 'self-hosted' ? 'bg-gradient-to-r from-[#4AAEFF] to-[#6F44FE]' : 'bg-white'
          }`}
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
