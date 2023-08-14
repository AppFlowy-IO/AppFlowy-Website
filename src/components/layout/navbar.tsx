'use client';

import TopBar from '@/components/navbar/topbar';
import ResponsiveAppBar from '@/components/navbar/nav';
import { useClient } from '@/lib/hooks/use-client';
import useScroll from '@/lib/hooks/use-scroll';

export default function Navbar() {
  const { isClient } = useClient();

  const scrolled = useScroll(64);

  return (
    <div
      style={{
        boxShadow: scrolled ? '0px 6px 9px 0px #868D9F0D' : '',
      }}
      className={`navbar ${scrolled ? 'bg-bg' : ''} fixed left-0 top-0 z-30 flex w-screen flex-col justify-center`}
    >
      {isClient ? <TopBar /> : null}
      <ResponsiveAppBar scrolled={scrolled} />
    </div>
  );
}
