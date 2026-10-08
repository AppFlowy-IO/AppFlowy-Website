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
    <div className='w-full space-y-2'>
      {items.map((item) => {
        const isExpanded = expandedItem === item.id;

        return (
          <div
            key={item.id}
            className='w-full cursor-pointer touch-manipulation select-none rounded-xl bg-white px-6 py-4 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(20,15,40,0.05)]'
            style={{ WebkitTapHighlightColor: 'transparent' }}
            onClick={() => toggleItem(item.id)}
          >
            {/* Question and Icon Row */}
            <div className='min-h-12 flex w-full items-start justify-between gap-5'>
              <h3 className='flex-1 pt-3 font-inter text-base font-medium leading-6 text-[#140F28]'>{item.question}</h3>
              <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#F6F6FA]'>
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
              <div className='whitespace-pre-line pl-0 pt-5 font-inter text-sm font-normal leading-5 text-[#5A5A5A]'>
                {item.answer}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
