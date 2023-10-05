'use client';

import React, { useEffect } from 'react';
import { useBanner } from '@/components/banner/banner.hooks';
import NextTopLoader from 'nextjs-toploader';
import { useDarkContext } from '@/lib/hooks/use-dark-context';
import { usePathname, useRouter } from 'next/navigation';

function Banner() {
  const isDark = useDarkContext();
  const { show, onClickLearnMore, version } = useBanner();
  const pathname = usePathname();
  const router = useRouter();

  const progress = pathname.includes('downloading') ? null : (
    <NextTopLoader showSpinner={false} color={isDark ? '#601DAA' : '#9327FF'} />
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
        <span className={'mx-2'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='2' height='13' viewBox='0 0 2 13' fill='none'>
            <path opacity='0.4' d='M1 0.5V12.5' stroke='white' />
          </svg>
        </span>
        <span onClick={onClickLearnMore} className={'learn-more-link'}>
          Learn more
          <span className={'ml-1'}>
            <svg xmlns='http://www.w3.org/2000/svg' width='9' height='9' viewBox='0 0 9 9' fill='none'>
              <path d='M1 1H8M8 1V8M8 1L1 8' stroke='white' strokeWidth='1.5' />
            </svg>
          </span>
        </span>
      </div>
      {progress}
    </div>
  );
}

export default Banner;
