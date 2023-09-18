'use client';

import React from 'react';
import { useClient } from '@/lib/hooks/use-client';
import { motion } from 'framer-motion';
import Link from 'next/link';

function HeroDownloadBtn() {
  const { isClient, os } = useClient();

  return (
    <Link href={'/download'}>
      <motion.button
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
        className={'download-btn col gap-0'}
      >
        <div className={'title'}>{`Download app`}</div>
        <div className={`desc text-[12px] leading-[15px] opacity-60 ${!isClient || !os ? 'hidden' : ''}`}>
          {os?.name + ' X ' + os?.version}
        </div>
      </motion.button>
    </Link>
  );
}

export default HeroDownloadBtn;
