'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import BackArrowIcon from '@/components/icons/back-arrow-icon';
import ScrollFillText from '@/components/shared/scroll-fill-text';
import { cn } from '@/lib/utils';
import CrossPlatformImage from '@/assets/images/platform/cross-platform.webp';
import CrossPlatformIcon from '@/assets/images/platform/cross-platform-icon.svg';
import MigrationSupportImage from '@/assets/images/platform/migration-support.webp';
import MigrationSupportIcon from '@/assets/images/platform/migration-support-icon.svg';
import VibrantCommunityImage from '@/assets/images/platform/vibrant-community.webp';
import VibrantCommunityIcon from '@/assets/images/platform/vibrant-community-icon.svg';

export type PlatformCardProps = {
  heading: {
    top: string;
    bottom: string;
  };
  subtitle: string;
  icon: StaticImageData | string;
  image: StaticImageData | string;
  /** Marks the trailing duplicate used to make the "next" loop seamless. */
  'aria-hidden'?: boolean;
};

export function PlatformCard({ heading, subtitle, icon, image, 'aria-hidden': ariaHidden }: PlatformCardProps) {

  return (
    <article
      aria-hidden={ariaHidden}
      className="platform-card flex w-[min(100%,840px)] shrink-0 snap-start overflow-hidden rounded-xl bg-white min-h-[440px] max-md:min-h-0 max-md:flex-col"
    >
      <div className="flex w-1/2 flex-col justify-between gap-4 px-8 py-10 max-md:w-full max-md:gap-3 max-md:px-5 max-md:py-5 max-md:pt-8">
        <div className="flex h-8 w-8 items-center justify-center max-md:hidden">
          <Image
            alt={heading.top + ' ' + heading.bottom}
            className="h-8 w-8 object-contain"
            src={icon}
          />
        </div>
        <div>
          <h2 className="mb-4 font-semibold text-style-h2">
            {heading.top}
            <br />
            {heading.bottom}
          </h2>
          <p className="whitespace-pre-line text-style-body-standard text-text-secondary mb-4 md:mb-0">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="relative min-h-[440px] w-1/2 overflow-hidden p-6 max-md:min-h-[280px] max-md:w-full max-md:p-2 max-md:pt-0">
        <Image
          alt={heading.top + ' ' + heading.bottom}
          className="h-full w-full rounded-xl object-cover"
          src={image}
        />
      </div>
    </article>
  );
}

const platformCards: PlatformCardProps[] = [
  {
    image: CrossPlatformImage,
    icon: CrossPlatformIcon,
    heading: {
      top: 'Work anywhere, ',
      bottom: 'on any device',
    },
    subtitle: 'Available on macOS, Windows, Linux, iOS, Android, and the web, with seamless sync across devices.',
  },
  {
    image: VibrantCommunityImage,
    icon: VibrantCommunityIcon,
    heading: {
      top: 'Open core, ',
      bottom: ' built together',
    },
    subtitle: "Auditable and extensible, with transparent development and an active global community.",
  },
  {
    image: MigrationSupportImage,
    icon: MigrationSupportIcon,
    heading: {
      top: 'Migration without',
      bottom: ' compromise',
    },
    subtitle: 'We help you migrate from Notion, Confluence, and more to AppFlowy, without ever touching your data.',
  },
];

// A single trailing duplicate can't always be scrolled far enough to align
// with the start of the track (the browser clamps scrollLeft before it gets
// there), so the loop-reset below would never fire. Duplicating the whole
// set gives the track enough scrollable width to always reach the first
// duplicate cleanly.
const loopCards: PlatformCardProps[] = [...platformCards, ...platformCards];

const controlButtonClasses =
  'inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#8427E0] transition-[transform,background-color] duration-180ms ease-ease hover:-translate-y-px hover:bg-slate-200 [&>svg]:h-4 [&>svg]:w-4';

