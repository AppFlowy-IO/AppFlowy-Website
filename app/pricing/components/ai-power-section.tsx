import React from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import card1 from '@/assets/images/pricing/card-1.png';
import card2 from '@/assets/images/pricing/card-2.png';
import card3 from '@/assets/images/pricing/card-3.png';
import card4 from '@/assets/images/pricing/card-4.png';

const aiFeatures: {
  id: number;
  title: string;
  description?: string;
  image: StaticImageData;
  alt: string;
  background: string;
}[] = [
  {
    id: 1,
    title: 'Brainstorm new ideas and first drafts',
    image: card1,
    alt: 'AI brainstorming illustration',
    background: '#FEF6F5',
  },
  {
    id: 2,
    title: 'AI meeting notes',
    description: 'automatically captured and enhanced',
    image: card2,
    alt: 'AI meeting notes illustration',
    background: '#F4F0FF',
  },
  {
    id: 3,
    title: 'Auto-fill columns',
    image: card3,
    alt: 'AI auto-fill columns illustration',
    background: '#FFFBEA',
  },
  {
    id: 4,
    title: 'AI search',
    description: 'get answers with traceable sources',
    image: card4,
    alt: 'AI search illustration',
    background: '#FFF8E9',
  },
];

export function AiPowerSection() {
  return (
    <section className='relative isolate w-full overflow-hidden bg-white px-4 py-[120px] sm:px-6'>
      <div className='pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F6F4FF] opacity-80 blur-[110px]' />
      <div className='mx-auto w-full max-w-[960px]'>
        <div className='text-center'>
          <h2 className='font-inter text-[36px] font-bold leading-[1.2] tracking-[-0.03em] text-[#140F28] sm:text-[44px] lg:text-[56px] lg:leading-[68px]'>
            Unlock unlimited AI power
          </h2>
          <p className='mt-3 font-inter text-base font-medium leading-7 text-[#5A5A5A] sm:text-xl'>
            AppFlowy AI includes
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {aiFeatures.map((feature) => (
            <article
              key={feature.id}
              className='relative h-[240px] overflow-hidden rounded-2xl px-7 pt-7'
              style={{ backgroundColor: feature.background }}
            >
              <h3 className='relative z-10 max-w-[320px] font-inter text-lg font-medium leading-7 text-[#140F28] sm:text-xl'>
                {feature.title}
                {feature.description && <span className='block'>{feature.description}</span>}
              </h3>
              <Image
                src={feature.image}
                alt={feature.alt}
                width={514}
                height={640}
                className='absolute -bottom-4 right-4 h-[230px] w-[230px] object-contain sm:h-[280px] sm:w-[280px]'
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
