import { colorArray, stringToColor } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

function CreatorAvatar({ src, name }: { src: string; name: string }) {
  const creatorName = name.trim() || 'Template creator';
  const initial = Array.from(creatorName)[0].toUpperCase();

  return (
    <div
      className='avatar relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 text-sm font-medium text-white'
      style={{ backgroundColor: src ? '#FFFFFF' : stringToColor(creatorName, colorArray) }}
    >
      {src ? (
        <Image
          alt={`${creatorName} avatar`}
          className='object-contain p-2'
          fill
          sizes='40px'
          src={src}
          suppressHydrationWarning
        />
      ) : (
        <span aria-hidden='true'>{initial}</span>
      )}
    </div>
  );
}

export default CreatorAvatar;
