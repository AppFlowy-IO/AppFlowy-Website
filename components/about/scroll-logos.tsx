'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import { aboutPageConfig } from '@/lib/config/pages';

function ScrollLogos() {
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
        <div className={'logo-wrapper gap-4'}>
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
              className={'logo  opacity-100'}
            >
              <img
                className='opacity-60'
                style={{
                  filter:
                    'brightness(0) saturate(100%) invert(7%) sepia(32%) saturate(2387%) hue-rotate(264deg) brightness(96%) contrast(104%)',
                }}
                src={item.logo}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollLogos;
