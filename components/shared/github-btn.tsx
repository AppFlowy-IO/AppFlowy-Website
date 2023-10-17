import React, { useContext, useEffect, useState } from 'react';
import GithubStar from '@/components/icons/github-star';
import { formatNumber } from '@/lib/format-number';
import { githubRepo } from '@/lib/config/git-repo';
import { GitContext } from '@/lib/hooks/use-git-context';

function GithubBtn() {
  const gitData = useContext(GitContext);

  const [star, setStar] = useState(gitData?.stars || 0);

  useEffect(() => {
    if (gitData?.stars !== undefined) {
      setStar(gitData.stars);
    }
  }, [gitData]);

  return (
    <button
      onClick={() => {
        window.open(githubRepo, '_blank');
      }}
      className={'github-btn'}
    >
      <GithubStar />
      <span className={'ml-1 mr-4'}>Star</span>
      <span className={'arrow-badge'}>{formatNumber(star, 1)}</span>
    </button>
  );
}

export default GithubBtn;
