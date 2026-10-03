'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import { DesktopComparisonTable } from './desktop-comparison-table';
import { MobileComparisonTable } from './mobile-comparison-table';
import {
  comparisonFeatureGroups,
  comparisonPlans,
  type ComparisonFeatureGroup,
  type ComparisonPlan,
} from '../config/comparison-data';

interface ComparisonTableProps {
  show: boolean;
  plans?: ComparisonPlan[];
  featureGroups?: ComparisonFeatureGroup[];
}

export function ComparisonTable({
  show,
  plans = comparisonPlans,
  featureGroups = comparisonFeatureGroups,
}: ComparisonTableProps) {
  if (!show) {
    return null;
  }

  return (
    <Tooltip.Provider delayDuration={300} skipDelayDuration={300}>
      <motion.div
        className='w-full'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Compare plans title */}
        <div className='mx-auto w-full max-w-screen-xl px-4 py-10 text-center sm:px-6 lg:px-8'>
          <div className='mx-auto w-full max-w-[1100px]'>
            <h2 className='font-inter text-2xl font-medium text-[#101012]'>Compare plans</h2>
          </div>
        </div>

        {/* Responsive Table Display */}
        <div className='hidden md:block'>
          <DesktopComparisonTable plans={plans} featureGroups={featureGroups} />
        </div>

        <div className='block md:hidden'>
          <MobileComparisonTable plans={plans} featureGroups={featureGroups} />
        </div>
      </motion.div>
    </Tooltip.Provider>
  );
}
