'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FAQAccordionProps } from '@/lib/faq';
import MinusIcon from '@/components/icons/minus-icon';
import PlusIcon from '@/components/icons/plus-icon';

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [expandedItem, setExpandedItem] = useState<string>(items[0]?.id || '');

  useEffect(() => {
    setExpandedItem(items[0]?.id || '');
  }, [items]);

  const toggleItem = (itemId: string) => {
    setExpandedItem((prev) => (prev === itemId ? '' : itemId));
  };

  return (
    <div className='w-full space-y-3'>
      {items.map((item) => {
        const isExpanded = expandedItem === item.id;

        return (
          <div
            key={item.id}
            className='w-full cursor-pointer select-none rounded-2xl bg-white px-5 py-5 shadow-[0_1px_2px_rgba(16,16,18,0.04)] transition-shadow duration-200 touch-manipulation hover:shadow-[0_4px_16px_rgba(16,16,18,0.06)] sm:px-6 sm:py-6'
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onClick={() => toggleItem(item.id)}
          >
            {/* Question and Icon Row */}
            <div className='flex w-full items-center justify-between gap-4'>
              <h3 className='flex-1 font-inter text-base font-semibold leading-[130%] tracking-[-0.2px] text-[#101012] sm:text-lg md:text-xl'>
                {item.question}
              </h3>
              <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-[#F5F5F7] sm:h-10 sm:w-10'>
                {isExpanded ? <MinusIcon /> : <PlusIcon />}
              </div>
            </div>

            {/* Answer */}
            <motion.div
              className='w-full overflow-hidden'
              initial={false}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0,
              }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
              }}
            >
              <div className='whitespace-pre-line pt-3 font-inter text-sm font-normal leading-[150%] text-[#58585A] sm:pt-4 sm:text-base'>
                {item.answer}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
