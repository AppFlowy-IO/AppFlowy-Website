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
      <div className='flex items-center gap-1 rounded-full bg-[#EBEBF4] p-1.5 sm:gap-1.5 sm:p-2 md:gap-2 md:p-2 lg:gap-2 lg:p-2 xl:gap-2 xl:p-2'>
        <motion.button
          className={`flex items-center justify-center rounded-full px-4 py-2 transition-all duration-200 select-none touch-manipulation sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-5 lg:py-3 xl:px-5 xl:py-3 ${
            deploymentMode === 'cloud' ? 'bg-white' : 'bg-[#EBEBF4]'
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          onClick={() => onDeploymentChange('cloud')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className={`font-inter text-sm font-semibold leading-[160%] text-[#101012] transition-opacity duration-200 sm:text-sm md:text-base lg:text-base xl:text-base ${
              deploymentMode === 'cloud' ? 'opacity-100' : 'opacity-40'
            }`}
          >
            AppFlowy Cloud
          </span>
        </motion.button>

        <motion.button
          className={`flex items-center justify-center rounded-full px-4 py-2 transition-all duration-200 select-none touch-manipulation sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-5 lg:py-3 xl:px-5 xl:py-3 ${
            deploymentMode === 'self-hosted' ? 'bg-white' : 'bg-[#EBEBF4]'
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          onClick={() => onDeploymentChange('self-hosted')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className={`font-inter text-sm font-semibold leading-[160%] transition-opacity duration-200 sm:text-sm md:text-base lg:text-base xl:text-base ${
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