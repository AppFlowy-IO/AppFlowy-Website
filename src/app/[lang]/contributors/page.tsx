import Box from '@mui/material/Box';
import Trans from 'next-translate/Trans';
import pageKeys from '@/data/contributors.json';
import Button from '@/components/shared/button';
import Link from 'next/link';
import ContributorList from '@/components/contributors/list';

export default function Page() {
  return (
    <Box
      sx={{
        background: 'var(--contributors-bg)',
      }}
      className='flex w-full flex-col items-center pt-52 max-sm:pb-16 md:pb-36'
    >
      <div className={'page-title mb-6 flex items-center justify-center max-sm:mb-4'}>
        <div className={'inline-block'}>
          <Trans i18nKey={pageKeys.title} components={[<span key={0} className={'primary-underline'} />]} />
        </div>
      </div>
      <div className={'mb-24 text-center max-sm:mb-12 max-sm:px-12 md:max-w-lg'}>
        <Trans i18nKey={pageKeys.description} />
      </div>
      <ContributorList />
      <div
        className={
          'page-title mb-12 flex items-center justify-center max-sm:mb-4 md:px-24 lg:max-w-screen-lg xl:max-w-screen-xl'
        }
      >
        <div className={'inline-block'}>
          <Trans
            i18nKey={pageKeys['learn-more-title']}
            components={[<span key={0} className={'primary-underline'} />]}
          />
        </div>
      </div>

      <div>
        <Link href={pageKeys['learn-more-link']}>
          <Button variant={'contained'}>
            <Trans i18nKey={'button.learn-more'} />
          </Button>
        </Link>
      </div>
    </Box>
  );
}
