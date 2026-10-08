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
        className='mt-[120px] w-full'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
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
