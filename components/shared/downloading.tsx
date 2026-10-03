'use client';

import { useDownload } from '@/lib/hooks/use-download';
import { useClient } from '@/lib/hooks/use-client';
import { getDownloadSteps, getOsFromName } from '@/components/download/download-steps';
import React, { useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash-es/debounce';
import { download } from '@/lib/download';
import Image from 'next/image';
import { Storage } from '@/lib/storage';
import MobileAppBanner from '@/components/shared/mobile-app-banner';

function Downloading() {
  const { getOsDownloadLink } = useDownload();
  const { os } = useClient();
  const steps = useMemo(() => getDownloadSteps(getOsFromName(os?.name)), [os]);

  const downloadPackage = useCallback((downloadUrl: string) => {
    Storage.set('download_url', '');
    if (!downloadUrl) return;
    Storage.set('manually_download_url', downloadUrl);

    download(downloadUrl, false);
  }, []);

  const debounceDownload = useMemo(() => {
    return debounce(downloadPackage, 1000);
  }, [downloadPackage]);

  useEffect(() => {
    let downloadUrl = Storage.get('download_url');

    if (!downloadUrl) {
      downloadUrl = getOsDownloadLink();
    }

    debounceDownload(downloadUrl);
  }, [debounceDownload, getOsDownloadLink]);

  return (
    <>
      <section className={'flex w-full justify-center px-8 pt-[180px] max-sm:px-4 max-sm:pt-[140px]'}>
        <div className={'flex w-full max-w-[1280px] flex-col items-center'}>
          <h1 className={'text-style-h1 text-center font-bold tracking-[-0.04em] text-text-primary'}>
            Thanks for downloading
          </h1>
          <p className={'mt-4 text-center text-[20px] leading-[1.5] tracking-[-0.02em] text-text-secondary max-sm:text-[16px]'}>
            {`Your download should start automatically. If it doesn't, `}
            <button
              type={'button'}
              onClick={() => downloadPackage(Storage.get('manually_download_url'))}
              className={'text-primary underline underline-offset-4'}
            >
              click here to download manually
            </button>
            .
          </p>

          <ol className={'mt-20 grid w-full grid-cols-1 gap-5 max-sm:mt-12 max-sm:gap-10 md:grid-cols-3'}>
            {steps.map((step) => (
              <li key={step.title} className={'flex flex-col'}>
                {step.image ? (
                  <Image
                    src={step.image}
                    alt={''}
                    className={'mb-6 h-auto w-full rounded-[16px]'}
                    sizes={'(min-width: 768px) 33vw, 100vw'}
                    priority={true}
                  />
                ) : null}
                <h2 className={'text-[18px] font-semibold leading-[1.4] tracking-[-0.02em] text-text-primary'}>
                  {step.title}
                </h2>
                <p className={'mt-1 text-[15px] leading-[1.5] text-text-secondary'}>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <MobileAppBanner className={'bg-transparent pt-[200px] pb-[160px] max-sm:py-[80px]'} />
    </>
  );
}

export default Downloading;
