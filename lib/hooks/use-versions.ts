'use client';
import { useLiveQuery } from 'dexie-react-hooks';
import { addVersion, db, Version } from '@/lib/db';
import { useCallback, useEffect, useMemo } from 'react';
import { parseChangelog } from '@/lib/parseChangelog';
import { loadVersions } from '@/lib/githubAPI';
import { useClient } from '@/lib/hooks/use-client';

export function useVersions() {
  const dbVersions = useLiveQuery(() => {
    return db.versions.toArray();
  });

  const versions = useMemo(() => {
    if (!dbVersions) return [];
    return dbVersions
      .sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      })
      .map(parseChangelog);
  }, [dbVersions]);

  return {
    versions,
  };
}

export function useLoadVersions({ serverVersions }: { serverVersions: Version[] }) {
  const { isClient } = useClient();

  const storageServerVersions = useCallback(async (versions: Version[]) => {
    try {
      for (let i = 0; i < versions.length; i++) {
        const v = versions[i];

        await addVersion(v.version, v.url, v.changeLog, v.publishedAt);
      }
    } catch (e) {
      // do nothing
    }
  }, []);

  const loadGitVersions = useCallback(async () => {
    void (async () => {
      try {
        await loadVersions();
      } catch (e) {
        // do nothing
      }
    })();
  }, []);

  useEffect(() => {
    if (!isClient) return;

    void (async () => {
      // storage server versions to indexedDB
      await storageServerVersions(serverVersions);
      // load new versions from GitHub
      await loadGitVersions();
    })();
  }, [isClient, loadGitVersions, serverVersions, storageServerVersions]);
}
