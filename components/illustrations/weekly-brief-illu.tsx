'use client';

import WeeklyBriefBase from '@/assets/images/illustrations/weekly-brief-illu-base.webp';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IllustrationProps } from './types';

// DecoyReveal: weekly-brief-illu-base.webp already has everything fully
// drawn in — the page content list and the whole AI Briefing panel. Instead
// of exporting those as separate layers, we hide their regions behind plain
// white decoys and animate the decoys away to reveal what's underneath.

const BASE_SLIDE_DURATION = 0.6;

// Block footprints, measured directly off the base image as a percentage of
// its own 2560x1480 canvas. The page title ("Weekly Brief") and the AI panel's
// own bottom fade are part of the base image's chrome and stay visible/as-is
// throughout — only the content list and the panel's internals are covered.
const LEFT_LEFT = 23.4;
const LEFT_TOP = 18.2;
const LEFT_WIDTH = 17.85;
const LEFT_HEIGHT = 63.6;

// Sized a bit larger than the panel's own flat bounds (measured by sampling
// pixel gray-levels off the base image) so the decoy also covers the drop
// shadow baked into the base image around the panel's edges — otherwise that
// shadow band peeks out just past the decoy's edge and reads as if the
// decoy itself had a shadow. The decoy stays a flat `bg-white` with no
// shadow of its own.
const WINDOW_LEFT = 56.25;
const WINDOW_TOP = 6.76;
const WINDOW_WIDTH = 43.55;
const WINDOW_HEIGHT = 90.54;

const USER_MESSAGE_LEFT = 63.75;
const USER_MESSAGE_TOP = 18;
const USER_MESSAGE_WIDTH = 33;
const USER_MESSAGE_HEIGHT = 9.5;

const AI_REPLY_LEFT = 59.4;
const AI_REPLY_TOP = 32.9;
const AI_REPLY_WIDTH = 37.35;
const AI_REPLY_HEIGHT = 41.1;

const INPUT_LEFT = 59.4;
const INPUT_TOP = 76.8;
const INPUT_WIDTH = 37.35;
const INPUT_HEIGHT = 16.2;

// Timeline: the left content list wipes in top-to-bottom (a "linear" reveal
// — pinned to the bottom edge, so the decoy recedes downward). The AI panel
// then fades in as a whole window, then its user message, then its reply
// and input field together — each cascading in a touch before the previous
// one finishes.
const LEFT_REVEAL_START = 0.4;
const LEFT_REVEAL_DURATION = 0.9;
const LEFT_REVEAL_END = LEFT_REVEAL_START + LEFT_REVEAL_DURATION;

const WINDOW_REVEAL_START = LEFT_REVEAL_END - 0.2;
const WINDOW_REVEAL_DURATION = 0.4;
const WINDOW_REVEAL_END = WINDOW_REVEAL_START + WINDOW_REVEAL_DURATION;

const USER_MESSAGE_REVEAL_START = WINDOW_REVEAL_END - 0.1;
const USER_MESSAGE_REVEAL_DURATION = 0.35;
const USER_MESSAGE_REVEAL_END = USER_MESSAGE_REVEAL_START + USER_MESSAGE_REVEAL_DURATION;

const AI_REPLY_REVEAL_START = USER_MESSAGE_REVEAL_END - 0.05;
// Longer than a fade would need — a top-down wipe over this tall a block
// reads better with more time to travel, proportioned against the left
// content list's own wipe speed (0.9s over its 63.6%-tall box).
const AI_REPLY_REVEAL_DURATION = 0.55;

// Input field fades in alongside the reply, not after it.
const INPUT_REVEAL_START = AI_REPLY_REVEAL_START;
const INPUT_REVEAL_DURATION = 0.4;

function WeeklyBriefIllu({ className }: IllustrationProps) {
  return (
    <div className={className}>
      <div className={'relative mx-auto aspect-[2560/1480] h-full overflow-hidden'}>
        <motion.div
          className={'absolute inset-0'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: BASE_SLIDE_DURATION, ease: 'easeIn' }}
        >
          <Image
            src={WeeklyBriefBase}
            alt={'Weekly brief'}
            fill
            sizes={'(max-width: 1280px) 100vw, 1280px'}
            className={'object-contain'}
          />

          {/* Left content decoy: height animates to 0, pinned via `bottom`,
              so it recedes downward — uncovering the list top-to-bottom. */}
          <div
            className={'absolute'}
            style={{ left: `${LEFT_LEFT}%`, top: `${LEFT_TOP}%`, width: `${LEFT_WIDTH}%`, height: `${LEFT_HEIGHT}%` }}
          >
            <motion.div
              className={'absolute inset-x-0 bottom-0 bg-white'}
              initial={{ height: '100%' }}
              animate={{ height: '0%' }}
              transition={{ duration: LEFT_REVEAL_DURATION, delay: LEFT_REVEAL_START, ease: 'easeInOut' }}
            />
          </div>

          {/* AI Briefing window decoy: covers the whole panel and fades out
              first. The message/reply/input decoys below sit on top of it
              (later in DOM) so they stay opaque and keep hiding their own
              regions even after the window decoy is gone. */}
          <motion.div
            className={'absolute bg-white'}
            style={{ left: `${WINDOW_LEFT}%`, top: `${WINDOW_TOP}%`, width: `${WINDOW_WIDTH}%`, height: `${WINDOW_HEIGHT}%` }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: WINDOW_REVEAL_DURATION, delay: WINDOW_REVEAL_START, ease: 'easeOut' }}
          />

          {/* User message decoy: fades in. */}
          <motion.div
            className={'absolute bg-white'}
            style={{ left: `${USER_MESSAGE_LEFT}%`, top: `${USER_MESSAGE_TOP}%`, width: `${USER_MESSAGE_WIDTH}%`, height: `${USER_MESSAGE_HEIGHT}%` }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: USER_MESSAGE_REVEAL_DURATION, delay: USER_MESSAGE_REVEAL_START, ease: 'easeOut' }}
          />

          {/* AI reply decoy: height animates to 0, pinned via `bottom`, so it
              recedes downward — uncovering the reply top-to-bottom, same
              technique as the left content list. */}
          <div
            className={'absolute'}
            style={{ left: `${AI_REPLY_LEFT}%`, top: `${AI_REPLY_TOP}%`, width: `${AI_REPLY_WIDTH}%`, height: `${AI_REPLY_HEIGHT}%` }}
          >
            <motion.div
              className={'absolute inset-x-0 bottom-0 bg-white'}
              initial={{ height: '100%' }}
              animate={{ height: '0%' }}
              transition={{ duration: AI_REPLY_REVEAL_DURATION, delay: AI_REPLY_REVEAL_START, ease: 'easeInOut' }}
            />
          </div>

          {/* Input field decoy: fades in. */}
          <motion.div
            className={'absolute bg-white'}
            style={{ left: `${INPUT_LEFT}%`, top: `${INPUT_TOP}%`, width: `${INPUT_WIDTH}%`, height: `${INPUT_HEIGHT}%` }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: INPUT_REVEAL_DURATION, delay: INPUT_REVEAL_START, ease: 'easeOut' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default WeeklyBriefIllu;
