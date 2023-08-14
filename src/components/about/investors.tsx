import Trans from 'next-translate/Trans';
import pageKeys from '@/data/about-us.json';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

export default function Investors() {
  return (
    <div className={'flex w-full flex-col items-center py-48 max-sm:px-6 max-sm:py-24 md:px-24 lg:px-36 '}>
      <div className={'page-title flex items-center justify-center max-sm:mb-16 max-sm:px-6 md:mb-36'}>
        <div className={'inline-block max-sm:w-full md:max-w-screen-sm lg:max-w-screen-lg'}>
          <Trans
            i18nKey={pageKeys['our-investors'].title}
            components={[<span key={0} className={'primary-underline'} />]}
          />
        </div>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 3, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {pageKeys['our-investors'].investors.map((item, index) => (
            <Grid xs={2} sm={4} md={4} key={index}>
              <div className={'mb-2 text-left text-[30px] font-medium leading-[33px] max-sm:text-base'}>{item.name}</div>
              <div className={'max-sm:text-[12px]'}>{item.description}</div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
