'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import aiPricing1 from '/assets/images/pricing/ai-pricing-1.png';
import aiPricing2 from '/assets/images/pricing/ai-pricing-2.png';
import { usePricingState } from './pricing-state-context';

const aiPricingData = [
  {
    id: 1,
    image: aiPricing1,
    title: 'AppFlowy AI MAX',
    subtitle: 'Access the most advanced AI models including GPT-5, Gemini 2.5 Pro, and Claude 3.7 Sonnet',
    price: '$8',
    priceRule: 'per user per month\nbilled monthly',
    buttonText: 'Unlock',
    features: ['Unlimited AI responses', 'Unlimited file uploads', '50 AI images per month'],
  },
  {
    id: 2,
    image: aiPricing2,
    title: 'Vault Workspace',
    subtitle: 'Private and offline — AI runs locally, no data transfer',
    price: '$6',
    priceRule: 'per user per month\nbilled annually',
    buttonText: 'Add',
    features: ['Local AI on your own hardware for ultimate privacy', 'Unlimited AI responses & file size for AI Chat'],
  },
];

function FeatureCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
      <path d="M15.5 5.25L11.457 10.1016C9.85489 12.0241 9.05384 12.9854 8 12.9854C6.94616 12.9854 6.14511 12.0241 4.543 10.1016L3.5 8.85" stroke="#8427E0" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function AiPricing() {
  const { deploymentMode } = usePricingState();

  // Only render for cloud deployment
  if (deploymentMode !== 'cloud') {
    return null;
  }

  return (
    <div className='mt-[100px]'>
      {/* Price Unit Label */}
      <div className='mb-[35px] text-right'>
        <span className='font-inter text-base font-normal leading-[150%] text-[#101012]'>Prices in </span>
        <span className='font-inter text-base font-bold leading-[150%] text-[#101012]'>$ USD</span>
      </div>

      {/* AI Pricing Cards */}
      <div className='grid grid-cols-1 items-start gap-6 lg:grid-cols-2'>
        {aiPricingData.map((plan) => (
          <div
            key={plan.id}
            className='flex h-full flex-col items-start rounded-[15px] border border-[rgba(213,215,222,0.70)] bg-white p-[40px_40px_60px_40px]'
          >
            {/* Image - Row 1 */}
            <div className='mb-[44px] flex h-[90px] w-full items-center justify-start'>
              <Image src={plan.image} alt={plan.title} width={90} height={90} className='object-contain' />
            </div>

            {/* Title - Row 2 */}
            <div className='mb-[14px] flex h-[34px] w-full items-center justify-start'>
              <h4 className='text-left font-inter text-2xl font-medium leading-[120%] tracking-[-0.24px] text-[#101012]'>
                {plan.title}
              </h4>
            </div>

            {/* Subtitle - Row 3 */}
            <div className='mb-[30px] flex h-[48px] w-full items-start justify-start'>
              <p className='text-left font-inter text-base font-normal leading-[150%] text-[#101012]'>
                {plan.subtitle}
              </p>
            </div>

            {/* Price - Row 4 */}
            <div className='mb-[10px] flex h-[44px] w-full items-center justify-start'>
              <span className='font-inter text-[40px] font-medium leading-[110%] tracking-[-1.2px] text-[#101012]'>
                {plan.price}
              </span>
            </div>

            {/* Price Rule - Row 5 */}
            <div className='mb-[30px] flex h-[34px] w-full items-start justify-start'>
              <span className='whitespace-pre-line text-left font-inter text-xs font-normal leading-[140%] text-[#101012] opacity-50'>
                {plan.priceRule}
              </span>
            </div>

            {/* Unlock Button - Row 6 */}
            <div className='mb-[44px] h-[60px] w-full'>
              <Link
                href='/download'
                className='flex h-full w-full items-center justify-center gap-[10px] rounded-[15px] border border-[#9327FF] p-[19px_40px_21px_40px] text-center font-inter text-base font-medium leading-[100%] text-[#8427E0] transition-colors hover:bg-[#8427E0] hover:text-white select-none touch-manipulation'
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {plan.buttonText}
              </Link>
            </div>

            {/* Features - Row 7+ */}
            <div className='flex w-full flex-col items-start gap-[10px]'>
              {plan.features.map((feature, index) => (
                <div key={index} className='flex w-full items-start gap-1'>
                  <div className='mt-0.5 flex-shrink-0'>
                    <FeatureCheckIcon />
                  </div>
                  <span className='text-left font-inter text-sm font-normal leading-[150%] text-[#101012]'>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}