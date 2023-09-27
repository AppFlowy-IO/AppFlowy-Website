'use client';

import React, { useEffect, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { Storage } from '@/lib/storage';
import dayjs from 'dayjs';
import { loadContributors } from '@/lib/githubAPI';

function ContributorsList() {
  const dbContributors = useLiveQuery(() => {
    return db.contributors.toArray();
  });

  const contributors = useMemo(() => {
    if (!dbContributors) return [];
    return dbContributors.sort((a, b) => {
      return b.contributionCount - a.contributionCount;
    });
  }, [dbContributors]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const lastTime = Storage.get('get-contributors-time');
    const diffHours = dayjs().diff(dayjs(lastTime), 'hours');

    // load versions at most once per hour
    if (diffHours > 1 || !lastTime) {
      void (async () => {
        try {
          await loadContributors();
          Storage.set('get-contributors-time', dayjs().toString());
        } catch {
          // do thing
        }
      })();
    } else {
      // do nothing
    }
  }, []);

  return (
    <div className={'contributors-list'}>
      {contributors?.map((item) => (
        <div key={item.id} className={'contributor-wrapper'}>
          <div className={'contributor'}>
            <div className={'contributor-avatar'}>
              <img src={item.avatarUrl} alt={item.name} />
            </div>
            <div className={'contributor-name'}>{item.name}</div>
            <div className={'contributor-login'}>@{item.login}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContributorsList;
