'use client';

import React, { useEffect } from 'react';
import { useBanner } from '@/components/banner/banner.hooks';
import NextTopLoader from 'nextjs-toploader';
import { usePathname, useRouter } from 'next/navigation';

function Banner() {
  const { show, onClickLearnMore, version } = useBanner();
  const pathname = usePathname();
  const router = useRouter();

  const progress = ['downloading', 'downloaded'].some((path) => pathname.includes(path)) ? null : (
    <NextTopLoader showSpinner={false} color={'#8427E0'} />
  );

  useEffect(() => {
    const preloadedPages = ['/', '/download', '/what-is-new'];

    if (preloadedPages.includes(pathname)) {
      preloadedPages.forEach((page) => {
        if (page !== pathname) {
          router.prefetch(page);
        }
      });
    }
  }, [pathname, router]);

  return (
    <div className={'translate-z-0 transform'}>
      <div
        className={`banner`}
        style={{
          height: show ? 36 : 0,
          opacity: show ? 1 : 0,
        }}
      >
        <span>
          {`What's New: `}
          <span className='max-lg:hidden'>AppFlowy launches</span> v{version}
        </span>

        <span onClick={onClickLearnMore} className={'learn-more-link ml-2'}>
          Learn more
        </span>
      </div>
      {progress}
    </div>
  );
}

export default Banner;
