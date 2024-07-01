import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import icon1 from '@/assets/images/download/icon-1.png';
import icon2 from '@/assets/images/download/icon-2.png';
import icon3 from '@/assets/images/download/icon-3.png';
import darkIcon1 from '@/assets/images/download/dark/icon-1.png';
import darkIcon2 from '@/assets/images/download/dark/icon-2.png';
import darkIcon3 from '@/assets/images/download/dark/icon-3.png';
import { downloadPageConfig } from '@/lib/config/pages';
import { useDarkContext } from '@/lib/hooks/use-dark-context';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function OverTitle({ title }: { title: string }) {
  const dark = useDarkContext();
  const ref = useRef<HTMLDivElement>(null);

  const value = useMotionValue(0);
  // const x = useTransform(value, [0, 1], [0, 1]);
  const x = useSpring(value, {
    stiffness: 300,
    damping: 200,
  });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let timeoutId: NodeJS.Timeout | null = null;
    let delta: number, diff: number, scrollWidth: number;

    const initialize = () => {
      const textEl = el.querySelector('.title-text');
      const headerHeight = document.querySelector('.appflowy-header')?.clientHeight || 0;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const textWidth = textEl?.clientWidth || 0;

      scrollWidth = textWidth - rect.width;
      const scrollHeight = window.innerHeight - rect.height;

      delta = scrollWidth / scrollHeight;

      diff = top - scrollHeight / 2 - headerHeight;
    };

    initialize();

    const scrollHandler = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      const currentScrollTop = document.documentElement.scrollTop;

      const scrollDistance = -(currentScrollTop - diff) * delta;

      if (Math.abs(scrollDistance) > scrollWidth / 2) {
        return;
      }

      x.set(scrollDistance);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          x.set(0);
          timeoutId = setTimeout(() => {
            scrollHandler();
          }, 0);
          document.addEventListener('scroll', scrollHandler);
        } else {
          document.removeEventListener('scroll', scrollHandler);
        }
      });
    });

    observer.observe(el);

    const resize = () => {
      initialize();
      scrollHandler();
    };

    window.addEventListener('resize', resize);
    return () => {
      x.set(0);
      timeoutId && clearTimeout(timeoutId);
      document.removeEventListener('scroll', scrollHandler);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [x]);

  return (
    <motion.div
      style={{
        x,
        fontFamily: 'Manrope',
      }}
      ref={ref}
      className={`translate-z-0 over-title transform`}
    >
      <div className={`title-text`}>{title}</div>
      <div className={'icons'}>
        <Image
          className={'icon icon-1'}
          src={dark ? darkIcon1.src : icon1.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={183}
          height={196}
        />
        <Image
          className={'icon icon-2'}
          src={dark ? darkIcon2.src : icon2.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={171}
          height={188}
        />
        <Image
          className={'icon icon-3'}
          src={dark ? darkIcon3.src : icon3.src}
          alt={downloadPageConfig.downloadMobileImgAlt}
          width={204}
          height={174}
        />
      </div>
    </motion.div>
  );
}

export default OverTitle;
