'use client';
import AllTemplatesLabel from '@/components/template-center/all-templates-label';
import Categories from '@/components/template-center/categories';
import Search from '@/components/template-center/search';
import { useClient } from '@/lib/hooks/use-client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

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
  );
}

export default React.memo(Sidebar);

function fixSidebarOnScroll({
  sidebar,
  container,
  headerHeight,
  gap,
}: {
  sidebar: HTMLElement;
  container: HTMLElement;
  headerHeight: number;
  gap: number;
}) {
  const containerRect = container.getBoundingClientRect();
  const sidebarRect = sidebar.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  const containerTop = containerRect.top + scrollTop;
  const containerBottom = containerRect.bottom + scrollTop;
  const sidebarHeight = sidebarRect.height;

  const maxTop = containerBottom - sidebarHeight - headerHeight - gap;
  const maxBottom = containerBottom - sidebarHeight - scrollTop;

  if (scrollTop + headerHeight + gap > containerTop) {
    if (scrollTop + headerHeight + gap < maxTop) {
      sidebar.style.position = 'fixed';
      sidebar.style.top = `${headerHeight + gap}px`;
    } else {
      sidebar.style.position = 'fixed';

      sidebar.style.top = `${Math.min(headerHeight + gap, maxBottom)}px`;
    }
  } else {
    sidebar.style.position = 'relative';
    sidebar.style.top = 'initial';
  }
}
