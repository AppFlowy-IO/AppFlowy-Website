'use client';

import React, { useEffect, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Close from '@/components/icons/close';
import { useDarkContext } from '@/lib/hooks/use-dark-context';
import bg from '@/assets/images/download/pop_bg.png';
import bgBottom from '@/assets/images/download/pop_bg_bottom.png';
import freeBg from '@/assets/images/download/free_bg.svg';
import Logo from '@/components/icons/logo';
import HeroDownloadBtn from '@/components/home/hero-section/download-btn';
import { useClient } from '@/lib/hooks/use-client';

function ModalDownload() {
  const isDark = useDarkContext();
  const { isMobile } = useClient();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash === '#pop') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    window.history.pushState({}, '', window.location.pathname);
  };

  if (isMobile) return null;
  return (
    <Dialog
      PaperProps={{
        className: `modal-paper relative w-[800px] max-w-[90%] h-[600px] max-h-[80%]`,
        sx: {
          backgroundImage: isDark ? undefined : `url(${bg.src})`,
          backgroundSize: 'cover',
          backgroundColor: isDark ? 'var(--color-night-blue)' : undefined,
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' className={'modal-title relative'}>
        <div onClick={handleClose} className={'absolute right-4 top-4 h-10 w-10 cursor-pointer'}>
          <Close />
        </div>
      </DialogTitle>
      <DialogContent className={'flex flex-col items-center pb-0 text-black dark:text-white'}>
        <div className={'flex flex-1 flex-col items-center justify-center'}>
          <div className={'logo mb-6 w-[150px]'}>
            <Logo />
          </div>
          <div
            className={
              'w-[80%] whitespace-break-spaces text-center text-[36px] font-medium leading-[40px] tracking-[-0.05em]'
            }
          >
            <span>Get started for</span>
            <span
              style={{
                backgroundImage: `url(${freeBg.src})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                padding: '10px',
                backgroundRepeat: 'no-repeat',
              }}
            >
              free!
            </span>
            <span>Download the app for your device.</span>
          </div>
          <div className={'w-[65%] whitespace-break-spaces py-6 text-center '}>
            <span className={'text-primary font-bold'}>AppFlowy</span> is an AI-powered secure workspace where you
            achieve more without losing control of your data
          </div>
          <HeroDownloadBtn showDesc={false} />
          <div className={'text-primary my-6 w-full cursor-pointer text-center font-bold'} onClick={handleClose}>
            Skip for now
          </div>
        </div>

        <div
          className={'h-[160px] w-full'}
          style={{
            backgroundImage: `url(${bgBottom.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ModalDownload;
