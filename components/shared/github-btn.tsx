import React, { useCallback, useEffect, useState } from 'react';
import GithubStar from '@/components/icons/github-star';
import { formatNumber } from '@/lib/format-number';
import { getGithubStar } from '@/lib/githubAPI';
import { githubRepo } from '@/lib/config/git-repo';
import { Storage } from '@/lib/storage';
import dayjs from 'dayjs';

function GithubBtn() {
  const [star, setStar] = useState(0);

  const fetchGithub = useCallback(async () => {
    try {
      const stargazers_count = await getGithubStar();

      setStar(stargazers_count);
      Storage.set('stars', stargazers_count);
      Storage.set('get-stars-time', dayjs().toString());
    } catch (e) {
      // do nothing
    }
  }, []);

  useEffect(() => {
    const lastTime = Storage.get('get-stars-time');
    const diffHours = dayjs().diff(dayjs(lastTime), 'hours');

    if (diffHours > 24 || !lastTime) {
      void fetchGithub();
    } else {
      setStar(Number(Storage.get('stars')));
    }
  }, [fetchGithub]);
  return (
    <button
      onClick={() => {
        window.open(githubRepo, '_blank');
      }}
      className={'github-btn'}
    >
      <GithubStar />
      <span className={'ml-1 mr-4'}>Star</span>
      <span className={'arrow-badge'}>{formatNumber(star)}</span>
    </button>
  );
}

export default GithubBtn;
