import { Metadata } from 'next';
import React from 'react';
import Downloading from '@/components/shared/downloading';
import '@/styles/downloading.scss';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${site_url}/download`,
    },
  };
}

function Page() {
  return <div className={'download-progress-page'}>{<Downloading />}</div>;
}

export default Page;
