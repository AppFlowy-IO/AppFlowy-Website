'use client';

import AiOverviewIllu from '@/components/illustrations/ai-overview-illu';
import BacklogIllu from '@/components/illustrations/backlog-illu';
import ProjectTrackingIllu from '@/components/illustrations/project-tracking-illu';
import ReleaseReviewIllu from '@/components/illustrations/release-review-illu';
import WeeklyBriefIllu from '@/components/illustrations/weekly-brief-illu';
import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import { useClient } from '@/lib/hooks/use-client';
import { useInView } from 'framer-motion';
import React, { useEffect, useMemo, useRef } from 'react';
import 'styles/showcase.scss';

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

  const illustrationOptions = useMemo(() => {
    return [
      { value: 'project-tracking', Illustration: ProjectTrackingIllu },
      { value: 'backlog', Illustration: BacklogIllu },
      { value: 'ai-overview', Illustration: AiOverviewIllu },
      { value: 'release-review', Illustration: ReleaseReviewIllu },
      { value: 'weekly-brief', Illustration: WeeklyBriefIllu },
    ];
  }, []);

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const { start, stop } = useAutoPlay({
    options: illustrationOptions,
    onChange: setValue,
    duration: 7500,
  });

  useEffect(() => {
    if (!inView) {
      stop();
    } else {
      start();
    }
  }, [inView, start, stop]);

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
      <div className={'ai-image relative aspect-[1280/696] w-full max-w-[1280px] overflow-hidden'}>
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
    </div>
  );
}

export default MainProducts;
