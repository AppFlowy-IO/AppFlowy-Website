import React from 'react';
import Image from 'next/image';
import card1 from '/assets/images/pricing/card-1.svg';
import card2 from '/assets/images/pricing/card-2.svg';
import card3 from '/assets/images/pricing/card-3.svg';
import card4 from '/assets/images/pricing/card-4.svg';
import ScrollIcons from '@/components/shared/scroll-icons';
import { AiPricing } from './ai-pricing';

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
                  <div className='flex h-[320px] w-full flex-shrink-0 flex-col items-center justify-center gap-[25px] rounded-lg bg-gray-50 p-[40px]'>
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      width={257}
                      height={320}
                      className='max-h-full max-w-full object-contain'
                    />
                  </div>
                  <h4 className='mt-6 w-full px-6 text-center font-inter text-2xl font-medium leading-[120%] tracking-[-0.24px] text-[#101012]'>
                    {feature.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* AI Pricing */}
          <AiPricing />
        </div>
      </div>
      <div className={'w-full bg-white pt-[100px]'}>
        <ScrollIcons />
      </div>
    </section>
  );
}