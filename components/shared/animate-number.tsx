'use client';

import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { formatNumber } from '@/lib/format-number';

function AnimateNumber({ value, delay }: { value: number; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });

  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1,
      delay,
      onUpdate(value) {
        setNumber(value);
      },
    });

    return controls.stop;
  }, [value, delay, inView]);

  return <span ref={ref}>{formatNumber(number)}</span>;
}

export default AnimateNumber;
