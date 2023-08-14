'use client';

import Icon from '@/components/download/icon';
import Button from '@/components/shared/button';
import Link from 'next/link';
import Box from '@mui/material/Box';
import data from '@/data/download.json';
import useTranslation from 'next-translate/useTranslation';
import { motion } from 'framer-motion';
import * as transition from '@/lib/transition';
import Trans from 'next-translate/Trans';

const { page } = data;

export default function AcrossDevices() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        background: {
          xs: 'var(--download-bg-3)',
          md: 'transparent',
        },
      }}
      className={'flex w-full flex-col items-center'}
    >
      <motion.div
        variants={transition.scaleContainer}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={'page-title flex items-center justify-center pt-24 max-sm:mb-16 md:mb-24 '}
      >
        <div className={'inline-block px-6 max-sm:w-full md:max-w-screen-md'}>
          <Trans
            i18nKey={page.title['across-devices']}
            components={[<span key={0} className={'primary-underline'} />]}
          />
        </div>
      </motion.div>
      <motion.div
        variants={transition.staggerContainer}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={
          'flex w-full max-sm:mb-12 max-sm:flex-col max-sm:px-6 md:mb-48 md:flex-row md:px-24 lg:max-w-screen-lg xl:max-w-screen-xl'
        }
      >
        {page['work-across-all-your-devices'].map((item, index) => (
          <motion.div
            variants={transition.toRight}
            style={{
              background: 'var(--linear-gradient-600)',
            }}
            key={index}
            className={
              'border-primary-divider flex flex-col justify-between rounded-2xl border p-8 max-sm:mx-0  max-sm:mb-6 max-sm:h-[370px] md:mx-4 md:h-[564px] md:flex-1'
            }
          >
            <div className={'flex flex-col'}>
              <div className={'mb-6'}>
                <Icon name={item.key} size={48} />
              </div>
              <div className={'mb-2'}>{t('download:desktop')}</div>
              <div className={'text-[40px] leading-[44px] max-sm:text-[24px] max-sm:leading-[26px]'}>{t(item.name)}</div>
            </div>
            <div className={'flex flex-col'}>
              {item['download-items'].map((btn) => (
                <div key={btn.name} className={'mb-4 last:mb-0'}>
                  <Button className={'w-full'} variant={'contained'}>
                    <Link href={btn.link}>{t(btn.name)}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
}
