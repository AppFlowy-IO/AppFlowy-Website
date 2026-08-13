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
};

export function PlatformCard({ heading, subtitle, icon, image }: PlatformCardProps) {

  return (
    <article className="platform-card flex w-[min(100%,840px)] shrink-0 snap-start overflow-hidden rounded-xl bg-white min-h-[440px] max-md:min-h-0 max-md:flex-col">
      <div className="flex w-1/2 flex-col justify-between gap-4 px-8 py-10 max-md:w-full max-md:gap-3 max-md:px-5 max-md:py-5">
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

      <div className="relative min-h-[440px] w-1/2 overflow-hidden p-6 max-md:min-h-[280px] max-md:w-full max-md:p-5 max-md:pt-0">
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
    image: MigrationSupportImage,
    icon: MigrationSupportIcon,
    heading: {
      top: 'Open core, ',
      bottom: ' built together',
    },
    subtitle: "Auditable and extensible, with transparent development and an active global community.",
  },
  {
    image: VibrantCommunityImage,
    icon: VibrantCommunityIcon,
    heading: {
      top: 'Migration without',
      bottom: ' compromise',
    },
    subtitle: 'We help you migrate from Notion, Confluence, and more to AppFlowy, without ever touching your data.',
  },
];

const controlButtonClasses =
  'inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#8427E0] transition-[transform,background-color] duration-180ms ease-ease hover:-translate-y-px hover:bg-slate-200 [&>svg]:h-4 [&>svg]:w-4';

export default function PlatformSection() {
  const trackRef = React.useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 'prev' | 'next') => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const cards = Array.from(track.querySelectorAll<HTMLElement>('.platform-card'));

    if (cards.length === 0) {
      return;
    }

    const trackLeft = track.getBoundingClientRect().left;
    // Scroll position that aligns each card with the start of the track.
    const positions = cards.map((card) => card.getBoundingClientRect().left - trackLeft + track.scrollLeft);

    const current = positions.reduce(
      (closest, position, index) =>
        Math.abs(position - track.scrollLeft) < Math.abs(positions[closest] - track.scrollLeft) ? index : closest,
      0,
    );

    // The last card may not be able to align with the start of the track, so
    // rely on the scroll edges to know when to wrap around.
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    const atStart = track.scrollLeft <= 1;

    let target: number;

    if (direction === 'next') {
      target = atEnd || current === cards.length - 1 ? 0 : current + 1;
    } else {
      target = atStart || current === 0 ? cards.length - 1 : current - 1;
    }

    track.scrollTo({
      left: positions[target],
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F6F6FF] py-[120px] max-md:py-[10vh]">
      <div
        className="platform-section__dot-grid absolute inset-0 z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-[80px] max-xl:px-[4vw]">
        <div className="flex flex-col gap-5 max-md:gap-4">
          <h2 className="text-style-h1 font-bold">
            <ScrollFillText>Self-hosted freedom at enterprise scale</ScrollFillText>
          </h2>
          <p className="max-w-[620px] text-style-h5 font-normal text-text-tertiary ">
            Your team. Your servers. Your rules.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory scroll-smooth gap-7 overflow-x-auto py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Platform cards"
          >
            {platformCards.map((card) => (
              <PlatformCard
                key={card.heading.top}
                {...card}
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
