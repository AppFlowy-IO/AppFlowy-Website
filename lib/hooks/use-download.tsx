'use client';

import { useClient } from '@/lib/hooks/use-client';
import { useCallback, useContext, useEffect } from 'react';
import { download } from '@/lib/download';
import { Storage } from '@/lib/storage';
import { githubRepo } from '@/lib/config/git-repo';
import { GitContext } from '@/lib/hooks/use-git-context';
import { collectEvent, EventName } from '@/lib/collect';
import { ModalContext } from '@/lib/hooks/use-modal';

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
    ios: 'https://testflight.apple.com/join/6CexvkDz',
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
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    if (gitData?.lastVersion !== undefined) {
      storageDownloadLinks(gitData.lastVersion);
    }
  }, [gitData]);

  const downloadIOS = useCallback(() => {
    collectEvent(EventName.downloadIOSTestFlightBtn, {
      type: 'click',
    });
    const links = getDownloadLinks();

    if (!links) return;

    openModal({
      title: 'Thanks for testing AppFlowy Mobile!',
      content: (
        <div>
          If you’ve been using our desktop app, it’s important to read{' '}
          <a
            className={'text-primary underline dark:text-white'}
            href={
              'https://appflowy.us20.list-manage.com/track/click?u=b4294d99430126e6773ddd0aa&id=4625da7908&e=a58582b0e6'
            }
          >
            this guide
          </a>{' '}
          before logging into the mobile app.
        </div>
      ),
      okText: 'Download',
      cancelText: 'Cancel',
      onOk: () => {
        download(links.ios, false, true);

        collectEvent(EventName.downloadIOSModalOkBtn, {
          type: 'click',
        });
      },
      onCancel: () => {
        collectEvent(EventName.downloadIOSModalCancelBtn, {
          type: 'click',
        });
      },
      onMounted: () => {
        collectEvent(EventName.downloadIOSModalOkBtn, {
          type: 'view',
        });
        collectEvent(EventName.downloadIOSModalCancelBtn, {
          type: 'view',
        });
      },
    });
  }, [openModal]);

  const getOsDownloadLink = useCallback(() => {
    const links = getDownloadLinks();

    if (!links) return;
    switch (name) {
      case 'ios':
        return links?.ios;
      case 'android':
        return '';
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

    const link = getOsDownloadLink();

    if (!link) {
      return;
    }

    download(link, !isMobile);
  }, [downloadIOS, getOsDownloadLink, isMobile, name]);

  return {
    downloadOS,
    getOsDownloadLink,
    downloadIOS,
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
