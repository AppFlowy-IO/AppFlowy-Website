'use client';
import Trans from 'next-translate/Trans';
import pageKeys from '@/data/about-us.json';
import Box from '@mui/material/Box';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MinusIcon from '@mui/icons-material/Remove';
import PlusIcon from '@mui/icons-material/AddOutlined';
import Check from '@mui/icons-material/Check';

const valuesBg = [
  'var(--about-us-values-bg-1)',
  'var(--about-us-values-bg-2)',
  'var(--about-us-values-bg-3)',
  'var(--about-us-values-bg-4)',
  'var(--about-us-values-bg-5)',
];

const valuesBorder = [
  'var(--about-us-values-border-1)',
  'var(--about-us-values-border-2)',
  'var(--about-us-values-border-3)',
  'var(--about-us-values-border-4)',
  'var(--about-us-values-border-5)',
];

export default function Values() {
  const [expandIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <Box className={'flex w-full flex-col items-center pt-48 max-sm:pt-24'}>
      <div className={'page-title mb-36 flex items-center justify-center max-sm:mb-16'}>
        <div className={'inline-block max-sm:w-full md:max-w-screen-sm lg:max-w-screen-lg'}>
          <Trans
            i18nKey={pageKeys['our-values'].title}
            components={[<span key={0} className={'primary-underline'} />]}
          />
        </div>
      </div>
      <div className={'flex  w-full flex-col px-16 max-sm:px-6'}>
        {pageKeys['our-values'].values.map((item, index) => {
          const isOpen = index === expandIndex;

          return (
            <Box
              key={item.key}
              sx={{
                background: valuesBg[index],
                borderColor: valuesBorder[index],
              }}
              className={'mb-4 flex flex-col justify-center rounded-2xl border p-8'}
            >
              <motion.header
                className={'flex cursor-pointer justify-between max-sm:flex-wrap'}
                initial={false}
                onClick={() => setExpandedIndex(isOpen ? null : index)}
              >
                <div className={'w-[200px] text-[80px] font-medium leading-[96px]'}>{item.key}</div>
                <div
                  className={
                    'mr-6 flex flex-1 flex-col justify-center text-[40px] font-medium leading-[44px] max-sm:order-3 max-sm:mt-4 max-sm:text-[24px] max-sm:leading-[26px]'
                  }
                >
                  <Trans i18nKey={item.title} />
                </div>
                <motion.button>
                  <span>{isOpen ? <MinusIcon width={20} height={20} /> : <PlusIcon width={20} height={20} />}</span>
                </motion.button>
              </motion.header>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.section
                    key='content'
                    initial='collapsed'
                    animate='open'
                    exit='collapsed'
                    className={'max-sm:mt-4 md:ml-[200px] md:pr-8'}
                    variants={{
                      open: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.5, ease: [0.56, 0.03, 0.12, 1.04] }}
                  >
                    {item.points.map((point, index) => (
                      <div key={index} className={'mb-2 flex md:px-2'}>
                        <div className={'mr-2 '}>
                          <Check
                            sx={{
                              width: 16,
                              height: 16,
                            }}
                          />
                        </div>

                        <Trans i18nKey={point} />
                      </div>
                    ))}
                  </motion.section>
                )}
              </AnimatePresence>
            </Box>
          );
        })}
      </div>
    </Box>
  );
}
