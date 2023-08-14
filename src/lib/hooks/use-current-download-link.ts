'use client';

import { useClient } from '@/lib/hooks/use-client';
import { useMemo } from 'react';
import data from '@/data/download.json';

const { links } = data;

export function useCurrentDownloadLink() {
  const { os } = useClient();
  const name = os?.name?.toLowerCase().replaceAll(' ', '');

  const currentDownloadLink = useMemo(() => {
    switch (name) {
      case 'ios':
        return links.iOS;
      case 'android':
        return links.android;
      case 'macos': {
        const cpuCores = navigator.hardwareConcurrency;

        if (cpuCores >= 8) {
          return links.macos['apple-silicon'];
        }

        return links.macos.intel;
      }

      case 'windows':
        return links.windows;
      case 'linux':
        return links.linux;
      default:
        return;
    }
  }, [name]);

  return {
    currentDownloadLink,
  };
}
