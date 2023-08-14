import { useCallback } from 'react';

import { useNewVersion } from '@/lib/hooks/use-new-version';

export function useTopbar() {
  const { show, version, closeNewVersionTip } = useNewVersion();

  const onClickLearnMore = useCallback(() => {
    closeNewVersionTip();
  }, [closeNewVersionTip]);

  return {
    show,
    version,
    onClickLearnMore,
  };
}
