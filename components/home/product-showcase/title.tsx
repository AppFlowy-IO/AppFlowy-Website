import React, { useState } from 'react';
import Focus from '@/components/icons/focus';
import { motion } from 'framer-motion';
import { useDarkContext } from '@/lib/hooks/use-dark-context';

const hiddenMask = `repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

function Title() {
  const dark = useDarkContext();
  const [isComplete, setIsComplete] = useState(false);
  const [isInView, setIsInView] = useState(false);

  return (
    <div className={'title'}>
      <motion.div
        className={'translate-z-0 transform pt-[50px] max-sm:pt-[20px]'}
        initial={false}
        animate={
          isInView
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        onAnimationComplete={() => {
          setIsComplete(true);
        }}
        onViewportEnter={() => setIsInView(true)}
      >
        <span className={'black bold'}>
          A{' '}
          <span className={'highlight relative'}>
            centralized
            <span className={'icon text-primary absolute'}>
              <Focus />
            </span>
          </span>{' '}
          place for your tasks, notes, and projects.
        </span>{' '}
        <motion.span
          className={'translate-z-0 transform'}
          initial={{
            opacity: 0,
          }}
          animate={
            isComplete
              ? {
                  opacity: 1,
                  color: dark ? '#fff' : '#000',
                }
              : {
                  opacity: 1,
                }
          }
          viewport={{
            once: true,
          }}
        >
          Organize and visualize your data in tables, boards, calendars, and more.
        </motion.span>
      </motion.div>
    </div>
  );
}

export default Title;
