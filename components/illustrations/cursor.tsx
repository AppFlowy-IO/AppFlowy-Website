'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties } from 'react';
import CursorPointerIcon from './cursor-pointer-icon';

export type CursorDirection = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom';

export interface CursorProps {
  className?: string;
  style?: CSSProperties;
  label: string;
  color?: string;
  direction?: CursorDirection;
}

const DEFAULT_COLOR = '#8427E0';

// Per direction: which corner of the bubble the arrow's tip sits in.
// `scaleX`/`scaleY` flip the arrow to point into that corner, `flexDirection`
// keeps the pill flowing away from the tip, and `anchor` is a percentage-based
// translate (relative to the bubble's own rendered size, so it holds even as
// the label text changes width) that pulls that corner back onto the origin.
const DIRECTION_CONFIG: Record<
  CursorDirection,
  { scaleX: number; scaleY: number; flexDirection: CSSProperties['flexDirection']; anchor: string }
> = {
  'left-top': { scaleX: 1, scaleY: 1, flexDirection: 'row', anchor: 'translate(0%, 0%)' },
  'right-top': { scaleX: -1, scaleY: 1, flexDirection: 'row-reverse', anchor: 'translate(-100%, 0%)' },
  'left-bottom': { scaleX: 1, scaleY: -1, flexDirection: 'row', anchor: 'translate(0%, -100%)' },
  'right-bottom': { scaleX: -1, scaleY: -1, flexDirection: 'row-reverse', anchor: 'translate(-100%, -100%)' },
};

// The arrow's tip is the anchor point: position/move this component by
// translating the root (e.g. `style={{ transform: 'translate3d(x, y, 0)' }}`),
// and pick `direction` for which corner of the bubble that tip sits in.
function Cursor({ className, style, label, color = DEFAULT_COLOR, direction = 'left-top' }: CursorProps) {
  const { scaleX, scaleY, flexDirection, anchor } = DIRECTION_CONFIG[direction];

  return (
    <div
      className={`pointer-events-none absolute left-0 top-0 ${className ?? ''}`}
      style={style}
    >
      <div
        className={'flex items-center gap-2'}
        style={{ flexDirection, transform: anchor }}
      >
        <CursorPointerIcon
          color={color}
          className={'shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]'}
          style={{ transform: `scale(${scaleX}, ${scaleY})` }}
        />
        <AnimatePresence
          mode={'popLayout'}
          initial={false}
        >
          <motion.span
            key={label}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm'}
            style={{ backgroundColor: color }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Cursor;
