'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { DeploymentMode } from './pricing-tabs';
import { BillingCycle } from './billing-switch';
import { useContactDialog } from '@/components/shared/contact-dialog-provider';

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
  const searchParams = useSearchParams();
  
  // Initialize deployment mode based on source parameter
  const getInitialDeploymentMode = (): DeploymentMode => {
    const sourceParam = searchParams.get('source');

    return sourceParam === 'super-admin' ? 'self-hosted' : 'cloud';
  };

  const [deploymentMode, setDeploymentMode] = useState<DeploymentMode>(getInitialDeploymentMode());
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const { setDefaultDeploymentMode } = useContactDialog();

  // Auto-switch deployment mode based on source parameter
  useEffect(() => {
    const sourceParam = searchParams.get('source');

    if (sourceParam === 'super-admin') {
      setDeploymentMode('self-hosted');
    }
  }, [searchParams]);

  // Let triggers outside the pricing tree (navbar, footer) open the dialog
  // preselected to whichever tab is currently visible.
  useEffect(() => {
    setDefaultDeploymentMode(deploymentMode);
  }, [deploymentMode, setDefaultDeploymentMode]);

  useEffect(() => {
    return () => setDefaultDeploymentMode('cloud');
  }, [setDefaultDeploymentMode]);

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