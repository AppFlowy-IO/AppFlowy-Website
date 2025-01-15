'use client';
import { WEB_URL } from '@/lib/config/web';
import React, { useEffect, useMemo, useState } from 'react';
import Logo from '@/components/icons/logo';
import { navigation } from '@/lib/config/navigation';
import Link from 'next/link';
import GithubBtn from '@/components/shared/github-btn';
import useScroll from '@/lib/hooks/use-scroll';
import debounce from 'lodash-es/debounce';
import NavbarItem from '@/components/layout/nav/navbar-item';
import NavbarPopover from '@/components/layout/nav/navbar-popover';
import Menu from '@/components/icons/menu';
import DrawerNavbar from '@/components/layout/nav/drawer-nav';
import { collectEvent, EventName } from '@/lib/collect';
import { useInView } from 'framer-motion';

const closeDuration = 200;

function Navbar() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
  });
  const scrolled = useScroll();
  const [popoverType, setPopoverType] = useState<string | undefined>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | undefined>();
  const debounceClose = useMemo(() => debounce(() => setAnchorEl(undefined), closeDuration), []);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (!inView) return;
    collectEvent(EventName.navigatorStartForFreeBtn, {
      type: 'view',
    });
  }, [inView]);
  return (
    <nav className={`appflowy-navbar ${scrolled ? 'sticky' : ''}`}>
      {/* Logo */}
      <div className={'logo-wrapper'}>
        <Link href={'/'} className={'logo text-black dark:text-white'}>
          <Logo />
        </Link>
      </div>

      {/* Navigation */}
      <div className={'navigation'}>
        {navigation.map((item) => (
          <NavbarItem
            item={item}
            onMouseEnter={(e) => {
              debounceClose.cancel();
              setPopoverType(item.key);
              setAnchorEl(e.currentTarget);
            }}
            onMouseLeave={debounceClose}
            key={item.key}
          />
        ))}
      </div>
      <div className={'navbar-right'}>
        {/* Star Button */}
        <div className={'navbar-btn-github'}>
          <GithubBtn />
        </div>

        {/* Star for free Button */}
        <div ref={ref} className={'navbar-btn-download'}>
          <Link
            onClick={() => {
              collectEvent(EventName.navigatorStartForFreeBtn, {
                type: 'click',
              });
            }}
            href={WEB_URL}
          >
            <button className={'download-btn download-free-btn'}>{'Start for free'}</button>
          </Link>
        </div>
        <span onClick={() => setOpenDrawer(true)} className={'trigger-btn'}>
          <Menu />
        </span>
      </div>
      <NavbarPopover type={popoverType} anchorEl={anchorEl} setAnchorEl={setAnchorEl} debounceClose={debounceClose} />
      <DrawerNavbar onClose={() => setOpenDrawer(false)} open={openDrawer} />
    </nav>
  );
}

export default Navbar;
