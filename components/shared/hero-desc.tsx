import React, { useContext } from 'react';
import Link from 'next/link';
import { GitContext } from '@/lib/hooks/use-git-context';

function HeroDesc() {
  const gitData = useContext(GitContext);

  return (
    <div className={'hero-desc text-[12px]'}>
      <Link href={'/what-is-new'}>{`What's new in ${gitData?.lastVersion}`}</Link>
      {` / `}
      <Link target={'_blank'} href={'https://survey.appflowy.io/private-beta'}>
        {`Get the Cloud beta`}
      </Link>
      {` / `}
      <Link href={'/download#across'}>{`More platforms`}</Link>
    </div>
  );
}

export default HeroDesc;
