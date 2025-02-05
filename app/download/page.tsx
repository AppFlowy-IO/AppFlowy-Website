import { Metadata } from 'next';
import React from 'react';
import '@/styles/download.scss';

import DownloadOS from '@/components/download/os';
import DownloadMobile from '@/components/download/mobile';
import DownloadAcross from '@/components/download/across';
import ModalDownload from '@/components/download/modal-download';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
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
    </div>
  );
}

export default Page;
