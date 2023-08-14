'use client';

import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import data from '@/data/home.json';
import { AddOutlined } from '@mui/icons-material';
import Link from 'next/link';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import GetStarted from '@/components/home/get-started';
import { useRef } from 'react';
import { useRepeatingGradient } from '@/lib/hooks/use-repeating-gradient';
import { motion } from 'framer-motion';
import * as transition from '@/lib/transition';

import Number from '@/components/shared/number';

const config = data.community;

export default function Community() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const gradientTransitionProps = useRepeatingGradient(ref);

  return (
    <div
      ref={ref}
      style={{
        background: 'var(--linear-gradient-700)',
      }}
      className={'flex w-full flex-col items-center overflow-hidden'}
    >
      <motion.div
        {...gradientTransitionProps}
        className={'page-title flex items-center justify-center max-sm:px-10 max-sm:pt-24 md:pt-52 '}
      >
        <div className={'md:max-w-screen-md'}>
          <Trans i18nKey={config.title} components={[<span key={0} className={'primary-underline primary-star'} />]} />
        </div>
      </motion.div>
      <div className={'flex max-sm:my-6 max-sm:flex-col md:my-24 md:flex-row md:justify-center'}>
        {config.data.map((item, index) => (
          <div key={item.name} className={'flex max-sm:py-8 md:flex-1 md:px-16'}>
            <div className={'flex flex-col max-sm:items-center '}>
              <div
                className={
                  'mb-4 font-medium max-sm:text-[100px] max-sm:leading-[120px] md:text-[120px] md:leading-[144px]'
                }
              >
                {<Number delay={index / 2} value={item.count} />}
              </div>
              <div className={'text-base leading-[27px]'}>{t(item.name)}</div>
            </div>
            <AddOutlined
              className={'text-primary'}
              sx={{
                width: '40px',
                height: '40px',
              }}
            />
          </div>
        ))}
      </div>
      <motion.div
        variants={transition.staggerContainer}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={'flex flex-col max-sm:px-6 md:px-36'}
      >
        {config.items.map((item) => (
          <motion.div
            variants={transition.toRight}
            key={item.title}
            className={'mb-12 flex max-sm:flex-col md:flex-row md:justify-center'}
          >
            <div
              className={
                'aspect-auto overflow-hidden rounded-3xl border border-[var(--color-primary-divider)] max-sm:mb-10 md:mr-28 md:w-[700px]'
              }
            >
              <img className={'object-contain'} src={item.image.src} alt={item.image.alt} />
            </div>
            <div className={'flex flex-1 flex-col justify-center'}>
              <div
                className={
                  'font-medium max-sm:mb-4 max-sm:text-[24px] max-sm:leading-[26px] md:mb-8 md:text-[40px] md:leading-[44px]'
                }
              >
                {t(item.title)}
              </div>
              <div className={'mb-6 leading-[27px] max-sm:mb-4'}>{t(item.description)}</div>
              <Link className={'text-primary hover:underline'} href={item.button.link}>
                {t(item.button.title)}
                <ArrowOutward />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <GetStarted />
    </div>
  );
}
