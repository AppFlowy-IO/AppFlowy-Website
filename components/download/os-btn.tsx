'use client';
import React, { useMemo } from 'react';
import { downloadLinux86Deb, downloadLinux86Rpm, useDownload } from '@/lib/hooks/use-download';
import Apple from '@/components/icons/apple';
import { useClient } from '@/lib/hooks/use-client';
import GooglePlay from '@/components/icons/google-play';

function DownloadOsBtn() {
  const { downloadOS } = useDownload();
  const { os, isClient, isLinux, isMobile } = useClient();

  const icon = useMemo(() => {
    if (!isClient) return null;
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes('android')) {
      return <GooglePlay />;
    }

    if (userAgent.includes('apple')) {
      return <Apple />;
    }

    return null;
  }, [isClient]);

  return (
    <div className={'download z-[2]'}>
      {isLinux ? (
        <div className={'btn-group'}>
          <button onClick={() => downloadLinux86Deb(true)} className={'download-btn'}>
            Download for Linux (.deb)
          </button>
          <button onClick={() => downloadLinux86Rpm(true)} className={'download-btn'}>
            Download for Linux (.rpm)
          </button>
        </div>
      ) : (
        <button disabled={isMobile} onClick={downloadOS} className={'download-btn'}>
          <>
            {icon}
            Download for {os?.name?.replaceAll(' ', '')}
          </>
        </button>
      )}

      <div className={'desc'}>
        For {os?.name} version {os?.version}
      </div>
    </div>
  );
}

export default DownloadOsBtn;
