import { useCallback, useEffect } from 'react';
import versions from '@/data/versions.json';
import { Storage } from '@/lib/storage';
import { newVersionActions, useSelectorNewVersionState } from '@/lib/store/new-version';
import { useDispatch } from '@/lib/store';

export function useNewVersion() {
  const { version, show } = useSelectorNewVersionState();
  const dispatch = useDispatch();

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
      dispatch(newVersionActions.open(version));
    } else {
      dispatch(newVersionActions.close());
    }
  }, [dispatch]);

  const closeNewVersionTip = useCallback(() => {
    dispatch(newVersionActions.close());
    Storage.set(
      'newVersionState',
      JSON.stringify({
        version,
        show: false,
      })
    );
  }, [dispatch, version]);

  useEffect(() => {
    loadNewVersion();
  }, [loadNewVersion]);

  return {
    version,
    show,
    closeNewVersionTip,
  };
}
