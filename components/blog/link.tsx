'use client';
import { cn } from '@/lib/utils';
import React, { HTMLAttributes, PropsWithChildren } from 'react';

function Link({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLAnchorElement>> & {
  children: React.ReactNode;
}) {
  return (
    <span
      onClick={() => {
        if ('href' in props) {
          const href = props.href as string;

          window.open(href, '_blank');
        }
      }}
      className={cn('decoration-muted cursor-pointer text-black underline opacity-70 hover:opacity-100')}
    >
      {children}
    </span>
  );
}

export default Link;
