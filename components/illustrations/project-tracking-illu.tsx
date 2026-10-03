'use client';

import BigCard from '@/assets/images/illustrations/big-card.webp';
import ProjectTrackerBase from '@/assets/images/illustrations/project-tracker-base.webp';
import SmallCard from '@/assets/images/illustrations/small-card.webp';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Cursor from './cursor';
import { IllustrationProps } from './types';

// Footprint of the "Refine AI meeting..." card inside the base image,
// expressed as a percentage of the frame so it holds at any render size.
const CARD_SLOT = {
  left: 60.31,
  top: 45.98,
  width: 17.03,
  height: 21.84,
};

// Footprint of the "Review product requirements" card (top of the To do
// column) inside the base image, same percentage convention as CARD_SLOT.
const SMALL_CARD_SLOT = {
  left: 22.5,
  top: 35.63,
  width: 17.03,
  height: 4.6,
};

const BASE_SHADOW = 'drop-shadow(0 0px 0px rgba(15,23,42,0))';
const LIFT_SHADOW = 'drop-shadow(0 8px 12px rgba(15,23,42,0.16))';

// Both cursors park on the bottom-right corner of the card they pick up, so
// the pointer and its name pill hang off the card's edge instead of sitting
// over the card's text.
const MATHIEU = {
  spawn: { left: 25, top: 50 },
  dest: { left: SMALL_CARD_SLOT.left + SMALL_CARD_SLOT.width - 1, top: SMALL_CARD_SLOT.top + SMALL_CARD_SLOT.height - 1 },
};

const OLIVIA = {
  spawn: { left: 86, top: 82 },
  dest: { left: CARD_SLOT.left + CARD_SLOT.width - 1.5, top: CARD_SLOT.top + CARD_SLOT.height - 2 },
};

const CURSORS_APPEAR = 0.6; // both cursors fade in at their spawn points

const TRAVEL_DURATION = 0.9; // trip from spawn to the card
const HOVER_HOLD = 2; // how long a cursor rests on its card before heading back
const RETURN_DURATION = 0.9; // trip back to the spawn point

// Mathieu sets off first; Olivia follows a beat and a half later so the two
// stories never read as simultaneous.
const MATHIEU_TRAVEL_START = 0.9;
const MATHIEU_ARRIVE = MATHIEU_TRAVEL_START + TRAVEL_DURATION;
const MATHIEU_LEAVE_START = MATHIEU_ARRIVE + HOVER_HOLD;
const MATHIEU_LEAVE_END = MATHIEU_LEAVE_START + RETURN_DURATION;

const OLIVIA_STAGGER = 1.5; // Olivia starts this long after Mathieu starts
const OLIVIA_TRAVEL_START = MATHIEU_TRAVEL_START + OLIVIA_STAGGER;
const OLIVIA_ARRIVE = OLIVIA_TRAVEL_START + TRAVEL_DURATION;
const OLIVIA_LEAVE_START = OLIVIA_ARRIVE + HOVER_HOLD;
const OLIVIA_LEAVE_END = OLIVIA_LEAVE_START + RETURN_DURATION;

const CARD_LIFT_DURATION = 0.5; // big card's pickup reaction, played on arrival
const CARD_SETTLE_DURATION = 0.4; // big card's relax back to rest, played as Olivia leaves

const SMALL_CARD_LIFT_DURATION = 0.35; // small card's pickup reaction, played on arrival
const SMALL_CARD_SETTLE_DURATION = 0.35; // relaxes back into place as Mathieu leaves

// Turns a list of absolute timestamps into the delay/duration/times trio
// framer-motion wants, so every beat below can be written as "when it
// happens" rather than as a fraction of some enclosing tween.
function keyframeTiming(timestamps: number[]) {
  const start = timestamps[0];
  const end = timestamps[timestamps.length - 1];
  const duration = end - start;

  return {
    delay: start,
    duration,
    times: timestamps.map((timestamp) => (timestamp - start) / duration),
  };
}

