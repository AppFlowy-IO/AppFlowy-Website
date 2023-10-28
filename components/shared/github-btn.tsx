import React, { useContext, useEffect, useRef, useState } from 'react';
import GithubStar from '@/components/icons/github-star';
import { formatNumber } from '@/lib/format-number';
import { githubRepo } from '@/lib/config/git-repo';
import { GitContext } from '@/lib/hooks/use-git-context';
import { collectEvent, EventName } from '@/lib/collect';
import { useInView } from 'framer-motion';

function GithubBtn() {
  const gitData = useContext(GitContext);
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
  });
  const [star, setStar] = useState(gitData?.stars || 0);

  useEffect(() => {
    if (gitData?.stars !== undefined) {
      setStar(gitData.stars);
    }
  }, [gitData]);

  useEffect(() => {
    if (inView) {
      collectEvent(EventName.navigatorGithubBtn, {
        type: 'view',
      });
    }
  }, [inView]);

  return (
    <button
      ref={ref}
      onClick={() => {
        collectEvent(EventName.navigatorGithubBtn, {
          type: 'click',
        });
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
