'use client';

import React from 'react';
import { DeploymentTabs } from './pricing-tabs';
import { BillingCycleSwitch } from './billing-switch';
import { ComparisonTable } from './comparison-table';
import { usePricingState } from './pricing-state-context';
import { cloudComparisonFeatureGroups, cloudComparisonPlansByBillingCycle } from '../config/cloud-comparison-data';

interface PricingHeroContainerProps {
  children: React.ReactNode;
}

export function PricingHeroContainer({ children }: PricingHeroContainerProps) {
  const { billingCycle, deploymentMode, setBillingCycle, setDeploymentMode } = usePricingState();

  return (
    <>
      <section className='pricing-hero relative isolate w-full overflow-hidden bg-white'>
        <div className='pointer-events-none absolute inset-0 overflow-hidden' aria-hidden='true'>
          <div className='absolute left-1/2 top-[120px] h-[520px] w-[800px] -translate-x-1/2 rounded-full bg-[#F6F4FF] opacity-70 blur-[130px]' />
          <div className='absolute left-[72%] top-[480px] h-[700px] w-[700px] rounded-full bg-[#F4F1FF] opacity-60 blur-[150px]' />
        </div>
        <div className='relative z-10 px-4 pb-20 pt-16 sm:px-6 sm:pb-[120px] sm:pt-20 lg:px-10'>
          <div className='mx-auto w-full max-w-[1100px] text-center'>{children}</div>
          <div className='mt-10 flex justify-center'>
            <DeploymentTabs deploymentMode={deploymentMode} onDeploymentChange={setDeploymentMode} />
          </div>
          <BillingCycleSwitch
            billingCycle={billingCycle}
            onBillingChange={setBillingCycle}
            show={deploymentMode === 'cloud'}
          />
        </div>
      </section>
      <ComparisonTable
        key={deploymentMode}
        show={true}
        plans={deploymentMode === 'cloud' ? cloudComparisonPlansByBillingCycle[billingCycle] : undefined}
        featureGroups={deploymentMode === 'cloud' ? cloudComparisonFeatureGroups : undefined}
      />
    </>
  );
}
