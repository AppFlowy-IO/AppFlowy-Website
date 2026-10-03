import Image from 'next/image';
import React from 'react';

import CertificateBlockBg from '@/assets/images/sections/certificate-block-bg.webp';
import ProjectTrackerMobileUI from '@/assets/images/download/project-tracker-mobile-ui.webp';
import AppStoreBadges from '@/components/shared/app-store-badges';
import { cn } from '@/lib/utils';

interface MobileAppBannerProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

function MobileAppBanner({
  title = 'AppFlowy for iOS and Android',
  description = 'Intuitive and seamlessly transition from laptop to phone.',
  className,
}: MobileAppBannerProps) {
  return (
    <div className={cn('flex w-full justify-center bg-white', className)}>
      <section className='w-full max-w-[1280px] max-xl:px-6 max-sm:px-4'>
        <div className='relative flex w-full flex-col items-center gap-10 overflow-hidden rounded-[16px] bg-[#f6f6ff] pt-12 sm:pt-16 lg:h-[600px] lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:pt-0 lg:pl-20 xl:pr-[162px] lg:pr-16'>
          <div className='pointer-events-none absolute inset-0' aria-hidden={true}>
            <Image alt={''} className={'object-cover object-right'} fill={true} sizes={'1280px'} src={CertificateBlockBg} />
            <div className='absolute inset-0 bg-gradient-to-b from-white from-30% via-white/70 via-55% to-white/0 to-90% lg:bg-gradient-to-r lg:from-35% lg:via-65%' />
          </div>

          <div className='relative z-[1] flex max-w-[560px] flex-col items-center gap-4 px-4 text-center lg:items-start lg:self-center lg:px-0 lg:text-left'>
            <h2 className='text-style-h1 font-bold tracking-[-0.04em] text-text-primary'>{title}</h2>
            <p className='text-[20px] leading-[1.5] tracking-[-0.02em] text-text-tertiary max-sm:text-[16px]'>
              {description}
            </p>
            <AppStoreBadges className='mt-4 justify-center lg:justify-start' />
          </div>

          {/* The phone intentionally overflows the panel bottom and is clipped by it. */}
          <div className='relative z-[1] h-[360px] w-[260px] shrink-0 sm:h-[440px] sm:w-[290px] lg:h-[515px] lg:w-[315px]'>
            <Image
              alt={'AppFlowy Project Tracker board on a phone'}
              className={'absolute left-0 top-0 h-auto w-full max-w-none'}
              sizes={'(min-width: 1024px) 315px, 290px'}
              src={ProjectTrackerMobileUI}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default MobileAppBanner;
