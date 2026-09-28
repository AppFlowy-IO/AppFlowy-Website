'use client';

import { createContext, useContext } from 'react';

export type DeploymentMode = 'cloud' | 'self-hosted';

export interface ContactDialogOptions {
  /** Heading shown in the dialog header. Defaults to `Contact Support`. */
  title?: string;
  /** Reported to the API so we know which entry point the enquiry came from. */
  source?: string;
  /** Preselects the deployment mode; the pricing page passes its current tab. */
  deploymentMode?: DeploymentMode;
}

export interface ContactDialogContextValue {
  openContactDialog: (options?: ContactDialogOptions) => void;
  closeContactDialog: () => void;
  /**
   * Lets the pricing page broadcast its current Cloud/Self-hosted tab so
   * triggers that don't know about pricing still use the most recent choice.
   */
  setDefaultDeploymentMode: (mode: DeploymentMode) => void;
}

export const ContactDialogContext = createContext<ContactDialogContextValue | undefined>(undefined);

export function useContactDialog() {
  const context = useContext(ContactDialogContext);

  if (context === undefined) {
    throw new Error('useContactDialog must be used within a ContactDialogProvider');
  }

  return context;
}
