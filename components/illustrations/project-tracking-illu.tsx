'use client';

import BigCard from '@/assets/images/illustrations/big-card.png';
import ProjectTrackerBase from '@/assets/images/illustrations/project-tracker-base.png';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Cursor from './cursor';
import { IllustrationProps } from './types';

// Footprint of the "Refine AI meeting..." card inside the base image,
// expressed as a percentage of the frame so it holds at any render size.
const CARD_SLOT = {
  left: 59.9,
  top: 42.6,
  width: 17.3,
  height: 18.9,
};

// Natasha spawns far up-left on the board and travels all the way to the
// card, "picking it up" (triggers the card's reaction below) on arrival.
const NATASHA = {
  spawn: { left: 8, top: 18 },
  dest: { left: 59, top: 42.3 },
};

// Mathieu spawns near the Completed column and just wanders nearby —
// unrelated to the card, kept alive with a small idle drift.
const MATHIEU_SPAWN = { left: 90, top: 20 };

const CARD_PICKUP_START = 0.55; // when the big-card entrance begins
const CARD_PICKUP_ARRIVE = 2.2; // when Natasha reaches the card / pickup completes
const CURSORS_APPEAR = 0.9;

function ProjectTrackingIllu({ className }: IllustrationProps) {
  return (
    <div className={className}>
      <div className={'relative mx-auto aspect-[2560/1532] h-full'}>
        <motion.div
          className={'absolute inset-0'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src={ProjectTrackerBase}
            alt={'Project tracking'}
            fill
            sizes={'(max-width: 1280px) 100vw, 1280px'}
            className={'object-contain'}
          />
        </motion.div>

        {/* Big card: fades/scales into its slot, then — timed to Natasha's
            arrival — lifts with a rotate + scale + deeper shadow, as if
            just picked up. */}
        <motion.div
          className={'absolute'}
          style={{
            left: `${CARD_SLOT.left}%`,
            top: `${CARD_SLOT.top}%`,
            width: `${CARD_SLOT.width}%`,
            height: `${CARD_SLOT.height}%`,
          }}
          initial={{
            opacity: 0,
            y: 16,
            scale: 0.95,
            rotate: 0,
            filter: 'drop-shadow(0 8px 12px rgba(15,23,42,0.18))',
          }}
          animate={{
            opacity: [0, 1, 1, 1],
            y: [16, 0, 0, 0],
            scale: [0.95, 1, 1, 1.08],
            rotate: [0, 0, 0, -5],
            filter: [
              'drop-shadow(0 8px 12px rgba(15,23,42,0.18))',
              'drop-shadow(0 8px 12px rgba(15,23,42,0.18))',
              'drop-shadow(0 8px 12px rgba(15,23,42,0.18))',
              'drop-shadow(0 32px 40px rgba(15,23,42,0.38))',
            ],
          }}
          transition={{
            type: 'tween',
            duration: CARD_PICKUP_ARRIVE - CARD_PICKUP_START,
            times: [0, 0.24, 0.85, 1],
            delay: CARD_PICKUP_START,
            ease: 'easeOut',
          }}
        >
          <Image
            src={BigCard}
            alt={''}
            fill
            className={'object-contain'}
          />
        </motion.div>

        {/* Outer wrapper is full-frame so a percentage transform on it is
            relative to the whole scene (not just the cursor's own size) —
            keeps the long cross-board travel responsive while staying
            transform-only. */}
        <motion.div
          className={'absolute inset-0'}
          initial={{
            opacity: 0,
            x: `${NATASHA.spawn.left - NATASHA.dest.left}%`,
            y: `${NATASHA.spawn.top - NATASHA.dest.top}%`,
          }}
          animate={{ opacity: 1, x: '0%', y: '0%' }}
          transition={{
            opacity: { delay: CURSORS_APPEAR, duration: 0.4, ease: 'easeOut' },
            x: { type: 'tween', delay: CURSORS_APPEAR, duration: CARD_PICKUP_ARRIVE - CURSORS_APPEAR, ease: 'easeInOut' },
            y: { type: 'tween', delay: CURSORS_APPEAR, duration: CARD_PICKUP_ARRIVE - CURSORS_APPEAR, ease: 'easeInOut' },
          }}
        >
          <div
            className={'absolute'}
            style={{ left: `${NATASHA.dest.left}%`, top: `${NATASHA.dest.top}%` }}
          >
            <Cursor
              label={'Natasha'}
              color={'#8427E0'}
              direction={'left-top'}
            />
          </div>
        </motion.div>

        <motion.div
          className={'absolute inset-0'}
          initial={{ opacity: 0, x: '0%', y: '0%' }}
          animate={{ opacity: 1, x: ['0%', '-8%', '0%'], y: ['0%', '10%', '0%'] }}
          transition={{
            opacity: { delay: CURSORS_APPEAR, duration: 0.4, ease: 'easeOut' },
            x: { type: 'tween', delay: CURSORS_APPEAR, duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
            y: { type: 'tween', delay: CURSORS_APPEAR, duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <div
            className={'absolute'}
            style={{ left: `${MATHIEU_SPAWN.left}%`, top: `${MATHIEU_SPAWN.top}%` }}
          >
            <Cursor
              label={'Mathieu'}
              color={'#3B82F6'}
              direction={'right-top'}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProjectTrackingIllu;
