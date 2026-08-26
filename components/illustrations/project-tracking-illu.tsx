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
  left: 59.9,
  top: 42.6,
  width: 17.3,
  height: 18.9,
};

// Footprint of the "Review product requirements" card (top of the To do
// column) inside the base image, same percentage convention as CARD_SLOT.
const SMALL_CARD_SLOT = {
  left: 22.5,
  top: 32.4,
  width: 17,
  height: 4.15,
};

const BASE_SHADOW = 'drop-shadow(0 0px 0px rgba(15,23,42,0))';
const LIFT_SHADOW = 'drop-shadow(0 32px 40px rgba(15,23,42,0.38))';

// Natasha spawns far up-left on the board and travels all the way to the
// card, "picking it up" (triggers the card's reaction below) on arrival.
const NATASHA = {
  spawn: { left: 80, top: 80 },
  dest: { left: 70, top: 60 },
};

// Mathieu spawns right next to the small card and sits still while Natasha's
// story plays out, then makes the short hop onto the card once it's his turn.
const MATHIEU = {
  spawn: { left: 25, top: 50 },
  dest: { left: 37, top: 37 },
};

// "You" — a third, always-present collaborator. Arrives with the others,
// lands near a card in the Completed column right as Natasha reaches the big
// card, then wanders inward toward the board's center in a few small,
// unevenly-timed hops — a bit of idle "still there, just looking around"
// motion rather than a purposeful trip to any card.
const YOU_COLOR = '#FB006D'; // AppFlowy's bright pink (fresh-red), also used in the logo mark
const YOU = {
  spawn: { left: 90, top: 18 },
  dest: { left: 93, top: 33.5 }, // arrival point, timed to CARD_PICKUP_ARRIVE below
};
const YOU_WANDER = [
  { left: 88, top: 37 },
  { left: 85, top: 33 },
  { left: 80, top: 40 },
  { left: 77, top: 37 },
];
const YOU_WANDER_STEP_DURATIONS = [0.9, 0.7, 0.9, 0.7]; // uneven step lengths read as "random", not mechanical

const CURSORS_APPEAR = 0.9; // also when Natasha sets off toward the big card
const CARD_PICKUP_ARRIVE = 1.6; // when Natasha reaches the card

// You starts wandering the instant Natasha reaches the big card, then hops
// through YOU_WANDER at its uneven step durations. YOU_WANDER_TIMESTAMPS are
// the absolute moments each hop lands; the last one is where it settles.
const YOU_WANDER_TIMESTAMPS = YOU_WANDER_STEP_DURATIONS.reduce(
  (timestamps, stepDuration) => [...timestamps, timestamps[timestamps.length - 1] + stepDuration],
  [CARD_PICKUP_ARRIVE]
).slice(1);
const YOU_WANDER_END = YOU_WANDER_TIMESTAMPS[YOU_WANDER_TIMESTAMPS.length - 1];

const CARD_LIFT_DURATION = 0.5; // big card's pickup reaction, played on arrival
const CARD_SETTLE_DURATION = 0.4; // big card's relax back to rest, played as Natasha leaves

// Mathieu only sets off once Natasha has been hovering the big card for a
// beat — keeps the two stories from reading as simultaneous. That's also the
// cue for Natasha to leave and the big card to settle back down.
const MATHIEU_TRAVEL_START = 2.5;
const MATHIEU_TRAVEL_DURATION = 0.9;
const MATHIEU_ARRIVE = MATHIEU_TRAVEL_START + MATHIEU_TRAVEL_DURATION;

const NATASHA_LEAVE_START = MATHIEU_TRAVEL_START + 0.5; // leaves a beat after Mathieu sets off
const NATASHA_LEAVE_DURATION = 0.9;
const CARD_SETTLE_START = MATHIEU_TRAVEL_START;

const SMALL_CARD_LIFT_DURATION = 0.35; // small card's pickup reaction, played on arrival
const SMALL_CARD_HOVER_DURATION = 3; // how long it stays lifted while "read"
const SMALL_CARD_SETTLE_DURATION = 0.35; // relaxes back into place as Mathieu leaves
const SMALL_CARD_SETTLE_START = MATHIEU_ARRIVE + SMALL_CARD_LIFT_DURATION + SMALL_CARD_HOVER_DURATION;

const MATHIEU_LEAVE_START = SMALL_CARD_SETTLE_START; // steps away in sync with the card settling
const MATHIEU_LEAVE_DURATION = 0.6;
const MATHIEU_LEAVE_END = MATHIEU_LEAVE_START + MATHIEU_LEAVE_DURATION;

