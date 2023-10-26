import React from 'react';
import Downloading from '@/components/shared/downloading';
import '@/styles/downloading.scss';

function Page() {
  return <div className={'download-progress-page'}>{<Downloading />}</div>;
}

export default Page;
