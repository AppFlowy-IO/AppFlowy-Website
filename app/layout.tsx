import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Favicon from '../public/favicon.ico';
import App from '@/components/layout/app';
import { isDarkForServer } from '@/lib/get-theme';
import { getGitData } from '@/lib/get-git';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
  const isDark = isDarkForServer();
  const gitData = await getGitData();

  return (
    <html
      lang='en'
      {...(isDark
        ? {
            'data-mode': isDark ? 'dark' : '',
          }
        : {})}
    >
      <body id={'body'} className={inter.className}>
        <App gitData={gitData} isDark={isDark}>
          {children}
        </App>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <Script id='google-analytics'>
              {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
