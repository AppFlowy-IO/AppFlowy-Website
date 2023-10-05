'use client';

import React, { useContext, useMemo } from 'react';
import { useClient } from '@/lib/hooks/use-client';
import { downloadMacUniversal, useDownload } from '@/lib/hooks/use-download';
import { GitContext } from '@/lib/hooks/use-git-context';
import Link from 'next/link';

function HeroDownloadBtn() {
  const { os, isMobile } = useClient();
  const { downloadOS } = useDownload();
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

  return (
    <div className={'flex flex-col items-center justify-center gap-[20px]'}>
      <button
        onClick={() => {
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
