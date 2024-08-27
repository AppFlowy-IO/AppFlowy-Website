'use client';

import { aboutPageConfig } from '@/lib/config/pages';
import React, { useEffect, useMemo, useRef } from 'react';
import '@/styles/scroll-icons.scss';

function ScrollIcons() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

      return setInterval(move, 16); // move every 20ms
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
                color: 'var(--color-text)',
              }}
              className={'logo'}
            >
              <img src={item.logo} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollIcons;
