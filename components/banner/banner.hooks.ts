import { useState, useCallback, useEffect, useContext } from 'react';
import { Storage } from '@/lib/storage';
import { fetchLastVersion } from '@/lib/githubAPI';
import { useRouter } from 'next/navigation';
import { storageDownloadLinks } from '@/lib/hooks/use-download';
import { GitContext } from '@/lib/hooks/use-git-context';

export function useBanner() {
  const router = useRouter();
  const gitData = useContext(GitContext);

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

  const fetchLatestVersion = useCallback(async () => {
    try {
      const version = await fetchLastVersion();

      if (version === undefined) return;

      Storage.set('last-version', version);
      setBannerState(version);
    } catch {
      // nothing
    }

    const version = Storage.get('last-version');

    storageDownloadLinks(version);

    setBannerState(version);
  }, [setBannerState]);

  useEffect(() => {
    void fetchLatestVersion();
  }, [fetchLatestVersion]);

  useEffect(() => {
    if (gitData?.lastVersion) {
      Storage.set('last-version', gitData?.lastVersion);
      setBannerState(gitData?.lastVersion);
    }
  }, [gitData?.lastVersion, setBannerState]);

  return {
    version: newVersionState.version,
    show: newVersionState.show,
    onClickLearnMore,
  };
}
