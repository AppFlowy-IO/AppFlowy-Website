import { useInView } from 'framer-motion';
import { RefObject } from 'react';

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

export function useRepeatingGradient(ref: RefObject<Element>) {
  const isInView = useInView(ref, {
    once: true,
  });

  return {
    initial: false,
    animate: isInView
      ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
      : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask },
    transition: { duration: 1, delay: 0.3 },
  };
}
