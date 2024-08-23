'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CommunityImage1 from '@/assets/images/product/community-1.png';
import CommunityImage2 from '@/assets/images/product/community-2.png';

const Btn = () => {
  return (
    <div className={'flex h-6 w-6 items-center justify-center rounded-full bg-[#8427E0] p-1'}>
      <svg xmlns='http://www.w3.org/2000/svg' width='10' height='11' viewBox='0 0 10 11' fill='none'>
        <path
          d='M0.950195 1.44995H9.0502M9.0502 1.44995V9.54995M9.0502 1.44995L0.950195 9.54995'
          stroke='white'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
};

function Communities() {
  return (
    <>
      <div className={'community-content'}>
        <div className={'community-content-summary'}>
          <div className={'flex flex-col gap-4'}>
            <div className={'community-content-summary-title'}>Built by the community for the community</div>
            <div className={'community-content-summary-desc'}>
              We collaboratively create apps that suit others’ needs by developing a versatile toolbox of plugins,
              templates, and more. Join us to build a toolbox that empowers anyone to create their own system - play and
              tweak without limits.
            </div>
          </div>
          <Link href={'https://discord.gg/9Q2xaN37tV'} target={'_blank'} className={'community-btn'}>
            <div>Join Us</div>
            <Btn />
          </Link>
        </div>
        <div className={'community-content-image'}>
          <Image loading={'lazy'} src={CommunityImage1} alt={''} width={500} height={600} />
        </div>
      </div>
      <div className={'community-content'}>
        <div className={'community-content-image'}>
          <Image loading={'lazy'} src={CommunityImage2} alt={''} width={500} height={600} />
        </div>
        <div className={'community-content-summary'}>
          <div className={'flex flex-col gap-4'}>
            <div className={'community-content-summary-title'}>Do it yourself</div>
            <div className={'community-content-summary-desc'}>
              There isn’t a one size fit all solution and there shouldn’t be. Look for something unique? There’s no need
              to wait. Design and modify AppFlowy your way, and unlock endless possibilities.
            </div>
          </div>
          <Link
            href={'https://docs.appflowy.io/docs/essential-documentation/readme/welcome-to-appflowy'}
            target={'_blank'}
            className={'community-btn'}
          >
            <div>Developer Docs</div>
            <Btn />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Communities;
