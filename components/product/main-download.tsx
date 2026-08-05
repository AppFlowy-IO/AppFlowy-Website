'use client';

import HeroDesc from '@/components/shared/hero-desc';
import { Button } from '@/components/ui/button';
import { useClient } from '@/lib/hooks/use-client';
import { webApplicationUrl } from '@/lib/web-application';
import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { collectEvent, EventName } from '@/lib/collect';
import Link from 'next/link';

const selfHostGuideUrl = 'https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production';

function MainDownload({ showDesc = true }: { showDesc?: boolean }) {
  const ref = useRef(null);
  const { isClient, isMobile } = useClient();
  const inView = useInView(ref, {
    once: true,
  });

  useEffect(() => {
    if (inView && isClient) {
      collectEvent(EventName.homePageDownloadBtn, {
        type: 'view',
      });
    }
  }, [isClient, inView]);
  return (
    <div
      ref={ref}
      className={'flex flex-col items-center gap-4'}
    >
      <div className={'flex w-full items-center justify-center gap-4 max-sm:flex-col'}>
        <Button
          asChild
          size={'xl'}
          className={
            'flex-1 rounded-lg bg-night-blue text-white transition-colors hover:bg-[#2C254C]'
          }
        >
          <Link
            href={selfHostGuideUrl}
            target={'_blank'}
            rel={'noopener noreferrer'}
            onClick={() => {
              collectEvent(EventName.homePageDownloadBtn, {
                type: 'click',
              });
            }}
          >
            Self-host AppFlowy
          </Link>
        </Button>
        {!isMobile && (
          <Button
            onClick={() => {
              collectEvent(EventName.homePageTryForFreeBtn, {
                type: 'click',
              });

              window.open(webApplicationUrl, '_current');
            }}
            size={'xl'}
            variant={'outline'}
          >
            Get started free
          </Button>
        )}
      </div>

      {showDesc && <HeroDesc inView={inView} />}
    </div>
  );
}

export default MainDownload;
