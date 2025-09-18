'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DeploymentMode } from './pricing-tabs';
import { BillingCycle } from './billing-switch';

interface PricingState {
  deploymentMode: DeploymentMode;
  setDeploymentMode: (mode: DeploymentMode) => void;
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
}

const PricingStateContext = createContext<PricingState | undefined>(undefined);

export function usePricingState() {
  const context = useContext(PricingStateContext);
  if (context === undefined) {
    throw new Error('usePricingState must be used within a PricingStateProvider');
  }
  return context;
}

interface PricingStateProviderProps {
  children: ReactNode;
}

export function PricingStateProvider({ children }: PricingStateProviderProps) {
  const [deploymentMode, setDeploymentMode] = useState<DeploymentMode>('cloud');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');

  const value: PricingState = {
    deploymentMode,
    setDeploymentMode,
    billingCycle,
    setBillingCycle,
  };

  return (
    <PricingStateContext.Provider value={value}>
      {children}
    </PricingStateContext.Provider>
  );
}