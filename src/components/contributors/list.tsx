'use client';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useContributors } from '@/lib/hooks/use-contributors';
import { CircularProgress } from '@mui/material';

export default function ContributorList() {
  const { loading, contributors } = useContributors();

  return (
    <div className={'relative mb-12 min-h-screen w-full px-24 max-sm:px-6'}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}>
          {contributors.map((contributor) => (
            <Grid item xs={2} sm={4} md={4} key={contributor.id}>
              <div
                className={
                  'border-primary-divider bg-bg flex h-[328px] flex-col items-center justify-center overflow-hidden rounded-2xl border p-6 max-sm:h-[192px] max-sm:p-4'
                }
              >
                <div
                  className={
                    'mb-4 flex  items-center justify-center overflow-hidden rounded-full border-4 border-[var(--contributor-avatar-border-color)] max-sm:h-[90px] max-sm:w-[90px] md:h-[208px] md:w-[208px]'
                  }
                >
                  <img
                    loading={'lazy'}
                    className={'border-bg h-[194px] w-[194px] rounded-full border-4 max-sm:h-[84px] max-sm:w-[84px]'}
                    src={contributor.avatar_url}
                  />
                </div>
                <div
                  className={
                    'mb-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-[24px] leading-[26px] max-sm:text-base'
                  }
                >
                  {contributor.name}
                </div>
                <div
                  className={
                    'w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm max-sm:text-[12px]'
                  }
                >
                  @{contributor.login}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
      {loading && (
        <Box className={'pointer-events-none absolute left-0 top-0 flex h-full w-full justify-center backdrop-blur-lg'}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}
