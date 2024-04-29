'use client';
import '@/styles/app.scss';
import '@/styles/btn.scss';
import '@/styles/dark.scss';

import React, { useState, useLayoutEffect, lazy, useMemo } from 'react';
import { DarkContext } from '@/lib/hooks/use-dark-context';
import { GitContext } from '@/lib/hooks/use-git-context';
import { UAContext } from '@/lib/hooks/use-ua';
import { setTheme } from '@/lib/set-theme';
import Script from 'next/script';
import * as process from 'process';
import Modal from '@/components/shared/modal';
import { ModalProps, ModalProvider } from '@/lib/hooks/use-modal';
import { usePathname } from 'next/navigation';

const Header = lazy(() => import('@/components/layout/header'));

const Footer = lazy(() => import('@/components/layout/footer'));

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function App({
  children,
  mode,
  gitData,
  ua,
}: {
  children: React.ReactNode;
  ua?: UAParser.IResult;
  mode?: 'dark' | 'light';
  gitData?: {
    stars?: number;
    lastVersion?: string;
    visitedLatestVersion?: string;
  };
}) {
  const [dark, setDark] = useState<boolean | undefined>(() => {
    if (typeof window === 'undefined') return mode === 'dark';
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    if (!mode) {
      const dark = media.matches;

      setTheme(dark);
    }

    return mode === 'dark';
  });

  useLayoutEffect(() => {
    setDark(document.documentElement.className.includes('dark'));
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const changeTheme = (e: MediaQueryListEvent) => {
      setTheme(e.matches);
      setDark(e.matches);
    };

    media.addEventListener('change', changeTheme);

    return () => {
      media.removeEventListener('change', changeTheme);
    };
  }, [mode]);

  const [openModal, setOpenModal] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps | undefined>(undefined);

  const modalContext = useMemo(
    () => ({
      open: openModal,
      openModal: (props: ModalProps) => {
        setModalProps(props);
        setOpenModal(true);
      },
      closeModal: () => {
        setOpenModal(false);
      },
      modalProps,
    }),
    [openModal, modalProps]
  );

  const pathname = usePathname();

  const isSinglePage = pathname.includes('invitation');

  return (
    <UAContext.Provider value={ua}>
      <GitContext.Provider value={gitData}>
        <DarkContext.Provider value={dark}>
          <ModalProvider value={modalContext}>
            {isSinglePage ? (
              <div className={'appflowy-app'}>
                <main>{children}</main>
              </div>
            ) : (
              <div className={'appflowy-app'}>
                <Header />

                <main>{children}</main>
                <Footer onChangeMode={setDark} />
                {GA_MEASUREMENT_ID && process.env.NODE_ENV === 'production' && (
                  <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
                    <Script id='google-analytics'>
                      {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
       
                gtag('config', '${GA_MEASUREMENT_ID}', {
                   page_theme: '${dark ? 'dark' : 'light'}'
                });
              `}
                    </Script>
                  </>
                )}
              </div>
            )}

            <div className={'appflowy-overlay'} />
            <Modal />
          </ModalProvider>
        </DarkContext.Provider>
      </GitContext.Provider>
    </UAContext.Provider>
  );
}
