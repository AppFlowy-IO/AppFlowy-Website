'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Image, { StaticImageData } from 'next/image';
import { useClient } from '@/lib/hooks/use-client';
import { DOWNLOAD_MODAL_EVENT, download } from '@/lib/download';
import { Storage } from '@/lib/storage';
import step1Img from '@/assets/images/download/download-step-1.webp';
import step2Img from '@/assets/images/download/download-step-2.webp';
import step3Img from '@/assets/images/download/download-step-3.webp';

type OS = 'macos' | 'windows' | 'linux';

interface Step {
  title: string;
  description: React.ReactNode;
  image?: StaticImageData;
}

function getOsFromName(name?: string): OS {
  if (name?.includes('windows')) return 'windows';
  if (name?.includes('linux')) return 'linux';
  return 'macos';
}

function getSteps(os: OS, onManualDownload: () => void): Step[] {
  const manualDownloadLink = (
    <>
      {`Your download will begin automatically`}
      <br />
      {`If it doesn't, you can `}
      <span onClick={onManualDownload} className={'highlight cursor-pointer text-primary underline'}>
        download AppFlowy manually.
      </span>
    </>
  );

  switch (os) {
    case 'windows':
      return [
        { title: '1. Download', description: manualDownloadLink },
        {
          title: '2. Open file',
          description: `Once it's downloaded, open the installer (.exe) file from your downloads folder.`,
        },
        {
          title: '3. Install & Launch',
          description: `Follow the setup wizard to install AppFlowy, then launch it from your Start menu.`,
        },
      ];
    case 'linux':
      return [
        { title: '1. Download', description: manualDownloadLink },
        {
          title: '2. Open file',
          description: `Once downloaded, install the package (AppImage, .deb, or .rpm) using your preferred method.`,
        },
        {
          title: '3. Install & Launch',
          description: `Follow your distribution's instructions to install AppFlowy, then launch it from your applications menu.`,
        },
      ];
    case 'macos':
    default:
      return [
        { title: '1. Download', description: manualDownloadLink, image: step1Img },
        {
          title: '2. Open file',
          description: `Once its downloaded, open the file by double-clicking it in your downloads folder.`,
          image: step2Img,
        },
        {
          title: '3. Install & Launch',
          description: `Follow the instructions to install AppFlowy to your computer.`,
          image: step3Img,
        },
      ];
  }
}

function DownloadModal() {
  const [open, setOpen] = useState(false);
  const { os } = useClient();

  const currentOS = useMemo(() => getOsFromName(os?.name?.toLowerCase().replaceAll(' ', '')), [os]);

  useEffect(() => {
    const handleOpen = () => setOpen(true);

    window.addEventListener(DOWNLOAD_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(DOWNLOAD_MODAL_EVENT, handleOpen);
  }, []);

  const handleManualDownload = useCallback(() => {
    const url = Storage.get('manually_download_url');

    if (!url) return;
    download(url, false);
  }, []);

  const steps = useMemo(() => getSteps(currentOS, handleManualDownload), [currentOS, handleManualDownload]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={'fixed inset-0 z-50 bg-black/50'} />
        <Dialog.Content className={'download-modal fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 dark:bg-[#232729] sm:p-8'}>
          <div className={'flex items-start justify-between gap-4'}>
            <div>
              <Dialog.Title className={'text-lg font-semibold text-black dark:text-white sm:text-xl'}>
                Thanks for downloading
              </Dialog.Title>
              <Dialog.Description className={'mt-1 text-sm text-gray-500 dark:text-gray-400'}>
                {`The desktop app should have downloaded automatically. If not, you can `}
                <span onClick={handleManualDownload} className={'cursor-pointer text-primary underline'}>
                  download manually
                </span>
                .
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label={'Close'}
                className={'flex-shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10'}
              >
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M12 4L4 12M4 4L12 12'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </Dialog.Close>
          </div>
          <div className={'mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3'}>
            {steps.map((step) => (
              <div key={step.title} className={'flex flex-col gap-3'}>
                {step.image ? (
                  <div className={'relative overflow-hidden rounded-xl'}>
                    <Image src={step.image} alt={step.title} className={'h-auto w-full'} />
                  </div>
                ) : null}
                <div className={'font-semibold text-black dark:text-white'}>{step.title}</div>
                <div className={'text-sm leading-relaxed text-gray-500 dark:text-gray-400'}>{step.description}</div>
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DownloadModal;
