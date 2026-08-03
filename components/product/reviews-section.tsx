import React from 'react';

const stats = [
  { value: '8m+', label: 'Downloads' },
  { value: '1m+', label: 'Docker Pulls' },
  { value: '75K+', label: 'Github Stars' },
  { value: '10K+', label: 'Community Members' },
];

function ReviewMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className='flex min-w-0 flex-col gap-[28px] max-md:gap-3'>
      <p className='text-[64px] font-medium leading-[68px] text-[#140f28] max-md:text-[clamp(32px,7vw,64px)] max-md:leading-[1.05]'>
        {value}
      </p>
      <div className='h-8'></div>
      <p className='text-[24px] font-medium leading-[28px] text-[#aaa] max-md:text-[16px] max-md:leading-[1.4]'>
        {label}
      </p>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className='reviews-section w-full bg-[#F6F6FF]'>
      <div className='mx-auto flex w-full max-w-[1440px] py-[120px] px-[80px] flex-col max-md:py-[10vh] max-xl:px-[4vw]'>
        <h2 className='mb-32 text-[56px] font-bold leading-[68px] tracking-[-0.03em] text-[#16152d] max-md:mb-10 max-md:text-[clamp(32px,7vw,56px)] max-md:leading-[1.1]'>
          Empowering millions worldwide
        </h2>

        <div className='flex w-full flex-col gap-[28px]'>
          <div className='grid w-full grid-cols-4 gap-[40px] max-md:grid-cols-2 max-md:gap-x-6 max-md:gap-y-10'>
            {stats.map((item) => (
              <ReviewMetric key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </div>

        <div className='text-text-secondary border border-dashed translate-y-[-5rem]'></div>
      </div>
    </section>
  );
}
