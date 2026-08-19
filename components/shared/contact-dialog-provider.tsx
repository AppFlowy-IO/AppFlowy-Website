'use client';

import React, { createContext, useCallback, useContext, useMemo, useRef, useState, Suspense, ReactNode } from 'react';
import { ContactDialog } from '@/components/shared/contact-dialog';

type DeploymentMode = 'cloud' | 'self-hosted';

interface ContactDialogOptions {
  /** Heading shown in the dialog header. Defaults to `Contact Support`. */
  title?: string;
  /** Reported to the API so we know which entry point the enquiry came from. */
  source?: string;
  /** Preselects the deployment mode; the pricing page passes its current tab. */
  deploymentMode?: DeploymentMode;
}

interface ContactDialogContextValue {
  openContactDialog: (options?: ContactDialogOptions) => void;
  closeContactDialog: () => void;
  /**
   * Lets the pricing page broadcast its current Cloud/Self-hosted tab so
   * triggers that don't know about pricing (navbar, footer, get-started)
   * still open the dialog preselected to what the user was just looking at.
   */
  setDefaultDeploymentMode: (mode: DeploymentMode) => void;
}

const ContactDialogContext = createContext<ContactDialogContextValue | undefined>(undefined);

export function useContactDialog() {
  const context = useContext(ContactDialogContext);

  if (context === undefined) {
    throw new Error('useContactDialog must be used within a ContactDialogProvider');
  }

  return context;
}

export function ContactDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ContactDialogOptions>({});
  const defaultDeploymentModeRef = useRef<DeploymentMode>('cloud');

  const openContactDialog = useCallback((next: ContactDialogOptions = {}) => {
    setOptions({ ...next, deploymentMode: next.deploymentMode ?? defaultDeploymentModeRef.current });
    setOpen(true);
  }, []);

  const closeContactDialog = useCallback(() => setOpen(false), []);

  const setDefaultDeploymentMode = useCallback((mode: DeploymentMode) => {
    defaultDeploymentModeRef.current = mode;
  }, []);

  const value = useMemo(
    () => ({ openContactDialog, closeContactDialog, setDefaultDeploymentMode }),
    [openContactDialog, closeContactDialog, setDefaultDeploymentMode],
  );

  return (
    <ContactDialogContext.Provider value={value}>
      {children}
      {/* `ContactDialog` reads `useSearchParams`; without a boundary every page
          using this provider opts out of static rendering at build time. */}
      <Suspense fallback={null}>
        <ContactDialog
          open={open}
          onOpenChange={setOpen}
          title={options.title}
          source={options.source}
          deploymentMode={options.deploymentMode}
        />
      </Suspense>
    </ContactDialogContext.Provider>
  );
}
