'use client';

import { useEffect, useState } from 'react';

export default function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const yOffset = window.pageYOffset;

      setScrolled(yOffset > threshold);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  return scrolled;
}
