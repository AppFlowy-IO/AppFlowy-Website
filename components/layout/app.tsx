'use client';
import '@/styles/app.scss';
import '@/styles/btn.scss';

import React, { useState, lazy, useMemo } from 'react';
import { DarkContext } from '@/lib/hooks/use-dark-context';
import { GitContext } from '@/lib/hooks/use-git-context';
import { UAContext } from '@/lib/hooks/use-ua';
import Script from 'next/script';
import * as process from 'process';
import Modal from '@/components/shared/modal';
import { ModalProps, ModalProvider } from '@/lib/hooks/use-modal';
import { usePathname } from 'next/navigation';
import { ToastProvider } from '@/components/ui/toast';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';

const Header = lazy(() => import('@/components/layout/header'));

const Footer = lazy(() => import('@/components/layout/footer'));

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID;

export default function App({
  children,
  gitData,
  ua,
}: {
  children: React.ReactNode;
  ua?: UAParser.IResult;
  gitData?: {
    stars?: number;
    lastVersion?: string;
    visitedLatestVersion?: string;
  };
}) {
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
    [openModal, modalProps],
  );

  const pathname = usePathname();

  const isSinglePage = pathname.includes('invitation');

  return (
    <>
      <ToastProvider>
        <UAContext.Provider value={ua}>
          <GitContext.Provider value={gitData}>
            <DarkContext.Provider value={false}>
              <ModalProvider value={modalContext}>
                {isSinglePage ? (
                  <div className={'appflowy-app'}>
                    <main>{children}</main>
                  </div>
                ) : (
                  <div className={'appflowy-app'}>
                    <Header />

                    <main>{children}</main>
                    <Footer />
                    {GA_MEASUREMENT_ID && process.env.NODE_ENV === 'production' && (
                      <>
                        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
                        <Script id="google-analytics">
                          {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
       
                gtag('config', '${GA_MEASUREMENT_ID}', {
                   page_theme: 'light'
                });
                gtag('config', '${ADS_ID}');
              `}
                        </Script>
                      </>
                    )}
                  </div>
                )}


                <Modal />
                <div className={'appflowy-overlay'} />
              </ModalProvider>
            </DarkContext.Provider>
          </GitContext.Provider>
        </UAContext.Provider>
        <Toaster />
        <SonnerToaster 
          position="top-right"
          theme="light"
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
              color: '#374151',
            },
            className: 'rounded-[8px]',
          }}
        />
      </ToastProvider>
    </>
  );
}
