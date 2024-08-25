import React from 'react';
import Link from 'next/link';

function Community() {
  return (
    <div className={'h-fit w-full bg-[#2B1A3F]'}>
      <div className={'community'}>
        <div className={'community-title'}>Community Template</div>
        <div className={'community-description'}>
          Submit your template to the AppFlowy template marketplace, and after review by our moderators, they will be
          made available or even featured.
        </div>
        <Link href={'https://share-template.appflowy.io'}>
          <button className={'download-btn'}>Share your template</button>
        </Link>
      </div>
    </div>
  );
}

export default Community;
