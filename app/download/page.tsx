import { Metadata } from 'next';
import React from 'react';
import '@/styles/download.scss';

import DownloadOS from '@/components/download/os';
import DownloadApps from '@/components/download/apps';
import LightTestimonial from '@/components/download/light-testimonial';
import ModalDownload from '@/components/download/modal-download';
import ScrollIcons from '@/components/shared/scroll-icons';
import GetStart from '@/components/product/get-start';

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
      <div className={'w-full bg-white pb-16 pt-24 max-md:py-5 max-md:pt-[60px]'}>
        <ScrollIcons />
      </div>
      <DownloadApps />
      <LightTestimonial />
      <GetStart />
      <ModalDownload />
    </div>
  );
}

export default Page;
