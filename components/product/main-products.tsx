'use client';

import AiOverview from '@/assets/images/product/ai-overview.webp';
import Backlog from '@/assets/images/product/backlog.webp';
import ProjectTracking from '@/assets/images/product/project-tracking.webp';
import ReleaseReview from '@/assets/images/product/release-review.webp';
import WeeklyBrief from '@/assets/images/product/weekly-brief.webp';
import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import { useClient } from '@/lib/hooks/use-client';
import { useInView } from 'framer-motion';
import Image from 'next/image';
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

  const imageOptions = useMemo(() => {
    return [
      { value: 'project-tracking', src: ProjectTracking.src, alt: 'Project tracking' },
      { value: 'backlog', src: Backlog.src, alt: 'Backlog' },
      { value: 'ai-overview', src: AiOverview.src, alt: 'AI overview' },
      { value: 'release-review', src: ReleaseReview.src, alt: 'Release review' },
      { value: 'weekly-brief', src: WeeklyBrief.src, alt: 'Weekly brief' },
    ];
  }, []);

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const { start, stop } = useAutoPlay({
    options: imageOptions,
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

  const activeImage = imageOptions.find((image) => image.value === value) ?? imageOptions[0];
  const previousImage = imageOptions.find((image) => image.value === previousValue) ?? null;

  return (
    <div
      ref={ref}
      className={'main-product'}
    >
      <div className={'ai-image relative aspect-[1280/696] w-full max-w-[1280px] overflow-hidden'}>
        <Image
          key={activeImage.value}
          src={activeImage.src}
          loading={'eager'}
          className={`visual-image ${previousImage ? 'feature-illustration--enter' : ''}`}
          alt={activeImage.alt}
          width={1280}
          height={696}
        />
        {previousImage ? (
          <Image
            key={`${previousImage.value}-leaving`}
            src={previousImage.src}
            loading={'eager'}
            className={'visual-image feature-illustration--leave'}
            alt={''}
            aria-hidden={'true'}
            width={1280}
            height={696}
          />
        ) : null}
      </div>
    </div>
  );
}

export default MainProducts;
