'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePricingState } from './pricing-state-context';

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

// 展开时的减号图标
function MinusIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8'
      viewBox='0 0 32 32'
      fill='none'
    >
      <motion.path
        d='M5.33203 16H26.6654'
        stroke={isHovered ? '#9327FF' : '#101012'}
        strokeWidth='1.5'
        strokeLinecap='round'
        animate={{ stroke: isHovered ? '#9327FF' : '#101012' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </motion.svg>
  );
}

// 收起时的加号图标
function PlusIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8'
      viewBox='0 0 32 32'
      fill='none'
    >
      <motion.path
        d='M5.33398 16.0026H26.6673M16.0007 26.6693V16.0026L16.0007 5.33594'
        stroke={isHovered ? '#9327FF' : '#101012'}
        strokeWidth='1.5'
        strokeLinecap='round'
        animate={{ stroke: isHovered ? '#9327FF' : '#101012' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </motion.svg>
  );
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const { deploymentMode } = usePricingState();
  const [expandedItem, setExpandedItem] = useState<string>(items[0]?.id || '');
  const [hoveredItem, setHoveredItem] = useState<string>('');
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());

  // Get gradient based on deployment mode
  const getGradient = () => {
    return deploymentMode === 'cloud'
      ? 'linear-gradient(90deg, #8427E0 0%, #EC6FEC 100%)'
      : 'linear-gradient(90deg, #00B5FF 0%, #9225FF 100%)';
  };

  useEffect(() => {
    setExpandedItem(items[0]?.id || '');
  }, [items]);

  const toggleItem = (itemId: string) => {
    const isCurrentlyExpanded = expandedItem === itemId;

    if (isCurrentlyExpanded) {
      setAnimatingItems((prev) => new Set(prev).add(itemId));
    }

    setExpandedItem(isCurrentlyExpanded ? '' : itemId);
  };

  const handleAnimationComplete = (itemId: string, isExpanded: boolean) => {
    if (!isExpanded) {
      setAnimatingItems((prev) => {
        const newSet = new Set(prev);

        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  return (
    <div className='w-full space-y-3 sm:space-y-4 md:space-y-[15px]'>
      {items.map((item) => {
        const isExpanded = expandedItem === item.id;
        const isHovered = hoveredItem === item.id;
        const isAnimating = animatingItems.has(item.id);

        return (
          <motion.div
            key={item.id}
            className={`flex cursor-pointer flex-col justify-center rounded-[15px] border-2 bg-white px-6 py-6 sm:px-8 sm:py-8 md:px-[40px] md:py-[40px] select-none touch-manipulation ${
              isExpanded ? 'gap-3 sm:gap-4 md:gap-[15px]' : isAnimating ? 'gap-3' : 'gap-0'
            }`}
            style={{
              WebkitTapHighlightColor: 'transparent',
              ...(isHovered
                ? {
                    borderColor: 'transparent',
                    background: `linear-gradient(white, white) padding-box, ${getGradient()} border-box`,
                  }
                : {
                    borderColor: 'rgba(213, 215, 222, 0.40)',
                  })
            }}
            animate={{
              borderColor: isHovered ? 'transparent' : 'rgba(213, 215, 222, 0.40)',
            }}
            onClick={() => toggleItem(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem('')}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              borderColor: { duration: 0.25, ease: 'easeOut' },
            }}
          >
            {/* Question and Icon Row */}
            <div className='flex w-full items-center justify-between'>
              <h3 className='flex-1 pr-2 font-inter text-lg font-medium leading-[120%] tracking-[-0.24px] text-[#101012] sm:pr-4 sm:text-xl md:text-2xl'>
                {item.question}
              </h3>
              <div className='flex-shrink-0'>
                {isExpanded ? <MinusIcon isHovered={true} /> : <PlusIcon isHovered={isHovered} />}
              </div>
            </div>

            {/* Answer */}
            <motion.div
              className='w-full overflow-hidden'
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{
                duration: 0.1,
                ease: 'easeInOut',
              }}
              onAnimationComplete={() => handleAnimationComplete(item.id, isExpanded)}
            >
              <div className='whitespace-pre-line font-inter text-sm font-normal leading-[150%] text-[#58585A] sm:text-base'>
                {item.answer}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}