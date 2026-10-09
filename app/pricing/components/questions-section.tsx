'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useContactDialog } from '@/components/shared/contact-dialog-provider';
import { usePricingState } from './pricing-state-context';

const cards = [
  {
    title: 'Help articles',
    icon: '/images/pricing/support-help.svg',
    href: 'https://appflowy.com/guide/getting-started-with-appflowy',
  },
  {
    title: 'Partner program',
    icon: '/images/pricing/support-partner.svg',
    href: 'https://appflowy.com/docs/appflowy-partner-program',
  },
  {
    title: 'Contact support',
    icon: '/images/pricing/support-contact.svg',
    href: '/contact',
    contact: true,
  },
];

export function QuestionsSection() {
  const searchParams = useSearchParams();
  const { openContactDialog } = useContactDialog();
  const { deploymentMode } = usePricingState();
  const deploymentModeRef = useRef(deploymentMode);
  deploymentModeRef.current = deploymentMode;

  useEffect(() => {
    if (searchParams.get('action') === 'contact') {
      openContactDialog({ deploymentMode: deploymentModeRef.current });
    }
  }, [searchParams, openContactDialog]);

  return (
    <section className='relative isolate w-full overflow-hidden bg-white px-4 py-[120px] sm:px-6'>
      <div className='pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F6F4FF] opacity-80 blur-[110px]' />
      <div className='mx-auto w-full max-w-[960px]'>
        <h2 className='text-center font-inter text-[36px] font-bold leading-[1.2] tracking-[-0.03em] text-[#140F28] sm:text-[44px] lg:text-[56px] lg:leading-[68px]'>
          Have additional questions?
        </h2>
        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {cards.map((card) => (
            <article
              key={card.title}
              className='flex min-h-[236px] flex-col rounded-2xl bg-white p-7 shadow-[0_4px_24px_rgba(20,15,40,0.04)]'
            >
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(133,76,255,0.08)]'>
                <Image src={card.icon} alt='' aria-hidden='true' width={24} height={24} />
              </div>
              <h3 className='mt-[60px] font-inter text-xl font-medium leading-7 text-[#140F28]'>{card.title}</h3>
              {card.contact ? (
                <button
                  type='button'
                  onClick={() => openContactDialog({ deploymentMode })}
                  className='mt-3 w-fit font-inter text-base leading-6 text-[#5A5A5A] hover:text-[#8427E0]'
                >
                  Learn more <span aria-hidden='true'>→</span>
                </button>
              ) : (
                <Link
                  href={card.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-3 w-fit font-inter text-base leading-6 text-[#5A5A5A] hover:text-[#8427E0]'
                >
                  Learn more <span aria-hidden='true'>→</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
