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
import React, { useEffect, useMemo, useRef } from 'react';
import 'styles/showcase.scss';

const AUTOPLAY_ENABLED = true;

function MainProducts() {
  const [value, setValue] = React.useState('project-tracking');
  const [previousValue, setPreviousValue] = React.useState<string | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const previousValueRef = useRef(value);
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

  // Starts unresolved so the server and first client render match. CSS handles
  // the first paint, then React unmounts the unused hero once the preference is
  // known.
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
  const renderAnimatedHero = prefersReducedMotion !== true;

  const { start, stop } = useAutoPlay({
    options: illustrationOptions,
    onChange: setValue,
    duration: 7500,
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

  // Drives the crossfade for every value change, reusing the illustration
  // enter/leave animation from the product showcase section.
  useEffect(() => {
    const leavingValue = previousValueRef.current;

    previousValueRef.current = value;

    if (leavingValue === value) return;

    if (transitionTimer.current) {
      window.clearTimeout(transitionTimer.current);
    }

    setPreviousValue(leavingValue);
    transitionTimer.current = window.setTimeout(() => {
      setPreviousValue(null);
      transitionTimer.current = null;
    }, 850);
  }, [value]);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  const activeIllustration =
    illustrationOptions.find((illustration) => illustration.value === value) ?? illustrationOptions[0];
  const previousIllustration = illustrationOptions.find((illustration) => illustration.value === previousValue) ?? null;

  const ActiveIllustration = activeIllustration.Illustration;
  const PreviousIllustration = previousIllustration?.Illustration;

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
            className={`visual-image ${previousIllustration ? 'feature-illustration--enter' : ''}`}
          />
          {PreviousIllustration ? (
            <div aria-hidden={'true'}>
              <PreviousIllustration
                key={`${previousIllustration.value}-leaving`}
                className={'visual-image feature-illustration--leave'}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default MainProducts;
