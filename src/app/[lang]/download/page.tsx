import data from '@/data/download.json';
import Box from '@mui/material/Box';
import useTranslation from 'next-translate/useTranslation';
import { Parallax } from '@/components/shared/parallax';
import AcrossDevices from '@/components/download/across-devices';
import DownloadForOS from '@/components/download/download-for-os';
import DownloadForMobile from '@/components/download/download-for-mobile';

const { page } = data;

function DownloadPage() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        background: {
          md: 'var(--linear-gradient-800)',
          xs: 'transparent',
        },
      }}
      className='flex min-h-screen w-full flex-col items-center '
    >
      <Box
        sx={{
          background: {
            xs: 'var(--download-bg-1)',
            md: 'transparent',
          },
        }}
        className={'flex w-full flex-col items-center'}
      >
        <DownloadForOS />
      </Box>
      <Box
        sx={{
          background: {
            xs: 'var(--download-bg-2)',
            md: 'transparent',
          },
        }}
        className={'flex w-full flex-col items-center'}
      >
        <DownloadForMobile />
        <Parallax title={t(page.title['notes-tasks-projects'])}>
          <div
            className={
              'flex aspect-auto justify-center max-sm:pb-24 md:px-24 md:pb-48 lg:max-w-screen-lg xl:max-w-screen-xl'
            }
          >
            <img
              className={'object-contain'}
              src={page.images['notes-tasks-projects'].src}
              alt={page.images['notes-tasks-projects'].alt}
            />
          </div>
        </Parallax>
      </Box>
      <AcrossDevices />
    </Box>
  );
}

export default DownloadPage;
