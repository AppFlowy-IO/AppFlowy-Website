'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useClient } from '@/lib/hooks/use-client';
import { downloadMacUniversal, useDownload } from '@/lib/hooks/use-download';
import { useInView } from 'framer-motion';
import { collectEvent, EventName } from '@/lib/collect';
import LinuxBtnGroup from '@/components/shared/linux-btn-group';
import HeroDesc from '@/components/shared/hero-desc';

function HeroDownloadBtn() {
  const { os, isMobile, isClient, isLinux } = useClient();
  const { downloadOS, getOsDownloadLink } = useDownload();

  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });
  const name = useMemo(() => {
    const name = os?.name?.toLowerCase() || '';

    if (name.includes('mac')) return 'macOS';
    if (name.includes('windows')) return 'Windows';
    // if (name.includes('android')) return 'Android';
    // if (name.includes('ios')) return 'iOS';

    return 'macOS';
  }, [os?.name]);

  useEffect(() => {
    if (inView && isClient) {
      collectEvent(EventName.homePageDownloadBtn, {
        type: 'view',
      });
    }
  }, [isClient, inView]);

  return (
    <div ref={ref} className={'flex flex-col items-center justify-center gap-[20px]'}>
      {isLinux ? (
        <LinuxBtnGroup title={'Download for Linux'} />
      ) : (
        <button
          onClick={() => {
            const link = getOsDownloadLink();

            if (!link) return;

            collectEvent(EventName.homePageDownloadBtn, {
              type: 'click',
            });
            // if current os is mobile, download mac universal
            if (isMobile) {
              downloadMacUniversal();
              return;
            }

            downloadOS();
          }}
          className={'col download-btn gap-0 '}
        >
          <div className={'title'}>{`Download for ${name}`}</div>
        </button>
      )}

      <HeroDesc inView={inView} />
    </div>
  );
}

export default HeroDownloadBtn;
