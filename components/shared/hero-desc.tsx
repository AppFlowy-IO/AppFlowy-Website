import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { GitContext } from '@/lib/hooks/use-git-context';
import { collectEvent, EventName } from '@/lib/collect';

function HeroDesc({ inView }: { inView?: boolean }) {
  const gitData = useContext(GitContext);

  useEffect(() => {
    if (inView) {
      [
        EventName.homePageGetTheCloudBetaLink,
        EventName.homePageMorePlatformsLink,
        EventName.homePageWhatIsNewLink,
      ].forEach((eventName) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        collectEvent(eventName, {
          type: 'view',
        });
      });
    }
  }, [inView]);

  const onClick = (eventName: EventName) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    collectEvent(eventName, {
      type: 'click',
    });
  };

  return (
    <div className={'hero-desc text-[12px]'}>
      <Link
        onClick={() => onClick(EventName.homePageWhatIsNewLink)}
        href={'/what-is-new'}
      >{`What's new in ${gitData?.lastVersion}`}</Link>
      {` / `}
      <Link
        onClick={() => onClick(EventName.homePageGetTheCloudBetaLink)}
        target={'_blank'}
        href={'https://survey.appflowy.io/private-beta'}
      >
        {`Get the Cloud beta`}
      </Link>
      {` / `}
      <Link
        onClick={() => onClick(EventName.homePageMorePlatformsLink)}
        href={'/download#across'}
      >{`More platforms`}</Link>
    </div>
  );
}

export default HeroDesc;
