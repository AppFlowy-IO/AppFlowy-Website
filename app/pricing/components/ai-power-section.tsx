import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import card1 from '/assets/images/pricing/card-1.svg';
import card2 from '/assets/images/pricing/card-2.svg';
import card3 from '/assets/images/pricing/card-3.svg';
import card4 from '/assets/images/pricing/card-4.svg';
import aiPricing1 from '/assets/images/pricing/ai-pricing-1.png';
import aiPricing2 from '/assets/images/pricing/ai-pricing-2.png';
import ScrollIcons from '@/components/shared/scroll-icons';

const aiFeatures = [
  {
    id: 1,
    title: 'Brainstorm new ideas and first drafts',
    image: card1,
    alt: 'Brainstorm new ideas'
  },
  {
    id: 2,
    title: 'Summarize contents, make it longer or shorter',
    image: card2,
    alt: 'Summarize contents'
  },
  {
    id: 3,
    title: 'Auto-fill columns',
    image: card3,
    alt: 'Auto-fill columns'
  },
  {
    id: 4,
    title: 'Get instant answers to your questions',
    image: card4,
    alt: 'Get instant answers'
  }
];

const aiPricingData = [
  {
    id: 1,
    image: aiPricing1,
    title: 'AppFlowy AI MAX',
    subtitle: 'Easily plug customized AI into existing workflow to gain smarter and faster results',
    price: '$8',
    priceRule: 'per user per month billed annually\n$10 billed monthly',
    features: [
      'Unlimited AI responses',
      'Unlimited pages up to 30 MB per file for AI Chat with uploaded files'
    ]
  },
  {
    id: 2,
    image: aiPricing2,
    title: 'AppFlowy AI Local',
    subtitle: 'Easily plug customized AI into existing workflow to gain smarter and faster results',
    price: '$8',
    priceRule: 'per user per month billed annually\n$10 billed monthly',
    features: [
      'Local AI on your own hardware for ultimate privacy',
      'Unlimited AI responses & file size for AI Chat'
    ]
  }
];

function FeatureCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
      <path d="M15.5 5.25L11.457 10.1016C9.85489 12.0241 9.05384 12.9854 8 12.9854C6.94616 12.9854 6.14511 12.0241 4.543 10.1016L3.5 8.85" stroke="#8427E0" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function AiPowerSection() {
  return (
    <section className='w-full bg-white py-[110px]'>
      <div className='mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto w-full max-w-[1100px] text-center'>
          <h2 className='font-inter text-3xl font-medium leading-[105%] tracking-[-0.03em] text-[#101012] sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px]'>
            <span className='text-[#8427E0]'>Unlock</span> unlimited AI power
          </h2>
          <h3 className='mt-5 text-center font-inter text-2xl font-medium leading-[120%] tracking-[-0.72px] text-[#101012]'>
            AppFlowy AI includes
          </h3>

          {/* AI Feature Cards */}
          <div className='mt-[60px]'>
            <div className='mx-auto grid w-full max-w-[1100px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {aiFeatures.map((feature) => (
                <div key={feature.id} className='flex flex-col items-center'>
                  <div className='flex h-[320px] w-[257px] flex-shrink-0 flex-col items-center justify-center gap-[25px] rounded-lg bg-gray-50 p-[40px]'>
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      width={257}
                      height={320}
                      className='max-h-full max-w-full object-contain'
                    />
                  </div>
                  <h4 className='mt-6 max-w-[257px] px-6 text-center font-inter text-2xl font-medium leading-[120%] tracking-[-0.24px] text-[#101012]'>
                    {feature.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* AI Pricing */}
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
                      className='flex h-full w-full items-center justify-center gap-[10px] rounded-[15px] border border-[#9327FF] p-[19px_40px_21px_40px] text-center font-inter text-base font-medium leading-[100%] text-[#8427E0] transition-colors hover:bg-[#8427E0] hover:text-white'
                    >
                      Unlock
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
        </div>
      </div>
      <div className={'w-full bg-white pt-[100px]'}>
        <ScrollIcons />
      </div>
    </section>
  );
}