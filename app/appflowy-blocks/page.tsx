import { Metadata } from 'next';
import React from 'react';
import { blocksPageConfig } from '@/lib/config/pages';
import '@/styles/blocks.scss';

import AppflowyBlocks from '@/components/blocks/appflowy-blocks';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${site_url}/appflowy-about`,
    },
  };
}

function Page() {
  return (
    <div className={'blocks-page'}>
      <div className={'ellipse'} />
      <div className={'title'}>
        {blocksPageConfig.title}
        <div className={'line'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 250 15"
            fill="none"
          >
            <path
              d="M2.19074 10.2774C17.3157 7.48174 52.0933 2.22644 70.2045 3.57083C88.3157 4.91522 69.9207 10.2064 58.4593 12.684C103.292 7.47885 204.017 -1.67495 248.251 3.35077"
              stroke="#9327FF"
              strokeWidth="3"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
      <div className={'desc'}>{blocksPageConfig.subtitle}</div>
      <AppflowyBlocks />
    </div>
  );
}

export default Page;
