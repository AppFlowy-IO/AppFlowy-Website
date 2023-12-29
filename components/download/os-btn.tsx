'use client';
import React, { useMemo } from 'react';
import { useDownload } from '@/lib/hooks/use-download';
import { useClient } from '@/lib/hooks/use-client';

import LinuxBtnGroup from '@/components/shared/linux-btn-group';
import HeroDesc from '@/components/shared/hero-desc';

function DownloadOsBtn() {
  const { downloadOS } = useDownload();
  const { os, isLinux, isMobile } = useClient();

  const name = useMemo(() => {
    if (!os) return '';
    if (os.name === 'Mac OS') return 'macOS';
    if (os.name === 'Linux') return 'Linux';
    return os.name;
  }, [os]);

  return (
    <>
      <div className={'title'}>
        AppFlowy for{' '}
        <span className={'primary-word'}>
          {name}
          <div className={'primary-line max-sm:mb-[6px]'}>
            <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 201 12' fill='none'>
              <path
                d='M1.99996 8.04368C14.124 5.85871 42.0022 1.7559 56.5232 2.82442C71.0443 3.89293 56.3004 8.03543 47.1133 9.97311C83.0533 5.91677 163.8 -1.20142 199.266 2.77653'
                stroke='currentColor'
                strokeWidth='3'
                strokeLinecap='square'
              />
            </svg>
          </div>
        </span>
      </div>
      <div className={'download z-[2]'}>
        {isLinux ? (
          <LinuxBtnGroup title={'DOWNLOAD'} />
        ) : (
          <button disabled={isMobile} onClick={downloadOS} className={'download-btn'}>
            {'DOWNLOAD'}
          </button>
        )}

        <HeroDesc />
      </div>
    </>
  );
}

export default DownloadOsBtn;
