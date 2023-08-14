import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { locales } from '../../../i18n';
import Main from '@/components/layout/main';
import Favicon from '/public/favicon.ico';

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Appflowy.IO',
  description: 'A privacy-first open source workspace for your notes, wikis, and projects.',
  icons: [
    {
      rel: 'icon',
      url: Favicon.src,
    },
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
      <body id={'body'} className={inter.className}>
        <Main>{children}</Main>
      </body>
    </html>
  );
}
