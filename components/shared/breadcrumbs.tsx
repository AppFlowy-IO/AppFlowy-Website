import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label='Breadcrumb' className={cn('text-sm text-[#5D606B]', className)}>
      <ol className='flex flex-wrap items-center gap-2'>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <React.Fragment key={`${item.label}-${index}`}>
              {index > 0 ? (
                <li aria-hidden='true' className='select-none text-[#A6A8B0]'>
                  /
                </li>
              ) : null}
              <li aria-current={isCurrent ? 'page' : undefined} className={isCurrent ? 'text-[#101012]' : undefined}>
                {item.href && !isCurrent ? (
                  <Link
                    className='focus:ring-primary/30 rounded-sm hover:text-primary focus:outline-none focus:ring-2'
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
