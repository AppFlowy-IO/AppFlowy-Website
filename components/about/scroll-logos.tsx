'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { aboutPageConfig } from '@/lib/config/pages';
import { useDarkContext } from '@/lib/hooks/use-dark-context';

function ScrollLogos() {
  const isDark = useDarkContext();
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
    <div className={'developers'}>
      <div className={'developers-title'}>{aboutPageConfig.developers.title}</div>

      <div ref={scrollRef} className={'developers-logos'}>
        <div className={'logo-wrapper'}>
          {logos.map((item, index) => (
            <div
              key={index}
              style={{
                color: '#1E0C32',
              }}
              className={'logo'}
            >
              <img src={isDark ? item.darkLogo : item.logo} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollLogos;
