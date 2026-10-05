import './globals.scss';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import Favicon from '../public/appflowy.ico';
import OpenGraph from '../public/images/og-image.png';
import App from '@/components/layout/app';
import { getGitData } from '@/lib/get-git';
import { getUAFromServer } from '@/lib/get-os';
import SeoData from '@/components/layout/seo-data';
import { ChunkLoadErrorBoundary } from '@/components/error-boundary/chunk-load-error-boundary';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Self-hosted by Next at build time, so there is no fonts.gstatic.com connection
// to discover after the CSS parses. Inter ships as a variable font covering 100-900,
// so no explicit weight list is needed.
const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

const metaTitle = 'Self-Hosted AI Workspace for Enterprise Teams | AppFlowy';
const metaDescription =
  'AppFlowy is a self-hosted AI workspace for enterprise teams to manage projects, wikis, and data with private AI, flexible databases, and full data control.';
const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://appflowy.com';
const isNonProduction =
  process.env.ENVIRONMENT === 'test' ||
  process.env.ENVIRONMENT === 'development' ||
  process.env.VERCEL_ENV === 'preview' ||
  process.env.NODE_ENV !== 'production';

export const metadata: Metadata = {
  metadataBase: new URL(site_url),
  title: metaTitle,
  description: metaDescription,
  alternates: {
    canonical: site_url,
  },
  robots: isNonProduction
    ? {
        index: false,
        follow: false,
      }
    : {
        index: true,
        follow: true,
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
    title: 'Bring projects, wikis, and teams together with AI',
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
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: [OpenGraph.src],
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
    logo: `${site_url}/appflowy-rss-logo.png`,
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
      'https://www.reddit.com/r/AppFlowy',
    ],
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
    downloadUrl: 'https://appflowy.com/download',
    screenshot: `${site_url}/images/og-image.png`,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AppFlowy',
    description: metaDescription,
    url: site_url,
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
    <html
      lang='en'
      className={inter.variable}
    >
      <body id={'body'}>
        {/*
          Rendered inside <body>, not <head>. React hydrates a non-hoistable element
          like this <script> by position, so anything that injects a script into <head>
          before hydration (Cypress does exactly that) gets claimed in its place and the
          root fails to hydrate. JSON-LD is valid anywhere in the document, and every
          other page in the app renders SeoData from the page body for the same reason.
        */}
        <SeoData id='schema-org' data={generateListSchema()} />
        <ChunkLoadErrorBoundary>
          <App ua={ua} gitData={gitData}>
            {children}
          </App>
        </ChunkLoadErrorBoundary>
      </body>
    </html>
  );
}
