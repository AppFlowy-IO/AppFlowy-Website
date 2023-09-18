import React from 'react';
import '@/styles/about.scss';
import Missions from '@/components/about/missions';
import Community from '@/components/about/community';
import OurValues from '@/components/about/our-values';
import OurInvestors from '@/components/about/our-investors';

function Page() {
  return (
    <div className={'about'}>
      <Missions />
      <Community />
      <OurValues />
      <OurInvestors />
    </div>
  );
}

export default Page;
