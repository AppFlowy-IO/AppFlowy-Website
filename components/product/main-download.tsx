'use client';

import HeroDesc from '@/components/shared/hero-desc';
import { Button } from '@/components/ui/button';
import { WEB_URL } from '@/lib/config/web';
import { useClient } from '@/lib/hooks/use-client';
import { useDownload } from '@/lib/hooks/use-download';
import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { collectEvent, EventName } from '@/lib/collect';
import LinuxBtnGroup from '@/components/shared/linux-btn-group';

function MainDownload({ showDesc = true }: { showDesc?: boolean }) {
  const { downloadOS, getOsDownloadLink } = useDownload();
  const ref = useRef(null);
  const { isClient, isLinux, isMobile } = useClient();
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
    <div className={'main-download'}>
      <div className={'flex w-full items-center justify-center gap-4 max-sm:flex-col'}>
        {isLinux ? (
          <LinuxBtnGroup title={'Download now'} />
        ) : (
          <Button
            className={'flex-1'}
            size={'2xl'}
            onClick={() => {
              const link = getOsDownloadLink();

              if (!link) return;

              collectEvent(EventName.homePageDownloadBtn, {
                type: 'click',
              });

              downloadOS();
            }}
          >
            <div className={'title'}>{`Download now`}</div>
          </Button>
        )}
        {!isMobile && (
          <Button
            onClick={() => {
              collectEvent(EventName.homePageTryForFreeBtn, {
                type: 'click',
              });

              window.open(WEB_URL, '_current');
            }}
            className={'flex-1'}
            size={'2xl'}
            variant={'accent'}
          >
            Start for free
          </Button>
        )}
      </div>

      {showDesc && <HeroDesc inView={inView} />}
    </div>
  );
}

export default MainDownload;
