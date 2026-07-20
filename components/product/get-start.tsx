'use client';
import logo from '@/assets/images/logo.svg';
import { webApplicationUrl } from '@/lib/web-application';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function GetStart() {
  return (
    <div className={'af-container section-8-container'}>
      <div className={'af-box section-8'}>
        <div className="glow" />
        <div className={'section-8-title'}>
          <div className={'section-8-logo'}>
            <Image src={logo} alt={'AppFlowy'} />
          </div>
          <h2 className={'text-h2'}>Get Started for Free</h2>
          <div className={'section-8-desc'}>
            The AI workspace where you achieve more without losing control of your data
          </div>
        </div>
        <div className={'section-8-btns'}>
          <Link
            className={'download-btn'}
            href={'https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production'}
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            Self-host AppFlowy
          </Link>
          <Link
            className={'live-demo-btn'}
            href={webApplicationUrl}
          >
            Get started free
          </Link>
        </div>
        <div className="circle-gradient"></div>
      </div>
    </div>
  );
}

export default GetStart;
