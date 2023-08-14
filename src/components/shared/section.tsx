import React, { useMemo, useRef } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
import useParallax from '@/lib/hooks/use-parallax';

const initial = { opacity: 0, scale: 0.5 };
const after = { opacity: 1, scale: 1 };

function Section({ children, description }: { children: React.ReactNode; description: () => React.JSX.Element }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);
  const motionProps = useMemo(
    () => ({
      initial,
      animate: isInView ? after : initial,
      transition: { duration: 0.8 },
    }),
    [isInView]
  );

  return (
    <section className={'flex flex-col justify-center'}>
      <motion.div
        {...motionProps}
        ref={ref}
        className='mx-[auto] flex h-[100%-64px] flex-col items-center justify-center'
      >
        {children}
      </motion.div>
      <motion.div {...motionProps} style={{ y }} className={' mx-10 flex w-[200px] flex-col overflow-x-hidden'}>
        {description()}
      </motion.div>
    </section>
  );
}

export default Section;
