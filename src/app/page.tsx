import Introduce from '@/components/product/introduce';
import React from 'react';
import WikiDocsNote from '@/components/product/wiki-docs-note';
import Centralized from '@/components/product/centralized';
import EasyToUse from '@/components/product/easy-to-use';
import DiscoverAi from '@/components/product/discover-ai';
import DataSecurity from '@/components/product/data-security';
import Mobile from '@/components/product/mobile';
import Community from '@/components/product/community';
import GetStarted from '@/components/shared/get-started';

export default function Home() {
  return (
    <div className='w-full'>
      <Introduce />
      <WikiDocsNote />
      <Centralized />
      <EasyToUse />
      <DiscoverAi />
      <DataSecurity />
      <Mobile />
      <Community />
      <GetStarted />
    </div>
  );
}
