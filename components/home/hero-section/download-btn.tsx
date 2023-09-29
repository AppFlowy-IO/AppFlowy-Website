'use client';

import React, { useMemo } from 'react';
import { useClient } from '@/lib/hooks/use-client';
import { useDownload } from '@/lib/hooks/use-download';

function HeroDownloadBtn() {
  const { os, isMobile } = useClient();
  const { downloadOS } = useDownload();
  const name = useMemo(() => {
    const name = os?.name?.toLowerCase() || '';

    if (name.includes('mac')) return 'Mac';
    if (name.includes('windows')) return 'Windows';
    if (name.includes('linux')) return 'Linux';
    if (name.includes('android')) return 'Android';
    if (name.includes('ios')) return 'iOS';
    return name;
  }, [os?.name]);

  return (
    <button disabled={isMobile} onClick={downloadOS} className={'download-btn col gap-0'}>
      <div className={'title'}>{`Download for ${name}`}</div>
    </button>
  );
}

export default HeroDownloadBtn;
