'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Discord from '@/components/icons/discord';
import Github from '@/components/icons/github';
import Reddit from '@/components/icons/reddit';
import Twitter from '@/components/icons/twitter';
import { useContactDialog } from '@/components/shared/contact-dialog-provider';
import { webApplicationUrl } from '@/lib/web-application';

const footerGroups = [
  {
    title: 'Product',
    links: [
      ['Template', '/templates'],
      ['What’s new', '/what-is-new'],
      ['Zapier Integrations', 'https://zapier.com/apps/appflowy/integrations'],
      ['Blog', '/blog'],
      ['Email Newsletter', '/subscribe-newsletter'],
    ],
  },
  {
    title: 'Download',
    links: [
      ['iOS & Android', '/download#ios-and-android'],
      ['macOS', '/download#macOS'],
      ['Windows', '/download#Windows'],
      ['Linux', '/download#Linux'],
      ['Browser', webApplicationUrl],
    ],
  },
  {
    title: 'Community',
    links: [
      ['Github', 'https://github.com/AppFlowy-IO/appflowy'],
      ['Twitter', 'https://twitter.com/appflowy'],
      ['Discord', 'https://discord.gg/9Q2xaN37tV'],
      ['Community Hub', 'https://forum.appflowy.com/'],
      ['Report a bug', 'https://github.com/AppFlowy-IO/AppFlowy/issues/new/choose'],
      ['Request a feature', 'https://github.com/AppFlowy-IO/AppFlowy/issues/new/choose'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Guides & Tutorials', 'https://appflowy.com/guide/getting-started-with-appflowy'],
      ['Developer Docs', 'https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production'],
      ['AppFlowy Blocks', '/appflowy-blocks'],
      ['Request a resource', 'https://github.com/AppFlowy-IO/AppFlowy/issues/new/choose'],
      ['RSS', '/blog/feed.xml'],
    ],
  },
  {
    title: 'Compare',
    links: [['vs Notion', '/compare/notion-vs-appflowy']],
  },
  {
    title: 'Company',
    links: [
      ['About Us', '/about'],
      ['Careers', '/join'],
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
      ['Contacts', 'mailto:support@appflowy.io'],
    ],
  },
];

const socialLinks = [
  { label: 'Discord', href: 'https://discord.gg/9Q2xaN37tV', icon: Discord },
  { label: 'Reddit', href: 'https://www.reddit.com/r/AppFlowy/', icon: Reddit },
  { label: 'X', href: 'https://twitter.com/appflowy', icon: Twitter },
  { label: 'GitHub', href: 'https://github.com/AppFlowy-IO/appflowy', icon: Github },
];

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const className = 'text-sm leading-6 text-white/70 transition-colors hover:text-white';
  return href.startsWith('http') || href.startsWith('mailto:') ? (
    <a
      className={className}
      href={href}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      target={href.startsWith('http') ? '_blank' : undefined}
    >
      {children}
    </a>
  ) : (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export function PricingCtaFooter() {
  const { openContactDialog } = useContactDialog();

  return (
    <section className='relative isolate w-full overflow-hidden bg-white px-4 pb-4 pt-20 sm:px-6 sm:pb-6'>
      <div className='pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#F2F0FF] opacity-80 blur-[130px]' />
      <div className='relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center gap-10 text-center'>
        <div className='flex h-[84px] w-[84px] items-center justify-center rounded-[20px] border border-[#E6E6E6] bg-white p-4 shadow-[0_0_20px_rgba(73,87,240,0.08)]'>
          <Image src='/appflowy.svg' width={52} height={52} alt='AppFlowy' />
        </div>
        <div className='flex flex-col items-center gap-3'>
          <h2 className='font-inter text-[36px] font-bold leading-[1.2] tracking-[-0.03em] text-[#140F28] sm:text-[44px] lg:text-[56px] lg:leading-[68px]'>
            Get started for free
          </h2>
          <p className='font-inter text-base leading-6 text-[#5A5A5A] sm:text-xl sm:leading-7'>
            The AI workspace where you achieve more without losing control of your data
          </p>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-2'>
          <button
            type='button'
            onClick={() => openContactDialog({ title: 'Contact sales', source: 'get-started-section' })}
            className='h-10 rounded-lg bg-[#140F28] px-4 font-inter text-base font-medium leading-6 text-white transition-colors hover:bg-[#29213D]'
          >
            Contact sales
          </button>
          <Link
            href={webApplicationUrl}
            className='flex h-10 items-center rounded-lg border border-[#E6E6E6] bg-white px-4 font-inter text-base font-medium leading-6 text-[#140F28] transition-colors hover:bg-[#F8F7FB]'
          >
            Get started free
          </Link>
        </div>
      </div>

      <footer className='relative z-10 mt-[120px] min-h-[433px] w-full rounded-[16px] bg-black px-6 pb-10 pt-[60px] sm:rounded-[20px] sm:px-10'>
        <div className='grid min-h-[228px] grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-x-12'>
          <div className='col-span-2 flex flex-col gap-6 lg:col-span-1'>
            <div className='flex items-center gap-4 text-white'>
              <Image src='/appflowy.svg' width={28} height={28} alt='' aria-hidden='true' />
              <span className='font-inter text-2xl font-semibold leading-8'>appflowy</span>
            </div>
            <div className='flex items-center gap-6'>
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='h-6 w-6 text-white transition-opacity hover:opacity-70'
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label='Footer'
            className='col-span-2 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:col-span-1 lg:grid-cols-6 lg:gap-x-6'
          >
            {footerGroups.map((group) => (
              <div key={group.title} className='min-w-0'>
                <h3 className='mb-5 font-inter text-base font-semibold leading-7 text-white'>{group.title}</h3>
                <ul className='flex flex-col gap-2'>
                  {group.links.map(([label, href]) => (
                    <li key={label} className='whitespace-nowrap'>
                      <FooterLink href={href}>{label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className='mt-10 border-t border-white/20 pt-9 text-sm leading-6 text-white/70'>
          Copyright © 2026, AppFlowy
        </div>
      </footer>
    </section>
  );
}
