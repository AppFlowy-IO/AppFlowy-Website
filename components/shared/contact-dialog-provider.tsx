'use client';

import React, { useCallback, useMemo, useRef, useState, Suspense, ReactNode } from 'react';
import { ContactDialog } from '@/components/shared/contact-dialog';
import {
  ContactDialogContext,
  type ContactDialogOptions,
  type DeploymentMode,
} from '@/components/shared/contact-dialog-context';

export { useContactDialog } from '@/components/shared/contact-dialog-context';

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
