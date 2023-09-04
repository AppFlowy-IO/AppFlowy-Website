'use client';

import { animate } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useCounter({ from, to, delay, inView }: { from: number; to: number; delay?: number; inView: boolean }) {
  const [number, setNumber] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration: 1,
      delay,
      onUpdate(value) {
        setNumber(value);
      },
    });

    return controls.stop;
  }, [from, to, delay, inView]);

  return {
    number,
  };
}
