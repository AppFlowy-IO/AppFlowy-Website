'use client';

import { aboutPageConfig } from '@/lib/config/pages';
import { useClient } from '@/lib/hooks/use-client';
import React, { useEffect, useMemo, useRef } from 'react';
import '@/styles/scroll-icons.scss';

function ScrollIcons() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { isMobile } = useClient();

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    const mediaQuery = typeof window !== 'undefined' && 'matchMedia' in window ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (mediaQuery?.matches) {
      scrollContainer.scrollTo(0, 0);
      return;
    }

    let currentScrollPosition = scrollContainer.scrollLeft || 0;
    let animationFrameId: number | null = null;
    let lastTimestamp = performance.now();
    const frameDuration = isMobile ? 48 : 30; // throttle updates to ~20-30 FPS

    const step = (timestamp: number) => {
      const elapsed = timestamp - lastTimestamp;

      if (elapsed >= frameDuration) {
        const totalWidth = scrollContainer.scrollWidth;

        currentScrollPosition += 1;
        if (currentScrollPosition >= totalWidth / 2) {
          currentScrollPosition = 0;
        }

        scrollContainer.scrollTo(currentScrollPosition, 0);
        lastTimestamp = timestamp;
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMobile]);
  const logos = useMemo(
    () => [
      ...aboutPageConfig.developers.logos,
      ...aboutPageConfig.developers.logos, // copy the logos to make the scrolling smoother
    ],
    []
  );

  return (
    <div className={'scroll-icons'}>
      <div className={'scroll-icons-title'}>Trusted by teams and individuals from</div>
      <div ref={scrollRef} className={'developers-logos'}>
        <div className={'logo-wrapper'}>
          {logos.map((item, index) => {
            // Extract logo name from path (e.g., '/images/google.svg' -> 'google')
            const logoName = item.logo.replace('/images/', '').replace('.svg', '');

            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  width: '220px',
                  height: '100px',
                  padding: '30px 20px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  borderRadius: '79px',
                  background: 'rgba(245, 245, 250, 0.45)',
                  color: 'var(--color-text)',
                }}
                className={'logo opacity-100'}
              >
                <svg
                  className='opacity-60'
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '160px',
                    maxHeight: '50px',
                    filter:
                      'brightness(0) saturate(100%) invert(7%) sepia(32%) saturate(2387%) hue-rotate(264deg) brightness(96%) contrast(104%)',
                  }}
                  aria-label={item.name}
                >
                  <use href={`/images/company-logos-sprite.svg#logo-${logoName}`} />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ScrollIcons;
