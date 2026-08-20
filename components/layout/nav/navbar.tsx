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
import { useContactDialog } from '@/components/shared/contact-dialog-provider';

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
  // The drawer is an MUI modal with its own focus trap; opening the contact
  // dialog on top of it makes the form untypable. Queue it for after the
  // drawer's exit transition instead.
  const [contactSalesPending, setContactSalesPending] = useState(false);
  const { openContactDialog } = useContactDialog();

  const openContactSales = (source: string) => {
    collectEvent(EventName.navigatorContactSalesBtn, {
      type: 'click',
    });
    openContactDialog({ title: 'Contact sales', source });
  };

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
            variant={'outline'}
            size={'lg'}
            onClick={() => openContactSales('navbar')}
          >
            Contact sales
          </Button>
        </div>

        {/* Start for free Button */}
        <div
          ref={ref}
          className={'navbar-btn-download'}
        >
          <Button
            asChild
            size={'lg'}
            className={'rounded-lg bg-night-blue px-5 text-sm text-white transition-colors hover:bg-[#2C254C]'}
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
          onClick={() => {
            // Reopening cancels any queued contact-sales open from a
            // still-in-flight close, so it can't fire on a later,
            // unrelated close once the exit transition finally completes.
            setContactSalesPending(false);
            setOpenDrawer(true);
          }}
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
        onContactSales={() => {
          setContactSalesPending(true);
          setOpenDrawer(false);
        }}
        onExited={() => {
          if (!contactSalesPending) return;
          setContactSalesPending(false);
          openContactSales('mobile-drawer');
        }}
        open={openDrawer}
      />
    </nav>
  );
}

export default Navbar;
