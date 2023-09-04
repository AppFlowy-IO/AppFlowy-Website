import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import data from '@/data/home.json';
import Button from '@/components/shared/button';
import Link from 'next/link';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import { motion } from 'framer-motion';
import * as transition from '@/lib/transition';

const config = data['get-started-for-free'];

export default function GetStarted() {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={transition.scaleContainer}
      initial={'hidden'}
      whileInView={'show'}
      viewport={{
        once: true,
      }}
      className={'relative flex w-full flex-col items-center overflow-hidden'}
    >
      <div className={'page-title mb-6 flex items-center justify-center max-sm:pt-20 md:pt-36 '}>
        <div className={'md:max-w-screen-md'}>
          <Trans i18nKey={config.title} components={[<span key={0} className={'primary-underline primary-star'} />]} />
        </div>
      </div>
      <div className={'px-12 text-center max-sm:mb-10 md:mb-16'}>{t(config.description)}</div>
      <div className={'flex w-full items-center justify-center px-6 max-sm:mb-16 md:mb-36'}>
        <Button className={'max-sm:mr-2 max-sm:flex-1 md:mr-4'} variant={'contained'}>
          <Link className={'max-sm:text-base md:text-[20px]'} href={config.download.link}>
            {t(config.download['button-name'])}
          </Link>
        </Button>

        <Button disabled={true} variant={'outlined'} className={'max-sm:flex-1'}>
          <Link
            className={'overflow-hidden text-ellipsis whitespace-nowrap max-sm:text-base md:text-[20px]'}
            href={config['live-demo'].link}
          >
            {t(config['live-demo']['button-name'])}
            <ArrowOutward />
          </Link>
        </Button>
      </div>
      <div className={'flex aspect-auto items-center max-sm:px-6 md:px-24 xl:max-w-screen-lg'}>
        <img className={'object-contain'} src={config.image.src} alt={t(config.image.alt)} />
      </div>
      <div className='blur-overlay'></div>
    </motion.div>
  );
}
