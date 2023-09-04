import Box from '@mui/material/Box';
import Logo from '@/components/shared/icons/logo';
import IconButton from '@mui/material/IconButton';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import { Divider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import AccordionDetails from '@mui/material/AccordionDetails';
import { StartForFreeButton } from '@/components/navbar/start-for-free';
import * as React from 'react';
import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Drawer from '@mui/material/Drawer';
import LoginButton from '@/components/navbar/login';
import data from '@/data/footer.json';
import { usePathname } from 'next/navigation';

const pages = data.menu;
const drawerWidth = '100vw';

interface DrawerNavbarProps {
  onClose: () => void;
  activePageKey?: string;
  open: boolean;
}
export default function DrawerNavbar({ onClose, activePageKey, open }: DrawerNavbarProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string>();
  const container = typeof window !== 'undefined' ? () => window.document.body : undefined;
  const pathname = usePathname();

  useEffect(() => {
    setExpanded(activePageKey);
  }, [activePageKey]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <Drawer
      container={container}
      variant='temporary'
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Box className={'xs:flex h-[100vh] flex-col overflow-y-auto bg-[var(--color-menu-drawer)] p-6'}>
        <Box className={'flex items-center justify-between pb-6'} onClick={onClose}>
          <Logo />
          <IconButton size='large'>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box className={'py-6'}>
          <Divider className={'border-[var(--color-primary-divider)]'} />
          {pages.map((page) => (
            <Accordion
              expanded={expanded === page.key}
              onChange={(_, expanded) => {
                expanded ? setExpanded(page.key) : setExpanded(undefined);
              }}
              className={'bg-transparent shadow-none before:bg-[var(--color-primary-divider)] before:opacity-100'}
              key={page.key}
            >
              <AccordionSummary className={'px-0 py-2'} expandIcon={<ExpandMoreIcon />}>
                <Typography
                  textAlign='center'
                  className={`text-[24px] font-medium leading-[26px] ${
                    activePageKey === page.key ? 'text-primary' : ''
                  }`}
                >
                  {page.link ? <Link href={page.link}>{t(page.key)}</Link> : t(page.key)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={'flex flex-col items-start p-0'}>
                {page.children?.map((child) => (
                  <div className={'py-2 text-base'} key={child.key}>
                    {child.link ? <Link href={child.link}>{t(child.key)}</Link> : t(child.key)}
                  </div>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
          <Divider className={'border-[var(--color-primary-divider)]'} />
        </Box>
        <Box className={'w-full py-6'}>
          <StartForFreeButton className={'w-full'} />
          <LoginButton className={'mt-4 w-full'} />
        </Box>
      </Box>
    </Drawer>
  );
}
