'use client';

import { useCallback, useEffect, useState } from 'react';

export default function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.pageYOffset > threshold;
  });

  const onScroll = useCallback(() => {
    const yOffset = window.pageYOffset;

    setScrolled(yOffset > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return scrolled;
}