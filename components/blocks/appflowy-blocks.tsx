'use client';
import React, { useContext, useState } from 'react';
import { blocksPageConfig } from '@/lib/config/pages';
import Link from 'next/link';
import Image from 'next/image';
import { DarkContext } from '@/lib/hooks/use-dark-context';

function AppflowyBlocks() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const dark = useContext(DarkContext);

  return (
    <div className={'appflowy-blocks'}>
      {blocksPageConfig.blocks.map((block, index) => (
        <Link
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          href={block.link}
          key={index}
          target={'_blank'}
          className={`block ${hoverIndex === index ? 'selected' : ''}`}
        >
          <div className={`block-title`}>{block.title}</div>
          <div className={'block-desc'}>{block.desc}</div>
          <div className={'block-image'}>
            <Image
              src={dark ? block.imageDarkSrc : block.imageSrc}
              alt={block.imageAlt}
              width={block.imageWidth}
              height={block.imageHeight}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AppflowyBlocks;
