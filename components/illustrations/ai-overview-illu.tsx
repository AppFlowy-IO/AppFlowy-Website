'use client';

import AiOverviewBase from '@/assets/images/illustrations/ai-overview-illu-base.webp';
import AiOverviewOverlay from '@/assets/images/illustrations/ai-overview-illu-overlay.webp';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IllustrationProps } from './types';
import { useImagesReady } from './use-images-ready';

// DecoyReveal: ai-overview-illu-overlay.webp already has the whole card
// fully drawn in — heading, properties, comments, and objective. Instead of
// separate content-layer images, we hide each section behind a plain white
// decoy and fade the decoy away to reveal it. The overlay is now exported
// full-frame (2560x1392, matching the base), so — unlike the old card-sized
// export — both the overlay image and every decoy below are positioned as
// percentages of the whole frame, not a sub-box.

const BASE_SLIDE_DURATION = 0.6;

// The card fades in as it lifts a short distance once the base background
// has mostly settled, starting a touch before it finishes for a cascading
// feel rather than a strictly sequential one.
const OVERLAY_SLIDE_START = 0.35;
const OVERLAY_SLIDE_DISTANCE = 20; // px it travels upward while fading in
const OVERLAY_SLIDE_DURATION = 0.6;
const OVERLAY_SLIDE_END = OVERLAY_SLIDE_START + OVERLAY_SLIDE_DURATION;

// Section footprints, measured directly off the overlay art as a percentage
// of its own 2560x1392 canvas — each spans from just above its content down
// to just before the next section's divider line.
const CONTENT_LEFT = 21.68;
const CONTENT_WIDTH = 57.23;
const HEADING_SLOT = { top: 7.9, height: 10.42 };
const PROPERTIES_SLOT = { top: 19.4, height: 20.83 };
const COMMENTS_SLOT = { top: 42.75, height: 35.56 };
const OBJECTIVE_SLOT = { top: 80.82, height: 19.18 };

// The two divider rules get decoys of their own so they can be sequenced
// between the sections rather than showing from the first frame. They're
// drawn edge-to-edge across the card, so they run wider than the content
// column above; the slots are padded a few pixels either side of the 2px
// rule (the card is plain white there, so the overshoot is invisible).
const DIVIDER_LEFT = 17.11;
const DIVIDER_WIDTH = 65.78;
const DIVIDER_1_SLOT = { top: 40.66, height: 0.43 }; // between properties and comments
const DIVIDER_2_SLOT = { top: 78.74, height: 0.43 }; // between comments and objective

// Everything inside the card fades in, staggered, once the card has finished
// its entrance — straight down the card in reading order: title, properties,
// divider, comments, divider, body text.
const CONTENT_START = OVERLAY_SLIDE_END + 0.2;
const CONTENT_STAGGER = 0.3;
const CONTENT_FADE_DURATION = 0.45;

const HEADING_START = CONTENT_START;
const PROPERTIES_START = CONTENT_START + CONTENT_STAGGER;
const DIVIDER_1_START = CONTENT_START + CONTENT_STAGGER * 2;
const COMMENTS_START = CONTENT_START + CONTENT_STAGGER * 3;
const DIVIDER_2_START = CONTENT_START + CONTENT_STAGGER * 4;
const OBJECTIVE_START = CONTENT_START + CONTENT_STAGGER * 5;

