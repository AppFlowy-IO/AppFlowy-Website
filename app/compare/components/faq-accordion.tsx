'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FAQAccordionProps } from '@/lib/faq';
import MinusIcon from '@/components/icons/minus-icon';
import PlusIcon from '@/components/icons/plus-icon';

export function FAQAccordion({ items }: FAQAccordionProps) {
    const [expandedItem, setExpandedItem] = useState<string>(items[0]?.id || '');
    const [hoveredItem, setHoveredItem] = useState<string>('');
    const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());

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
                        className={`flex cursor-pointer flex-col justify-center rounded-[12px] bg-white px-4 py-4 pl-6 select-none touch-manipulation ${isExpanded ? 'gap-3 sm:gap-4 md:gap-[15px]' : isAnimating ? 'gap-3' : 'gap-0'
                            }`}
                        style={{
                            WebkitTapHighlightColor: 'transparent',
                        }}
                        onClick={() => toggleItem(item.id)}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem('')}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                    >
                        {/* Question and Icon Row */}
                        <div className='flex w-full items-center justify-between'>
                            <h3 className='flex-1 pr-2 font-inter text-base font-medium leading-[150%] tracking-[-0.24px] text-text-primary sm:pr-4'>
                                {item.question}
                            </h3>
                            <div className='flex-shrink-0'>
                                {isExpanded ? (
                                    <MinusIcon isHovered={true} className='h-9 w-9 bg-[#854CFF10] rounded-[6px] p-2' strokeWidth={1.5} />
                                ) : (
                                    <PlusIcon isHovered={isHovered} className='h-9 w-9 bg-[#140F2804] rounded-[6px] p-2' strokeWidth={1.5} />
                                )}
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
                            <p className='whitespace-pre-line text-sm font-normal leading-[150%] text-text-secondary'>
                                {item.answer}
                            </p>
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}