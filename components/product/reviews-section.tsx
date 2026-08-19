import React from 'react';
import ScrollFillText from '@/components/shared/scroll-fill-text';

const stats = [
  { value: '8M+', label: 'Downloads' },
  { value: '1M+', label: 'Docker Pulls' },
  { value: '75K+', label: 'Github Stars' },
  { value: '20K+', label: 'Community Members' },
];

function ReviewMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className='flex min-w-0 flex-col gap-[28px] rounded-2xl bg-transparent max-md:gap-2 max-md:bg-white max-md:h-[200px] max-md:px-5 max-md:py-8 max-md:text-center max-md:rounded-lg max-md:justify-center'>
      <p className='text-[64px] font-medium leading-[68px] text-[#140f28] max-md:text-[40px] max-md:leading-[48px]'>
        {value}
      </p>
      <p className='font-medium text-style-h4 text-text-tertiary'>
        {label}
      </p>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className='reviews-section w-full bg-[#F6F6FF]'>
      <div className='mx-auto flex w-full max-w-[1440px] py-[120px] px-[80px] flex-col max-md:py-[10vh] max-xl:px-[4vw]'>
        <h2 className='mb-20 text-style-h1 font-bold max-md:mb-10 max-md:font-semibold'>
          <ScrollFillText>Trusted by a growing community</ScrollFillText>
        </h2>

        <div className='grid w-full grid-cols-4 gap-[40px] max-md:grid-cols-2 max-md:gap-4'>
          {stats.map((item) => (
            <ReviewMetric key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
