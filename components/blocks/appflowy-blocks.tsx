'use client';
import React, { useState } from 'react';
import { blocksPageConfig } from '@/lib/config/pages';
import Link from 'next/link';
import Image from 'next/image';

function AppflowyBlocks() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className={'appflowy-blocks'}>
      {blocksPageConfig.blocks.map((block, index) => (
        <Link
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          href={block.link}
          key={index}
          target={'_blank'}
          className={`appflowy-block ${hoverIndex === index ? 'selected' : ''}`}
        >
          <div className={`block-title`}>{block.title}</div>
          <div className={'block-desc'}>{block.desc}</div>
          <div className={'block-image relative aspect-video w-full'}>
            <div className={'absolute-image'}>
              <Image src={block.imageSrc} alt={block.imageAlt} width={block.imageWidth} height={block.imageHeight} />
            </div>
            <div className={'absolute-image dark-image'}>
              <Image src={block.imageDarkSrc} alt={block.imageAlt} width={block.imageWidth} height={block.imageHeight} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AppflowyBlocks;
