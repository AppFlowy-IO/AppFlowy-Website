import NotionTertiaryImage from '@/assets/images/vs-notion/notion-tertiary.svg';
import ConfluenceTertiaryImage from '@/assets/images/vs-notion/confluence-tertiary.svg';
import AFFiNETertiaryImage from '@/assets/images/vs-notion/affine-tertiary.svg';
import DocmostTertiaryImage from '@/assets/images/vs-notion/docmost-tertiary.svg';
import OutlineTertiaryImage from '@/assets/images/vs-notion/outline-tertiary.svg';
import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

const competitorHeroImages: Record<string, StaticImageData> = {
  Notion: NotionTertiaryImage,
  Confluence: ConfluenceTertiaryImage,
  AFFiNE: AFFiNETertiaryImage,
  Docmost: DocmostTertiaryImage,
  Outline: OutlineTertiaryImage,
};

interface HeroAppsProps {
  competitorName: string;
  competitorImage: StaticImageData;
}

function AppLogo({
  image,
  name,
  highlighted,
  isLabelAtEnd,
}: {
  image: StaticImageData;
  name: string;
  highlighted?: boolean;
  isLabelAtEnd?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-4 ${isLabelAtEnd ? 'items-end' : 'items-start'}`}>
      <span
        className={`flex shrink-0 items-center justify-center rounded-2xl border p-3 ${
          highlighted ? 'border-[#8A2CE7]/15' : 'border-black/[0.06]'
        } bg-white max-md:p-2`}
      >
        <Image
          src={image}
          alt={name}
          width={52}
          height={52}
          className='h-13 w-13 object-contain max-md:h-10 max-md:w-10'
        />
      </span>
      <span
        className={`text-center text-2xl font-bold uppercase ${
          highlighted ? 'text-primary' : 'text-[#9CA0AA]'
        } max-md:text-lg max-md:capitalize`}
      >
        {name}
      </span>
    </div>
  );
}

export function HeroApps({ competitorName, competitorImage }: HeroAppsProps) {
  return (
    <div className='relative z-[1] flex w-full flex-col gap-8'>
      <div className='flex items-center justify-center gap-6 sm:gap-8'>
        <AppLogo image={AppFlowyImage} name='AppFlowy' highlighted isLabelAtEnd />
        <span className='text-xl font-semibold text-text-primary sm:text-[28px] sm:leading-9'>vs</span>
        <AppLogo image={competitorHeroImages[competitorName] || competitorImage} name={competitorName} />
      </div>
    </div>
  );
}
