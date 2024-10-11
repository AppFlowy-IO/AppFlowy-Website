'use client';

import Dialog from '@mui/material/Dialog';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ImportImage from '@/assets/images/vs-notion/import.png';

function ImportLink({ importBaseURL }: { importBaseURL: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Link
        onClick={() => setOpen(true)}
        target={'_blank'}
        href={`${importBaseURL}/app?action=import&source=notion`}
        className={'main-button download-btn'}
      >
        Import from Notion
      </Link>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
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
            <div onClick={() => setOpen(false)} className={'download-btn cursor-pointer'}>
              Close
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ImportLink;
