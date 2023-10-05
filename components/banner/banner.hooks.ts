import { useState, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { GitContext } from '@/lib/hooks/use-git-context';
import { setVisitedLatestVersion } from '@/lib/cookie';

export function useBanner() {
  const router = useRouter();
  const gitData = useContext(GitContext);

  const [newVersionState, setNewVersionState] = useState({
    version: gitData?.lastVersion || '',
    show: gitData?.lastVersion !== gitData?.visitedLatestVersion,
  });

  const closeNewVersionTip = useCallback((version: string) => {
    setVisitedLatestVersion(version);
    setNewVersionState({
      version,
      show: false,
    });
  }, []);

  const onClickLearnMore = useCallback(() => {
    if (!gitData?.lastVersion) return;
    router.push('/what-is-new');
    closeNewVersionTip(gitData.lastVersion);
  }, [gitData, closeNewVersionTip, router]);

  return {
    version: newVersionState.version,
    show: newVersionState.show,
    onClickLearnMore,
  };
}
