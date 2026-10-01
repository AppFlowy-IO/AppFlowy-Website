import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

interface HeroAppsProps {
  competitorName: string;
  competitorImage: StaticImageData;
}

const knowledgeCompetitors = new Set(['Confluence', 'Docmost', 'Outline']);

function getRelatedResources(competitorName: string) {
  const workflowLink = knowledgeCompetitors.has(competitorName)
    ? {
        href: '/blog/knowledge-management',
        label: 'Explore knowledge management guides',
      }
    : {
        href: '/blog/project-management',
        label: 'Explore flexible project management guides',
      };

  return [
    {
      href: '/blog/alternatives',
      label: `Compare more ${competitorName} alternatives`,
    },
    workflowLink,
    {
      href: '/blog/self-hosting',
      label: 'Review self-hosting and data ownership guides',
    },
    {
      href: '/templates',
      label: 'Try AppFlowy workflows with free templates',
    },
  ];
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
          className={`h-13 w-13 object-contain ${highlighted ? '' : 'opacity-75 grayscale'} max-md:h-10 max-md:w-10`}
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
  const relatedResources = getRelatedResources(competitorName);

  return (
    <div className='relative z-[1] flex w-full flex-col gap-8'>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'AppFlowy alternatives', href: '/blog/alternatives' },
          { label: `AppFlowy vs ${competitorName}` },
        ]}
      />
      <div className='flex items-end justify-center gap-6 sm:gap-8'>
        <AppLogo image={AppFlowyImage} name='AppFlowy' highlighted isLabelAtEnd />
        <span className='pb-2 text-xl font-semibold text-text-primary sm:text-2xl'>vs</span>
        <AppLogo image={competitorImage} name={competitorName} />
      </div>
      <nav
        aria-label={`Related ${competitorName} alternative resources`}
        className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm'
      >
        {relatedResources.map((resource) => (
          <Link
            className='font-medium text-[#5D606B] underline decoration-[#CFC2EC] underline-offset-4 transition-colors hover:text-primary'
            href={resource.href}
            key={resource.href}
          >
            {resource.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
