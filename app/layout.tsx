import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Favicon from '../public/favicon.ico';
import App from '@/components/layout/app';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Appflowy.IO',
  description: 'A privacy-first open source workspace for your notes, wikis, and projects',
  icons: [
    {
      rel: 'icon',
      url: Favicon.src,
    },
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body id={'body'} className={inter.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
