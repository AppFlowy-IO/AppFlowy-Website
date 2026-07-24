'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import BackIcon from '@/components/icons/back-icon';
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
    <article className="platform-card">
      <div className="platform-card__copy">
        <div className="platform-card__icon-wrap">
          <Image
            alt=""
            className="platform-card__icon"
            src={icon}
          />
        </div>
        <div>
          <h3 className="platform-card__heading">{heading}</h3>
          <p className="platform-card__subtitle">{subtitle}</p>
        </div>

      </div>

      <div className="platform-card__media">
        <Image
          alt={heading}
          className="platform-card__image"
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
    subtitle: 'Support Mac, Windows, Linux, Browser; Work on the go\nWorks where your team works - including completely offline',
  },
  {
    image: MigrationSupportImage,
    icon: MigrationSupportIcon,
    heading: 'Migration support for your team',
    subtitle: 'Add your later copy here\nAdd your later copy here',
  },
  {
    image: VibrantCommunityImage,
    icon: VibrantCommunityIcon,
    heading: 'A vibrant community of builders',
    subtitle: 'Add your later copy here\nAdd your later copy here',
  },
];

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
    <section className="platform-section">
      <div className="platform-section__inner">
        <div className="platform-section__header">
          <h2 className="platform-section__title">One unified platform for entire workflow</h2>
          <p className="platform-section__subtitle">
            Your team. Your servers. Your rules.
          </p>
        </div>

        <div className="platform-section__carousel-wrap">
          <div
            ref={trackRef}
            className="platform-section__carousel"
            aria-label="Platform cards"
          >
            {platformCards.map((card) => (
              <PlatformCard
                key={card.heading}
                {...card}
              />
            ))}
          </div>

          <div className="platform-section__controls">
            <button
              type="button"
              className="platform-section__control-button"
              onClick={() => scrollByCard('prev')}
              aria-label="Scroll platform cards left"
            >
              <BackIcon />
            </button>
            <button
              type="button"
              className="platform-section__control-button platform-section__control-button--next"
              onClick={() => scrollByCard('next')}
              aria-label="Scroll platform cards right"
            >
              <BackIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
