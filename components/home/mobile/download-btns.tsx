'use client';
import React, { useEffect } from 'react';
// import Apple from '@/components/icons/apple';
import GooglePlay from '@/components/icons/google-play';
import { useClient } from '@/lib/hooks/use-client';
import { useDownload } from '@/lib/hooks/use-download';
import TestFlight from '@/components/icons/test-flight';
import { collectEvent, EventName } from '@/lib/collect';

function DownloadBtns() {
  const { isIOS, isAndroid } = useClient();
  const { downloadOS, downloadIOS } = useDownload();

  useEffect(() => {
    collectEvent(EventName.downloadIOSTestFlightBtn, {
      type: 'view',
    });
  }, []);

  return (
    <>
      <a
        target={'_blank'}
        href={'https://docs.appflowy.io/docs/guides/sync-desktop-and-mobile'}
        className={'desc z-10 text-center text-base underline'}
      >
        Learn how to sync desktop
      </a>
      <div className={'btn-group'}>
        {isAndroid ? null : (
          <button onClick={downloadIOS} className={'download-btn'}>
            <TestFlight />
            Test Flight
          </button>
        )}
        {isIOS ? null : (
          <button disabled onClick={downloadOS} className={'download-btn'}>
            <GooglePlay />
            Google Play
          </button>
        )}
      </div>
    </>
  );
}

export default DownloadBtns;
