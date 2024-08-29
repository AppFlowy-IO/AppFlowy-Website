import './globals.scss';
import type { Metadata, Viewport } from 'next';
import Favicon from '../public/appflowy.svg';
import OpenGraph from '../public/images/og-image.png';
import App from '@/components/layout/app';
import { getGitData } from '@/lib/get-git';
import { getUAFromServer } from '@/lib/get-os';
import process from 'process';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'AppFlowy.IO',
  description: 'AppFlowy is an AI collaborative workspace where you achieve more without losing control of your data',
  icons: [
    {
      rel: 'icon',
      url: Favicon.src,
    },
  ],
  openGraph:
    process.env.NODE_ENV === 'development'
      ? undefined
      : {
          type: 'website',
          locale: 'en_US',
          url: 'https://appflowy.io',
          title: 'AppFlowy.IO',
          description:
            'AppFlowy is an AI collaborative workspace where you achieve more without losing control of your data',
          images: [
            {
              url: OpenGraph.src,
              width: 1200,
              height: 630,
              alt: 'AppFlowy.IO',
            },
          ],
        },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const ua = getUAFromServer();
  const gitData = await getGitData();

  return (
    <html lang='en'>
      <body id={'body'}>
        <App ua={ua} gitData={gitData}>
          {children}
        </App>
      </body>
    </html>
  );
}
