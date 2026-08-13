'use client';

import React from 'react';
import {
  MotionValue,
  motion,
  useIsomorphicLayoutEffect,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset'];

export type ScrollFillTextProps = {
  /**
   * Plain text only. The component measures where the text wraps and animates
   * each visual line on its own, so it cannot host nested markup.
   */
  children: string;
  className?: string;
  lineClassName?: string;
  /** Colour of the text before it is filled in. */
  baseClassName?: string;
  /** Colour the text fills up to. */
  fillClassName?: string;
  /**
   * Scroll window that drives the fill, as `[start, end]` edge pairs.
   * Defaults to "top of the text at 90% of the viewport" until "top of the
   * text at 40% of the viewport".
   */
  offset?: ScrollOffset;
  /** Width of the soft gradient edge, as a percentage of the line width. */
  softness?: number;
  /** How much later each line starts, as a fraction of the whole scroll window. */
  stagger?: number;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * A single visual line. Renders the text twice: the readable copy in the base
 * colour, and an `aria-hidden` copy in the fill colour that is masked by a
 * gradient sliding across on scroll.
 */
function FillLine({
  text,
  progress,
  start,
  end,
  softness,
  baseClassName,
  fillClassName,
  lineClassName,
}: {
  text: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  softness: number;
  baseClassName?: string;
  fillClassName?: string;
  lineClassName?: string;
}) {
  // Runs off the scroll MotionValue, so the fill never re-renders React.
  const mask = useTransform(progress, (value) => {
    const local = clamp((value - start) / (end - start));
    // Travels from fully transparent (-softness) to fully opaque (100).
    const edge = -softness + local * (100 + softness);

    return `linear-gradient(90deg, #000 ${edge}%, transparent ${edge + softness}%)`;
  });

  return (
    <span className={cn('relative block w-fit max-w-full', lineClassName)}>
      <span className={baseClassName}>{text}</span>
      <motion.span
        aria-hidden="true"
        className={cn('pointer-events-none absolute inset-0 select-none', fillClassName)}
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function ScrollFillText({
  children,
  className,
  lineClassName,
  baseClassName = 'text-text-tertiary',
  fillClassName = 'text-text-primary',
  offset = ['start 0.9', 'start 0.4'],
  softness = 14,
  stagger = 0.25,
}: ScrollFillTextProps) {
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const [lines, setLines] = React.useState<string[] | null>(null);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset,
  });

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion) {
      setLines(null);
      return;
    }

    const el = measureRef.current;

    if (!el) return;

    let frame = 0;
    let cancelled = false;

    // Groups words by the vertical position the browser wrapped them onto.
    // Reading it off a Range keeps the measured copy as one untouched text
    // node, so the line breaks match what the browser would do naturally.
    const measure = () => {
      const node = el.firstChild;

      if (cancelled || !node || node.nodeType !== Node.TEXT_NODE) return;

      const range = document.createRange();
      const groups: { top: number; words: string[] }[] = [];

      for (const match of Array.from(children.matchAll(/\S+/g))) {
        const index = match.index ?? 0;

        range.setStart(node, index);
        range.setEnd(node, index + match[0].length);

        const top = range.getBoundingClientRect().top;
        const current = groups[groups.length - 1];

        if (current && Math.abs(current.top - top) < 2) {
          current.words.push(match[0]);
        } else {
          groups.push({ top, words: [match[0]] });
        }
      }

      const next = groups.map((group) => group.words.join(' '));

      if (next.length === 0) return;

      setLines((prev) =>
        prev && prev.length === next.length && prev.every((line, i) => line === next[i]) ? prev : next,
      );
    };

    measure();

    // Re-wrapping happens on resize and once webfonts swap in.
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });

    observer.observe(el);
    document.fonts?.ready.then(measure).catch(() => undefined);

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [children, reducedMotion]);

  // Every line ends by the time progress hits 1, and each one starts a little
  // after the line above it.
  const count = lines?.length ?? 1;
  const step = Math.min(stagger, 0.9 / Math.max(count - 1, 1));
  const span = 1 - step * (count - 1);

  return (
    <span
      ref={rootRef}
      className={cn('relative block', className)}
    >
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute inset-x-0 top-0 select-none"
      >
        {children}
      </span>

      {lines ? (
        lines.map((line, index) => (
          <FillLine
            key={`${index}-${line}`}
            text={line}
            progress={scrollYProgress}
            start={index * step}
            end={index * step + span}
            softness={softness}
            baseClassName={baseClassName}
            fillClassName={fillClassName}
            lineClassName={lineClassName}
          />
        ))
      ) : (
        // Shown before measurement, without JS, and whenever reduced motion is
        // requested — always the finished state, never the unfilled one.
        <span className={fillClassName}>{children}</span>
      )}
    </span>
  );
}
