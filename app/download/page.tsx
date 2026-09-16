import { Metadata } from 'next';
import React from 'react';
import '@/styles/download.scss';

import DownloadOS from '@/components/download/os';
import DownloadMobile from '@/components/download/mobile';
import DownloadApps from '@/components/download/apps';
import LightTestimonial from '@/components/download/light-testimonial';
import ModalDownload from '@/components/download/modal-download';
import DownloadModal from '@/components/download/download-modal';
import ScrollIcons from '@/components/shared/scroll-icons';
import GetStart from '@/components/product/get-start';

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
    <div className={'download-page overflow-hidden'}>
      <DownloadOS />
      <div className={'w-full bg-white pb-16 pt-24 max-md:py-5 max-md:pt-[60px]'}>
        <ScrollIcons />
      </div>
      {/* <DownloadMobile /> */}
      <DownloadApps />
      <LightTestimonial />
      <GetStart />
      <ModalDownload />
      <DownloadModal />
    </div>
  );
}

export default Page;
