'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import { DesktopComparisonTable } from './desktop-comparison-table';
import { MobileComparisonTable } from './mobile-comparison-table';

interface ComparisonTableProps {
  show: boolean;
}

export function ComparisonTable({ show }: ComparisonTableProps) {
  if (!show) {
    return null;
  }

  return (
    <Tooltip.Provider>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Compare plans title */}
        <div className="text-center py-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1100px] mx-auto">
            <h2 className="font-inter font-medium text-[#101012] text-2xl">
              Compare plans
            </h2>
          </div>
        </div>
        
        {/* Responsive Table Display */}
        <div className="hidden md:block">
          <DesktopComparisonTable />
        </div>
        
        <div className="block md:hidden">
          <MobileComparisonTable />
        </div>
      </motion.div>
    </Tooltip.Provider>
  );
}