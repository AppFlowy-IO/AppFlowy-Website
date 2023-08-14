'use client';
import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
  ease: [0.56, 0.03, 0.12, 1.04],
};

function Carousel({
  images,
  operation,
  className,
}: {
  images: { imageSrc: string }[];
  operation: ({
    swipeToImage,
    activeImageIndex,
  }: {
    swipeToImage: (swipeDirection: number) => void;
    activeImageIndex: number;
  }) => React.ReactNode;
  className?: string;
}) {
  const [[imageCount, direction], setImageCount] = useState([0, 0]);
  const activeImageIndex = imageCount % images.length;

  const swipeToImage = useCallback((swipeDirection: number) => {
    setImageCount((prev) => {
      return [prev[0] + swipeDirection, swipeDirection];
    });
  }, []);

  return (
    <div className=' flex flex-col items-center '>
      <div className={`relative h-[500px] w-[350px] overflow-hidden ${className}`}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={imageCount}
            style={{
              backgroundImage: images.length > 0 ? `url(${images[activeImageIndex].imageSrc})` : undefined,
            }}
            custom={direction}
            variants={sliderVariants}
            initial='incoming'
            animate='active'
            exit='exit'
            transition={sliderTransition}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            className='absolute h-full w-full bg-cover bg-center bg-no-repeat will-change-transform'
          />
        </AnimatePresence>
      </div>
      <div className={'mt-6 h-[72px]'}>
        {operation({
          swipeToImage,
          activeImageIndex,
        })}
      </div>
    </div>
  );
}

export default Carousel;
