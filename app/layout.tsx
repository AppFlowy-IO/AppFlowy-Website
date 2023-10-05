import './globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Favicon from '../public/favicon.ico';
import App from '@/components/layout/app';
import { getModeForServer } from '@/lib/get-theme';
import { getGitData } from '@/lib/get-git';
import { getUAFromServer } from '@/lib/get-os';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AppFlowy.IO',
  description: 'A privacy-first open source workspace for your notes, wikis, and projects',
  icons: [
    {
      rel: 'icon',
      url: Favicon.src,
    },
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
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
