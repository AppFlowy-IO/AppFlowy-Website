'use client';

import Dialog from '@mui/material/Dialog';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import ImportImage from '@/assets/images/vs-notion/import.png';

function ImportLink({ importBaseURL }: { importBaseURL: string }) {
  const [open, setOpen] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.href.includes('?importing=true');
  });
  const [redirectTo, setRedirectTo] = React.useState('');

  const handleClose = () => {
    setOpen(false);
    window.location.search = '';
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setRedirectTo(encodeURIComponent(window.location.href + '?importing=true'));
  }, []);

  return (
    <>
      <Link
        target={'_blank'}
        href={`${importBaseURL}/import?action=import&source=notion&redirectToImport=${redirectTo}`}
        className={'main-button download-btn'}
      >
        Import from Notion
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '15px',
            width: '351px',
            maxWidth: '90%',
          },
        }}
      >
        <div className={'flex flex-col items-center justify-center gap-6 rounded-[15px] bg-white p-10'}>
          <Image src={ImportImage} alt={'Import from Notion'} width={189} height={121} />
          <div className={'flex flex-col items-center justify-center gap-4'}>
            <div className={'text-center text-[24px] font-medium'}>Importing...</div>
            <div className={'text-center text-base font-normal text-[#58585a]'}>
              We’ll send you an email when it’s done.
            </div>
            <div onClick={handleClose} className={'download-btn cursor-pointer'}>
              Close
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ImportLink;
