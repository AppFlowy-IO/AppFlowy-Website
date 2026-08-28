'use client';

import ReleaseBase from '@/assets/images/illustrations/release-illu-base-2.webp';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IllustrationProps } from './types';

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

// Timeline: graph header decoy fades away first, then the chart decoy wipes
// left-to-right (pinned to the right edge, so it peels from the left). The
// pie follows the same header-then-content shape, but its content decoy
// shrinks as a circle from the center — fitting for a donut chart — instead
// of a straight wipe. The summary decoy wipes top-to-bottom in parallel with
// the pie's circular reveal (not after it) — the right column would
// otherwise just sit empty while the pie animates on its own.
const GRAPH_HEADER_REVEAL_START = 0.4;
const GRAPH_HEADER_REVEAL_DURATION = 0.35;
const GRAPH_HEADER_REVEAL_END = GRAPH_HEADER_REVEAL_START + GRAPH_HEADER_REVEAL_DURATION;

const GRAPH_CHART_REVEAL_START = GRAPH_HEADER_REVEAL_END + 0.1;
const GRAPH_CHART_REVEAL_DURATION = 0.9;
const GRAPH_CHART_REVEAL_END = GRAPH_CHART_REVEAL_START + GRAPH_CHART_REVEAL_DURATION;

const PIE_HEADER_REVEAL_START = GRAPH_CHART_REVEAL_END - 0.1;
const PIE_HEADER_REVEAL_DURATION = 0.35;
const PIE_HEADER_REVEAL_END = PIE_HEADER_REVEAL_START + PIE_HEADER_REVEAL_DURATION;

const PIE_CHART_REVEAL_START = PIE_HEADER_REVEAL_END + 0.1;
const PIE_CHART_REVEAL_DURATION = 0.8;

const SUMMARY_REVEAL_START = PIE_CHART_REVEAL_START;
const SUMMARY_REVEAL_DURATION = 0.9;

function ReleaseReviewIllu({ className }: IllustrationProps) {
  return (
    <div className={className}>
      <div className={'relative w-full aspect-[2560/1480] overflow-hidden'}>
        <motion.div
          className={'absolute inset-0'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: BASE_SLIDE_DURATION, ease: 'easeIn' }}
        >
          <Image
            src={ReleaseBase}
            alt={'Release review'}
            fill
            sizes={'(max-width: 1280px) 100vw, 1280px'}
            className={'object-contain'}
          />

          {/* Graph decoys: header fades out, then the chart decoy's width
              animates to 0 — pinned via `right`, so it peels left-to-right. */}
          <div
            className={'absolute'}
            style={{ left: `${GRAPH_LEFT}%`, top: `${GRAPH_TOP}%`, width: `${GRAPH_WIDTH}%`, height: `${GRAPH_HEIGHT}%` }}
          >
            <motion.div
              className={'absolute inset-x-0 top-0 bg-white'}
              style={{ height: `${GRAPH_HEADER_HEIGHT}%` }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: GRAPH_HEADER_REVEAL_DURATION, delay: GRAPH_HEADER_REVEAL_START, ease: 'easeOut' }}
            />
            <motion.div
              className={'absolute right-0 bg-white'}
              style={{ top: `${GRAPH_HEADER_HEIGHT}%`, height: `${100 - GRAPH_HEADER_HEIGHT}%` }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: GRAPH_CHART_REVEAL_DURATION, delay: GRAPH_CHART_REVEAL_START, ease: 'easeInOut' }}
            />
          </div>

          {/* Pie decoys: same header-fade shape, then the donut decoy
              shrinks as a circle from the center — a "hole" opening outward
              reads as circular the way a shrinking rectangle wouldn't. */}
          <div
            className={'absolute'}
            style={{ left: `${PIE_LEFT}%`, top: `${PIE_TOP}%`, width: `${PIE_WIDTH}%`, height: `${PIE_HEIGHT}%` }}
          >
            <motion.div
              className={'absolute inset-x-0 top-0 bg-white'}
              style={{ height: `${PIE_HEADER_HEIGHT}%` }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: PIE_HEADER_REVEAL_DURATION, delay: PIE_HEADER_REVEAL_START, ease: 'easeOut' }}
            />
            <motion.div
              className={'absolute inset-x-0 bg-white'}
              style={{ top: `${PIE_HEADER_HEIGHT}%`, height: `${100 - PIE_HEADER_HEIGHT}%` }}
              initial={{ clipPath: 'circle(100% at 50% 50%)' }}
              animate={{ clipPath: 'circle(0% at 50% 50%)' }}
              transition={{ duration: PIE_CHART_REVEAL_DURATION, delay: PIE_CHART_REVEAL_START, ease: 'easeInOut' }}
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
              animate={{ height: '0%' }}
              transition={{ duration: SUMMARY_REVEAL_DURATION, delay: SUMMARY_REVEAL_START, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ReleaseReviewIllu;
