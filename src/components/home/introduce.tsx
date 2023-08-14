'use client';

import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import Box from '@mui/material/Box';
import StarOutline from '@mui/icons-material/StarOutline';
import Button from '@/components/shared/button';
import { useClient } from '@/lib/hooks/use-client';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import data from '@/data/home.json';
import FilterTiltShiftOutlinedIcon from '@mui/icons-material/FilterTiltShiftOutlined';
import { EditOutlined } from '@mui/icons-material';
import SwipeViews from '@/components/home/swipe-views';
import * as transition from '@/lib/transition';
import { Parallax } from '@/components/shared/parallax';

const introduceConfig = data.introduce;

export default function Introduce() {
  const { t } = useTranslation();
  const { isClient, os } = useClient();

  const appflowyDesc = (
    <div className={'flex flex-col'}>
      <CheckBoxOutlinedIcon
        sx={{
          color: 'var(--color-primary)',
          width: '40px',
          height: '40px',
        }}
      />
      <p className={'my-4 ml-2'}>
        <Trans i18nKey={introduceConfig.description.appflowy} components={[<span key={0} className={'font-bold'} />]} />
      </p>
    </div>
  );

  return (
    <Box
      sx={{
        background: {
          md: 'var(--linear-gradient-100)',
          xs: 'var(--color-bg-100)',
        },
      }}
      className={'flex w-full flex-col items-center overflow-hidden pt-52'}
    >
      {/* Home first screen */}
      <motion.div
        variants={transition.opacity}
        initial={'hidden'}
        whileInView={'show'}
        viewport={{
          once: true,
        }}
        className={'flex flex-col items-center'}
      >
        <motion.div
          variants={transition.opacityDelay}
          initial={'hidden'}
          whileInView={'show'}
          viewport={{
            once: true,
          }}
          className={
            'border-primary flex items-center justify-center rounded-2xl px-3 py-2 max-sm:order-2 max-sm:mt-8 max-sm:flex-wrap md:order-1 md:mb-6 md:border md:bg-[var(--color-character-bg)]'
          }
        >
          {introduceConfig.characters.map((key) => (
            <div key={key} className={'mx-2 flex items-center justify-center max-sm:my-1 max-sm:text-[12px]'}>
              <StarOutline />
              {t(key)}
            </div>
          ))}
        </motion.div>
        <motion.div
          variants={transition.toUp}
          initial={'hidden'}
          whileInView={'show'}
          viewport={{
            once: true,
          }}
          className={'page-title order-1 sm:max-w-full xl:max-w-screen-lg'}
        >
          <Trans
            i18nKey={introduceConfig.title.appflowy}
            components={[<span key={0} className={'primary-underline'} />]}
          />
        </motion.div>
      </motion.div>
      <div className={'relative flex w-full flex-col items-center max-sm:mb-16 md:mb-24'}>
        <motion.div
          variants={transition.opacityDelay}
          initial={'hidden'}
          whileInView={'show'}
          viewport={{
            once: true,
          }}
          className={'flex items-center justify-center max-sm:mt-8 md:mt-16 md:px-80'}
        >
          <Button size={'large'} color={'primary'} variant={'contained'}>
            <div className={'flex flex-col leading-[20px] max-sm:px-4 max-sm:text-base md:px-[10px] md:text-[20px]'}>
              {t(introduceConfig.button['download-app'].title)}
              {isClient ? (
                <div className={'text-[12px] opacity-50 max-sm:hidden'}>
                  {t(introduceConfig.button['download-app'].subtitle, {
                    osName: os?.name,
                    osVersion: os?.version,
                  })}
                </div>
              ) : null}
            </div>
          </Button>
        </motion.div>
        <motion.div
          variants={transition.opacityDelay}
          initial={'hidden'}
          whileInView={'show'}
          viewport={{
            once: true,
          }}
          className={
            'flex w-full justify-center max-sm:py-16 sm:max-w-full md:mt-8 md:pt-24 lg:max-w-screen-lg 2xl:max-w-screen-xl'
          }
        >
          <div className={'aspect-video px-6'}>
            <img
              className={'max-h-full max-w-full object-contain'}
              src={introduceConfig.images.appflowy.src}
              alt={t(introduceConfig.images.appflowy.alt)}
            />
          </div>
        </motion.div>
        <motion.div
          variants={transition.toDown}
          initial={'hidden'}
          whileInView={'show'}
          viewport={{
            once: true,
          }}
          className={'my-6 max-sm:w-full max-sm:px-8 md:absolute md:left-0 md:top-20 md:ml-20 md:w-60'}
        >
          {appflowyDesc}
        </motion.div>
      </div>
      <Box
        sx={{
          background: {
            xs: 'var(--linear-gradient-100)',
            md: 'transparent',
          },
        }}
        className={'w-full pt-24'}
      >
        {/* Home wikis-docs-notes */}
        <Parallax title={t(introduceConfig.title['wikis-docs-notes'])}>
          <motion.div
            variants={transition.opacityDelay}
            initial={'hidden'}
            whileInView={'show'}
            viewport={{
              once: true,
            }}
            className={'flex max-sm:flex-col max-sm:px-8 md:flex-row md:items-end md:p-32'}
          >
            <div className={'flex flex-col max-sm:mb-10 max-sm:w-full md:mb-16 md:mr-16 md:w-[250px]'}>
              <EditOutlined
                sx={{
                  color: 'var(--color-primary)',
                  width: '40px',
                  height: '40px',
                }}
              />
              <p className={'my-4 ml-2'}>
                <Trans
                  i18nKey={introduceConfig.description['an-extensible-and-customizable']}
                  components={[<span key={0} className={'font-bold'} />]}
                />
              </p>
            </div>
            <div className={'aspect-auto flex-1 md:ml-24'}>
              <img
                className={'max-h-full max-w-full object-contain'}
                src={introduceConfig.images['an-extensible-and-customizable'].src}
                alt={t(introduceConfig.images['an-extensible-and-customizable'].alt)}
              />
            </div>
          </motion.div>
        </Parallax>
        {/* Home centralized place */}
        <div className={'full flex flex-col items-center'}>
          <motion.div
            variants={transition.scaleContainer}
            initial={'hidden'}
            whileInView={'show'}
            viewport={{
              once: true,
            }}
            className={'relative flex w-full items-center justify-center py-10 max-sm:my-16 md:my-36 md:px-36'}
          >
            <div className={'text-primary absolute left-[50%] top-0 -translate-x-1/2'}>
              <FilterTiltShiftOutlinedIcon
                sx={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </div>
            <div className={'page-title sm:max-w-full'}>
              <Trans
                i18nKey={introduceConfig.title['centralized-place']}
                components={[<span key={0} className={'text-primary'} />, <span key={1} className={'text-text-gray'} />]}
              />
            </div>
          </motion.div>

          <motion.div
            className={'lg:max-w-screen-lg xl:max-w-screen-xl'}
            variants={transition.opacityDelay}
            initial={'hidden'}
            whileInView={'show'}
            viewport={{
              once: true,
            }}
          >
            <SwipeViews />
          </motion.div>
        </div>

        {/* Home easy to use and beautiful */}
        <div className={'flex w-full flex-col items-center max-sm:pt-12 md:py-20'}>
          <motion.div
            variants={transition.scaleContainer}
            initial={'hidden'}
            whileInView={'show'}
            viewport={{
              once: true,
            }}
            className={'flex w-full flex-col items-center '}
          >
            <div className={'relative flex flex items-center items-center justify-center justify-center py-6 '}>
              <div className={'text-primary absolute right-0 top-0 -translate-x-1/2'}>
                <FilterTiltShiftOutlinedIcon
                  sx={{
                    width: '40px',
                    height: '40px',
                  }}
                />
              </div>
              <div className={'page-title'}>
                <Trans
                  i18nKey={introduceConfig.title['easy-to-use']}
                  components={[<span key={0} className={'primary-underline'} />]}
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={transition.staggerContainer}
            initial={'hidden'}
            whileInView={'show'}
            viewport={{
              once: true,
            }}
            className={'flex max-sm:flex-col max-sm:p-8 md:p-24'}
          >
            {introduceConfig['easy-to-use'].map((item) => (
              <motion.div
                variants={transition.toRight}
                key={item.name}
                className={
                  'card max-sm:my-2 max-sm:h-[500px] max-sm:pb-8 md:mx-4 md:h-[665px] md:max-w-[450px]  md:pb-12'
                }
              >
                <div className={'flex flex-1 items-center justify-center max-sm:mb-8 md:mb-16'}>
                  <img className={'w-full'} src={item.image.src} alt={item.image.alt} />
                </div>
                <div
                  className={
                    'px-8 text-center max-sm:text-[24px] max-sm:leading-[28px] md:text-[40px] md:leading-[48px]'
                  }
                >
                  {t(item.name)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Box>
    </Box>
  );
}
