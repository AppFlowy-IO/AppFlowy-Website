'use client';

import AiOverview from '@/assets/images/product/ai-overview.webp';
import Backlog from '@/assets/images/product/backlog.webp';
import ProjectTracking from '@/assets/images/product/project-tracking.webp';
import ReleaseReview from '@/assets/images/product/release-review.webp';
import WeeklyBrief from '@/assets/images/product/wekkly-rose.webp';
import { TabPanel } from '@/components/shared/tab-panel';
import { useAutoPlay } from '@/lib/hooks/use-auto-play';
import { useClient } from '@/lib/hooks/use-client';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';

function MainProducts() {
  const [value, setValue] = React.useState('project-tracking');
  const { isClient } = useClient();

  useEffect(() => {
    if(!isClient) {
      return;
    }

    const token = window.localStorage.getItem('token');

    if(token) {
      window.location.href = '/app';
    }
  }, [isClient]);

  const imageOptions = useMemo(() => {
    return [
      { value: 'project-tracking', src: ProjectTracking.src, alt: 'Project tracking' },
      { value: 'backlog', src: Backlog.src, alt: 'Backlog' },
      { value: 'ai-overview', src: AiOverview.src, alt: 'AI overview' },
      { value: 'release-review', src: ReleaseReview.src, alt: 'Release review' },
      { value: 'weekly-brief', src: WeeklyBrief.src, alt: 'Weekly brief' },
    ];
  }, []);

  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const { start, stop } = useAutoPlay({
    options: imageOptions,
    onChange: setValue,
    duration: 3000,
  });

  useEffect(() => {
    if(!inView) {
      stop();
    } else {
      start();
    }
  }, [inView, start, stop]);

  return (
    <div
      ref={ref}
      className={'main-product'}
    >
      {imageOptions.map((image) => (
        <TabPanel
          key={image.value}
          value={value}
          index={image.value}
        >
          <div className={'ai-image'}>
            <Image
              src={image.src}
              loading={'eager'}
              className={'object-cover'}
              alt={image.alt}
              width={1280}
              height={696}
            />
          </div>
        </TabPanel>
      ))}
    </div>
  );
}

export default MainProducts;
