import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import TransparentIcons from '@/assets/images/transparent-icons.png';

function Community() {
  return (
    <div className={'h-fit w-full bg-[#2B1A3F]'}>
      <div className={'community'}>
        <div className={'image'}>
          <Image loading={'eager'} src={TransparentIcons} alt={''} quality={100} width={1555} height={430} />
        </div>
        <div className='glow'></div>
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
