'use client';

import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBanner } from '@/components/banner/banner.hooks';
import NextTopLoader from 'nextjs-toploader';
import { DarkContext } from '@/lib/hooks/use-dark-context';
import { usePathname, useRouter } from 'next/navigation';

function Banner() {
  const isDark = useContext(DarkContext);
  const { show, onClickLearnMore, version } = useBanner();
  const pathname = usePathname();
  const router = useRouter();

  const progress = pathname.includes('downloading') ? null : (
    <NextTopLoader showSpinner={false} color={isDark ? '#601DAA' : '#9327FF'} />
  );

  useEffect(() => {
    router.prefetch('/download');
    if (!show) return;
    router.prefetch('/what-is-new');
  }, [show, router]);

  return (
    <>
      {show && (
        <motion.div
          className={`banner`}
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{ height: '36px', opacity: 1 }}
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
        </motion.div>
      )}
      {progress}
    </>
  );
}

export default Banner;
