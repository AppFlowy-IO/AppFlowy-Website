import { useCallback, useState } from 'react';

// Holds a scene's timeline until all of its images have painted. Every
// motion delay in an illustration is measured from mount, so on a slow
// network the decoys would otherwise play their reveal over an empty frame
// — white rectangles wiping away to reveal nothing. Pass `settle` as both
// `onLoad` and `onError` on each image (an error still counts, so a broken
// image never leaves the scene stuck invisible), and gate every `animate`
// on `ready`.
//
// next/image fires onLoad once per src, after decode(), and also for images
// that were already complete (cached) by the time it mounted.
export function useImagesReady(count: number) {
  const [settled, setSettled] = useState(0);
  const settle = useCallback(() => setSettled((n) => n + 1), []);

  return { ready: settled >= count, settle };
}
