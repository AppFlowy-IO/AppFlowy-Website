'use client';
import React, { useMemo } from 'react';
import { useDownload } from '@/lib/hooks/use-download';
import { useClient } from '@/lib/hooks/use-client';

import LinuxBtnGroup from '@/components/shared/linux-btn-group';
import { Button } from '@/components/ui/button';

function DownloadOsBtn() {
  const { downloadOS } = useDownload();
  const { os, isLinux } = useClient();

  const name = useMemo(() => {
    if (!os) return '';
    if (os.name === 'Mac OS') return 'macOS';
    if (os.name === 'Linux') return 'Linux';
    return os.name;
  }, [os]);

  return (
    <div className={'flex flex-col items-center justify-center gap-10 text-center'}>
      <div className={'flex flex-col items-center justify-center gap-3 text-center'}>
        <h1 className='text-style-h1 font-bold'>Download AppFlowy <br></br>for desktop and mobile</h1>
        <p className='text-style-h5 text-text-tertiary'>Get the native AppFlowy experience wherever you work.</p>
      </div>
      <div className={'download z-[2] flex flex-col items-center justify-center gap-5 text-center'}>
        {isLinux ? (
          <LinuxBtnGroup title={'Download'} />
        ) : (
          <Button onClick={downloadOS} size={'xl'}
            className={'min-w-[180px] rounded-lg bg-night-blue text-white transition-colors text-base leading-[150%] hover:bg-night-blue/90 max-sm:w-full'}>
            {'Download ' + name + ' app'}
          </Button>
        )}
        <a
          href="#across"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('across')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }}
          className='text-base text-text-tertiary hover:text-text-primary transition-colors duration-280 flex items-center justify-center gap-2'>
          View all platforms
        </a>
      </div>
    </div>
  );
}

export default DownloadOsBtn;
