import React, { useCallback, useContext, useEffect, useState } from 'react';
import GithubStar from '@/components/icons/github-star';
import { formatNumber } from '@/lib/format-number';
import { fetchGitStar } from '@/lib/githubAPI';
import { githubRepo } from '@/lib/config/git-repo';
import { Storage } from '@/lib/storage';
import { GitContext } from '@/lib/hooks/use-git-context';

function GithubBtn() {
  const gitData = useContext(GitContext);

  const [star, setStar] = useState(gitData?.stars || 0);

  useEffect(() => {
    if (gitData?.stars) {
      Storage.set('stars', gitData.stars);
      setStar(gitData.stars);
    }
  }, [gitData?.stars]);

  const fetchGithub = useCallback(async () => {
    try {
      const stargazers_count = await fetchGitStar();

      setStar(stargazers_count);
      Storage.set('stars', stargazers_count);
    } catch (e) {
      // do nothing
    }
  }, []);

  useEffect(() => {
    void fetchGithub();
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
