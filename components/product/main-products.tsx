'use client';

import AiOverviewIllu from '@/components/illustrations/ai-overview-illu';
import BacklogIllu from '@/components/illustrations/backlog-illu';
import ProjectTrackingIllu from '@/components/illustrations/project-tracking-illu';
import ReleaseReviewIllu from '@/components/illustrations/release-review-illu';
import WeeklyBriefIllu from '@/components/illustrations/weekly-brief-illu';
import ProjectTrackerBase from '@/assets/images/illustrations/project-tracker-base.webp';
import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import { useClient } from '@/lib/hooks/use-client';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';
import 'styles/showcase.scss';

const AUTOPLAY_ENABLED = true;

function MainProducts() {
  const [value, setValue] = React.useState('project-tracking');
  const { isClient } = useClient();

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const token = window.localStorage.getItem('token');

    if (token) {
      window.location.href = '/app';
    }
  }, [isClient]);

  // Each illustration's own canvas ratio (native export dimensions), used to
  // size the container to the active illustration instead of forcing every
  // illustration into one fixed ratio.
  const illustrationOptions = useMemo(() => {
    return [
      { value: 'project-tracking', Illustration: ProjectTrackingIllu, aspectRatio: 2560 / 1392 },
      { value: 'backlog', Illustration: BacklogIllu, aspectRatio: 2560 / 1392 },
      { value: 'ai-overview', Illustration: AiOverviewIllu, aspectRatio: 2560 / 1392 },
      { value: 'release-review', Illustration: ReleaseReviewIllu, aspectRatio: 2560 / 1480 },
      { value: 'weekly-brief', Illustration: WeeklyBriefIllu, aspectRatio: 2560 / 1480 },
    ];
  }, []);

  const ref = React.useRef<HTMLDivElement>(null);
  // Generous margin: keeps autoplay (and the animation bursts it triggers)
  // running until the section is a couple of screens away, not just the
  // instant it crosses the viewport edge.
  const inView = useInView(ref, { margin: '800px 0px 800px 0px' });

  // Starts unresolved so the server and first client render only the base image.
  // Once the preference is known, normal-motion users get the animated scene;
  // reduced-motion users keep the base image.
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState<boolean | null>(null);

  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const renderStaticHero = prefersReducedMotion !== false;
  const renderAnimatedHero = prefersReducedMotion === false;

  const { start, stop } = useAutoPlay({
    options: illustrationOptions,
    onChange: setValue,
    duration: 8000,
  });

  useEffect(() => {
    if (!AUTOPLAY_ENABLED || renderStaticHero) {
      stop();
      return;
    }

    if (!inView) {
      stop();
    } else {
      start();
    }
  }, [inView, renderStaticHero, start, stop]);

  const activeIllustration =
    illustrationOptions.find((illustration) => illustration.value === value) ?? illustrationOptions[0];

  const ActiveIllustration = activeIllustration.Illustration;

  return (
    <div
      ref={ref}
      className={'main-product'}
    >
      {renderStaticHero ? (
        <div
          className={'main-product__static ai-image relative w-full max-w-[1280px] overflow-hidden'}
          style={{ aspectRatio: 2560 / 1392 }}
        >
          <Image
            src={ProjectTrackerBase}
            alt={'Project Tracker'}
            fill
            priority
            sizes={'(max-width: 1280px) 100vw, 1280px'}
            className={'object-contain'}
          />
        </div>
      ) : null}
      {renderAnimatedHero ? (
        <div
          className={'main-product__animated ai-image relative w-full max-w-[1280px] overflow-hidden'}
          style={{ aspectRatio: activeIllustration.aspectRatio }}
        >
          <ActiveIllustration
            key={activeIllustration.value}
            priority={false}
            className={'visual-image'}
          />
        </div>
      ) : null}
    </div>
  );
}

export default MainProducts;
