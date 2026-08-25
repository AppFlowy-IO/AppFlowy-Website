'use client';

import AiOverviewBase from '@/assets/images/illustrations/ai-overview-illu-base.webp';
import AiOverviewOne from '@/assets/images/illustrations/ai-overview-illu-one.webp';
import AiOverviewOverlay from '@/assets/images/illustrations/ai-overview-illu-overlay.webp';
import AiOverviewThree from '@/assets/images/illustrations/ai-overview-illu-three.webp';
import AiOverviewTwo from '@/assets/images/illustrations/ai-overview-illu-two.webp';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IllustrationProps } from './types';

const BASE_SLIDE_DURATION = 0.6;

// The card slides up from below the frame once the base background has
// mostly settled, starting a touch before it finishes for a cascading feel
// rather than a strictly sequential one.
const OVERLAY_SLIDE_START = 0.35;
const OVERLAY_SLIDE_DURATION = 0.6;
const OVERLAY_SLIDE_END = OVERLAY_SLIDE_START + OVERLAY_SLIDE_DURATION;

// Card footprint, sized/positioned off ai-overview-illu-overlay.webp's own
// aspect ratio (1844x1392, re-exported to share the base image's 1392
// height) so it isn't distorted: width is chosen so the card reads as a
// comfortable modal within this illustration's frame (2560x1392, matching
// the base image), and height is back-derived from the overlay's real
// aspect ratio converted through the frame's own aspect ratio — not
// eyeballed — so the card doesn't stretch.
const FRAME_WIDTH = 2560;
const FRAME_HEIGHT = 1392;
const OVERLAY_NATIVE_WIDTH = 1844;
const OVERLAY_NATIVE_HEIGHT = 1392;
// Width matched against assets/images/product/ai-overview.webp — the
// original product reference — where the card's visible left/right
// background bleed puts it at roughly 68% of the frame's width.
const OVERLAY_WIDTH = 68;
const OVERLAY_HEIGHT = OVERLAY_WIDTH * (OVERLAY_NATIVE_HEIGHT / OVERLAY_NATIVE_WIDTH) * (FRAME_WIDTH / FRAME_HEIGHT);
const OVERLAY_LEFT = (100 - OVERLAY_WIDTH) / 2;
const OVERLAY_TOP = 2;

// The three content pieces' slots, as a percentage of the overlay card's own
// box (not the outer frame) — measured directly off the overlay art's two
// divider lines (pixel rows ~571 and ~1101 of the 1844x1392 source), which
// mark the boundaries between the property row, the comment, and the
// objective section. Each piece is then vertically centered in its section.
const CONTENT_LEFT = 10.95;
const CONTENT_WIDTH = 78.04;
const ONE_SLOT = { top: 14.7, height: 26.3 };
const TWO_SLOT = { top: 41.0, height: 38.2 };
const THREE_SLOT = { top: 79.2, height: 20.8 };

// One, two, and three fade in and slide down into place, staggered, once
// the card has finished sliding up.
const CONTENT_START = OVERLAY_SLIDE_END + 0.2;
const CONTENT_STAGGER = 0.35;
const CONTENT_FADE_DURATION = 0.5;
const CONTENT_SLIDE_DISTANCE = -16;

const ONE_START = CONTENT_START;
const TWO_START = CONTENT_START + CONTENT_STAGGER;
const THREE_START = CONTENT_START + CONTENT_STAGGER * 2;

function AiOverviewIllu({ className }: IllustrationProps) {
  return (
    <div className={className}>
      <div className={'relative mx-auto aspect-[2560/1392] h-full overflow-hidden'}>
        <motion.div
          className={'absolute inset-0'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: BASE_SLIDE_DURATION, ease: 'easeIn' }}
        >
          <Image
            src={AiOverviewBase}
            alt={'AI overview'}
            fill
            sizes={'(max-width: 1280px) 100vw, 1280px'}
            className={'object-contain'}
          />

          {/* Card: nested inside the base's own wrapper so it rides the same
              entrance slide with zero relative motion, then — on top of
              that — slides up from below the frame on its own timer. The
              inset-0 wrapper's `y` is a percentage of the whole frame
              (matching the cursor-travel convention elsewhere in these
              illustrations); the positioned box inside it sits at the
              card's actual rest slot throughout. */}
          <motion.div
            className={'absolute inset-0'}
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ type: 'tween', duration: OVERLAY_SLIDE_DURATION, delay: OVERLAY_SLIDE_START, ease: 'easeOut' }}
          >
            <div
              className={'absolute'}
              style={{
                left: `${OVERLAY_LEFT}%`,
                top: `${OVERLAY_TOP}%`,
                width: `${OVERLAY_WIDTH}%`,
                height: `${OVERLAY_HEIGHT}%`,
              }}
            >
              <Image
                src={AiOverviewOverlay}
                alt={''}
                fill
                className={'object-contain'}
              />

              {/* Product manager / status / due date */}
              <motion.div
                className={'absolute'}
                style={{ left: `${CONTENT_LEFT}%`, top: `${ONE_SLOT.top}%`, width: `${CONTENT_WIDTH}%`, height: `${ONE_SLOT.height}%` }}
                initial={{ opacity: 0, y: CONTENT_SLIDE_DISTANCE }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: CONTENT_FADE_DURATION, delay: ONE_START, ease: 'easeOut' }}
              >
                <Image
                  src={AiOverviewOne}
                  alt={'Product manager, status, and due date'}
                  fill
                  className={'object-contain'}
                />
              </motion.div>

              {/* Comments */}
              <motion.div
                className={'absolute'}
                style={{ left: `${CONTENT_LEFT}%`, top: `${TWO_SLOT.top}%`, width: `${CONTENT_WIDTH}%`, height: `${TWO_SLOT.height}%` }}
                initial={{ opacity: 0, y: CONTENT_SLIDE_DISTANCE }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: CONTENT_FADE_DURATION, delay: TWO_START, ease: 'easeOut' }}
              >
                <Image
                  src={AiOverviewTwo}
                  alt={'Comments'}
                  fill
                  className={'object-contain'}
                />
              </motion.div>

              {/* Objective */}
              <motion.div
                className={'absolute'}
                style={{ left: `${CONTENT_LEFT}%`, top: `${THREE_SLOT.top}%`, width: `${CONTENT_WIDTH}%`, height: `${THREE_SLOT.height}%` }}
                initial={{ opacity: 0, y: CONTENT_SLIDE_DISTANCE }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: CONTENT_FADE_DURATION, delay: THREE_START, ease: 'easeOut' }}
              >
                <Image
                  src={AiOverviewThree}
                  alt={'Objective'}
                  fill
                  className={'object-contain'}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AiOverviewIllu;
