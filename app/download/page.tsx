import React from 'react';
import '@/styles/download.scss';

import DownloadOS from '@/components/download/os';
import DownloadMobile from '@/components/download/mobile';
import DownloadAcross from '@/components/download/across';

function Page() {
  return (
    <div className={'download-page'}>
      <DownloadOS />
      <DownloadMobile />
      <DownloadAcross />
    </div>
  );
}

export default Page;