// Cursor keyframes: wait at spawn, travel, hold on the card, travel back.
const MATHIEU_TIMING = keyframeTiming([
  CURSORS_APPEAR,
  MATHIEU_TRAVEL_START,
  MATHIEU_ARRIVE,
  MATHIEU_LEAVE_START,
  MATHIEU_LEAVE_END,
]);
const OLIVIA_TIMING = keyframeTiming([
  CURSORS_APPEAR,
  OLIVIA_TRAVEL_START,
  OLIVIA_ARRIVE,
  OLIVIA_LEAVE_START,
  OLIVIA_LEAVE_END,
]);

// Card keyframes: lift on arrival, hold lifted, settle as the cursor leaves.
const CARD_TIMING = keyframeTiming([
  OLIVIA_ARRIVE,
  OLIVIA_ARRIVE + CARD_LIFT_DURATION,
  OLIVIA_LEAVE_START,
  OLIVIA_LEAVE_START + CARD_SETTLE_DURATION,
]);
const SMALL_CARD_TIMING = keyframeTiming([
  MATHIEU_ARRIVE,
  MATHIEU_ARRIVE + SMALL_CARD_LIFT_DURATION,
  MATHIEU_LEAVE_START,
  MATHIEU_LEAVE_START + SMALL_CARD_SETTLE_DURATION,
]);

