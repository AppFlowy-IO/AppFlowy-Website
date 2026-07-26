import React from 'react';

const chicagoLogoSrc = '/images/chicago.svg';

export type TestimonialCardProps = {
  quote: string;
  name: string;
  title: string;
  className?: string;
};

export function TestimonialCard({ quote, name, title, className }: TestimonialCardProps) {
  const testimonialCardClassName = `flex h-[320px] w-[480px] flex-col justify-between rounded-[18px] bg-white p-[36px] max-md:w-full max-md:max-w-[480px] ${className ? className : ''}`;
  return (
    <div
      className={testimonialCardClassName
      }
    >
      <div className='flex h-[168px] w-full flex-col items-start gap-[16px]'>
        <div className='relative h-[32px] w-full overflow-clip'>
          <img alt='Chicago' className='block h-full w-full object-cover' src={chicagoLogoSrc} />
        </div>
        <p className='w-full text-[16px] font-medium leading-[24px] text-[#140f28]'>{quote}</p>
      </div>

      <div className='flex w-full items-center gap-[16px]'>
        <div className='flex min-w-0 flex-col'>
          <p className='text-[16px] font-medium leading-[24px] text-[#140f28]'>{name}</p>
          <p className='text-[16px] font-normal leading-[24px] text-[#5a5a5a]'>{title}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;

const sectionTestimonials: TestimonialCardProps[] = [
  {
    quote:
      "The AI's context-awareness regarding our specific codebase is eerie. It's like having a senior dev sitting right next to me 24/7.",
    name: 'Amara Okafor',
    title: 'Full Stack Developer',
  },
  {
    quote:
      'The self-hosted setup was surprisingly painless. It’s rare to find a tool that balances high security with such a smooth developer experience.',
    name: 'Hiroshi Tanaka',
    title: 'Senior DevOps Engineer',
  },
  {
    quote:
      'Our product velocity increased by 40% in the first quarter. The team spends less time on boilerplate and more time on core features.',
    name: 'Sarah Jenkins',
    title: 'VP of Product',
  },
  {
    quote:
      'Owning our data while leveraging cutting-edge AI is a non-negotiable for us. This platform is the only one that truly delivered on that promise.',
    name: 'David Chen',
    title: 'Chief Information Officer',
  },
  {
    quote:
      'Finally, an AI tool that respects our VPC boundaries. We get the power of LLMs without ever compromising our data sovereignty.',
    name: 'Elena Vance',
    title: 'Lead Data Scientist',
  },
  {
    quote:
      'It has completely transformed our internal knowledge base. Finding answers in our legacy documentation now takes seconds instead of hours.',
    name: 'Sophie Müller',
    title: 'Head of Innovation',
  },
  {
    quote:
      'Passing our latest security audit was much easier because this tool stays within our infrastructure. Total control, no external leaks.',
    name: 'Julian Ricci',
    title: 'Security Architect',
  },
  {
    quote:
      'Finally, an AI tool that respects our VPC boundaries. We get the power of LLMs without ever compromising our data sovereignty.',
    name: 'Elena Vance',
    title: 'Lead Data Scientist',
  },
  {
    quote:
      'Integrating this workspace changed how we handle PR reviews. What used to be a bottleneck is now a seamless, automated flow.',
    name: 'Marcus Thorne',
    title: 'Engineering Manager',
  },
];

export function TestimonialSection() {
  const topRowTestimonials = sectionTestimonials.slice(0, 4);
  const bottomRowTestimonials = sectionTestimonials.slice(4);

  return (
    <div className='w-full overflow-hidden bg-[#F6F6FF] py-[120px] max-md:py-[10vh]'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-col items-center px-[80px] max-xl:px-[4vw]'>
        <div className='flex w-full'>
          <h2 className='text-style-h1 font-bold'>
            Teams that ship smarter choose AppFlowy
          </h2>
        </div>
        <div className="testimonial-section__stage relative mt-[60px] w-full overflow-hidden pb-[44px] before:pointer-events-none before:absolute before:inset-y-0 before:z-10 before:block before:w-[120px] before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:z-10 after:block after:w-[120px] after:content-[''] max-md:overflow-visible max-md:before:hidden max-md:after:hidden">
          <div className='testimonial-section__track flex w-max translate-x-[-6vw] items-stretch gap-[20px] max-md:mt-0 max-md:w-full max-md:translate-x-0 max-md:flex-col max-md:items-center max-md:gap-5 max-sm:hidden'>
            {topRowTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} {...testimonial} />
            ))}
          </div>

          <div className='testimonial-section__track mt-[20px] flex w-max translate-x-[2vw] items-stretch gap-[20px] max-md:ml-0 max-md:mt-0 max-md:w-full max-md:translate-x-0 max-md:flex-col max-md:items-center max-md:gap-5 max-sm:hidden'>
            {bottomRowTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
