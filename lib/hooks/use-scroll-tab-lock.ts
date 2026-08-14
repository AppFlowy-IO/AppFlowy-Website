import { useEffect, useRef, type RefObject } from 'react';

type Options = {
  /** Element that gets pinned in the viewport while the tabs are being consumed. */
  targetRef: RefObject<HTMLElement>;
  /** Index of the currently visible tab. */
  index: number;
  /** Total number of tabs. */
  count: number;
  /** Called with +1 / -1 when a scroll gesture should move to the next/previous tab. */
  onStep: (direction: 1 | -1) => void;
  /** Called the first time a scroll gesture takes over the section. */
  onEngage?: () => void;
  enabled?: boolean;
};

/** How much wheel delta has to pile up before a tab change fires. */
const STEP_THRESHOLD = 80;
/** Ignore further deltas for this long after a step, so trackpad momentum can't run the whole set. */
const STEP_COOLDOWN_MS = 700;
/** Grace period while the section snaps itself into place. */
const SETTLE_MS = 450;
/** Fraction of the section that must be visible before scrolling is taken over. */
const COVERAGE = 0.85;
/** Sticky navbar height. */
const NAV_OFFSET = 68;

/**
 * Hijacks vertical wheel scrolling while `targetRef` fills the viewport: each gesture advances the
 * tab set instead of the page. Once the first/last tab is reached, scrolling in that direction is
 * handed back to the page.
 */
export function useScrollTabLock({ targetRef, index, count, onStep, onEngage, enabled = true }: Options) {
  const indexRef = useRef(index);
  const lockedRef = useRef(false);
  const accRef = useRef(0);
  const cooldownUntilRef = useRef(0);
  const onStepRef = useRef(onStep);
  const onEngageRef = useRef(onEngage);

  indexRef.current = index;
  onStepRef.current = onStep;
  onEngageRef.current = onEngage;

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    // Desktop pointers only — touch devices get the stacked mobile layout.
    if (!window.matchMedia('(min-width: 761px) and (pointer: fine)').matches) return;

    const release = () => {
      lockedRef.current = false;
      accRef.current = 0;
    };

    const onWheel = (event: WheelEvent) => {
      const el = targetRef.current;

      if (!el || event.deltaY === 0 || event.ctrlKey) return;

      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;
      const idx = indexRef.current;

      // Nothing left to consume in this direction — let the page scroll normally.
      if ((direction === 1 && idx >= count - 1) || (direction === -1 && idx <= 0)) {
        release();
        return;
      }

      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const visible = Math.min(rect.bottom, viewport) - Math.max(rect.top, NAV_OFFSET);

      if (visible / Math.min(rect.height, viewport - NAV_OFFSET) < COVERAGE) {
        release();
        return;
      }

      if (!event.cancelable) return;
      event.preventDefault();

      const now = performance.now();

      if (!lockedRef.current) {
        lockedRef.current = true;
        accRef.current = 0;
        cooldownUntilRef.current = now + SETTLE_MS;
        onEngageRef.current?.();

        // Snap the section into place so the pinned frame is stable while tabs cycle.
        const gap = Math.max(NAV_OFFSET + 16, NAV_OFFSET + (viewport - NAV_OFFSET - rect.height) / 2);

        window.scrollTo({ top: window.scrollY + rect.top - gap, behavior: 'smooth' });
        return;
      }

      if (now < cooldownUntilRef.current) {
        // Swallow momentum deltas instead of letting them queue up another step.
        accRef.current = 0;
        return;
      }

      accRef.current += event.deltaY;

      if (Math.abs(accRef.current) < STEP_THRESHOLD) return;

      const stepDirection: 1 | -1 = accRef.current > 0 ? 1 : -1;

      accRef.current = 0;
      cooldownUntilRef.current = now + STEP_COOLDOWN_MS;
      onStepRef.current(stepDirection);
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      release();
    };
  }, [count, enabled, targetRef]);
}

export default useScrollTabLock;
