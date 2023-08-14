'use client';

import Box from '@mui/material/Box';
import data from '@/data/home.json';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import { ReactNode, useRef } from 'react';
import * as transition from '@/lib/transition';
import { motion } from 'framer-motion';
import { useRepeatingGradient } from '@/lib/hooks/use-repeating-gradient';

const discoverAIConfig = data['discover-ai'];

const iconMap: Record<string, ReactNode> = {
  'without-switching': (
    <CheckBoxOutlinedIcon
      sx={{
        width: '40px',
        height: '40px',
      }}
    />
  ),
  'data-control': (
    <FileOpenOutlinedIcon
      sx={{
        width: '40px',
        height: '40px',
      }}
    />
  ),
  'choose-ai-service': (
    <SendOutlined
      sx={{
        width: '40px',
        height: '40px',
      }}
    />
  ),
};

export default function DiscoverAI() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const gradientTransitionProps = useRepeatingGradient(ref);

  return (
    <Box
      sx={{
        background: {
          md: 'var(--linear-gradient-200)',
          xs: 'var(--linear-gradient-300)',
        },
      }}
      ref={ref}
      className={'flex w-full flex-col items-center overflow-hidden'}
    >
      <motion.div
        {...gradientTransitionProps}
        className={'page-title flex items-center justify-center max-sm:pt-32 md:mb-16 md:pt-64 '}
      >
        <div className={'block xl:max-w-[900px]'}>
          <Trans
            i18nKey={discoverAIConfig.title}
            components={[<div key={0} />, <span key={1} className={'primary-underline primary-star'} />]}
          />
        </div>
      </motion.div>
      <motion.div
        variants={transition.opacityDelay}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={'flex aspect-auto items-center justify-center py-12 max-sm:px-8 md:mb-16'}
      >
        <img
          className={'max-h-full max-w-full object-contain md:px-20 lg:max-w-screen-lg'}
          src={discoverAIConfig.image.src}
          alt={discoverAIConfig.image.alt}
        />
      </motion.div>
      <motion.div
        variants={transition.staggerContainer}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={'flex py-8 max-sm:flex-col max-sm:px-12 md:mb-60 md:flex-row md:justify-center md:px-24'}
      >
        {discoverAIConfig.features.map((item) => (
          <motion.div
            variants={transition.toUp}
            key={item.type}
            className={
              'flex flex-col border-[var(--color-primary-divider)] last:border-none max-sm:border-b max-sm:py-8 md:border-r md:px-16 md:pl-20'
            }
          >
            <div className={'text-primary mb-6'}>{iconMap[item.type]}</div>
            <div
              className={
                'mb-4 font-medium max-sm:inline-block max-sm:text-[24px] max-sm:leading-[26px] md:block md:text-[40px] md:leading-[43px]'
              }
            >
              <Trans i18nKey={item.title} components={[<div key={0} />]} />
            </div>
            <div className={'leading-[26px] max-sm:text-base md:text-[17px]'}>{t(item.description)}</div>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
}