function ProjectTrackingIllu({ className, priority = false }: IllustrationProps) {
  return (
    <div className={className}>
      <div className={'relative w-full aspect-[2560/1392]'}>
        <motion.div
          className={'absolute inset-0'}
          // Slide only, no fade: an opacity-0 start would hide the base image
          // from LCP until the entrance finished.
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src={ProjectTrackerBase}
            alt={'Project tracking'}
            fill
            priority={priority}
            sizes={'(max-width: 1280px) 100vw, 1280px'}
            className={'object-contain'}
          />

          {/* Big card: nested inside the base image's own wrapper so it rides
              the same entrance slide with zero relative motion — it sits at
              rest in its slot from the very first frame (the base image
              already shows it there, so no separate fade of its own), then —
              timed to Olivia's arrival — lifts with a small clockwise tilt +
              scale + shadow, as if just picked up, holds through her hover,
              then relaxes back to rest as she heads home. */}
          <motion.div
            className={'absolute'}
            style={{
              left: `${CARD_SLOT.left}%`,
              top: `${CARD_SLOT.top}%`,
              width: `${CARD_SLOT.width}%`,
              height: `${CARD_SLOT.height}%`,
            }}
            initial={{ scale: 1, rotate: 0, filter: BASE_SHADOW }}
            animate={{
              scale: [1, 1.08, 1.08, 1],
              rotate: [0, 2, 2, 0],
              filter: [BASE_SHADOW, LIFT_SHADOW, LIFT_SHADOW, BASE_SHADOW],
            }}
            transition={{ type: 'tween', ease: 'easeOut', ...CARD_TIMING }}
          >
            <Image
              src={BigCard}
              alt={''}
              fill
              className={'object-contain'}
            />
          </motion.div>

          {/* Small card: same nested, instant overlay. Once Mathieu arrives
              it lifts the same way, holds for a beat while "hovered", then
              relaxes back to its resting pose as he steps away. */}
          <motion.div
            className={'absolute'}
            style={{
              left: `${SMALL_CARD_SLOT.left}%`,
              top: `${SMALL_CARD_SLOT.top}%`,
              width: `${SMALL_CARD_SLOT.width}%`,
              height: `${SMALL_CARD_SLOT.height}%`,
            }}
            initial={{ scale: 1, rotate: 0, filter: BASE_SHADOW }}
            animate={{
              scale: [1, 1.06, 1.06, 1],
              rotate: [0, 2, 2, 0],
              filter: [BASE_SHADOW, LIFT_SHADOW, LIFT_SHADOW, BASE_SHADOW],
            }}
            transition={{ type: 'tween', ease: 'easeOut', ...SMALL_CARD_TIMING }}
          >
            <Image
              src={SmallCard}
              alt={''}
              fill
              className={'object-contain'}
            />
          </motion.div>
        </motion.div>

        {/* Outer wrapper is full-frame so a percentage transform on it is
            relative to the whole scene (not just the cursor's own size) —
            keeps the long cross-board travel responsive while staying
            transform-only. Mathieu holds at his spawn point next to the small
            card, hops onto its bottom-right corner, stays put for the hover
            window, then retraces his steps in sync with the card settling. */}
        <motion.div
          className={'absolute inset-0'}
          initial={{
            opacity: 0,
            x: `${MATHIEU.spawn.left - MATHIEU.dest.left}%`,
            y: `${MATHIEU.spawn.top - MATHIEU.dest.top}%`,
          }}
          animate={{
            opacity: 1,
            x: [
              `${MATHIEU.spawn.left - MATHIEU.dest.left}%`,
              `${MATHIEU.spawn.left - MATHIEU.dest.left}%`,
              '0%',
              '0%',
              `${MATHIEU.spawn.left - MATHIEU.dest.left}%`,
            ],
            y: [
              `${MATHIEU.spawn.top - MATHIEU.dest.top}%`,
              `${MATHIEU.spawn.top - MATHIEU.dest.top}%`,
              '0%',
              '0%',
              `${MATHIEU.spawn.top - MATHIEU.dest.top}%`,
            ],
          }}
          transition={{
            opacity: { delay: CURSORS_APPEAR, duration: 0.4, ease: 'easeOut' },
            x: { type: 'tween', ease: 'easeInOut', ...MATHIEU_TIMING },
            y: { type: 'tween', ease: 'easeInOut', ...MATHIEU_TIMING },
          }}
        >
          <div
            className={'absolute'}
            style={{ left: `${MATHIEU.dest.left}%`, top: `${MATHIEU.dest.top}%` }}
          >
            <Cursor
              label={'Mathieu'}
              color={'#3B82F6'}
              direction={'right-top'}
            />
          </div>
        </motion.div>

        {/* Olivia: same trip on the other side of the board, started 1.5s
            after Mathieu's so the two picks read as a sequence. She lands on
            the big card's bottom-right corner, holds there, then travels back
            to her spawn point as the card settles. */}
        <motion.div
          className={'absolute inset-0'}
          initial={{
            opacity: 0,
            x: `${OLIVIA.spawn.left - OLIVIA.dest.left}%`,
            y: `${OLIVIA.spawn.top - OLIVIA.dest.top}%`,
          }}
          animate={{
            opacity: 1,
            x: [
              `${OLIVIA.spawn.left - OLIVIA.dest.left}%`,
              `${OLIVIA.spawn.left - OLIVIA.dest.left}%`,
              '0%',
              '0%',
              `${OLIVIA.spawn.left - OLIVIA.dest.left}%`,
            ],
            y: [
              `${OLIVIA.spawn.top - OLIVIA.dest.top}%`,
              `${OLIVIA.spawn.top - OLIVIA.dest.top}%`,
              '0%',
              '0%',
              `${OLIVIA.spawn.top - OLIVIA.dest.top}%`,
            ],
          }}
          transition={{
            opacity: { delay: CURSORS_APPEAR, duration: 0.4, ease: 'easeOut' },
            x: { type: 'tween', ease: 'easeInOut', ...OLIVIA_TIMING },
            y: { type: 'tween', ease: 'easeInOut', ...OLIVIA_TIMING },
          }}
        >
          <div
            className={'absolute'}
            style={{ left: `${OLIVIA.dest.left}%`, top: `${OLIVIA.dest.top}%` }}
          >
            <Cursor
              label={'Olivia'}
              color={'#8427E0'}
              direction={'left-top'}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProjectTrackingIllu;
