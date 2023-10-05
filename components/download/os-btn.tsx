'use client';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { downloadLinux86Deb, downloadLinux86Rpm, useDownload } from '@/lib/hooks/use-download';
import { useClient } from '@/lib/hooks/use-client';
import { GitContext } from '@/lib/hooks/use-git-context';
import Link from 'next/link';

function DownloadOsBtn() {
  const { downloadOS } = useDownload();
  const { os, isClient, isLinux, isMobile } = useClient();
  const gitData = useContext(GitContext);
  const [lastVersion, setLastVersion] = useState<string | undefined>(gitData?.lastVersion);

  useEffect(() => {
    if (isClient) {
      setLastVersion(gitData?.lastVersion);
    }
  }, [isClient, gitData]);

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
      {isMobile && <div className={'text-primary mb-[20px] text-[12px]'}>Coming in December</div>}
      <div className={'download z-[2]'}>
        {isLinux ? (
          <div className={'btn-group'}>
            <button onClick={() => downloadLinux86Deb(true)} className={'download-btn'}>
              Download for Linux (.deb)
            </button>
            <button onClick={() => downloadLinux86Rpm(true)} className={'download-btn'}>
              Download for Linux (.rpm)
            </button>
          </div>
        ) : (
          <button disabled={isMobile} onClick={downloadOS} className={'download-btn'}>
            {'DOWNLOAD'}
          </button>
        )}

        <div className={'desc'}>
          Version {lastVersion} - <Link className={'underline'} href={'/what-is-new'}>{`What's New`}</Link>
        </div>
      </div>
    </>
  );
}

export default DownloadOsBtn;
