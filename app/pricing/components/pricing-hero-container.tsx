'use client';

import React from 'react';
import { DeploymentTabs } from './pricing-tabs';
import { BillingCycleSwitch } from './billing-switch';
import { ComparisonTable } from './comparison-table';
import { usePricingState } from './pricing-state-context';
import { cloudComparisonFeatureGroups, getCloudComparisonPlans } from '../config/cloud-comparison-data';
import { annualSavingsPercent } from '../lib/cloud-pricing';

interface PricingHeroContainerProps {
  children: React.ReactNode;
}

export function PricingHeroContainer({ children }: PricingHeroContainerProps) {
  const { billingCycle, deploymentMode, setBillingCycle, setDeploymentMode, cloudProPricing } = usePricingState();
  const cloudPlans = getCloudComparisonPlans(cloudProPricing);

  return (
    <>
      <section className='pricing-hero relative isolate w-full overflow-hidden bg-white'>
        <div className='pointer-events-none absolute inset-0 overflow-hidden' aria-hidden='true'>
          <div className='absolute left-1/2 top-[120px] h-[520px] w-[800px] -translate-x-1/2 rounded-full bg-[#EAF3FF] opacity-70 blur-[130px]' />
          <div className='absolute left-[72%] top-[480px] h-[700px] w-[700px] rounded-full bg-[#F1F7FF] opacity-60 blur-[150px]' />
        </div>
        <div className='relative z-10 px-4 pb-[60px] pt-[60px] md:px-6 md:pb-[120px] md:pt-20 lg:px-10'>
          <div className='mx-auto w-full max-w-[1100px] text-center'>{children}</div>
          <div className='mt-5 flex justify-center md:mt-10'>
            <DeploymentTabs deploymentMode={deploymentMode} onDeploymentChange={setDeploymentMode} />
          </div>
          <BillingCycleSwitch
            billingCycle={billingCycle}
            onBillingChange={setBillingCycle}
            show={deploymentMode === 'cloud'}
            annualDiscountPercent={annualSavingsPercent(cloudProPricing)}
          />
        </div>
      </section>
      <ComparisonTable
        key={deploymentMode}
        show={true}
        plans={deploymentMode === 'cloud' ? cloudPlans[billingCycle] : undefined}
        featureGroups={deploymentMode === 'cloud' ? cloudComparisonFeatureGroups : undefined}
      />
    </>
  );
}
