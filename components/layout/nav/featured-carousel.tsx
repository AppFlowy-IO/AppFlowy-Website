'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Item } from '@/lib/config/navigation';

const AUTO_ROTATE_MS = 4000;

function FeaturedCarousel({ items, onNavigate }: { items: Item[]; onNavigate?: () => void }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, AUTO_ROTATE_MS);

    return () => clearInterval(timer);
  }, [items.length]);

  const current = items[active];

  if (!current) return null;

  return (
    <Link
      href={current.href || ''}
      target={current.href?.startsWith('https') ? '_blank' : ''}
      onClick={onNavigate}
      className={'relative block h-full w-[320px] shrink-0 overflow-hidden rounded-[12px]'}
    >
      <AnimatePresence mode={'wait'}>
        <motion.img
          key={current.image?.src}
          src={current.image?.src}
          alt={current.image?.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={'absolute inset-0 h-full w-full object-cover'}
        />
      </AnimatePresence>
      <div
        className={'absolute inset-0'}
        style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.75) 100%)' }}
      />
      <div className={'absolute bottom-[36px] left-[16px] right-[16px] text-[15px] font-semibold leading-[1.3] text-white'}>
        {current.name}
      </div>
      {items.length > 1 && (
        <div
          className={'absolute bottom-[14px] left-[16px] flex items-center gap-[6px]'}
          onClick={(e) => e.preventDefault()}
        >
          {items.map((item, index) => (
            <span
              key={item.key}
              className={`h-[6px] cursor-pointer rounded-full transition-all ${index === active ? 'w-[18px] bg-white' : 'w-[6px] bg-white/40'
                }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActive(index);
              }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}

export default FeaturedCarousel;
