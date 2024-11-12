'use client';
import AllTemplatesLabel from '@/components/template-center/all-templates-label';
import Categories from '@/components/template-center/categories';
import Search from '@/components/template-center/search';
import { useClient } from '@/lib/hooks/use-client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { fixSidebarOnScroll } from '@/lib/fixedScroll';

function Sidebar() {
  const { isMobile } = useClient();
  const ref = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const headerHeight = document.querySelector('.appflowy-header')?.getBoundingClientRect().height || 68;
    const sidebar = sidebarRef.current;
    const container = ref.current;

    if (!sidebar || !container) return;
    const handleScroll = () => {
      fixSidebarOnScroll({
        sidebar,
        container,
        headerHeight,
        gap: 20,
      });
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return (
    <div
      ref={ref}
      className={'sidebar-container relative'}
      style={{
        minHeight: sidebarRef.current?.getBoundingClientRect().height,
      }}
    >
      <div className={'sidebar'} ref={sidebarRef}>
        <Search />
        <AllTemplatesLabel />
        <Categories />
        <div className={'sticky bottom-0 left-0 w-full bg-white py-2'}>
          <Link className={'w-full'} href={'https://share-template.appflowy.io'}>
            <button
              className={
                'live-demo-btn w-full whitespace-nowrap px-9 py-4 text-base font-medium max-xl:text-sm max-md:text-xs'
              }
            >
              Share your template
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Sidebar);