export default function PlatformSection() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const realCardCount = platformCards.length;

  const getCardPositions = (track: HTMLDivElement) => {
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.platform-card'));
    const trackLeft = track.getBoundingClientRect().left;
    // Scroll position that aligns each card with the start of the track.
    const positions = cards.map((card) => card.getBoundingClientRect().left - trackLeft + track.scrollLeft);

    return { cards, positions };
  };

  const getCurrentIndex = (track: HTMLDivElement, positions: number[]) =>
    positions.reduce(
      (closest, position, index) =>
        Math.abs(position - track.scrollLeft) < Math.abs(positions[closest] - track.scrollLeft) ? index : closest,
      0,
    );

  // Once the loop scrolls onto any duplicate card, snap straight back to the
  // matching real card without animating — duplicates are visually identical
  // to their real counterparts, so the reset is invisible and "next" never
  // runs out of cards. `scrollend` (not a debounced 'scroll' handler) is what
  // makes this reliable: smooth-scroll animations decelerate at the end, so a
  // fixed gap between 'scroll' events can look "settled" while the browser's
  // own animation is still running — racing our instant jump against it and
  // leaving the track at a random in-between position.
  React.useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const handleScrollEnd = () => {
      const { positions } = getCardPositions(track);
      const current = getCurrentIndex(track, positions);

      if (current < realCardCount) {
        return;
      }

      const target = positions[current % realCardCount];

      // `behavior: 'auto'` alone isn't reliably instant here — with
      // scroll-snap-type active some browsers still ease into the settled
      // snap position, which shows up as the exact "visible rewind to card
      // 1" this reset is supposed to hide. Dropping both scroll-behavior and
      // scroll-snap-type for the single jump forces it to be a hard cut.
      track.style.scrollBehavior = 'auto';
      track.style.scrollSnapType = 'none';
      track.scrollLeft = target;
      // Restore next frame, after the browser has applied the jump.
      requestAnimationFrame(() => {
        track.style.scrollBehavior = '';
        track.style.scrollSnapType = '';
      });
    };

    track.addEventListener('scrollend', handleScrollEnd);

    return () => track.removeEventListener('scrollend', handleScrollEnd);
  }, [realCardCount]);

  const scrollByCard = (direction: 'prev' | 'next') => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const { cards, positions } = getCardPositions(track);

    if (cards.length === 0) {
      return;
    }

    const current = getCurrentIndex(track, positions);

    let target: number;

    if (direction === 'next') {
      // Glide onto the duplicate first card past the last real card; the
      // scroll listener above then snaps it back to the real one.
      target = current >= cards.length - 1 ? 0 : current + 1;
    } else {
      // Skip the trailing duplicate when wrapping backward from the first card.
      target = current <= 0 ? realCardCount - 1 : current - 1;
    }

    track.scrollTo({
      left: positions[target],
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F6F6FF] py-[160px] max-md:py-[10vh]">
      <div
        className="platform-section__dot-grid absolute inset-0 z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-[80px] max-xl:px-[4vw]">
        <div className="flex flex-col gap-2">
          <h2 className="text-style-h1 font-bold">
            <ScrollFillText>Self-hosted freedom at enterprise scale</ScrollFillText>
          </h2>
          <p className="max-w-[620px] text-style-h5 font-normal text-text-secondary ">
            Open by design. Flexible by default.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory scroll-smooth gap-7 overflow-x-auto py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Platform cards"
          >
            {loopCards.map((card, index) => (
              <PlatformCard
                key={index < realCardCount ? card.heading.top : `${card.heading.top}-duplicate-${index}`}
                {...card}
                aria-hidden={index >= realCardCount}
              />
            ))}
          </div>

          <div className="flex w-full items-center gap-3 justify-center md:justify-start">
            <button
              type="button"
              className={controlButtonClasses}
              onClick={() => scrollByCard('prev')}
              aria-label="Scroll platform cards left"
            >
              <BackArrowIcon />
            </button>
            <button
              type="button"
              className={cn(controlButtonClasses, '[&>svg]:rotate-180')}
              onClick={() => scrollByCard('next')}
              aria-label="Scroll platform cards right"
            >
              <BackArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
