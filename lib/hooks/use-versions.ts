'use client';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { useEffect, useMemo } from 'react';
import { parseChangelog } from '@/lib/parseChangelog';
import { Storage } from '@/lib/storage';
import dayjs from 'dayjs';
import { loadVersions } from '@/lib/api';

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

export function useLoadVersion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lastTime = Storage.get('get-versions-time');
    const diffHours = dayjs().diff(dayjs(lastTime), 'hours');

    // load versions at most once per hour
    if (diffHours > 1 || !lastTime) {
      void (async () => {
        await loadVersions();
        Storage.set('get-versions-time', dayjs().toString());
      })();
    } else {
      // do nothing
    }
  }, []);
}
