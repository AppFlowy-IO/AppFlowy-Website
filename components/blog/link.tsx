import { cn } from '@/lib/utils';
import NextLink from 'next/link';
import React, { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type LinkProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>;

function Link({ children, className, href, rel, target, ...props }: LinkProps) {
  const linkClassName = cn(
    'decoration-muted cursor-pointer overflow-hidden break-after-all break-words text-black underline opacity-70 hover:opacity-100',
    className
  );

  if (!href) {
    return (
      <a className={linkClassName} {...props}>
        {children}
      </a>
    );
  }

  if (href.startsWith('/')) {
    return (
      <NextLink className={linkClassName} href={href} {...props}>
        {children}
      </NextLink>
    );
  }

  const opensNewTab = /^https?:\/\//i.test(href);

  return (
    <a
      className={linkClassName}
      href={href}
      rel={rel || (opensNewTab ? 'noopener noreferrer' : undefined)}
      target={target || (opensNewTab ? '_blank' : undefined)}
      {...props}
    >
      {children}
    </a>
  );
}

export default Link;
