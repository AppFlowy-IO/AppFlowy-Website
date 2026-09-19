import { Metadata } from 'next';
import React from 'react';
import '@/styles/about.scss';
import Missions from '@/components/about/missions';
import Community from '@/components/about/community';
import OurValues from '@/components/about/our-values';
import OurInvestors from '@/components/about/our-investors';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us: Our Mission, Values and Team | AppFlowy',
    description:
      'AppFlowy exists to help everyone achieve more with secure workplace tools, built on data privacy, community-driven extensibility and an open source philosophy.',
    alternates: {
      canonical: `${site_url}/about`,
    },
  };
}

function Page() {
  return (
    <div className={'about'}>
      <Missions />
      <Community />
      <OurValues />
      <OurInvestors />
    </div>
  );
}

export default Page;
