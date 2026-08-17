import '@/styles/product.scss';
import GetStart from '@/components/product/get-start';
import MainDownload from '@/components/product/main-download';
import MainProducts from '@/components/product/main-products';
import SecurityCompliance from '@/components/product/security-compliance';
import { TestimonialSection } from '@/components/product/testimonial-card';
import ReviewsSection from '@/components/product/reviews-section';
import IntegrationsSection from '@/components/product/integrations-section';
import PlatformSection from '@/components/product/platform-section';
import ScrollIcons from '@/components/shared/scroll-icons';
import React from 'react';
import { PricingCalculator } from '@/components/product/pricing-calculator';
import DevInfoSection from '@/components/product/dev-info-section';
import ShowcaseSection from '@/components/product/showcase-section';
import HeroUnderlineIcon from '@/components/product/hero-underline-icon';

export default function Page() {
  return (
    <div className={'product-page'}>
      <div className={'af-container'}>
        <div className={'af-box section-1'}>
          <div className={'hero-blob hero-blob-left'} />
          <div className={'hero-blob hero-blob-right'} />
          <div className={'main-content'}>
            <h1 className='text-style-h1 font-bold'>
              <span className={'hero-highlight'}>
                Self-hosted
                <HeroUnderlineIcon />
              </span>{' '}
              AI Workspace for Enterprise Teams
            </h1>
            <h5 className={'text-base text-text-tertiary font-normal max-w-[600px]'}>Bring projects, wikis, and teams together with AI</h5>
          </div>
          <MainDownload />
          <div className={'flex w-full flex-col items-center'}>
            <MainProducts />
            <div className={'pointer-events-none w-full absolute inset-x-0 bottom-0 h-[90px] bg-gradient-to-b from-white/0 to-white sm:h-[180px]'} />
          </div>
        </div>
      </div>
      <div className={'w-full bg-white pb-16 pt-24 max-md:py-5'}>
        <ScrollIcons />
      </div>
      <ShowcaseSection />
      <DevInfoSection />
      <PlatformSection />
      <PricingCalculator />
      <IntegrationsSection />
      <ReviewsSection />
      <TestimonialSection />
      <SecurityCompliance />
      <GetStart />
    </div>
  );
}
