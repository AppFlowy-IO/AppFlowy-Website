'use client';

import data from '@/data/home.json';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import * as transition from '@/lib/transition';
import { motion } from 'framer-motion';
import { useRepeatingGradient } from '@/lib/hooks/use-repeating-gradient';
import { useRef } from 'react';

const config = data['data-security'];

const colorMap: Record<string, string> = {
  'data-control': 'purple',
  'always-available': 'gray',
  'forever-own-data': 'yellow',
};

export default function DataSecurity() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const gradientTransitionProps = useRepeatingGradient(ref);

  return (
    <div
      ref={ref}
      className={'bg-bg flex w-full flex-col items-center overflow-hidden max-sm:pb-4 max-sm:pt-12 md:pb-48'}
    >
      <motion.div
        {...gradientTransitionProps}
        className={'page-title max-sm:mb-10 sm:max-w-full md:mb-32 xl:max-w-screen-lg'}
      >
        <Trans i18nKey={config.title} components={[<span key={0} className={'primary-underline'} />]} />
      </motion.div>
      <motion.div
        variants={transition.staggerContainer}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={' flex w-full max-sm:flex-col max-sm:px-8 md:flex-row md:justify-center md:px-16'}
      >
        {config.features.map((item) => (
          <motion.div
            variants={transition.toRight}
            key={item.type}
            className={'card max-sm:mb-4 max-sm:h-[450px] md:mx-4 md:h-[535px] md:max-w-[450px] md:flex-1'}
            style={{
              background: `var(--card-bg-${colorMap[item.type]})`,
              border: `1px solid var(--card-border-${colorMap[item.type]})`,
            }}
          >
            <div className={'flex flex-col max-sm:p-8 md:p-12'}>
              <div
                className={'mb-4 font-medium max-sm:text-[24px] max-sm:leading-[27px] md:text-[40px] md:leading-[44px]'}
              >
                {t(item.title)}
              </div>
              <div className={'max-sm:text-base md:text-[17px] md:leading-[27px]'}>{t(item.description)}</div>
            </div>
            <div className={'flex aspect-auto items-center justify-center'}>
              <img className={'object-contain'} src={item.image.src} alt={item.image.alt} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
