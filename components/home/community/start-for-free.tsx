'use client';

import React, { useEffect } from 'react';
import image from '@/assets/images/community/start-for-free.png';
import darkImage from '@/assets/images/community/dark/start-for-free.png';

import Image from 'next/image';
import Link from 'next/link';
import { startForFree } from '@/lib/config/home';
import { useInView } from 'framer-motion';
import { collectEvent, EventName } from '@/lib/collect';
import { useDownload } from '@/lib/hooks/use-download';
import { useClient } from '@/lib/hooks/use-client';

function StartForFree() {
  const { downloadOS } = useDownload();
  const { isMobile } = useClient();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
  });

  useEffect(() => {
    if (inView) {
      collectEvent(EventName.homePageGetStartedBtn, {
        type: 'view',
      });
    }
  }, [inView]);

  const onClick = () => {
    collectEvent(EventName.homePageGetStartedBtn, {
      type: 'click',
    });
  };

  return (
    <div ref={ref} className={'start-for-free'}>
      <div className={'title'}>{startForFree.title}</div>
      <div className={'desc'}>{startForFree.subtitle}</div>
      <div className={'btn-group z-10'}>
        {isMobile ? (
          <button
            onClick={() => {
              onClick();
              downloadOS();
            }}
            className={'download-btn'}
          >
            Download
          </button>
        ) : (
          <Link onClick={onClick} href={'/download'}>
            <button className={'download-btn'}>Download</button>
          </Link>
        )}
      </div>
      <div className={'relative w-full flex-1'}>
        <div className={'image aspect-[770/434] w-full'}>
          <div className={'absolute-image'}>
            <Image src={image.src} width={770} height={434} alt={startForFree.imageAlt} />
          </div>
          <div className={'absolute-image dark-image h-fit'}>
            <Image src={darkImage.src} width={770} height={434} alt={startForFree.imageAlt} />
          </div>
        </div>
        <div className={'blur-bottom'} />
      </div>
    </div>
  );
}

export default StartForFree;
