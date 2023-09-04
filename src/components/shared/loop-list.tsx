'use client';
import { ReactNode, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface ParallaxProps {
  items: ReactNode[];
  baseVelocity: number;
  itemWidth: number;
}

export default function LoopList({ items, itemWidth, baseVelocity = 5 }: ParallaxProps) {
  const totalWidth = items.length * itemWidth;
  const clientWidth = typeof window === 'undefined' ? 0 : window.innerWidth;
  const initialX = totalWidth / 2 + clientWidth / 2;

  const baseX = useMotionValue(initialX);
  const currentIndex = useRef<number>(0);

  useEffect(() => {
    const updatePosition = () => {
      baseX.set(baseX.get() - baseVelocity);
      if (baseX.get() <= -initialX) {
        currentIndex.current = 0;
        baseX.set(0);
      }
    };

    const interval = setInterval(updatePosition, 1000 / 60);

    return () => {
      clearInterval(interval);
    };
  }, [baseVelocity, baseX, initialX]);

  return (
    <div className='parallax'>
      <motion.div className='flex' style={{ x: baseX }}>
        {items.map((item, index) => (
          <div style={{ width: itemWidth }} key={index}>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
