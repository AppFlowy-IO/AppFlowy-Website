import Box from '@mui/material/Box';
import Trans from 'next-translate/Trans';
import pageKeys from '@/data/contact-us.json';
import Form from '@/components/contact/form';

function Page() {
  return (
    <Box
      sx={{
        background: 'var(--contact-bg)',
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
      <Form />
    </Box>
  );
}

export default Page;
