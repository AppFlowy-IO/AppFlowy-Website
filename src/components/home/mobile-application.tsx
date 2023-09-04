'use client';

import Trans from 'next-translate/Trans';
import data from '@/data/home.json';
import Button from '@/components/shared/button';
import useTranslation from 'next-translate/useTranslation';
import Apple from '@mui/icons-material/Apple';
import Google from '@mui/icons-material/Shop';
import Link from 'next/link';
import { useClient } from '@/lib/hooks/use-client';
import { motion } from 'framer-motion';
import * as transition from '@/lib/transition';

const config = data['convenient-mobile-application'];

export default function MobileApplication() {
  const { t } = useTranslation();
  const { device, isMobile } = useClient();
  const isIPhone = isMobile && device?.model === 'iPhone';

  return (
    <div className={'flex w-full flex-col items-center justify-center bg-[var(--color-bg-200)] '}>
      <motion.div
        variants={transition.scaleContainer}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={'page-title flex items-center justify-center max-sm:mb-8 max-sm:pt-24 max-sm:pt-32 md:mb-16 md:pt-52'}
      >
        <div className={'md:max-w-screen-md'}>
          <Trans i18nKey={config.title} components={[<span key={0} className={'primary-underline primary-star'} />]} />
        </div>
      </motion.div>
      {device ? (
        <div className={'flex w-full items-center justify-center'}>
          {isIPhone || !isMobile ? (
            <Button disabled={true} variant={'outlined'} className={'mr-4'} color={'primary'}>
              <Link className={'flex items-center'} href={config.button['app-store'].link}>
                <Apple className={'mr-2'} />
                {t(config.button['app-store'].title)}
              </Link>
            </Button>
          ) : null}
          {!isIPhone || !isMobile ? (
            <Button disabled={true} variant={'outlined'} color={'primary'}>
              <Link className={'flex items-center'} href={config.button['google-play'].link}>
                <Google className={'mr-2'} />
                {t(config.button['google-play'].title)}
              </Link>
            </Button>
          ) : null}
        </div>
      ) : null}

      <motion.div
        variants={transition.opacityDelay}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={
          'aspect-auto w-full max-sm:px-8 max-sm:py-12 md:px-24 md:pb-48 md:pt-24 lg:max-w-screen-lg xl:max-w-screen-xl'
        }
      >
        <img className={'max-w-full object-contain'} src={config.image.src} alt={config.image.alt} />
      </motion.div>
    </div>
  );
}
