'use client';

import { useClient } from '@/lib/hooks/use-client';
import { useCallback, useContext, useEffect } from 'react';
import { download } from '@/lib/download';
import { Storage } from '@/lib/storage';
import { githubRepo } from '@/lib/config/git-repo';
import { GitContext } from '@/lib/hooks/use-git-context';
import { collectEvent, EventName } from '@/lib/collect';

export interface DownloadLinks {
  windows: string;
  macos: {
    intel: string;
    universal: string;
  };
  linux: {
    deb: string;
    rpm: string;
    gnu: string;
    appImage: string;
  };
  ios: string;
  android: string;
}

function getDownloadLinks(): DownloadLinks | undefined {
  if (typeof window === 'undefined') return;
  return Storage.get('download-links');
}

export function genLink({
  platform,
  version,
  arch,
  fileExtension,
}: {
  platform: string;
  version: string;
  arch: string;
  fileExtension: string;
}) {
  return `${githubRepo}/releases/download/${version}/Appflowy-${version}-${platform}-${arch}.${fileExtension}`;
}

export function storageDownloadLinks(version: string) {
  const links = {
    windows: genLink({
      platform: 'windows',
      version,
      arch: 'x86_64',
      fileExtension: 'exe',
    }),
    macos: {
      intel: genLink({
        platform: 'macos',
        version,
        arch: 'x86_64',
        fileExtension: 'dmg',
      }),
      universal: genLink({
        platform: 'macos',
        version,
        arch: 'universal',
        fileExtension: 'dmg',
      }),
    },
    linux: {
      appImage: genLink({
        platform: 'linux',
        version,
        arch: 'x86_64',
        fileExtension: 'AppImage',
      }),
      deb: genLink({
        platform: 'linux',
        version,
        arch: 'x86_64',
        fileExtension: 'deb',
      }),
      rpm: genLink({
        platform: 'linux',
        version,
        arch: 'x86_64',
        fileExtension: 'rpm',
      }),
      gnu: genLink({
        platform: 'linux',
        version,
        arch: 'x86_64',
        fileExtension: 'tar.gz',
      }),
    },
    ios: 'https://apps.apple.com/app/appflowy/id6457261352',
    android: 'https://play.google.com/store/apps/details?id=io.appflowy.appflowy',
  };

  Storage.set('download-links', links);
}

export const downloadMacIntel = (transfer = true) => {
  const links = getDownloadLinks();

  if (!links) return;
  download(links.macos.intel, transfer);
};

export const downloadMacUniversal = (transfer = true) => {
  const links = getDownloadLinks();

  if (!links) return;

  download(links.macos.universal, transfer);
};

export const downloadWindows = (transfer = true) => {
  const links = getDownloadLinks();

  if (!links) return;
  download(links.windows, transfer);
};

export const downloadLinux86Deb = (transfer = true) => {
  const links = getDownloadLinks();

  if (!links) return;
  download(links.linux.deb, transfer);
};

export const downloadLinux86Rpm = (transfer = true) => {
  const links = getDownloadLinks();

  if (!links) return;
  download(links.linux.rpm, transfer);
};

export const downloadLinux86AppImage = (transfer = true) => {
  const links = getDownloadLinks();

  if (!links) return;
  download(links.linux.appImage, transfer);
};

export const downloadLinux86 = (transfer = true) => {
  const links = getDownloadLinks();

  if (!links) return;
  download(links.linux.gnu, transfer);
};

export function useDownload() {
  const { os, isMobile } = useClient();
  const name = os?.name?.toLowerCase().replaceAll(' ', '');
  const gitData = useContext(GitContext);

  useEffect(() => {
    if (gitData?.lastVersion !== undefined) {
      storageDownloadLinks(gitData.lastVersion);
    }
  }, [gitData]);

  const downloadAndroid = useCallback(() => {
    collectEvent(EventName.downloadAndroidBtn, {
      type: 'click',
    });
    const links = getDownloadLinks();

    if (!links) return;
    download(links.android, false, true);
    collectEvent(EventName.download, {
      platform: 'android',
      version: gitData?.lastVersion || '',
      arch: '',
      file_extension: 'google-play',
    });
  }, [gitData?.lastVersion]);

  const downloadIOS = useCallback(() => {
    collectEvent(EventName.downloadAppleBtn, {
      type: 'click',
    });
    const links = getDownloadLinks();

    if (!links) return;
    download(links.ios, false, true);
    collectEvent(EventName.download, {
      platform: 'ios',
      version: gitData?.lastVersion || '',
      arch: '',
      file_extension: 'app-store',
    });
  }, [gitData?.lastVersion]);

  const getOsDownloadLink = useCallback(() => {
    const links = getDownloadLinks();

    if (!links) return;
    switch (name) {
      case 'ios':
        return links?.ios;
      case 'android':
        return links?.android;
      case 'macos': {
        const type = matchMacIntel();

        if (type === 'apple-silicon') {
          return links?.macos?.universal;
        }

        return links?.macos?.intel;
      }

      case 'windows':
        return links?.windows;

      case 'linux':
        return links?.linux?.gnu;
      default:
        return;
    }
  }, [name]);

  const downloadOS = useCallback(() => {
    if (name === 'ios') {
      return downloadIOS();
    }

    if (name === 'android') {
      return downloadAndroid();
    }

    const link = getOsDownloadLink();

    if (!link) {
      return;
    }

    download(link, !isMobile);
  }, [downloadAndroid, downloadIOS, getOsDownloadLink, isMobile, name]);

  return {
    downloadOS,
    getOsDownloadLink,
    downloadIOS,
    downloadAndroid,
  };
}

function matchMacIntel() {
  const canvas = document.createElement('canvas');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let gl: any, debugInfo, renderer;

  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  } catch (e) {
    // do thing
  }

  if (!gl) {
    const cpuCores = navigator.hardwareConcurrency;

    if (cpuCores >= 8) {
      return 'apple-silicon';
    }
  }

  if (gl) {
    debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    if (renderer.includes('Apple M1')) {
      return 'apple-silicon';
    }
  }

  return 'intel';
}
