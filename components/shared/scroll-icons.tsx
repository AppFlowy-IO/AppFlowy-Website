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
    let currentScrollPosition = 0;

    const startScrolling = () => {
      const move = () => {
        const totalWidth = scrollContainer.scrollWidth;

        currentScrollPosition += 1; // move 1px per interval
        if (currentScrollPosition >= totalWidth / 2) {
          currentScrollPosition = 0; // reset to 0 when it reaches the end
        }

        scrollContainer.scrollTo(currentScrollPosition, 0);
      };

      return setInterval(move, isMobile ? 48 : 20); // faster scrolling on desktop
    };

    const intervalId = startScrolling();

    // clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);
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
          {logos.map((item, index) => (
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
              <img
                src={item.logo}
                className='opacity-60'
                alt={item.name}
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(7%) sepia(32%) saturate(2387%) hue-rotate(264deg) brightness(96%) contrast(104%)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollIcons;
