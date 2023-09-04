import Box from '@mui/material/Box';

import Values from '@/components/about/values';
import Join from '@/components/about/join';
import Mission from '@/components/about/mission';
import Investors from '@/components/about/investors';

function Page() {
  return (
    <Box
      sx={{
        background: 'var(--about-us-bg)',
      }}
      className='flex w-full flex-col items-center pt-52'
    >
      <Mission />
      <Join />
      <Box
        sx={{
          background: 'var(--about-us-bg-2)',
        }}
        className='flex w-full flex-col items-center'
      >
        <Values />
        <Investors />
      </Box>
    </Box>
  );
}

export default Page;