function AiOverviewIllu({ className }: IllustrationProps) {
  // Nothing plays until every image below has painted — see useImagesReady.
  const { ready, settle } = useImagesReady(2);

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
            src={AiOverviewBase}
            onLoad={settle}
            onError={settle}
            alt={'AI overview'}
            fill
            sizes={'(max-width: 1280px) 100vw, 1280px'}
            className={'object-contain'}
          />

          {/* Card: nested inside the base's own wrapper so it rides the same
              entrance slide with zero relative motion, then — on top of
              that — fades in over a short lift on its own timer. Both the
              overlay image and its decoys below share this same full-frame
              `inset-0` box, so every decoy's percentages line up with the
              overlay art directly — no separate card sub-box. */}
          <motion.div
            className={'absolute inset-0'}
            initial={{ opacity: 0, y: OVERLAY_SLIDE_DISTANCE }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ type: 'tween', duration: OVERLAY_SLIDE_DURATION, delay: OVERLAY_SLIDE_START, ease: 'easeOut' }}
          >
            <Image
              src={AiOverviewOverlay}
              onLoad={settle}
              onError={settle}
              alt={'AI Overview requirements'}
              fill
              className={'object-contain'}
            />

            {/* Heading: emoji + title. */}
            <motion.div
              className={'absolute bg-white'}
              style={{ left: `${CONTENT_LEFT}%`, top: `${HEADING_SLOT.top}%`, width: `${CONTENT_WIDTH}%`, height: `${HEADING_SLOT.height}%` }}
              initial={{ opacity: 1 }}
              animate={ready ? { opacity: 0 } : undefined}
              transition={{ duration: CONTENT_FADE_DURATION, delay: HEADING_START, ease: 'easeOut' }}
            />

            {/* Product manager / status / due date */}
            <motion.div
              className={'absolute bg-white'}
              style={{ left: `${CONTENT_LEFT}%`, top: `${PROPERTIES_SLOT.top}%`, width: `${CONTENT_WIDTH}%`, height: `${PROPERTIES_SLOT.height}%` }}
              initial={{ opacity: 1 }}
              animate={ready ? { opacity: 0 } : undefined}
              transition={{ duration: CONTENT_FADE_DURATION, delay: PROPERTIES_START, ease: 'easeOut' }}
            />

            {/* Divider above the comments */}
            <motion.div
              className={'absolute bg-white'}
              style={{ left: `${DIVIDER_LEFT}%`, top: `${DIVIDER_1_SLOT.top}%`, width: `${DIVIDER_WIDTH}%`, height: `${DIVIDER_1_SLOT.height}%` }}
              initial={{ opacity: 1 }}
              animate={ready ? { opacity: 0 } : undefined}
              transition={{ duration: CONTENT_FADE_DURATION, delay: DIVIDER_1_START, ease: 'easeOut' }}
            />

            {/* Comments */}
            <motion.div
              className={'absolute bg-white'}
              style={{ left: `${CONTENT_LEFT}%`, top: `${COMMENTS_SLOT.top}%`, width: `${CONTENT_WIDTH}%`, height: `${COMMENTS_SLOT.height}%` }}
              initial={{ opacity: 1 }}
              animate={ready ? { opacity: 0 } : undefined}
              transition={{ duration: CONTENT_FADE_DURATION, delay: COMMENTS_START, ease: 'easeOut' }}
            />

            {/* Divider above the objective */}
            <motion.div
              className={'absolute bg-white'}
              style={{ left: `${DIVIDER_LEFT}%`, top: `${DIVIDER_2_SLOT.top}%`, width: `${DIVIDER_WIDTH}%`, height: `${DIVIDER_2_SLOT.height}%` }}
              initial={{ opacity: 1 }}
              animate={ready ? { opacity: 0 } : undefined}
              transition={{ duration: CONTENT_FADE_DURATION, delay: DIVIDER_2_START, ease: 'easeOut' }}
            />

            {/* Objective */}
            <motion.div
              className={'absolute bg-white'}
              style={{ left: `${CONTENT_LEFT}%`, top: `${OBJECTIVE_SLOT.top}%`, width: `${CONTENT_WIDTH}%`, height: `${OBJECTIVE_SLOT.height}%` }}
              initial={{ opacity: 1 }}
              animate={ready ? { opacity: 0 } : undefined}
              transition={{ duration: CONTENT_FADE_DURATION, delay: OBJECTIVE_START, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AiOverviewIllu;
