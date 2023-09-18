'use client';
import React from 'react';
import Apple from '@/components/icons/apple';
import GooglePlay from '@/components/icons/google-play';
import { useClient } from '@/lib/hooks/use-client';
import { useDownload } from '@/lib/hooks/use-download';

function DownloadBtns() {
  const { isIOS, isAndroid } = useClient();
  const { downloadOS } = useDownload();

  return (
    <div className={'btn-group'}>
      {isAndroid ? null : (
        <button disabled onClick={downloadOS} className={'download-btn'}>
          <Apple />
          App Store
        </button>
      )}
      {isIOS ? null : (
        <button disabled onClick={downloadOS} className={'download-btn'}>
          <GooglePlay />
          Google Play
        </button>
      )}
    </div>
  );
}

export default DownloadBtns;