function ProjectTrackingIllu({ className }: IllustrationProps) {
  return (
    <div className={className}>
      <div className={'relative w-full aspect-[2560/1532]'}>
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

          {/* Big card: nested inside the base image's own wrapper so it rides
              the same entrance slide with zero relative motion — it sits at
              rest in its slot from the very first frame (the base image
              already shows it there, so no separate fade of its own), then —
              timed to Natasha's arrival — lifts with a rotate + scale +
              deeper shadow, as if just picked up, holds through her hover,
              then relaxes back to rest as she leaves and Mathieu sets off. */}
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
              rotate: [0, -5, -5, 0],
              filter: [BASE_SHADOW, LIFT_SHADOW, LIFT_SHADOW, BASE_SHADOW],
            }}
            transition={{
              type: 'tween',
              duration: CARD_SETTLE_START + CARD_SETTLE_DURATION - CARD_PICKUP_ARRIVE,
              delay: CARD_PICKUP_ARRIVE,
              times: [
                0,
                CARD_LIFT_DURATION / (CARD_SETTLE_START + CARD_SETTLE_DURATION - CARD_PICKUP_ARRIVE),
                (CARD_SETTLE_START - CARD_PICKUP_ARRIVE) / (CARD_SETTLE_START + CARD_SETTLE_DURATION - CARD_PICKUP_ARRIVE),
                1,
              ],
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
            transition={{
              type: 'tween',
              duration: SMALL_CARD_SETTLE_START + SMALL_CARD_SETTLE_DURATION - MATHIEU_ARRIVE,
              delay: MATHIEU_ARRIVE,
              times: [
                0,
                SMALL_CARD_LIFT_DURATION / (SMALL_CARD_LIFT_DURATION + SMALL_CARD_HOVER_DURATION + SMALL_CARD_SETTLE_DURATION),
                (SMALL_CARD_LIFT_DURATION + SMALL_CARD_HOVER_DURATION) /
                (SMALL_CARD_LIFT_DURATION + SMALL_CARD_HOVER_DURATION + SMALL_CARD_SETTLE_DURATION),
                1,
              ],
              ease: 'easeOut',
            }}
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
            transform-only. Natasha retraces her steps back to her spawn
            point (fading out as she goes) once Mathieu sets off, in sync
            with the big card settling back down. */}
        <motion.div
          className={'absolute inset-0'}
          initial={{
            opacity: 0,
            x: `${NATASHA.spawn.left - NATASHA.dest.left}%`,
            y: `${NATASHA.spawn.top - NATASHA.dest.top}%`,
          }}
          animate={{
            opacity: [0, 1, 1, 1],
            x: [
              `${NATASHA.spawn.left - NATASHA.dest.left}%`,
              '0%',
              '0%',
              `${NATASHA.spawn.left - NATASHA.dest.left}%`,
            ],
            y: [
              `${NATASHA.spawn.top - NATASHA.dest.top}%`,
              '0%',
              '0%',
              `${NATASHA.spawn.top - NATASHA.dest.top}%`,
            ],
          }}
          transition={{
            opacity: {
              type: 'tween',
              delay: CURSORS_APPEAR,
              duration: NATASHA_LEAVE_START + NATASHA_LEAVE_DURATION - CURSORS_APPEAR,
              ease: 'easeOut',
              times: [
                0,
                0.4 / (NATASHA_LEAVE_START + NATASHA_LEAVE_DURATION - CURSORS_APPEAR),
                (NATASHA_LEAVE_START - CURSORS_APPEAR) / (NATASHA_LEAVE_START + NATASHA_LEAVE_DURATION - CURSORS_APPEAR),
                1,
              ],
            },
            x: {
              type: 'tween',
              delay: CURSORS_APPEAR,
              duration: NATASHA_LEAVE_START + NATASHA_LEAVE_DURATION - CURSORS_APPEAR,
              ease: 'easeInOut',
              times: [
                0,
                (CARD_PICKUP_ARRIVE - CURSORS_APPEAR) / (NATASHA_LEAVE_START + NATASHA_LEAVE_DURATION - CURSORS_APPEAR),
                (NATASHA_LEAVE_START - CURSORS_APPEAR) / (NATASHA_LEAVE_START + NATASHA_LEAVE_DURATION - CURSORS_APPEAR),
                1,
              ],
            },
            y: {
              type: 'tween',
              delay: CURSORS_APPEAR,
              duration: NATASHA_LEAVE_START + NATASHA_LEAVE_DURATION - CURSORS_APPEAR,
              ease: 'easeInOut',
              times: [
                0,
                (CARD_PICKUP_ARRIVE - CURSORS_APPEAR) / (NATASHA_LEAVE_START + NATASHA_LEAVE_DURATION - CURSORS_APPEAR),
                (NATASHA_LEAVE_START - CURSORS_APPEAR) / (NATASHA_LEAVE_START + NATASHA_LEAVE_DURATION - CURSORS_APPEAR),
                1,
              ],
            },
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

        {/* Mathieu: holds at his spawn point next to the small card until
            Natasha has hovered the big card for a beat, hops onto the small
            card and holds through its hover window, then steps back to his
            spawn point in sync with the card settling. */}
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
            x: {
              type: 'tween',
              delay: CURSORS_APPEAR,
              duration: MATHIEU_LEAVE_END - CURSORS_APPEAR,
              ease: 'easeInOut',
              times: [
                0,
                (MATHIEU_TRAVEL_START - CURSORS_APPEAR) / (MATHIEU_LEAVE_END - CURSORS_APPEAR),
                (MATHIEU_ARRIVE - CURSORS_APPEAR) / (MATHIEU_LEAVE_END - CURSORS_APPEAR),
                (MATHIEU_LEAVE_START - CURSORS_APPEAR) / (MATHIEU_LEAVE_END - CURSORS_APPEAR),
                1,
              ],
            },
            y: {
              type: 'tween',
              delay: CURSORS_APPEAR,
              duration: MATHIEU_LEAVE_END - CURSORS_APPEAR,
              ease: 'easeInOut',
              times: [
                0,
                (MATHIEU_TRAVEL_START - CURSORS_APPEAR) / (MATHIEU_LEAVE_END - CURSORS_APPEAR),
                (MATHIEU_ARRIVE - CURSORS_APPEAR) / (MATHIEU_LEAVE_END - CURSORS_APPEAR),
                (MATHIEU_LEAVE_START - CURSORS_APPEAR) / (MATHIEU_LEAVE_END - CURSORS_APPEAR),
                1,
              ],
            },
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

        {/* You: arrives alongside Natasha and Mathieu, lands near a card in
            the Completed column right as Natasha reaches the big card, then
            wanders inward toward the board's center in a few small,
            unevenly-timed hops before settling — nothing to pick up, just a
            third presence idly drifting. */}
        <motion.div
          className={'absolute inset-0'}
          initial={{
            opacity: 0,
            x: `${YOU.spawn.left - YOU.dest.left}%`,
            y: `${YOU.spawn.top - YOU.dest.top}%`,
          }}
          animate={{
            opacity: 1,
            x: [
              `${YOU.spawn.left - YOU.dest.left}%`,
              '0%',
              ...YOU_WANDER.map((point) => `${point.left - YOU.dest.left}%`),
            ],
            y: [
              `${YOU.spawn.top - YOU.dest.top}%`,
              '0%',
              ...YOU_WANDER.map((point) => `${point.top - YOU.dest.top}%`),
            ],
          }}
          transition={{
            opacity: { delay: CURSORS_APPEAR, duration: 0.4, ease: 'easeOut' },
            x: {
              type: 'tween',
              delay: CURSORS_APPEAR,
              duration: YOU_WANDER_END - CURSORS_APPEAR,
              ease: 'easeInOut',
              times: [
                0,
                (CARD_PICKUP_ARRIVE - CURSORS_APPEAR) / (YOU_WANDER_END - CURSORS_APPEAR),
                ...YOU_WANDER_TIMESTAMPS.map((t) => (t - CURSORS_APPEAR) / (YOU_WANDER_END - CURSORS_APPEAR)),
              ],
            },
            y: {
              type: 'tween',
              delay: CURSORS_APPEAR,
              duration: YOU_WANDER_END - CURSORS_APPEAR,
              ease: 'easeInOut',
              times: [
                0,
                (CARD_PICKUP_ARRIVE - CURSORS_APPEAR) / (YOU_WANDER_END - CURSORS_APPEAR),
                ...YOU_WANDER_TIMESTAMPS.map((t) => (t - CURSORS_APPEAR) / (YOU_WANDER_END - CURSORS_APPEAR)),
              ],
            },
          }}
        >
          <div
            className={'absolute'}
            style={{ left: `${YOU.dest.left}%`, top: `${YOU.dest.top}%` }}
          >
            <Cursor
              label={'You'}
              color={YOU_COLOR}
              direction={'right-top'}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProjectTrackingIllu;
