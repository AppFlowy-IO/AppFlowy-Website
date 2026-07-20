import './globals.scss';
import type { Metadata, Viewport } from 'next';
import Favicon from '../public/appflowy.ico';
import OpenGraph from '../public/images/og-image.png';
import App from '@/components/layout/app';
import { getGitData } from '@/lib/get-git';
import { getUAFromServer } from '@/lib/get-os';
import Script from 'next/script';
import { ChunkLoadErrorBoundary } from '@/components/error-boundary/chunk-load-error-boundary';

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
  metadataBase: new URL(site_url || 'http://localhost:3000'),
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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AppFlowy',
    alternateName: ['AppFlowy IO', 'AppFlowy.io'],
    description: metaDescription,
    url: site_url,
    logo: `${site_url}/images/og-image.png`,
    image: `${site_url}/images/og-image.png`,
    foundingDate: '2021',
    foundingLocation: {
      '@type': 'Place',
      name: 'Singapore',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@appflowy.io',
      url: `${site_url}/contact`,
    },
    sameAs: [
      'https://github.com/AppFlowy-IO/AppFlowy',
      'https://twitter.com/appflowy',
      'https://discord.gg/9Q2xaN37tV',
      'https://www.youtube.com/@appflowyhq',
      'https://www.linkedin.com/company/appflowy',
      'https://www.reddit.com/r/AppFlowy'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1600',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AppFlowy',
    description: metaDescription,
    url: site_url,
    applicationCategory: 'ProductivityApplication',
    operatingSystem: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
    isAccessibleForFree: true,
    license: 'https://github.com/AppFlowy-IO/AppFlowy/blob/main/LICENSE',
    creator: {
      '@type': 'Organization',
      name: 'AppFlowy',
      url: site_url,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      category: 'Free and paid plans available',
    },
    featureList: [
      'Self-hosted deployment',
      'Local and on-prem AI support',
      'Offline-first workspace',
      'Open-core architecture',
      'Cross-platform compatibility',
      'Data ownership and privacy',
      'Modular and extensible',
      'Rich-text editor with 40+ content types',
      'Multiple database views: Grid, Kanban, Calendar, Gallery, List, Feed, Chart',
      'Advanced filters and relations',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1500',
      bestRating: '5',
      worstRating: '1',
    },
    downloadUrl: 'https://appflowy.com/download',
    screenshot: `${site_url}/images/og-image.png`,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AppFlowy',
    description: metaDescription,
    url: site_url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site_url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, softwareApplicationSchema, websiteSchema],
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
        <ChunkLoadErrorBoundary>
          <App
            ua={ua}
            gitData={gitData}
          >
            {children}
          </App>
        </ChunkLoadErrorBoundary>
      </body>
    </html>
  );
}
