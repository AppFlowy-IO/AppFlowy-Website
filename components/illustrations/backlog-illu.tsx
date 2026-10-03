'use client';

import BacklogBase from '@/assets/images/illustrations/backlog-illu-base.webp';
import BacklogMenu1 from '@/assets/images/illustrations/backlog-menu-1.webp';
import BacklogMenu2 from '@/assets/images/illustrations/backlog-menu-2.webp';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IllustrationProps } from './types';
import { useImagesReady } from './use-images-ready';

// DecoyReveal: backlog-illu-base.webp already has the table fully drawn in
// alongside the page chrome. Instead of a separate overlay image, we hide
// the table behind a plain white decoy and animate the decoy away to
// reveal it — no second layer to export.

const BASE_SLIDE_DURATION = 0.6;

// Table footprint, measured directly off backlog-illu-base.webp as a
// percentage of its own 2560x1392 canvas — spans from the border above the
// column headers down to the bottom of the frame (the last row's fade is
// already baked into the base image below that).
const TABLE_LEFT = 4.69;
const TABLE_TOP = 50;
const TABLE_WIDTH = 90.63;
const TABLE_HEIGHT = 50;

// Table decoy: height animates to 0, pinned via `bottom`, so it recedes
// downward — uncovering the header and rows top-to-bottom, one after
// another. Kicks off just after the base image lands, so the table appears
// to grow in as the frame settles.
const TABLE_REVEAL_START = 0.1;
const TABLE_REVEAL_DURATION = 1.5;
const TABLE_REVEAL_END = TABLE_REVEAL_START + TABLE_REVEAL_DURATION;

// Sized/positioned off the original composited backlog.webp reference: both
// cards share their native width (they're the same width in their source
// images), anchored from the right edge and bleeding off it slightly, with
// "Hidden properties" tucked behind-and-below "Visible properties" — hence
// menu-1 (the back card) is rendered first so menu-2 (the front card) paints
// on top of it, even though menu-2's fade-in still happens first below.
const MENU_WIDTH = 28;
const MENU_2_SLOT = { right: 14, top: 15 };
const MENU_1_SLOT = { right: -1, top: 50 };

const MENU_START = TABLE_REVEAL_END + 0.15;
const MENU_STAGGER = 0.2;
const MENU_FADE_DURATION = 0.5;

function BacklogIllu({ className }: IllustrationProps) {
  // Nothing plays until every image below has painted — see useImagesReady.
  const { ready, settle } = useImagesReady(3);

  return (
    <div className={className}>
      <div className={'relative w-full aspect-[2560/1392] overflow-hidden'}>
        <motion.div
          className={'absolute inset-0'}
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: BASE_SLIDE_DURATION, ease: 'easeIn' }}
        >
          <Image
            src={BacklogBase}
            onLoad={settle}
            onError={settle}
            alt={'Backlog'}
            fill
            sizes={'(max-width: 1280px) 100vw, 1280px'}
            className={'object-contain'}
          />

          {/* Table decoy: nested inside the base's own wrapper for the same
              zero-relative-motion reason as the menus below. */}
          <div
            className={'absolute'}
            style={{ left: `${TABLE_LEFT}%`, top: `${TABLE_TOP}%`, width: `${TABLE_WIDTH}%`, height: `${TABLE_HEIGHT}%` }}
          >
            <motion.div
              className={'absolute inset-x-0 bottom-0 bg-white'}
              initial={{ height: '100%' }}
              animate={ready ? { height: '0%' } : undefined}
              transition={{ duration: TABLE_REVEAL_DURATION, delay: TABLE_REVEAL_START, ease: 'easeInOut' }}
            />
          </div>

          {/* Menu cards: fade + slide up, staggered, once the table has
              finished growing in. Hidden properties (the back card) is
              rendered first so Visible properties (the front card) paints
              on top of it, even though Visible is the one that fades in
              first. */}
          <motion.div
            className={'absolute'}
            style={{ right: `${MENU_1_SLOT.right}%`, top: `${MENU_1_SLOT.top}%`, width: `${MENU_WIDTH}%` }}
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: MENU_FADE_DURATION, delay: MENU_START + MENU_STAGGER, ease: 'easeOut' }}
          >
            <Image
              src={BacklogMenu1}
              onLoad={settle}
              onError={settle}
              alt={'Hidden properties'}
              className={'h-auto w-full'}
            />
          </motion.div>

          <motion.div
            className={'absolute'}
            style={{ right: `${MENU_2_SLOT.right}%`, top: `${MENU_2_SLOT.top}%`, width: `${MENU_WIDTH}%` }}
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: MENU_FADE_DURATION, delay: MENU_START, ease: 'easeOut' }}
          >
            <Image
              src={BacklogMenu2}
              onLoad={settle}
              onError={settle}
              alt={'Visible properties'}
              className={'h-auto w-full'}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default BacklogIllu;
