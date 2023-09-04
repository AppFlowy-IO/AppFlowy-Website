import Button from '@/components/shared/button';
import * as React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Page } from '@/lib/interface';
import { Popover } from '@mui/material';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash-es/debounce';
import Image from 'next/image';
import {
  DiscFull,
  Email,
  Forum,
  GitHub,
  Star,
  Twitter,
  Visibility,
  FileOpen,
  GridView,
  BubbleChart,
  RingVolume,
  Book,
  LiveTv,
} from '@mui/icons-material';
import Link from 'next/link';

interface NavMenuItemProps {
  page: Page;
  activePageKey?: string;
}

const iconMap: Record<string, ReactNode> = {
  'write-for-appflowy': <Email />,
  'top-contributors': <Star />,
  'appflowy-mentorship': <Visibility />,
  discord: <DiscFull />,
  twitter: <Twitter />,
  github: <GitHub />,
  'community-forum': <Forum />,
  'developers-docs': <FileOpen />,
  'appflowy-blocks': <GridView />,
  roadmap: <BubbleChart />,
  'what-is-new': <RingVolume />,
  'guides-and-tutorials': <Book />,
  'request-a-resource': <Email />,
  newsletter: <Email />,
  'live-demo': <LiveTv />,
};

export default function NavMenuItem({ page, activePageKey }: NavMenuItemProps) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<undefined | HTMLElement>();
  const open = Boolean(anchorEl);

  const debounceClose = useMemo(
    () =>
      debounce(() => {
        setAnchorEl(undefined);
      }, 200),
    []
  );
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!page.children || page.children.length === 0) return;
    setAnchorEl(undefined);
    debounceClose.cancel();
    const target = event.currentTarget;

    setAnchorEl(target);
  };

  const handlePopoverClose = () => {
    setAnchorEl(undefined);
  };

  const renderChildren = (children: Page[]) => {
    return children.map((child) => (
      <div key={child.key} className={`flex flex-col px-2 text-base`}>
        <div className={'flex items-center overflow-hidden'}>
          {child.link ? (
            <Link
              className={` hover:bg-bg-hover flex w-full ${
                child.imageSrc ? 'items-center' : 'items-start'
              } rounded-xl px-4 py-3`}
              href={child.link}
              onClick={handlePopoverClose}
              target={child.link.startsWith('https') ? '_blank' : ''}
            >
              {child.iconName && <div className={'mr-4'}>{iconMap[child.iconName]}</div>}
              {child.imageSrc && (
                <Image
                  className={'mr-4 rounded-xl border border-[var(--color-primary-divider)]'}
                  width={120}
                  height={64}
                  src={child.imageSrc}
                  alt={child.imageAlt || ''}
                />
              )}
              <div className={'flex max-w-[180px] flex-col justify-center whitespace-break-spaces'}>
                <div>{t(child.key)}</div>
                {child.desc ? <div className={'text-sm opacity-40'}>{t(child.desc)}</div> : null}
              </div>
            </Link>
          ) : (
            <div className={'px-6 py-4 font-bold'}>{t(child.key)}</div>
          )}
        </div>

        {child.children ? renderChildren(child.children) : null}
      </div>
    ));
  };

  useEffect(() => {
    const handleWindowClick = () => {
      setAnchorEl(undefined);
    };

    window.addEventListener('click', handleWindowClick, true);
    return () => {
      window.removeEventListener('click', handleWindowClick, true);
    };
  }, []);

  return (
    <>
      <Link
        onClick={(event) => {
          if (!page.link) {
            event.preventDefault();
            event.stopPropagation();
            handlePopoverOpen(event);
          }
        }}
        href={page.link || ''}
      >
        <button
          className={`hover:text-primary px-[30px] text-base ${activePageKey === page.key ? 'text-primary' : ''}`}
          key={page.key}
        >
          {t(page.key)}
        </button>
      </Link>
      <Popover
        open={open}
        transformOrigin={{
          vertical: -10,
          horizontal: 'center',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          boxShadow: 'none',
          pointerEvents: 'none',
        }}
        slotProps={{
          paper: {
            sx: {
              pointerEvents: 'auto',
              boxShadow: 'none',
              borderRadius: '30px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-primary-divider)',
              minWidth: 200,
            },
          },
        }}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex ${page.key === 'menu.product' ? 'flex-col' : ''} p-4`}
        >
          {page.children ? renderChildren(page.children) : null}
        </div>
      </Popover>
    </>
  );
}
