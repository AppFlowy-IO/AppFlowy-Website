import '@/styles/pricing.scss';
import ScrollLogos from '@/components/about/scroll-logos';
import PricingList from '@/components/pricing/pricing-list';
import Unlock from '@/components/pricing/unlock';
import React from 'react';

function Page () {
  return (
    <div className={'pricing-page'}>
      <div className={'title'}>
        Your work solution.
        <div className={'primary'}>
          Start free.
        </div>
      </div>
      <PricingList />

      <div className={'title'}>
        <span className={'primary'}>Unlock</span> unlimited AI power
      </div>
      <Unlock />
      <ScrollLogos />
    </div>
  );
}

export default Page;