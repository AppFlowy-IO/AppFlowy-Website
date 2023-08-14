import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React, { Suspense } from 'react';
import Nav from '@/components/layout/nav';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Appflowy Site',
  description: 'A privacy-first open source workspace for your notes, wikis, and projects.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Suspense>
          <Nav />
        </Suspense>

        <main className='flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden text-base'>
          {children}
        </main>
        <Suspense>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
