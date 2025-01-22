'use client';
import { useClient } from '@/lib/hooks/use-client';
import { webApplicationUrl } from '@/lib/web-application';
import Link from 'next/link';
import React from 'react';

function GetStart() {
  const { isMobile } = useClient();

  return (
    <div className={'af-container bg-[#2B1A3F]'}>
      <div className={'af-box section-8'}>
        <div className="glow"></div>
        <div className={'section-8-title'}>
          <div>
            Get started for
            <span className={'text-[#C89AFA]'}> free</span>
          </div>
          <div className={'section-8-desc'}>Choose to own your data and a smarter way to work</div>
        </div>
        <div className={'section-8-btns'}>
          <Link
            className={'download-btn'}
            href={'/download'}
          >
            Download
          </Link>
          {!isMobile && (
            <Link
              className={'live-demo-btn'}
              href={webApplicationUrl}
            >
              Try it free
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetStart;
