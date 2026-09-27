'use client';

import { useContactDialog } from '@/components/shared/contact-dialog-context';
import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

interface ContactSalesLinkProps {
  className?: string;
  source?: string;
}

export default function ContactSalesLink({
  children,
  className,
  source = 'blog',
}: PropsWithChildren<ContactSalesLinkProps>) {
  const { openContactDialog } = useContactDialog();

  return (
    <button
      type="button"
      className={cn(
        'decoration-muted cursor-pointer break-words bg-transparent p-0 text-left text-black underline opacity-70 hover:opacity-100',
        className,
      )}
      onClick={() => openContactDialog({ title: 'Contact sales', source })}
    >
      {children}
    </button>
  );
}
