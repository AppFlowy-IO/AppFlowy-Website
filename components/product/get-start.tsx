import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import GetStartImage from '@/assets/images/product/get-start.png';

function GetStart() {
  return (
    <div className={'af-container bg-[#2B1A3F]'}>
      <div className={'af-box section-8'}>
        <div className={'section-8-title'}>
          <div>
            Get started for
            <span className={'text-[#C89AFA]'}> free</span>
          </div>
          <div className={'section-8-desc'}>Choose to own your data and a smarter way to work</div>
        </div>
        <div className={'section-8-btns'}>
          <Link className={'download-btn'} href={'/download'}>
            Download
          </Link>
        </div>
        <div className={'section-8-image'}>
          <Image src={GetStartImage} alt={''} width={734} height={460} />
        </div>
      </div>
    </div>
  );
}

export default GetStart;
