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
      <div className='flex h-14 w-[310px] items-center gap-1 rounded-full bg-[#EBEBF4] p-1'>
        <motion.button
          className={`flex h-12 w-[166px] touch-manipulation select-none items-center justify-center rounded-full px-4 transition-all duration-200 ${
            deploymentMode === 'cloud' ? 'bg-white' : 'bg-[#EBEBF4]'
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          onClick={() => onDeploymentChange('cloud')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className={`font-inter text-base font-semibold leading-6 text-[#101012] transition-opacity duration-200 ${
              deploymentMode === 'cloud' ? 'opacity-100' : 'opacity-40'
            }`}
          >
            AppFlowy Cloud
          </span>
        </motion.button>

        <motion.button
          className={`flex h-12 w-[132px] touch-manipulation select-none items-center justify-center rounded-full px-4 transition-all duration-200 ${
            deploymentMode === 'self-hosted' ? 'bg-white' : 'bg-[#EBEBF4]'
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          onClick={() => onDeploymentChange('self-hosted')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className={`font-inter text-base font-semibold leading-6 transition-opacity duration-200 ${
              deploymentMode === 'self-hosted'
                ? 'bg-gradient-to-r from-[#00B5FF] to-[#9225FF] bg-clip-text text-transparent opacity-100'
                : 'text-[#101012] opacity-40'
            }`}
          >
            Self-Hosted
          </span>
        </motion.button>
      </div>
    </div>
  );
}
