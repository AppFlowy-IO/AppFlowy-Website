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
import { cn } from '@/lib/utils';

/** Rows render static for anyone with the OS reduced-motion setting enabled. */
const RESPECT_REDUCED_MOTION = true;
/** Longest frame we integrate, so a backgrounded tab doesn't jump on return. */
const MAX_FRAME_DELTA = 50;

export type MarqueeProps = {
  /**
   * One copy of the row's items. Rendered as many times as it takes to fill the
   * track, so it must be safe to duplicate.
   */
  children: React.ReactNode;
  /** `1` runs left to right, `-1` runs right to left. */
  direction: 1 | -1;
  /** Constant speed, in px per second. */
  speed: number;
  /** Skips the animation below this viewport width, where a row may reflow. */
  minViewportWidth?: number;
  /** Classes for the outer wrapper. The wrapper's parent must clip overflow. */
  className?: string;
  /** Classes for the animated track. Must lay the copies out in a row with a gap. */
  trackClassName?: string;
  /** Classes for each copy. Must lay one copy's items out in a row with the same gap. */
  copyClassName?: string;
  /** Extra classes for the duplicate copies only — e.g. to drop them when stacked. */
  duplicateClassName?: string;
};

/**
 * An infinitely looping row. The children are repeated and the track is
 * translated by exactly one copy's width before wrapping, so the seam is
 * invisible. Speed is constant and independent of scrolling.
 */
export default function Marquee({
  children,
  direction,
  speed,
  minViewportWidth = 0,
  className,
  trackClassName,
  copyClassName,
  duplicateClassName,
}: MarqueeProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Width of one copy plus the gap that follows it. Translating by exactly this
  // is what makes the reset invisible.
  const periodRef = React.useRef(0);
  const enabledRef = React.useRef(false);

  // Enough copies to cover the visible width plus one full period; fewer would
  // leave a gap at the far edge of the loop when a copy is narrower than the row.
  const [copies, setCopies] = React.useState(2);

  const prefersReducedMotion = useReducedMotion();
  const [isWideEnough, setIsWideEnough] = React.useState(minViewportWidth === 0);
  const inView = useInView(wrapperRef, { margin: '200px' });

  const enabled =
    isWideEnough && inView && !(RESPECT_REDUCED_MOTION && prefersReducedMotion);

  enabledRef.current = enabled;

  React.useEffect(() => {
    if (minViewportWidth === 0) {
      setIsWideEnough(true);
      return;
    }

    const query = window.matchMedia(`(min-width: ${minViewportWidth}px)`);
    const update = () => setIsWideEnough(query.matches);

    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, [minViewportWidth]);

  // Re-measure on resize and on web-font load; a stale period is what makes a
  // marquee visibly jump once per loop.
  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const copy = copyRef.current;

    if (!wrapper || !track || !copy) {
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

      const visibleWidth = wrapper.parentElement?.clientWidth ?? wrapper.clientWidth;

      setCopies(Math.max(2, Math.ceil(visibleWidth / period) + 1));

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
    const moveBy = direction * speed * (frameDelta / 1000);

    x.set(wrap(-period, 0, x.get() + moveBy));
  });

  return (
    <div ref={wrapperRef} className={className}>
      <motion.div ref={trackRef} style={{ x: enabled ? x : 0 }} className={trackClassName}>
        <div ref={copyRef} className={copyClassName}>
          {children}
        </div>

        {/* Duplicates are what make the wrap seamless. Hidden from assistive
            tech so the content isn't announced several times over. */}
        {Array.from({ length: copies - 1 }).map((_, index) => (
          <div
            key={index}
            aria-hidden='true'
            className={cn(copyClassName, duplicateClassName)}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
