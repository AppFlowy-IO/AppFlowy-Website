'use client';
import React from 'react';
import Logo from '@/components/icons/logo';
import { externalLinks, links } from '@/lib/config/footer';
import Link from 'next/link';
import { useContactDialog } from '@/components/shared/contact-dialog-provider';

function Footer() {
  const { openContactDialog } = useContactDialog();

  const renderLink = (name: string, link?: string, badge?: number, action?: string) => {
    const content = (
      <span className='text-style-body-standard relative inline-flex items-center'>
        {name}
        {badge && badge > 0 && (
          <span className='absolute -right-[22px] -top-[8px] inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-[5px] text-[11px] leading-none text-white'>
            {badge}
          </span>
        )}
      </span>
    );

    if (action === 'contact-sales') {
      return (
        <button
          type={'button'}
          onClick={() => openContactDialog({ title: 'Contact sales', source: 'footer' })}
        >
          {content}
        </button>
      );
    }

    if (!link) {
      return content;
    }

    if (link.startsWith('https')) {
      return (
        <a href={link} rel={'noreferrer'} target={'_blank'}>
          {content}
        </a>
      );
    }

    return <Link href={link}>{content}</Link>;
  };

  return (
    <div className='appflowy-footer w-full overflow-hidden bg-white px-4 pb-4 sm:px-6 sm:pb-6'>
      <div className='w-full rounded-[16px] bg-black p-10 pt-15 max-xl:px-[28px] max-lg:px-5 max-lg:pt-5 sm:rounded-[20px]'>
        <div className='flex items-start justify-between gap-[72px] max-xl:gap-[48px] max-lg:flex-col max-lg:gap-[40px]'>
          <div className={'logo shrink-0'}>
            <div className={'image aspect-ratio-3/2 text-white'}>
              <Logo />
            </div>
            <div aria-label={'AppFlowy social links'} className='social-links mt-[34px] flex items-center gap-[28px]'>
              {externalLinks.map((item) => (
                <Link aria-label={item.key} href={item.link} key={item.key} rel={'noreferrer'} target={'_blank'}>
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
          <nav
            aria-label={'Footer'}
            className='grid min-w-0 grid-cols-6 gap-x-[56px] gap-y-[40px] text-white max-2xl:gap-x-[40px] max-xl:gap-x-[28px] max-md:w-full max-md:grid-cols-2 max-md:gap-x-[32px] max-md:gap-y-[36px] max-sm:grid-cols-2 max-sm:gap-x-[24px] max-sm:gap-y-[28px] lg:grid-cols-[repeat(6,minmax(0,max-content))]'
          >
            {links.map((item) => (
              <div className='min-w-0' key={item.name}>
                <span className='group-name text-style-h5 mb-[22px] block font-semibold'>
                  {item.link ? renderLink(item.name, item.link) : item.name}
                </span>
                <div className='flex flex-col gap-2'>
                  {item.children.map((child) => (
                    <div key={child.name} className={'group-item text-style-body-standard'}>
                      {renderLink(
                        child.name,
                        'link' in child ? child.link : undefined,
                        'badge' in child ? Number(child.badge) : undefined,
                        'action' in child ? child.action : undefined,
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
        <div className='bottom mt-[48px] border-t pt-[24px] text-white/70'>
          <div className={'col'}>
            <div className={'text-style-body-standard'}>Copyright © 2026, AppFlowy</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
