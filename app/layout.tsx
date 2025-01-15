import './globals.scss';
import type { Metadata, Viewport } from 'next';
import Favicon from '../public/appflowy.ico';
import OpenGraph from '../public/images/og-image.png';
import App from '@/components/layout/app';
import { getGitData } from '@/lib/get-git';
import { getUAFromServer } from '@/lib/get-os';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const metaTitle = 'AppFlowy.IO';
const metaDescription =
  'AppFlowy is an AI collaborative workspace where you achieve more without losing control of your data';

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: {
    canonical: 'https://appflowy.com',
  },
  icons: [
    {
      rel: 'icon',
      url: Favicon.src,
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://appflowy.com',
    title: metaTitle,
    description: metaDescription,
    siteName: 'AppFlowy.IO',
    images: [
      {
        url: OpenGraph.src,
        width: 1200,
        height: 630,
        alt: metaTitle,
      },
    ],
  },
};

function generateListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: 'https://appflowy.com',
        name: metaTitle,
        description: metaDescription,
        image: Favicon.src,
      },
    ],
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const ua = getUAFromServer();
  const gitData = await getGitData();

  return (
    <html lang='en'>
      <head>
        {process.env.ENVIRONMENT !== 'production' && <meta name='robots' content='noindex,nofollow' />}
        <link rel='canonical' href={'https://appflowy.io'} />
        <Script id='schema-org' type='application/ld+json'>
          {JSON.stringify(generateListSchema())}
        </Script>
      </head>
      <body id={'body'}>
        <App ua={ua} gitData={gitData}>
          {children}
        </App>
      </body>
    </html>
  );
}
