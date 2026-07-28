'use client';
import { webApplicationUrl } from '@/lib/web-application';
import React, { useEffect, useMemo, useState } from 'react';
import Logo from '@/components/icons/logo';
import { navigation } from '@/lib/config/navigation';
import Link from 'next/link';
// import GithubBtn from '@/components/shared/github-btn';
import { Button } from '@/components/ui/button';
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
        <Link
          href={'/'}
          className={'logo text-black dark:text-white'}
        >
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
            isPopoverOpen={item.key === popoverType && anchorEl !== undefined}
          />
        ))}
      </div>
      <div className={'navbar-right flex items-center'}>
        {/* Star Button */}
        {/* <div className={'navbar-btn-github'}>
          <GithubBtn />
        </div> */}

        {/* Contact Sales Button */}
        <div className={'max-lg:hidden'}>
          <Button
            asChild
            className={'h-9 rounded-lg border border-[#E6E6E6] bg-white px-4 text-sm text-night-blue shadow-none transition-colors hover:bg-light-gray'}
          >
            <Link
              href={'/contact'}
              onClick={() => {
                collectEvent(EventName.navigatorContactSalesBtn, {
                  type: 'click',
                });
              }}
            >
              Contact Sales
            </Link>
          </Button>
        </div>

        {/* Start for free Button */}
        <div
          ref={ref}
          className={'navbar-btn-download'}
        >
          <Button
            asChild
            className={'h-9 rounded-lg bg-night-blue px-4 text-sm text-white transition-colors hover:bg-night-blue/90'}
          >
            <Link
              onClick={() => {
                collectEvent(EventName.navigatorStartForFreeBtn, {
                  type: 'click',
                });
              }}
              href={webApplicationUrl}
            >
              Start for free
            </Link>
          </Button>
        </div>
        <span
          onClick={() => setOpenDrawer(true)}
          className={'trigger-btn'}
        >
          <Menu />
        </span>
      </div>
      <NavbarPopover
        type={popoverType}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        debounceClose={debounceClose}
      />
      <DrawerNavbar
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      />
    </nav>
  );
}

export default Navbar;
