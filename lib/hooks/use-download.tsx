'use client';

import { useClient } from '@/lib/hooks/use-client';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { download } from '@/lib/download';
import { Storage } from '@/lib/storage';
import { githubRepo } from '@/lib/config/git-repo';
import { GitContext } from '@/lib/hooks/use-git-context';
import { collectEvent, EventName } from '@/lib/collect';
import { ModalContext } from '@/lib/hooks/use-modal';
import { downloadVersion } from '@/lib/config/pages';
import Info from '@/components/icons/info';

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
    ios: 'https://testflight.apple.com/join/6CexvkDz',
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
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    if (gitData?.lastVersion !== undefined) {
      storageDownloadLinks(gitData.lastVersion);
    }
  }, [gitData]);

  const modalTitle = useMemo(() => {
    return '🥳️ Thanks for giving AppFlowy Mobile a try!';
  }, []);

  const getModalContent = useCallback((isAndroid: boolean) => {
    return (
      <div className={'download-mobile-modal-content'}>
        If you’ve been using our desktop app, it’s important to read{' '}
        <a target={'_blank'} className={'link'} href={'https://docs.appflowy.io/docs/guides/sync-desktop-and-mobile'}>
          Sync Desktop and Mobile
        </a>{' '}
        before logging into the mobile app.
        <div className={'version-requires'}>
          <div className={'icon'}>
            <Info />
          </div>
          {isAndroid ? downloadVersion.android : downloadVersion.ios}
        </div>
      </div>
    );
  }, []);

  const downloadAndroid = useCallback(() => {
    collectEvent(EventName.downloadAndroidBtn, {
      type: 'click',
    });
    const links = getDownloadLinks();

    if (!links) return;
    openModal({
      title: modalTitle,
      content: getModalContent(true),
      okText: 'Download',
      cancelText: 'Cancel',
      onOk: () => {
        download(links.android, false, true);
        collectEvent(EventName.download, {
          platform: 'android',
          version: gitData?.lastVersion || '',
          arch: '',
          file_extension: 'google-play',
        });

        collectEvent(EventName.downloadAndroidModalOkBtn, {
          type: 'click',
        });
      },
      onCancel: () => {
        collectEvent(EventName.downloadAndroidModalCancelBtn, {
          type: 'click',
        });
      },
      onMounted: () => {
        collectEvent(EventName.downloadAndroidModalOkBtn, {
          type: 'view',
        });
        collectEvent(EventName.downloadAndroidModalCancelBtn, {
          type: 'view',
        });
      },
    });
  }, [getModalContent, gitData?.lastVersion, modalTitle, openModal]);

  const downloadIOS = useCallback(() => {
    collectEvent(EventName.downloadIOSTestFlightBtn, {
      type: 'click',
    });
    const links = getDownloadLinks();

    if (!links) return;

    openModal({
      title: modalTitle,
      content: getModalContent(false),
      okText: 'Download',
      cancelText: 'Cancel',
      onOk: () => {
        download(links.ios, false, true);
        collectEvent(EventName.download, {
          platform: 'ios',
          version: gitData?.lastVersion || '',
          arch: '',
          file_extension: 'testflight',
        });

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
  }, [gitData?.lastVersion, getModalContent, modalTitle, openModal]);

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
