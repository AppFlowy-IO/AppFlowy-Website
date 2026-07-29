'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import BackArrowIcon from '@/components/icons/back-arrow-icon';
import { cn } from '@/lib/utils';
import CrossPlatformImage from '@/assets/images/platform/cross-platform.webp';
import CrossPlatformIcon from '@/assets/images/platform/cross-platform-icon.svg';
import MigrationSupportImage from '@/assets/images/platform/migration-support.webp';
import MigrationSupportIcon from '@/assets/images/platform/migration-support-icon.svg';
import VibrantCommunityImage from '@/assets/images/platform/vibrant-community.webp';
import VibrantCommunityIcon from '@/assets/images/platform/vibrant-community-icon.svg';

export type PlatformCardProps = {
  heading: string;
  subtitle: string;
  icon: StaticImageData | string;
  image: StaticImageData | string;
};

export function PlatformCard({ heading, subtitle, icon, image }: PlatformCardProps) {
  return (
    <article className="platform-card flex w-[min(100%,820px)] shrink-0 snap-start overflow-hidden rounded-xl bg-white min-h-[440px]">
      <div className="flex w-1/2 flex-col justify-between gap-4 p-8 max-md:w-[58%] max-md:p-5">
        <div className="flex h-8 w-8 items-center justify-center">
          <Image
            alt=""
            className="h-8 w-8 object-contain"
            src={icon}
          />
        </div>
        <div>
          <h2 className="mb-4 text-style-h2 font-semibold">
            {heading}
          </h2>
          <p className="whitespace-pre-line text-style-body-standard text-text-secondary">
            {subtitle}
          </p>
        </div>

      </div>

      <div className="relative min-h-[440px] w-1/2 overflow-hidden p-6 max-md:min-h-[340px] max-md:w-[42%]">
        <Image
          alt={heading}
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
    heading: 'Cross platform and Always available',
    subtitle: 'Supports MacOS, Windows, Linux, Web; Works on the go\nWorks where your team works - including completely offline',
  },
  {
    image: MigrationSupportImage,
    icon: MigrationSupportIcon,
    heading: 'Migration support for your team',
    subtitle: "Auditable, extensible, and backed by a community that means it's not going anywhere.",
  },
  {
    image: VibrantCommunityImage,
    icon: VibrantCommunityIcon,
    heading: 'A vibrant community of builders',
    subtitle: 'We help you migrate without touching your data.',
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

    const card = track.querySelector<HTMLElement>('.platform-card');

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
    <section className="relative w-full overflow-hidden bg-[#F6F6FF] py-[120px] max-md:py-[10vh]">
      <div
        className="platform-section__dot-grid absolute inset-0 z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-[80px] max-xl:px-[4vw]">
        <div className="flex max-w-[760px] flex-col gap-5 max-md:gap-4">
          <h2 className="text-h1 font-bold tracking-[-0.03em] text-[#16152d] max-md:text-[clamp(32px,7vw,56px)] max-md:leading-[1.08]">
            One unified platform for entire workflow
          </h2>
          <p className="max-w-[620px] text-h5 font-medium text-[#58585A] max-md:text-[16px] max-md:leading-[1.5]">
            Your team. Your servers. Your rules.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory scroll-smooth gap-7 overflow-x-auto px-2 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Platform cards"
          >
            {platformCards.map((card) => (
              <PlatformCard
                key={card.heading}
                {...card}
              />
            ))}
          </div>

          <div className="flex w-full items-center justify-start gap-3">
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
