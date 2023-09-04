import React from 'react';
import Introduce from '@/components/home/introduce';
import DiscoverAI from '@/components/home/discover-ai';
import DataSecurity from '@/components/home/data-security';
import MobileApplication from '@/components/home/mobile-application';
import Community from '@/components/home/community';

function Home() {
  return (
    <div className='w-full'>
      <Introduce />
      <DiscoverAI />
      <DataSecurity />
      <MobileApplication />
      <Community />
    </div>
  );
}

export default Home;
