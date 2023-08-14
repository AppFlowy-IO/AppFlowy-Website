'use client';
import Trans from 'next-translate/Trans';
import pageKeys from '@/data/about-us.json';
import { AddOutlined } from '@mui/icons-material';
import LoopList from '@/components/shared/loop-list';
import Box from '@mui/material/Box';
import { useClient } from '@/lib/hooks/use-client';

export default function Join() {
  const { isClient } = useClient();

  return (
    <Box
      sx={{
        background: 'var(--about-us-bg-1)',
      }}
      className={'relative flex w-full flex-col items-center pt-48 max-sm:pt-24'}
    >
      <div
        className={
          'absolute right-0 top-0 h-[70%] w-[70%] rounded-full bg-gradient-to-bl from-[var(--about-us-bg-1-1)] to-white opacity-20'
        }
      ></div>
      <div className={'page-title mb-36 flex items-center justify-center max-sm:mb-6'}>
        <div className={'inline-block max-sm:w-full md:max-w-screen-sm lg:max-w-screen-lg'}>
          <Trans i18nKey={pageKeys.join.title} components={[<span key={0} className={'primary-underline'} />]} />
        </div>
      </div>
      <div className={'mx-12 mb-12 flex justify-center overflow-hidden max-sm:flex-col md:flex-row'}>
        {pageKeys.join.data.map((item) => (
          <div key={item.name} className={'flex flex-col max-sm:justify-center max-sm:py-8 md:flex-1 md:px-10'}>
            <div className={'flex max-sm:justify-center'}>
              <div className={'flex flex-col max-sm:items-center '}>
                <div
                  className={
                    'mb-4 font-medium max-sm:text-[100px] max-sm:leading-[120px] md:text-[120px] md:leading-[144px]'
                  }
                >
                  {item.value}
                </div>
              </div>
              <AddOutlined
                className={'text-primary'}
                sx={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </div>
            <div className={'text-base leading-[27px] max-sm:text-center'}>
              <Trans i18nKey={item.name} />
            </div>
          </div>
        ))}
      </div>
      <div
        className={
          'mt-36 px-12 text-[40px] font-medium leading-[44px] max-sm:mt-12 max-sm:text-center max-sm:text-[24px] max-sm:leading-[26px]'
        }
      >
        <Trans i18nKey={pageKeys.join['developers-users-from'].title} />
      </div>

      <div className={'mb-36 mt-20 max-sm:mb-24'}>
        {isClient && (
          <LoopList
            itemWidth={200}
            baseVelocity={1}
            items={pageKeys.join['developers-users-from'].users.map((item, index) => (
              <div className={'mx-20 flex h-[50px] w-full items-center justify-center'} key={index}>
                <img className={'object-contain'} src={item.src} alt={item.alt} />
              </div>
            ))}
          />
        )}
      </div>
    </Box>
  );
}
