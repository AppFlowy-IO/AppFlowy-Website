import Trans from 'next-translate/Trans';
import pageKeys from '@/data/blocks.json';
import Box from '@mui/material/Box';
import Product from '@/components/blocks/product';

function Page() {
  return (
    <Box
      sx={{
        background: 'var(--blocks-bg)',
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
      <div className={'flex max-sm:flex-col max-sm:px-6 md:px-24'}>
        {pageKeys.products.map((item) => (
          <Product key={item.title} item={item} />
        ))}
      </div>
    </Box>
  );
}

export default Page;
