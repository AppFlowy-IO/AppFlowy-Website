'use client';

import React from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  wrap,
} from 'framer-motion';
import BackArrowIcon from '@/components/icons/back-arrow-icon';
import StarFill from '@/components/icons/star-yellow';
import ScrollFillText from '@/components/shared/scroll-fill-text';
import { cn } from '@/lib/utils';

export type TestimonialCardProps = {
  quote: string;
  name: string;
  subtitle: string;
  className?: string;
};

export function TestimonialCard({ quote, name, subtitle, className }: TestimonialCardProps) {
  const testimonialCardClassName = `testimonial-card flex h-[320px] w-[480px] shrink-0 flex-col justify-between rounded-[18px] bg-white p-[36px] max-md:w-full max-md:max-w-[480px] max-sm:h-auto max-sm:min-h-[260px] max-sm:w-[86vw] max-sm:max-w-[420px] max-sm:p-6 ${className ? className : ''}`;

  return (
    <div
      className={testimonialCardClassName
      }
    >
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
    quote:
      "The AI's context-awareness regarding our specific codebase is eerie. It's like having a senior dev sitting right next to me 24/7.",
    name: 'Amara Okafor',
    subtitle: 'Reviewed on G2 Crowd',
  },
  {
    quote:
      'The self-hosted setup was surprisingly painless. It’s rare to find a tool that balances high security with such a smooth developer experience.',
    name: 'Hiroshi Tanaka',
    subtitle: 'Reviewed on G2 Crowd',
  },
  {
    quote:
      'Our product velocity increased by 40% in the first quarter. The team spends less time on boilerplate and more time on core features.',
    name: 'Sarah Jenkins',
    subtitle: 'Reviewed on G2 Crowd',
  },
  {
    quote:
      'Owning our data while leveraging cutting-edge AI is a non-negotiable for us. This platform is the only one that truly delivered on that promise.',
    name: 'David Chen',
    subtitle: 'Reviewed on G2 Crowd',
  },
  {
    quote:
      'Finally, an AI tool that respects our VPC boundaries. We get the power of LLMs without ever compromising our data sovereignty.',
    name: 'Elena Vance',
    subtitle: 'Reviewed on G2 Crowd',
  },
  {
    quote:
      'It has completely transformed our internal knowledge base. Finding answers in our legacy documentation now takes seconds instead of hours.',
    name: 'Sophie Müller',
    subtitle: 'Reviewed on G2 Crowd',
  },
  {
    quote:
      'Passing our latest security audit was much easier because this tool stays within our infrastructure. Total control, no external leaks.',
    name: 'Julian Ricci',
    subtitle: 'Reviewed on G2 Crowd',
  },
  {
    quote:
      'Finally, an AI tool that respects our VPC boundaries. We get the power of LLMs without ever compromising our data sovereignty.',
    name: 'Elena Vance',
    subtitle: 'Reviewed on G2 Crowd',
  },
  {
    quote:
      'Integrating this workspace changed how we handle PR reviews. What used to be a bottleneck is now a seamless, automated flow.',
    name: 'Marcus Thorne',
    subtitle: 'Reviewed on G2 Crowd',
  },
];

const carouselControlButtonClasses =
  'inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#8427E0] transition-[transform,background-color] duration-180ms ease-ease hover:-translate-y-px hover:bg-slate-200 [&>svg]:h-4 [&>svg]:w-4';

/**
 * The rows run at a constant speed, independent of scrolling — a plain marquee.
 */
const TOP_ROW_SPEED = 70; // px per second
const BOTTOM_ROW_SPEED = 55; // deliberately off from the top row, so the two never lock in step
/** Rows slow to a near-stop on hover so a card can actually be read. */
const HOVER_SPEED_FACTOR = 0.08;
/** Longest frame we integrate, so a backgrounded tab doesn't jump on return. */
const MAX_FRAME_DELTA = 50;

/** Rows render static for anyone with the OS reduced-motion setting enabled. */
const RESPECT_REDUCED_MOTION = true;

