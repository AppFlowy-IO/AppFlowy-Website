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

const metaTitle = 'AppFlowy';
const metaDescription =
  'AppFlowy is the AI collaborative workspace where you achieve more without losing control of your data';
const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: {
    canonical: site_url,
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
    url: site_url,
    title: metaTitle,
    description: metaDescription,
    siteName: 'AppFlowy',
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
        url: site_url,
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
    <html lang="en">
    <head>
      {process.env.ENVIRONMENT !== 'production' && <meta
        name="robots"
        content="noindex,nofollow"
      />}
      <Script
        id="schema-org"
        type="application/ld+json"
      >
        {JSON.stringify(generateListSchema())}
      </Script>
    </head>
    <body id={'body'}>
    <App
      ua={ua}
      gitData={gitData}
    >
      {children}
    </App>
    </body>
    </html>
  );
}
