'use client';

import ReleaseBase from '@/assets/images/illustrations/release-illu-base-2.webp';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IllustrationProps } from './types';
import { useImagesReady } from './use-images-ready';

// DecoyReveal: release-illu-base-2.png already has everything fully drawn
// in — the graph, the pie, and the AI summary. Instead of exporting each of
// those as a separate layer, we hide their regions behind plain white
// "decoy" rectangles and animate the decoys away to reveal what's already
// underneath. One base image, no content-layer exports.

const BASE_SLIDE_DURATION = 0.6;

// Block footprints, measured directly off release-illu-base-2.png as a
// percentage of its own 2560x1480 canvas — each spans from just above its
// title down to just past its last row of content.
const GRAPH_LEFT = 25;
const GRAPH_TOP = 21.6;
const GRAPH_WIDTH = 31.5;
const GRAPH_HEIGHT = 34.4;
// Header sub-region (title/subtitle/"...") as a % of the graph block's own
// box — the boundary sits just above the "30" gridline.
const GRAPH_HEADER_HEIGHT = 22.6;

const PIE_LEFT = 25;
const PIE_TOP = 63.6;
const PIE_WIDTH = 31.5;
const PIE_HEIGHT = 24.2;
// Header sub-region, boundary just above the donut ring.
const PIE_HEADER_HEIGHT = 32.1;

const SUMMARY_LEFT = 60.5;
const SUMMARY_TOP = 17.7;
const SUMMARY_WIDTH = 35;
const SUMMARY_HEIGHT = 65.7;

// Timeline: all three blocks reveal at once — one shared start, one shared
// one-second window, so the graph, the pie and the summary land together
// instead of taking turns. Each keeps the reveal motion that suits it: the
// graph's chart decoy wipes left-to-right (pinned to the right edge, so it
// peels from the left), the pie's shrinks as a circle from the center —
// fitting for a donut — and the summary's recedes downward. The two block
// headers fade out on that same cue, just over a shorter beat, so the titles
// are legible while the charts are still drawing in beneath them.
const REVEAL_START = 0.4;
const REVEAL_DURATION = 1;
const HEADER_REVEAL_DURATION = 0.45;

function ReleaseReviewIllu({ className }: IllustrationProps) {
  // Nothing plays until every image below has painted — see useImagesReady.
  const { ready, settle } = useImagesReady(1);

  return (
    <div className={className}>
      <div className={'relative w-full aspect-[2560/1480] overflow-hidden'}>
        <motion.div
          className={'absolute inset-0'}
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: BASE_SLIDE_DURATION, ease: 'easeIn' }}
        >
          <Image
            src={ReleaseBase}
            onLoad={settle}
            onError={settle}
            alt={'Release review'}
            fill
            sizes={'(max-width: 1280px) 100vw, 1280px'}
            className={'object-contain'}
          />

          {/* Graph decoys: header fades out while the chart decoy's width
              animates to 0 — pinned via `right`, so it peels left-to-right. */}
          <div
            className={'absolute'}
            style={{ left: `${GRAPH_LEFT}%`, top: `${GRAPH_TOP}%`, width: `${GRAPH_WIDTH}%`, height: `${GRAPH_HEIGHT}%` }}
          >
            <motion.div
              className={'absolute inset-x-0 top-0 bg-white'}
              style={{ height: `${GRAPH_HEADER_HEIGHT}%` }}
              initial={{ opacity: 1 }}
              animate={ready ? { opacity: 0 } : undefined}
              transition={{ duration: HEADER_REVEAL_DURATION, delay: REVEAL_START, ease: 'easeOut' }}
            />
            <motion.div
              className={'absolute right-0 bg-white'}
              style={{ top: `${GRAPH_HEADER_HEIGHT}%`, height: `${100 - GRAPH_HEADER_HEIGHT}%` }}
              initial={{ width: '100%' }}
              animate={ready ? { width: '0%' } : undefined}
              transition={{ duration: REVEAL_DURATION, delay: REVEAL_START, ease: 'easeInOut' }}
            />
          </div>

          {/* Pie decoys: same header fade, with the donut decoy shrinking as
              a circle from the center — a "hole" opening outward reads as
              circular the way a shrinking rectangle wouldn't. */}
          <div
            className={'absolute'}
            style={{ left: `${PIE_LEFT}%`, top: `${PIE_TOP}%`, width: `${PIE_WIDTH}%`, height: `${PIE_HEIGHT}%` }}
          >
            <motion.div
              className={'absolute inset-x-0 top-0 bg-white'}
              style={{ height: `${PIE_HEADER_HEIGHT}%` }}
              initial={{ opacity: 1 }}
              animate={ready ? { opacity: 0 } : undefined}
              transition={{ duration: HEADER_REVEAL_DURATION, delay: REVEAL_START, ease: 'easeOut' }}
            />
            <motion.div
              className={'absolute inset-x-0 bg-white'}
              style={{ top: `${PIE_HEADER_HEIGHT}%`, height: `${100 - PIE_HEADER_HEIGHT}%` }}
              initial={{ clipPath: 'circle(100% at 50% 50%)' }}
              animate={ready ? { clipPath: 'circle(0% at 50% 50%)' } : undefined}
              transition={{ duration: REVEAL_DURATION, delay: REVEAL_START, ease: 'easeInOut' }}
            />
          </div>

          {/* Summary decoy: height animates to 0, pinned via `bottom`, so it
              recedes downward — uncovering the block from the top. */}
          <div
            className={'absolute'}
            style={{ left: `${SUMMARY_LEFT}%`, top: `${SUMMARY_TOP}%`, width: `${SUMMARY_WIDTH}%`, height: `${SUMMARY_HEIGHT}%` }}
          >
            <motion.div
              className={'absolute inset-x-0 bottom-0 bg-white'}
              initial={{ height: '100%' }}
              animate={ready ? { height: '0%' } : undefined}
              transition={{ duration: REVEAL_DURATION, delay: REVEAL_START, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ReleaseReviewIllu;
