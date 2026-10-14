import React from 'react';
import Image from 'next/image';

const aiFeatures: {
  id: number;
  title: string;
  description?: string;
  background: string;
  image: string;
  mobileImage: string;
  imageWidth: number;
  imageHeight: number;
}[] = [
  {
    id: 1,
    title: 'Brainstorm new ideas and first drafts',
    background: '#FEF6F5',
    image: '/images/pricing/ai/brainstorm.png',
    mobileImage: '/images/pricing/ai/brainstorm-mobile.png',
    imageWidth: 832,
    imageHeight: 424,
  },
  {
    id: 2,
    title: 'AI meeting notes',
    description: 'automatically captured and enhanced',
    background: '#F4EFFF',
    image: '/images/pricing/ai/meeting-notes.png',
    mobileImage: '/images/pricing/ai/meeting-notes-mobile.png',
    imageWidth: 832,
    imageHeight: 424,
  },
  {
    id: 3,
    title: 'Auto-fill columns',
    background: '#FEF9DD',
    image: '/images/pricing/ai/autofill-columns.png',
    mobileImage: '/images/pricing/ai/autofill-columns-mobile.png',
    imageWidth: 888,
    imageHeight: 424,
  },
  {
    id: 4,
    title: 'AI search',
    description: 'get answers with traceable sources',
    background: '#FDF5E7',
    image: '/images/pricing/ai/ai-search.png',
    mobileImage: '/images/pricing/ai/ai-search-mobile.png',
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
          <div className='flex h-[68px] items-center justify-center'>
            <h2 className='font-inter text-[28px] font-bold leading-9 tracking-[-0.03em] text-[#140F28] sm:text-[44px] sm:leading-[1.2] lg:text-[56px] lg:leading-[68px]'>
              Unlock unlimited AI power
            </h2>
          </div>
          <p className='mt-3 font-inter text-xl font-medium leading-7 text-[#5A5A5A]'>AppFlowy AI includes</p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {aiFeatures.map((feature) => (
            <article
              key={feature.id}
              className='relative h-[280px] min-h-[280px] overflow-hidden rounded-2xl px-7 pt-7 sm:h-[240px] sm:min-h-0'
              style={{ backgroundColor: feature.background }}
            >
              <h3 className='relative z-10 w-full max-w-none font-inter text-xl font-medium leading-7 text-[#140F28]'>
                {feature.title}
                {feature.description &&
                  (feature.id === 4 ? (
                    <> {feature.description}</>
                  ) : (
                    <span className='block'>{feature.description}</span>
                  ))}
              </h3>
              <picture className='pointer-events-none absolute inset-0 block'>
                <source media='(max-width: 639px)' srcSet={feature.mobileImage} />
                <Image
                  aria-hidden='true'
                  alt=''
                  src={feature.image}
                  width={feature.imageWidth}
                  height={feature.imageHeight}
                  className={`absolute bottom-0 left-0 h-auto w-full max-w-none object-contain sm:inset-auto sm:bottom-auto sm:left-7 sm:top-7 sm:object-contain ${
                    feature.id === 3 ? 'sm:w-[calc(100%-28px)]' : 'sm:w-[calc(100%-56px)]'
                  }`}
                />
              </picture>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