function MarqueeRow({
  testimonials,
  direction,
  baseSpeed,
  active,
  paused,
  className,
}: {
  testimonials: TestimonialCardProps[];
  /** `1` runs left to right, `-1` runs right to left. */
  direction: 1 | -1;
  baseSpeed: number;
  /** False while the section is off-screen, so idle frames cost nothing. */
  active: boolean;
  paused: boolean;
  className?: string;
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Width of one copy of the list, including the gap that follows it. Wrapping
  // by exactly this makes the reset invisible.
  const periodRef = React.useRef(0);
  const enabledRef = React.useRef(false);
  const pausedRef = React.useRef(false);
  // Eased so hovering in and out doesn't snap the speed.
  const hoverFactorRef = React.useRef(1);

  const prefersReducedMotion = useReducedMotion();
  const [isWideViewport, setIsWideViewport] = React.useState(false);

  const enabled =
    isWideViewport && active && !(RESPECT_REDUCED_MOTION && prefersReducedMotion);

  enabledRef.current = enabled;
  pausedRef.current = paused;

  // Only animate at md and up. Below that the rows are vertical stacks, where a
  // horizontal translation would be meaningless.
  React.useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setIsWideViewport(query.matches);

    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  // Re-measure on resize and on web-font load; a stale period is what makes a
  // marquee visibly jump once per loop.
  React.useEffect(() => {
    const track = trackRef.current;
    const copy = copyRef.current;

    if (!track || !copy) {
      return;
    }

    const measure = () => {
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || '0');
      const period = copy.offsetWidth + gap;

      if (period <= 0) {
        return;
      }

      const hadPeriod = periodRef.current > 0;

      periodRef.current = period;

      // Running left to right has to start a full copy back, otherwise the
      // first frame immediately wraps and pops.
      x.set(hadPeriod ? wrap(-period, 0, x.get()) : direction === 1 ? -period : 0);
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(copy);

    return () => observer.disconnect();
  }, [direction, x]);

  useAnimationFrame((_, delta) => {
    const period = periodRef.current;

    if (!enabledRef.current || period <= 0) {
      return;
    }

    const frameDelta = Math.min(delta, MAX_FRAME_DELTA);
    const hoverTarget = pausedRef.current ? HOVER_SPEED_FACTOR : 1;

    hoverFactorRef.current +=
      (hoverTarget - hoverFactorRef.current) * Math.min(1, frameDelta / 160);

    const moveBy = direction * baseSpeed * hoverFactorRef.current * (frameDelta / 1000);

    x.set(wrap(-period, 0, x.get() + moveBy));
  });

  return (
    <div className={cn('w-max max-md:w-full', className)}>
      <motion.div
        ref={trackRef}
        style={{ x: enabled ? x : 0 }}
        className='testimonial-section__track flex w-max items-stretch gap-[20px] max-md:w-full max-md:flex-col max-md:items-center max-md:gap-5'
      >
        <div
          ref={copyRef}
          className='flex shrink-0 items-stretch gap-[20px] max-md:contents'
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} {...testimonial} />
          ))}
        </div>

        {/* Duplicate copy: what makes the wrap seamless. Hidden from assistive
            tech, and dropped entirely where the row is a vertical stack. */}
        <div
          aria-hidden='true'
          className='flex shrink-0 items-stretch gap-[20px] max-md:hidden'
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`duplicate-${testimonial.name}-${index}`} {...testimonial} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function TestimonialSection() {
  const topRowTestimonials = sectionTestimonials.slice(0, 4);
  const bottomRowTestimonials = sectionTestimonials.slice(4);

  const carouselTrackRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef, { margin: '200px' });
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
    <div className='w-full overflow-hidden bg-[#F6F6FF] py-[120px] max-md:py-[10vh]'>
      <div className='mx-auto flex w-full max-w-[1440px] flex-col gap-10 items-center px-[80px] max-xl:px-[4vw]'>
        <div className='flex w-full'>
          <h2 className='text-style-h1 font-bold'>
            <ScrollFillText>Teams that ship smarter choose AppFlowy</ScrollFillText>
          </h2>
        </div>
        <div
          ref={stageRef}
          onMouseEnter={() => setIsStageHovered(true)}
          onMouseLeave={() => setIsStageHovered(false)}
          className="testimonial-section__stage relative w-full overflow-hidden pb-[44px] before:pointer-events-none before:absolute before:inset-y-0 before:z-10 before:block before:w-[120px] before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:z-10 after:block after:w-[120px] after:content-[''] max-md:overflow-visible max-md:before:hidden max-md:after:hidden max-sm:hidden"
        >
          <MarqueeRow
            testimonials={topRowTestimonials}
            direction={1}
            baseSpeed={TOP_ROW_SPEED}
            active={stageInView}
            paused={isStageHovered}
            className='translate-x-[-6vw] max-md:mt-0 max-md:translate-x-0'
          />

          <MarqueeRow
            testimonials={bottomRowTestimonials}
            direction={-1}
            baseSpeed={BOTTOM_ROW_SPEED}
            active={stageInView}
            paused={isStageHovered}
            className='mt-[20px] translate-x-[2vw] max-md:ml-0 max-md:mt-0 max-md:translate-x-0'
          />
        </div>

        <div className='hidden w-full flex-col gap-6 max-sm:flex'>
          <div
            ref={carouselTrackRef}
            className='flex snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            aria-label='Testimonial cards'
          >
            {sectionTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                {...testimonial}
                className='snap-start'
              />
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
