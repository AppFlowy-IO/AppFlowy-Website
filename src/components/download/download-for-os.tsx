'use client';

import Trans from 'next-translate/Trans';
import CurrentOsDownloadButton from '@/components/download/current-os-download-button';
import data from '@/data/download.json';
import { motion } from 'framer-motion';
import * as transition from '@/lib/transition';

const { page } = data;

export default function DownloadForOS() {
  return (
    <>
      <motion.div
        variants={transition.scaleContainer}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={'page-title flex items-center justify-center px-20 pt-52 max-sm:mb-8 md:mb-12 '}
      >
        <div className={'inline-block '}>
          <Trans
            i18nKey={page.title['download-for-your-os']}
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
        className={'flex w-full flex-col items-center max-sm:mb-16 md:mb-32'}
      >
        <CurrentOsDownloadButton />
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
          src={page.images['download-for-your-os'].src}
          alt={page.images['download-for-your-os'].alt}
        />
      </motion.div>
    </>
  );
}
