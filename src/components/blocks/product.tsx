'use client';

import Trans from 'next-translate/Trans';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Product({
  item,
}: {
  item: {
    title: string;
    description: string;
    link: string;
    image: {
      src: string;
      alt: string;
    };
  };
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      key={item.title}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      className={`border-primary-divider bg-bg ${
        hover ? 'bg-primary' : ''
      } mx-3 flex cursor-pointer flex-col rounded-2xl border max-sm:mb-4 max-sm:p-4 md:items-center md:p-6`}
    >
      <Link href={item.link}>
        <div
          className={` ${
            hover ? 'text-white' : ''
          } text-[40px] leading-[44px] max-sm:py-4 max-sm:text-[24px] max-sm:leading-[26px] md:py-6`}
        >
          <Trans i18nKey={item.title} />
        </div>
        <div className={`max-sm:mb-8 md:mb-12 ${hover ? 'text-white' : ''}`}>
          <Trans i18nKey={item.description} />
        </div>
        <div className={'aspect-auto overflow-hidden rounded-2xl'}>
          <img className={'h-full w-full object-contain'} src={item.image.src} alt={item.image.alt} />
        </div>
      </Link>
    </motion.div>
  );
}
