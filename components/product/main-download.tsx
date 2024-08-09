'use client';

import HeroDesc from '@/components/shared/hero-desc';
import { useClient } from '@/lib/hooks/use-client';
import { useDownload } from '@/lib/hooks/use-download';
import React, { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'framer-motion';
import { collectEvent, EventName } from '@/lib/collect';
import LinuxBtnGroup from '@/components/shared/linux-btn-group';

function MainDownload({ showDesc = true }: { showDesc?: boolean }) {
  const { downloadOS, getOsDownloadLink } = useDownload();
  const ref = useRef(null);
  const { os, isClient, isLinux } = useClient();
  const inView = useInView(ref, {
    once: true,
  });
  const name = useMemo(() => {
    const name = os?.name?.toLowerCase() || '';

    if (name.includes('mac')) return 'macOS';
    if (name.includes('windows')) return 'Windows';
    if (name.includes('android')) return 'Android';
    if (name.includes('ios')) return 'iOS';

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
    <div className={'main-download'}>
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

            downloadOS();
          }}
          className={'col download-btn gap-0 bg-[#8427E0] '}
        >
          <div className={'title'}>{`Download for ${name}`}</div>
        </button>
      )}
      {showDesc && <HeroDesc inView={inView} />}
    </div>
  );
}

export default MainDownload;
