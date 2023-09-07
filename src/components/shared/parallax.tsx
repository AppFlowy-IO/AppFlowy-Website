'use client';

import { Manrope } from 'next/font/google';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useMemo, useRef } from 'react';
import * as transition from '@/lib/transition';

const manrope = Manrope({ subsets: ['cyrillic'], weight: '400' });

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, distance]);
}

export function Parallax({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll();
  const distance = useMemo(() => {
    return typeof window === 'undefined' ? 0 : window.innerWidth;
  }, []);
  const x = useParallax(scrollYProgress, distance);

  return (
    <>
      <motion.div style={{ x }} className={`flex items-center justify-center max-sm:mb-16  md:mb-48 `}>
        <div
          className={`${manrope.className} w-[300vw] whitespace-nowrap max-sm:text-[90px] max-sm:leading-[90px] md:text-[300px] md:leading-[300px]`}
        >
          {title}
        </div>
      </motion.div>
      <motion.div
        variants={transition.scaleContainer}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        ref={ref}
        className={'flex w-full flex-col items-center'}
      >
        {children}
      </motion.div>
    </>
  );
}
