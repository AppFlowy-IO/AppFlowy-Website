'use client';

import React, { useState, useEffect } from 'react';
import { DeploymentTabs, DeploymentMode } from './pricing-tabs';
import { BillingCycleSwitch, BillingCycle } from './billing-switch';
import { PricingCards } from './pricing-cards';
import { ComparisonTable } from './comparison-table';

interface PricingStateProviderProps {
  onDeploymentChange?: (mode: DeploymentMode) => void;
}

export function PricingStateProvider({ onDeploymentChange }: PricingStateProviderProps) {
  const [deploymentMode, setDeploymentMode] = useState<DeploymentMode>('cloud');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  
  // Only show billing cycle switch when Cloud is selected
  const showBillingCycle = deploymentMode === 'cloud';

  // Notify parent component when deployment mode changes
  useEffect(() => {
    onDeploymentChange?.(deploymentMode);
  }, [deploymentMode, onDeploymentChange]);

  return (
    <>
      {/* Deployment Mode Tabs */}
      <DeploymentTabs 
        deploymentMode={deploymentMode}
        onDeploymentChange={setDeploymentMode}
      />

      {/* Cloud Mode Content */}
      {deploymentMode === 'cloud' && (
        <>
          {/* Billing Cycle Switch - Only visible for Cloud */}
          <BillingCycleSwitch
            billingCycle={billingCycle}
            onBillingChange={setBillingCycle}
            show={showBillingCycle}
          />

          {/* Pricing Cards - Only visible for Cloud */}
          <PricingCards
            billingCycle={billingCycle}
            show={showBillingCycle}
          />
        </>
      )}

      {/* Self-hosted Mode Content */}
      {deploymentMode === 'self-hosted' && (
        <ComparisonTable show={true} />
      )}
    </>
  );
}