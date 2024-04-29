import React from 'react';
import '@/styles/download.scss';

import DownloadOS from '@/components/download/os';
import DownloadMobile from '@/components/download/mobile';
import DownloadAcross from '@/components/download/across';
import ModalDownload from '@/components/download/modal-download';

function Page() {
  return (
    <div className={'download-page'}>
      <DownloadOS />
      <DownloadMobile />
      <DownloadAcross />
      <ModalDownload />
    </div>
  );
}

export default Page;
