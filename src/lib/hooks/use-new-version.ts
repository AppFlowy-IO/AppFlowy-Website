import { useCallback, useEffect, useState } from 'react';
import versions from '@/data/versions.json';
import { Storage } from '@/lib/storage';

export function useNewVersion() {
  const [newVersionState, setNewVersionState] = useState({
    version: '',
    show: false,
  });

  const loadNewVersion = useCallback(() => {
    const lastVersion = versions[0];
    const version = lastVersion.version;
    let show = false;
    const newVersionState = Storage.get('newVersionState');

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

  const closeNewVersionTip = useCallback(() => {
    setNewVersionState((prev) => {
      Storage.set(
        'newVersionState',
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

  useEffect(() => {
    loadNewVersion();
  }, [loadNewVersion]);

  return {
    version: newVersionState.version,
    show: newVersionState.show,
    closeNewVersionTip,
  };
}
