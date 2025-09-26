'use client';

import React from 'react';
import { DeploymentTabs } from './pricing-tabs';
import { BillingCycleSwitch } from './billing-switch';
import { PricingCards } from './pricing-cards';
import { ComparisonTable } from './comparison-table';
import { usePricingState } from './pricing-state-context';

interface PricingHeroContainerProps {
  children: React.ReactNode;
}

export function PricingHeroContainer({ children }: PricingHeroContainerProps) {
  const { deploymentMode, setDeploymentMode, billingCycle, setBillingCycle } = usePricingState();
  
  // Dynamic padding bottom based on deployment mode
  const paddingBottomClass = deploymentMode === 'cloud' 
    ? 'pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-[110px]'  // Cloud: responsive padding
    : 'pb-0';  // Self-hosted: no padding

  return (
    <section className={`w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-[110px] ${paddingBottomClass}`}>
      <div className="text-center">
        {/* Content that needs 1100px max-width and horizontal padding */}
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1100px] mx-auto">
            {children}
          </div>
        </div>
        
        {/* Deployment Mode Tabs */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-[60px]">
          <DeploymentTabs 
            deploymentMode={deploymentMode}
            onDeploymentChange={setDeploymentMode}
          />
        </div>

        {/* Cloud Mode Content */}
        {deploymentMode === 'cloud' && (
          <>
            {/* Billing Cycle Switch - Only visible for Cloud */}
            <BillingCycleSwitch
              billingCycle={billingCycle}
              onBillingChange={setBillingCycle}
              show={true}
            />

            {/* Pricing Cards - Only visible for Cloud */}
            <PricingCards
              billingCycle={billingCycle}
              show={true}
            />
          </>
        )}

        {/* Self-hosted Mode Content */}
        {deploymentMode === 'self-hosted' && (
          <ComparisonTable show={true} />
        )}
      </div>
    </section>
  );
}