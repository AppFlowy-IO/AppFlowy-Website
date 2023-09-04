import Box from '@mui/material/Box';
import Trans from 'next-translate/Trans';
import pageKeys from '@/data/career.json';
import Button from '@/components/shared/button';
import Link from 'next/link';
import { ReactNode, useCallback } from 'react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Code from '@mui/icons-material/Code';
import Computer from '@mui/icons-material/Computer';
import AutoGraph from '@mui/icons-material/AutoGraph';
import { AppflowyLogo } from '@/components/shared/icons/AppflowyLogo';
import ArrowOutward from '@mui/icons-material/ArrowOutward';

const sx = {
  width: '45px',
  height: '45px',
};
const iconMap: Record<string, ReactNode> = {
  'fast-growing': <Code sx={sx} />,
  'community-focused': <SentimentSatisfiedAltIcon sx={sx} />,
  remote: <Computer sx={sx} />,
  'backed-by-vc': <AutoGraph sx={sx} />,
};

function Page() {
  const renderPoint = useCallback((key: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const i18nKey = pageKeys['good-points'][key];

    return (
      <div className={'mb-12 flex flex-col last:mb-0'}>
        <div className={'text-primary mb-4 flex items-center'}>{iconMap[key]}</div>
        <Trans i18nKey={i18nKey} components={[<div key={0} className={'mb-2 font-bold'} />]} />
      </div>
    );
  }, []);

  return (
    <Box
      sx={{
        background: 'var(--about-us-bg)',
      }}
      className='flex w-full flex-col items-center pt-52'
    >
      <div className={'page-title mb-6 flex items-center justify-center max-sm:mb-4'}>
        <div className={'inline-block'}>
          <Trans
            i18nKey={pageKeys.title['join-our-team']}
            components={[<span key={0} className={'primary-underline'} />]}
          />
        </div>
      </div>
      <div className={'mb-12 text-center max-sm:mb-8 max-sm:px-12 md:max-w-lg'}>
        <Trans i18nKey={pageKeys.description} />
      </div>
      <div className={'mb-48 flex items-center max-sm:mb-24'}>
        <Button variant={'contained'}>
          <Link href={pageKeys['open-position'].link}>
            <Trans i18nKey={pageKeys['open-position']['button-text']} />
          </Link>
        </Button>
      </div>
      <div className={'mb-48 flex w-full justify-between px-32 max-sm:hidden'}>
        <div className={'flex w-[260px] flex-col'}>
          {renderPoint('fast-growing')}
          {renderPoint('remote')}
        </div>
        <div className={'mx-12 flex h-[350px] w-[350px] flex-1 items-center justify-center'}>
          <AppflowyLogo />
        </div>
        <div className={'flex w-[260px] flex-col'}>
          {renderPoint('community-focused')}
          {renderPoint('backed-by-vc')}
        </div>
      </div>
      <div className={'mb-24 flex flex-col items-center px-12 md:hidden'}>
        <div className={'mb-20 flex h-[230px] w-[230px] flex-1 items-center justify-center'}>
          <AppflowyLogo />
        </div>
        {renderPoint('fast-growing')}
        {renderPoint('community-focused')}
        {renderPoint('remote')}
        {renderPoint('backed-by-vc')}
      </div>
      <div id={'current-job-openings'} className={'page-title mb-36 flex items-center justify-center max-sm:mb-12 '}>
        <div className={'inline-block'}>
          <Trans
            i18nKey={pageKeys.title['current-job-openings']}
            components={[<span key={0} className={'primary-underline'} />]}
          />
        </div>
      </div>
      <div className={'flex w-full flex-col px-24 pb-36 max-sm:px-6 max-sm:pb-12'}>
        {pageKeys.offer.map((item) => (
          <div
            key={item.name}
            className={
              'bg-bg border-primary-divider mb-4 flex items-center justify-between rounded-2xl border p-8 max-sm:flex-col max-sm:items-start'
            }
          >
            <div className={'flex flex-col max-sm:order-2'}>
              <div className={'mb-2 text-[35px] font-medium leading-[35px] max-sm:text-[24px] max-sm:leading-[26px]'}>
                <Trans i18nKey={item.name} />
              </div>
              <div className={'flex max-sm:flex-wrap'}>
                {item.tags.map((tag, index) => (
                  <span key={index} className={'mr-6 max-sm:mr-4'}>
                    <Trans i18nKey={tag} />
                  </span>
                ))}
              </div>
            </div>
            <div className={'text-primary max-sm:mb-6'}>
              <Link href={item.link}>
                <ArrowOutward sx={sx} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}

export default Page;
