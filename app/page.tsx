import '@/styles/home.scss';

import Index from '@/components/home';
import React from 'react';

export default function Home() {
  return (
    <div className='home-page'>
      <Index />

      <div className={'blur-bottom'} />
    </div>
  );
}
