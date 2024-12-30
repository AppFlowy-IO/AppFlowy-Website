import { useClient } from '@/lib/hooks/use-client';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import AccordionDetails from '@mui/material/AccordionDetails';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Logo from '@/components/icons/logo';
import { links } from '@/lib/config/footer';
import Close from '@/components/icons/close';
import { useDownload } from '@/lib/hooks/use-download';

const drawerWidth = '100vw';

interface DrawerNavbarProps {
  onClose: () => void;
  activePageKey?: string;
  open: boolean;
}

export default function DrawerNavbar({ onClose, activePageKey, open }: DrawerNavbarProps) {
  const { downloadOS } = useDownload();
  const { isMobile } = useClient();
  const [expanded, setExpanded] = useState<string>();
  const container = typeof window !== 'undefined' ? () => window.document.body : undefined;

  useEffect(() => {
    setExpanded(activePageKey);
  }, [activePageKey]);

  return (
    <Drawer
      container={container}
      variant='temporary'
      open={open}
      onClose={onClose}
      PaperProps={{
        className: 'appflowy-drawer',
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <div className={'appflowy-drawer-nav  text-black dark:text-white'}>
        <div className={'header'} onClick={onClose}>
          <Link href={'/'} className={'logo'}>
            <Logo />
          </Link>

          <Close />
        </div>
        <div className={'content'}>
          {links.map((page) => (
            <div className={'w-full'} key={page.name}>
              <div className={'divider'} />
              <Accordion
                expanded={expanded === page.name}
                onChange={(_, expanded) => {
                  expanded ? setExpanded(page.name) : setExpanded(undefined);
                }}
                className={'mt-0 w-full bg-transparent pt-0 shadow-none before:opacity-0'}
                sx={{
                  '& .MuiAccordionSummary-content': { marginTop: '14px !important', marginBottom: '14px !important' },
                  '& .Mui-expanded': {
                    minHeight: 'unset !important',
                  },
                }}
              >
                <AccordionSummary
                  className={'border-none p-0'}
                  expandIcon={
                    <svg
                      className={'dark:text-white'}
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                    >
                      <path
                        d='M8.7733 5.39073C8.52814 5.14774 8.13241 5.14951 7.88943 5.39467C7.64644 5.63983 7.64821 6.03556 7.89337 6.27854L9.36251 7.73463C9.95876 8.32558 10.3678 8.73228 10.6445 9.07689C10.9133 9.41164 11.0056 9.62665 11.0301 9.81922C11.0455 9.94013 11.0455 10.0625 11.0301 10.1834C11.0056 10.376 10.9133 10.591 10.6445 10.9257C10.3678 11.2703 9.95876 11.677 9.36251 12.268L7.89337 13.7241C7.64821 13.967 7.64644 14.3628 7.88943 14.6079C8.13241 14.8531 8.52814 14.8549 8.7733 14.6119L10.2689 13.1296C10.8322 12.5713 11.2926 12.115 11.6191 11.7084C11.9586 11.2856 12.2044 10.8565 12.2701 10.3414C12.2989 10.1156 12.2989 9.88702 12.2701 9.66117C12.2044 9.14607 11.9586 8.71695 11.6191 8.29418C11.2926 7.88762 10.8322 7.43134 10.2689 6.87305L8.7733 5.39073Z'
                        fill='currentColor'
                      />
                    </svg>
                  }
                >
                  <Typography
                    textAlign='center'
                    className={`text-[24px] font-medium leading-[26px] dark:text-white ${
                      activePageKey === page.name ? 'text-primary' : ''
                    }`}
                  >
                    {page.link ? (
                      <Link onClick={() => onClose()} href={page.link}>
                        {page.name}
                      </Link>
                    ) : (
                      page.name
                    )}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={'flex flex-col items-start p-0'}>
                  {page.children?.map((child) => (
                    <div className={'flex w-full py-2 text-base last:mb-[14px] dark:text-white'} key={child.name}>
                      {child.link ? (
                        <Link className={'w-full'} onClick={() => onClose()} href={child.link}>
                          {child.name}
                        </Link>
                      ) : (
                        child.name
                      )}
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
          <div className={'divider'} />
        </div>
        <div className={'mb-[68px] w-full px-[20px] pt-[40px]'}>
          <button
            onClick={() => {
              if (!isMobile) {
                window.open('https://appflowy.com', '_current');
              } else {
                downloadOS();
              }
            }}
            className={'download-btn w-full'}
          >
            Start for free
          </button>
        </div>
      </div>
    </Drawer>
  );
}
