import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { GitContext } from '@/lib/hooks/use-git-context';
import { collectEvent, EventName } from '@/lib/collect';

function HeroDesc({ inView }: { inView?: boolean }) {
  const gitData = useContext(GitContext);

  useEffect(() => {
    if (inView) {
      [EventName.homePageMorePlatformsLink, EventName.homePageWhatIsNewLink, EventName.homePageGetTemplatesLink].forEach(
        (eventName) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          collectEvent(eventName, {
            type: 'view',
          });
        }
      );
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
    <div className={'hero-desc text-primary text-center text-[12px]'}>
      <Link
        onClick={() => onClick(EventName.homePageWhatIsNewLink)}
        href={'/what-is-new'}
      >{`What's new in ${gitData?.lastVersion}`}</Link>
      {` / `}
      <Link onClick={() => onClick(EventName.homePageGetTemplatesLink)} href={'/templates'}>{`Get templates`}</Link>
      {` / `}
      <Link
        onClick={() => onClick(EventName.homePageMorePlatformsLink)}
        href={'/download#across'}
      >{`More platforms`}</Link>
    </div>
  );
}

export default HeroDesc;
