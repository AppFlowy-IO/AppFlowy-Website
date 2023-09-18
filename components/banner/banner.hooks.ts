import { useState, useCallback, useEffect } from 'react';
import { Storage } from '@/lib/storage';
import { getLatestVersion } from '@/lib/api';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { storageDownloadLinks } from '@/lib/hooks/use-download';

export function useBanner() {
  const router = useRouter();
  const [newVersionState, setNewVersionState] = useState({
    version: '',
    show: false,
  });

  const closeNewVersionTip = useCallback(() => {
    setNewVersionState((prev) => {
      Storage.set(
        'banner',
        JSON.stringify({
          version: prev.version,
          show: false,
        })
      );
      return {
        ...prev,
        show: false,
      };
    });
  }, []);

  const onClickLearnMore = useCallback(() => {
    router.push('/what-is-new');
    closeNewVersionTip();
  }, [closeNewVersionTip, router]);

  const setBannerState = useCallback((version: string) => {
    let show = false;
    const newVersionState = Storage.get('banner');

    if (!newVersionState) {
      show = true;
    } else {
      const data = JSON.parse(newVersionState);

      show = Boolean(data.show);
    }

    if (show) {
      setNewVersionState({
        version,
        show: true,
      });
    } else {
      setNewVersionState({
        version,
        show: false,
      });
    }
  }, []);

  const fetchLastestVersion = useCallback(async () => {
    const lastTime = Storage.get('get-version-time');
    const diffHours = dayjs().diff(dayjs(lastTime), 'hours');

    if (diffHours > 24 || !lastTime) {
      try {
        const latestVersion = await getLatestVersion();

        if (!latestVersion) return;
        const version = latestVersion.tag_name;

        Storage.set('last-version', version);
        setBannerState(version);
      } catch {
        //
      }
    }

    const version = Storage.get('last-version');

    storageDownloadLinks(version);

    setBannerState(version);
  }, [setBannerState]);

  useEffect(() => {
    void fetchLastestVersion();
  }, [fetchLastestVersion]);

  return {
    version: newVersionState.version,
    show: newVersionState.show,
    onClickLearnMore,
  };
}
