'use client';

import React from 'react';
import { motion } from 'framer-motion';
import icon1 from '@/assets/images/support-ai/icon-1.svg';
import icon2 from '@/assets/images/support-ai/icon-2.svg';
import icon3 from '@/assets/images/support-ai/icon-3.svg';
import darkIcon1 from '@/assets/images/support-ai/dark/icon-1.svg';
import darkIcon2 from '@/assets/images/support-ai/dark/icon-2.svg';
import darkIcon3 from '@/assets/images/support-ai/dark/icon-3.svg';
import Image from 'next/image';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  show: { opacity: 1, y: 0 },
};

function Background({ dark }: { dark?: boolean }) {
  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='show'
      viewport={{
        once: true,
      }}
      className={'bg'}
    >
      <motion.div className={'icon'} variants={item}>
        <Image src={dark ? darkIcon1.src : icon1.src} alt={''} width={100} height={100} />
      </motion.div>

      <motion.div className={'icon'} variants={item}>
        <Image src={dark ? darkIcon2.src : icon2.src} alt={''} width={100} height={100} />
      </motion.div>
      <motion.div className={'icon'} variants={item}>
        <Image src={dark ? darkIcon3.src : icon3.src} alt={''} width={100} height={100} />
      </motion.div>
    </motion.div>
  );
}

export default Background;
