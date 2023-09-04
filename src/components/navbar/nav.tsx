'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { StarBorderRounded } from '@mui/icons-material';
import { useNavigator } from '@/lib/hooks/use-navigator';
import useTranslation from 'next-translate/useTranslation';
import Button from '@/components/shared/button';
import { useCallback, useState } from 'react';
import { StartForFreeButton } from '@/components/navbar/start-for-free';
import Logo from '@/components/shared/icons/logo';
import DrawerNavbar from '@/components/navbar/drawer-nav';
import NavMenuItem from '@/components/navbar/nav-menu-item';
import Link from 'next/link';

function ResponsiveAppBar({ scrolled }: { scrolled: boolean }) {
  const { t } = useTranslation();
  const { stars, pages, activePageKey } = useNavigator();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <AppBar
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        textTransform: 'none',
        color: 'var(--color-text-title)',
        fontSize: '1rem',
        padding: '12px 0',
      }}
      position='static'
    >
      <Container maxWidth={false}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          disableGutters
        >
          <Box
            sx={{
              display: 'flex',
              width: {
                xs: 'auto',
                md: 300,
              },
            }}
          >
            <Link href={'/'}>
              <Logo />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <NavMenuItem activePageKey={activePageKey} page={page} key={page.key} />
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: 'flex',
            }}
          >
            <Button
              sx={{
                padding: {
                  xs: '0.5em 1em',
                },
                borderColor: scrolled ? 'var(--color-github-star-border-scrolled)' : 'var(--color-github-star-border)',
              }}
              className={'mx-2'}
              color={'secondary'}
              variant={'contained'}
            >
              <div className={'flex items-center justify-center'}>
                <StarBorderRounded
                  sx={{
                    fontSize: '2rem',
                    color: 'var(--color-icon)',
                  }}
                />
                <div className={'ml-2 mr-3 whitespace-nowrap'}>{t('button.github-star')}</div>
                <div className={'arrow-badge'}>{stars > 1000 ? `${Math.ceil(stars / 1000)}k` : stars}</div>
              </div>
            </Button>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <StartForFreeButton />
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleDrawerToggle}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>
      <Box component='nav'>
        <DrawerNavbar open={drawerOpen} onClose={handleDrawerClose} activePageKey={activePageKey} />
      </Box>
    </AppBar>
  );
}

export default ResponsiveAppBar;
