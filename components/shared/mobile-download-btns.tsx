'use client';
import React, { useEffect } from 'react';
import Apple from '@/components/icons/apple';
import GooglePlay from '@/components/icons/google-play';
import { useClient } from '@/lib/hooks/use-client';
import { useDownload } from '@/lib/hooks/use-download';
import { collectEvent, EventName } from '@/lib/collect';

function MobileDownloadBtns() {
  const { isIOS, isAndroid } = useClient();
  const { downloadIOS, downloadAndroid } = useDownload();

  useEffect(() => {
    collectEvent(EventName.downloadAppleBtn, {
      type: 'view',
    });
    collectEvent(EventName.downloadAndroidBtn, {
      type: 'view',
    });
  }, []);

  return (
    <>
      <div className={'btn-group mb-1'}>
        {isAndroid ? null : (
          <button onClick={downloadIOS} className={'download-btn whitespace-nowrap'}>
            <Apple />
            App Store
          </button>
        )}
        {isIOS ? null : (
          <button onClick={downloadAndroid} className={'download-btn whitespace-nowrap'}>
            <GooglePlay />
            Google Play
          </button>
        )}
      </div>
    </>
  );
}

export default MobileDownloadBtns;
