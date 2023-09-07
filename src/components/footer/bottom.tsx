'use client';

import SwitchMode from '@/components/footer/switch-mode';
import Box from '@mui/material/Box';

export default function FooterBottom() {
  return (
    <Box
      sx={{
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        alignItems: {
          xs: 'flex-start',
          md: 'flex-end',
        },

        minHeight: {
          xs: '160px',
          md: '87px',
        },
        paddingTop: {
          xs: 5,
        },
      }}
      className={'flex w-full justify-between border-t border-t-gray-800'}
    >
      <div className={'flex flex-col text-sm text-white'}>
        <div className={'mb-2'}>Copyright © 2023, Appflowy Inc.</div>
        <div className={'text-white opacity-50'}>
          Need Help?{' '}
          <button
            className={'hover:underline'}
            onClick={() => {
              window.location.href = 'mailto:support@appflowy.io';
            }}
          >
            support@appflowy.io
          </button>
        </div>
      </div>
      <Box
        sx={{
          justifyContent: {
            xs: 'flex-end',
          },
          width: {
            xs: '100%',
            md: 'auto',
          },
        }}
        className={'flex'}
      >
        <SwitchMode />
      </Box>
    </Box>
  );
}
