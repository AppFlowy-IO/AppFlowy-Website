import { Metadata } from 'next';
import React from 'react';
import '@/styles/download.scss';

import DownloadOS from '@/components/download/os';
import DownloadMobile from '@/components/download/mobile';
import DownloadAcross from '@/components/download/across';
import ModalDownload from '@/components/download/modal-download';
import DownloadModal from '@/components/download/download-modal';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Download for Mac, Windows, Linux, iOS & Android | AppFlowy',
    description:
      'Download AppFlowy free for macOS, Windows, Linux, iOS and Android. A fast native app that works offline and keeps your data on your own infrastructure.',
    alternates: {
      canonical: `${site_url}/download`,
    },
  };
}

function Page() {
  return (
    <div className={'download-page'}>
      <DownloadOS />
      <DownloadMobile />
      <DownloadAcross />
      <ModalDownload />
      <DownloadModal />
    </div>
  );
}

export default Page;
