'use client';

import React from 'react';
import BackArrowIcon from '@/components/icons/back-arrow-icon';
import StarFill from '@/components/icons/star-yellow';
import Marquee from '@/components/shared/marquee';
import ScrollFillText from '@/components/shared/scroll-fill-text';
import { cn } from '@/lib/utils';

export type TestimonialCardProps = {
  quote: string;
  name: string;
  subtitle: string;
  className?: string;
};

export function TestimonialCard({ quote, name, subtitle, className }: TestimonialCardProps) {
  const testimonialCardClassName = `testimonial-card flex h-[320px] w-[480px] shrink-0 flex-col justify-between rounded-[18px] bg-white p-[36px] max-md:w-full max-md:max-w-[480px] max-sm:h-auto max-sm:min-h-[260px] max-sm:w-[86vw] max-sm:max-w-[420px] max-sm:p-6 ${className ? className : ''
    }`;

  return (
    <div className={testimonialCardClassName}>
      <p className='w-full text-[16px] font-medium leading-[24px] text-[#140f28]'>{quote}</p>

      <div className='flex w-full flex-col items-start gap-[16px]'>
        <div className='flex items-center gap-[8px]'>
          {Array.from({ length: 5 }).map((_, index) => (
            <StarFill key={index} />
          ))}
        </div>

        <div className='flex min-w-0 flex-col'>
          <p className='text-[16px] font-medium leading-[24px] text-[#140f28]'>{name}</p>
          <p className='text-[16px] font-normal leading-[24px] text-[#5a5a5a]'>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;

const sectionTestimonials: TestimonialCardProps[] = [
  {
    quote: 'Cool und effektiv. Nicht mit Funktionen überladen, die ich nicht brauche',
    name: 'Matthias Traub',
    subtitle: 'Reviewed on Google Play',
  },
  {
    quote:
      "One of the best open-source alternatives to notion. It was easy to transfer my data from notion to here. I also highly recommend the desktop version, it's as amazing as this.❤️❤️❤️❤️❤️",
    name: 'Sera SD',
    subtitle: 'Reviewed on Google Play',
  },
  {
    quote:
      'I moved from Notion to AppFlowy, because Notion was very heavy and slow, and appflowy is faster, also appflowy is open source, and the sync between device in realtime.',
    name: 'Rinto Proboresky',
    subtitle: 'Reviewed on Google Play',
  },
  {
    quote: 'As a freelancer this app really helps me to get the most out of my work and I really appreciate it',
    name: 'TheBigAlmighty',
    subtitle: 'Reviewed on App Store',
  },
  {
    quote:
      "Recommended! Nice to see an open source project that seems well-run & making a useful product. It's a level now where I feel comfortable using it in a business setting.",
    name: 'Bobstar76544',
    subtitle: 'Reviewed on App Store',
  },
  {
    quote:
      "La meilleure solution de note alternative à Notion gratuite et open source je l'utilise maintenant tout les jours pour mes projets. Merci les devs",
    name: 'Bastien Boucq',
    subtitle: 'Reviewed on Google Play',
  },
  {
    quote: 'Me encanta AppFlowy, la tengo sincronizada en mi laptop y en mi celular. Me gusta mucho más que Notion.',
    name: 'Carlos Eduardo Magallon Zepeda',
    subtitle: 'Reviewed on Google Play',
  },
  {
    quote:
      'Our product velocity increased by 40% in the first quarter. The team spends less time on boilerplate and more time on core features.',
    name: 'Reviewed on Google Play',
    subtitle: 'Reviewed on G2 Crowd',
  },
  {
    quote:
      'Passing our latest security audit was much easier because this tool stays within our infrastructure. Total control, no external leaks.',
    name: 'Julian Ricci',
    subtitle: 'Reviewed on Google Play',
  },
  {
    quote:
      'Best option for self hosting for projects and organization\n\nBefore we started this we didn’t have a good system for collaboration on projects. Now appflowy solved this. We use it for our international business and project management',
    name: 'casual retired',
    subtitle: 'Reviewed on App Store',
  },
  {
    quote: 'Hidden gem, private notion killer.',
    name: 'S Gill',
    subtitle: 'Reviewed on Google Play',
  },
  {
    quote:
      'Voulant utilisé une application similaire à notion sur Linux , j’ai trouvé cette application qui est presque comme notion et qui se synchronise correctement entre chaque appareil Linux -iOS et même Windows et en plus c’est open source donc je recommande fortement un grand merci au développeurs de appflowy',
    name: 'K4iw',
    subtitle: 'Reviewed on G2 Crowd',
  },
  {
    quote:
      'Finally, an AI tool that respects our VPC boundaries. We get the power of LLMs without ever compromising our data sovereignty.',
    name: 'Elena Vance',
    subtitle: 'Reviewed on Google Play',
  },
  {
    quote:
      'Wonderful. Allowed us to get rid of both Notion & Trello. The developers are super responsive and the community is great.',
    name: 'Julian Engel',
    subtitle: 'Reviewed on Product Hunt',
  },
];

const carouselControlButtonClasses =
  'inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#8427E0] transition-[transform,background-color] duration-180ms ease-ease hover:-translate-y-px hover:bg-slate-200 [&>svg]:h-4 [&>svg]:w-4';

/**
 * The rows run at a constant speed, independent of scrolling — a plain marquee.
 */
const TOP_ROW_SPEED = 70; // px per second
const BOTTOM_ROW_SPEED = 55; // deliberately off from the top row, so the two never lock in step

const testimonialTrackClassName =
  'testimonial-section__track flex w-max items-stretch gap-[20px] max-md:w-full max-md:flex-col max-md:items-center max-md:gap-5';
const testimonialCopyClassName = 'flex shrink-0 items-stretch gap-[20px] max-md:contents';

export function TestimonialSection() {
  const topRowTestimonials = sectionTestimonials.slice(0, 4);
  const bottomRowTestimonials = sectionTestimonials.slice(4);

  const carouselTrackRef = React.useRef<HTMLDivElement>(null);
  const [isStageHovered, setIsStageHovered] = React.useState(false);

  const scrollByCard = (direction: 'prev' | 'next') => {
    const track = carouselTrackRef.current;

    if (!track) {
      return;
    }

    const card = track.querySelector<HTMLElement>('.testimonial-card');

    if (!card) {
      return;
    }

    const gap = Number.parseFloat(window.getComputedStyle(track).gap || '0');
    const offset = card.getBoundingClientRect().width + gap;

    track.scrollBy({
      left: direction === 'next' ? offset : -offset,
      behavior: 'smooth',
    });
  };

  return (
    <div className='w-full overflow-hidden bg-[#F6F6FF] py-[160px] max-md:py-[10vh]'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-[80px] max-xl:px-[4vw]'>
        <div className='flex w-full'>
          <h2 className='text-style-h1 font-bold'>
            <ScrollFillText>Chosen for the way work gets done</ScrollFillText>
          </h2>
        </div>
        <div
          onMouseEnter={() => setIsStageHovered(true)}
          onMouseLeave={() => setIsStageHovered(false)}
          className="testimonial-section__stage relative w-full overflow-hidden pb-[44px] before:pointer-events-none before:absolute before:inset-y-0 before:z-10 before:block before:w-[120px] before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:z-10 after:block after:w-[120px] after:content-[''] max-md:overflow-visible max-md:before:hidden max-md:after:hidden max-sm:hidden"
        >
          <Marquee
            direction={1}
            speed={TOP_ROW_SPEED}
            paused={isStageHovered}
            minViewportWidth={768}
            className='w-max translate-x-[-6vw] max-md:mt-0 max-md:w-full max-md:translate-x-0'
            trackClassName={testimonialTrackClassName}
            copyClassName={testimonialCopyClassName}
            duplicateClassName='max-md:hidden'
          >
            {topRowTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} {...testimonial} />
            ))}
          </Marquee>

          <Marquee
            direction={-1}
            speed={BOTTOM_ROW_SPEED}
            paused={isStageHovered}
            minViewportWidth={768}
            className='mt-[20px] w-max translate-x-[2vw] max-md:ml-0 max-md:mt-0 max-md:w-full max-md:translate-x-0'
            trackClassName={testimonialTrackClassName}
            copyClassName={testimonialCopyClassName}
            duplicateClassName='max-md:hidden'
          >
            {bottomRowTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} {...testimonial} />
            ))}
          </Marquee>
        </div>

        <div className='hidden w-full flex-col gap-6 max-sm:flex'>
          <div
            ref={carouselTrackRef}
            className='flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            aria-label='Testimonial cards'
          >
            {sectionTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} {...testimonial} className='snap-start' />
            ))}
          </div>

          <div className='flex w-full items-center justify-start gap-3'>
            <button
              type='button'
              className={carouselControlButtonClasses}
              onClick={() => scrollByCard('prev')}
              aria-label='Scroll testimonials left'
            >
              <BackArrowIcon />
            </button>
            <button
              type='button'
              className={cn(carouselControlButtonClasses, '[&>svg]:rotate-180')}
              onClick={() => scrollByCard('next')}
              aria-label='Scroll testimonials right'
            >
              <BackArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
