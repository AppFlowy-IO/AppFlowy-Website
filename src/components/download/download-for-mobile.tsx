'use client';
import Trans from 'next-translate/Trans';
import MobileDownloadButton from '@/components/download/mobile-download-button';
import data from '@/data/download.json';
import useTranslation from 'next-translate/useTranslation';
import { motion } from 'framer-motion';
import * as transition from '@/lib/transition';

const { page } = data;

export default function DownloadForMobile() {
  const { t } = useTranslation();

  return (
    <>
      <motion.div
        variants={transition.scaleContainer}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={'page-title flex items-center justify-center pt-24 '}
      >
        <div className={'inline-block px-6 max-sm:w-full md:max-w-screen-sm'}>
          <Trans
            i18nKey={page.title['download-for-mobile']}
            components={[<span key={0} className={'primary-underline'} />]}
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
        className={'flex w-full flex-col items-center'}
      >
        <div className={'mb-12 mt-4 flex text-sm'}>{t(page.description['download-for-mobile'])}</div>
        <MobileDownloadButton />
      </motion.div>

      <motion.div
        variants={transition.scaleContainer}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={
          'flex aspect-auto justify-center max-sm:mb-24 max-sm:px-6 md:mb-48 md:px-24 lg:max-w-screen-lg lg:px-48 xl:max-w-screen-xl'
        }
      >
        <img
          className={'object-contain'}
          src={page.images['download-for-mobile'].src}
          alt={page.images['download-for-mobile'].alt}
        />
      </motion.div>
    </>
  );
}
