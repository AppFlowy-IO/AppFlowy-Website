'use client';

import React from 'react';
import { DeploymentTabs } from './pricing-tabs';
import { BillingCycleSwitch } from './billing-switch';
import { ComparisonTable } from './comparison-table';
import { usePricingState } from './pricing-state-context';
import {
  cloudComparisonFeatureGroups,
  cloudComparisonPlansByBillingCycle,
} from '../config/cloud-comparison-data';

interface PricingHeroContainerProps {
  children: React.ReactNode;
}

export function PricingHeroContainer({ children }: PricingHeroContainerProps) {
  const { billingCycle, deploymentMode, setBillingCycle, setDeploymentMode } = usePricingState();

  return (
    <section className='w-full'>
      <div className="text-center">
        {/* Content that needs 1100px max-width and horizontal padding */}
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1100px] mx-auto">
            {children}
          </div>
        </div>
        
        {/* Deployment Mode Tabs */}
        <div className="mt-10">
          <DeploymentTabs 
            deploymentMode={deploymentMode}
            onDeploymentChange={setDeploymentMode}
          />
        </div>

        <BillingCycleSwitch
          billingCycle={billingCycle}
          onBillingChange={setBillingCycle}
          show={deploymentMode === 'cloud'}
        />

        <ComparisonTable
          key={deploymentMode}
          show={true}
          plans={deploymentMode === 'cloud' ? cloudComparisonPlansByBillingCycle[billingCycle] : undefined}
          featureGroups={deploymentMode === 'cloud' ? cloudComparisonFeatureGroups : undefined}
        />
      </div>
    </section>
  );
}
