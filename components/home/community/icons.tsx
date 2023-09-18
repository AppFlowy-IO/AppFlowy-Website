'use client';

import React from 'react';
import row1 from '@/assets/images/community/row-1.png';
import row2 from '@/assets/images/community/row-2.png';
import row3 from '@/assets/images/community/row-3.png';
import row4 from '@/assets/images/community/row-4.png';
import center from '@/assets/images/community/row-center.svg';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

function Icons() {
  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='show'
      viewport={{
        once: true,
      }}
      className={'icons'}
    >
      <motion.div variants={item} className={'row-item py-[15px]'}>
        <Image src={row1.src} alt={''} width={1660} height={100} />
      </motion.div>
      <motion.div variants={item} className={'row-item py-[15px]'}>
        <Image src={row2.src} alt={''} width={1660} height={100} />
      </motion.div>
      <motion.div variants={item} className={'row-item py-[15px]'}>
        <Image src={row3.src} alt={''} width={1660} height={100} />
      </motion.div>
      <motion.div variants={item} className={'row-item py-[15px]'}>
        <Image src={row4.src} alt={''} width={1660} height={100} />
      </motion.div>
      <motion.div variants={item} className={'absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/3'}>
        <Image src={center.src} alt={''} width={200} height={200} />
      </motion.div>
    </motion.div>
  );
}

export default Icons;
