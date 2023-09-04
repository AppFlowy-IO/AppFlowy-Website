'use client';

import { useCounter } from '@/lib/hooks/use-counter';
import { formatNumber } from '@/lib/format-number';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Number({ value, delay }: { value: number; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });
  const { number } = useCounter({
    from: 0,
    to: value,
    delay: delay || 0.1,
    inView,
  });

  return <div ref={ref}>{formatNumber(number)}</div>;
}
