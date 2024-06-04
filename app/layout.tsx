import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Favicon from '../public/favicon.ico';
import OpenGraph from '../public/images/og-image.png';
import App from '@/components/layout/app';
import { getModeForServer } from '@/lib/get-theme';
import { getGitData } from '@/lib/get-git';
import { getUAFromServer } from '@/lib/get-os';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AppFlowy.IO',
  description: 'AppFlowy is an AI collaborative workspace where you achieve more without losing control of your data',
  icons: [
    {
      rel: 'icon',
      url: Favicon.src,
    },
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://appflowy.io',
    title: 'AppFlowy.IO',
    description: 'AppFlowy is an AI collaborative workspace where you achieve more without losing control of your data',
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
  const mode = getModeForServer();
  const ua = getUAFromServer();
  const gitData = await getGitData();

  return (
    <html lang='en' className={mode}>
      <body id={'body'} className={inter.className}>
        <App ua={ua} gitData={gitData} mode={mode}>
          {children}
        </App>
      </body>
    </html>
  );
}
