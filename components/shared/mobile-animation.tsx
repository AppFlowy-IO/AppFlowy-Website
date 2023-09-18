'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MainImage from '@/assets/images/mobile/img-1.svg';
import Readme from '@/assets/images/mobile/img-2.svg';
import Grid from '@/assets/images/mobile/img-3.svg';
import Tag from '@/assets/images/mobile/img-4.svg';
import Toolbar from '@/assets/images/mobile/img-5.svg';
import Board from '@/assets/images/mobile/img-6.svg';

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

function MobileAnimation() {
  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='show'
      viewport={{
        once: true,
      }}
      className={'mobile-images'}
    >
      <motion.div variants={item} className={'image main'}>
        <Image src={MainImage.src} alt={''} width={341} height={683} />
      </motion.div>
      <motion.div variants={item} className={'image'}>
        <Image src={Readme.src} alt={''} width={291} height={431} />
      </motion.div>
      <motion.div variants={item} className={'image'}>
        <Image src={Grid.src} alt={''} width={291} height={431} />
      </motion.div>
      <motion.div variants={item} className={'image '}>
        <Image src={Tag.src} alt={''} width={290} height={97} />
      </motion.div>
      <motion.div variants={item} className={'image'}>
        <Image src={Toolbar.src} alt={''} width={299} height={231} />
      </motion.div>
      <motion.div variants={item} className={'image'}>
        <Image src={Board.src} alt={''} width={234} height={338} />
      </motion.div>
    </motion.div>
  );
}

export default MobileAnimation;
