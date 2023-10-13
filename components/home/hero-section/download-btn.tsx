'use client';

import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { useClient } from '@/lib/hooks/use-client';
import { downloadMacUniversal, useDownload } from '@/lib/hooks/use-download';
import { GitContext } from '@/lib/hooks/use-git-context';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import { collectEvent, EventName } from '@/lib/collect';
import { parseDownloadUrl } from '@/lib/download';

function HeroDownloadBtn() {
  const { os, isMobile, isClient } = useClient();
  const { downloadOS, getOsDownloadLink } = useDownload();

  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });
  const gitData = useContext(GitContext);
  const name = useMemo(() => {
    const name = os?.name?.toLowerCase() || '';

    if (name.includes('mac')) return 'macOS';
    if (name.includes('windows')) return 'Windows';
    if (name.includes('linux')) return 'Linux';
    // if (name.includes('android')) return 'Android';
    // if (name.includes('ios')) return 'iOS';

    return 'macOS';
  }, [os?.name]);

  useEffect(() => {
    if (inView && isClient) {
      const link = getOsDownloadLink();

      if (!link) return;
      const params = parseDownloadUrl(link);

      collectEvent(EventName.btnDisplay, {
        btn_type: 'home_download',
        ...params,
      });
    }
  }, [isClient, inView, name, gitData?.lastVersion, getOsDownloadLink]);

  return (
    <div ref={ref} className={'flex flex-col items-center justify-center gap-[20px]'}>
      <button
        onClick={() => {
          const link = getOsDownloadLink();

          if (!link) return;
          const params = parseDownloadUrl(link);

          collectEvent(EventName.btnClick, {
            btn_type: 'home_download',
            ...params,
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
      <div className={'desc text-[12px]'}>
        <Link href={'/what-is-new'}>{`What's new in ${gitData?.lastVersion}`}</Link>
        {` / `}
        <Link target={'_blank'} href={'https://survey.appflowy.io/private-beta'}>
          {`Get the Cloud beta`}
        </Link>
      </div>
    </div>
  );
}

export default HeroDownloadBtn;
