import React from 'react';
import Image from 'next/image';

const aiFeatures: {
  id: number;
  title: string;
  description?: string;
  background: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
}[] = [
  {
    id: 1,
    title: 'Brainstorm new ideas and first drafts',
    background: '#FEF6F5',
    image: '/images/pricing/ai/brainstorm.png',
    imageWidth: 832,
    imageHeight: 424,
  },
  {
    id: 2,
    title: 'AI meeting notes',
    description: 'automatically captured and enhanced',
    background: '#F4EFFF',
    image: '/images/pricing/ai/meeting-notes.png',
    imageWidth: 832,
    imageHeight: 424,
  },
  {
    id: 3,
    title: 'Auto-fill columns',
    background: '#FEF9DD',
    image: '/images/pricing/ai/autofill-columns.png',
    imageWidth: 888,
    imageHeight: 424,
  },
  {
    id: 4,
    title: 'AI search',
    description: 'get answers with traceable sources',
    background: '#FDF5E7',
    image: '/images/pricing/ai/ai-search.png',
    imageWidth: 832,
    imageHeight: 424,
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
              <h3 className='relative z-10 w-full max-w-none font-inter text-lg font-medium leading-7 text-[#140F28] sm:text-xl'>
                {feature.title}
                {feature.description && <span className='block'>{feature.description}</span>}
              </h3>
              <Image
                aria-hidden='true'
                alt=''
                src={feature.image}
                width={feature.imageWidth}
                height={feature.imageHeight}
                className={`pointer-events-none absolute left-7 top-7 h-auto max-w-none ${
                  feature.id === 3 ? 'w-[calc(100%-28px)]' : 'w-[calc(100%-56px)]'
                }`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
