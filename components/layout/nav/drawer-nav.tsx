'use client';

import Logo from '@/components/icons/logo';
import Close from '@/components/icons/close';
import { navigation, type Item } from '@/lib/config/navigation';
import { webApplicationUrl } from '@/lib/web-application';
import Drawer from '@mui/material/Drawer';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

const drawerWidth = '100vw';

interface DrawerNavbarProps {
  onClose: () => void;
  /** Asks the navbar to close the drawer and queue the contact dialog. */
  onContactSales?: () => void;
  /** Fired once the drawer has finished sliding out. */
  onExited?: () => void;
  activePageKey?: string;
  open: boolean;
}

function ToggleIcon({ expanded }: { expanded: boolean }) {
  return (
    <span className={'drawer-nav-toggle-icon'} aria-hidden>
      <span className={'drawer-nav-toggle-icon__horizontal'} />
      {!expanded ? <span className={'drawer-nav-toggle-icon__vertical'} /> : null}
    </span>
  );
}

function getItemLabel(item: Item) {
  if (item.key === 'self-host') {
    return 'Self-host AppFlowy';
  }

  if (item.key === '3' && item.name === 'Web app') {
    return 'Webapp';
  }

  return item.name;
}

function isExpandable(item: Item) {
  return Boolean(item.children?.length && (item.key === 'download' || item.key === 'resources'));
}

export default function DrawerNavbar({ onClose, onContactSales, onExited, activePageKey, open }: DrawerNavbarProps) {
  const [expanded, setExpanded] = useState<string>();
  const container = typeof window !== 'undefined' ? () => window.document.body : undefined;

  useEffect(() => {
    if (activePageKey && navigation.some((item) => item.key === activePageKey && isExpandable(item))) {
      setExpanded(activePageKey);
      return;
    }

    setExpanded(undefined);
  }, [activePageKey, open]);

  const resourceItem = useMemo(() => navigation.find((item) => item.key === 'resources'), []);
  const featuredResource = resourceItem?.children?.find((group) => group.key === 'featured')?.children?.[1];

  const resourceGroups = useMemo(
    () =>
      resourceItem?.children
        ?.filter((group) => group.key !== 'featured')
        .map((group) => {
          if (group.key === 'resources-group-1') {
            const orderedKeys = ['menu.updates', 'menu.templates', 'menu.newsletter'];
            return {
              ...group,
              children: orderedKeys
                .map((key) => group.children?.find((child) => child.key === key))
                .filter(Boolean) as Item[],
            };
          }

          return group;
        }) ?? [],
    [resourceItem],
  );

  const downloadGroups = useMemo(
    () => navigation.find((item) => item.key === 'download')?.children?.[0]?.children ?? [],
    [],
  );

  const topLevelItems = useMemo(
    () => navigation.filter((item) => ['product', 'download', 'resources', 'pricing', 'self-host'].includes(item.key)),
    [],
  );

  const renderTopLevelItem = (item: Item) => {
    const expandable = isExpandable(item);
    const isOpen = expanded === item.key;
    const label = getItemLabel(item);

    if (expandable) {
      return (
        <div key={item.key} className={'drawer-nav-section'}>
          <button
            type='button'
            className={`drawer-nav-row ${isOpen ? 'expanded' : ''}`}
            onClick={() => {
              setExpanded((value) => (value === item.key ? undefined : item.key));
            }}
          >
            <span className={'drawer-nav-row__label'}>{label}</span>
            <span className={'drawer-nav-row__action'}>
              <ToggleIcon expanded={isOpen} />
            </span>
          </button>
          {isOpen ? renderExpandedContent(item.key) : null}
        </div>
      );
    }

    return (
      <Link key={item.key} href={item.href ?? '/'} className={'drawer-nav-row'} onClick={onClose}>
        <span className={'drawer-nav-row__label'}>{label}</span>
      </Link>
    );
  };

  const renderDownloadMenu = () => (
    <div className={'drawer-nav-submenu-list'}>
      {downloadGroups.map((item) => (
        <Link
          key={item.key}
          href={item.href ?? '/download'}
          className={'drawer-nav-submenu-link'}
          onClick={onClose}
        >
          <span className={'drawer-nav-submenu-link__icon'}>{item.icon}</span>
          <span className={'drawer-nav-submenu-link__title'}>{getItemLabel(item)}</span>
        </Link>
      ))}
    </div>
  );

  const renderResourcesMenu = () => (
    <div className={'drawer-nav-resource-groups'}>
      {resourceGroups.map((group) => (
        <div key={group.key} className={'drawer-nav-resource-group'}>
          <div className={'drawer-nav-resource-group__title'}>{group.name}</div>
          <div className={'drawer-nav-resource-group__items'}>
            {group.children?.map((item) => (
              <Link
                key={item.key}
                href={item.href ?? '/resources'}
                className={'drawer-nav-resource-link'}
                onClick={onClose}
              >
                <span className={'drawer-nav-resource-link__icon'}>{item.icon}</span>
                <span className={'drawer-nav-resource-link__content'}>
                  <span className={'drawer-nav-resource-link__title'}>{getItemLabel(item)}</span>
                  {item.desc ? <span className={'drawer-nav-resource-link__desc'}>{item.desc}</span> : null}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
      {featuredResource?.image ? (
        <Link
          href={featuredResource.href ?? '/resources'}
          className={'drawer-nav-resource-banner'}
          onClick={onClose}
          style={{ backgroundImage: `url(${featuredResource.image.src})` }}
        >
          <span className={'drawer-nav-resource-banner__overlay'} />
          <span className={'drawer-nav-resource-banner__content'}>
            <span className={'drawer-nav-resource-banner__title'}>Self-hosting with AppFlowy Cloud</span>
            <span className={'drawer-nav-resource-banner__indicators'} aria-hidden>
              <span className={'active'} />
              <span />
              <span />
            </span>
          </span>
        </Link>
      ) : null}
    </div>
  );

  const renderExpandedContent = (key: string) => {
    if (key === 'download') {
      return renderDownloadMenu();
    }

    if (key === 'resources') {
      return renderResourcesMenu();
    }

    return null;
  };

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
        keepMounted: true,
      }}
      SlideProps={{
        onExited,
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <div className={'appflowy-drawer-nav text-black'}>
        <div className={'header'}>
          <Link href='/' className={'logo'} onClick={onClose}>
            <Logo />
          </Link>

          <button type='button' className={'drawer-nav-close-btn'} aria-label='Close menu' onClick={onClose}>
            <Close />
          </button>
        </div>
        <div className={'content'}>
          <div className={'drawer-nav-panel'}>
            <div className={'drawer-nav-main'}>{topLevelItems.map(renderTopLevelItem)}</div>
            <div className={'drawer-nav-actions'}>
              <Link href={webApplicationUrl} className={'drawer-nav-actions__primary'} onClick={onClose}>
                Start for free
              </Link>
              <button type='button' className={'drawer-nav-actions__secondary'} onClick={onContactSales}>
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
