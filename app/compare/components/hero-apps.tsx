import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface HeroAppsProps {
    competitorName: string;
    competitorImage: StaticImageData;
}

function AppLogo({ image, name, highlighted, isLabelAtEnd }: { image: StaticImageData; name: string; highlighted?: boolean, isLabelAtEnd?: boolean }) {
    return (
        <div className={`flex flex-col gap-4 ${isLabelAtEnd ? 'items-end' : 'items-start'}`}>
            <span
                className={`flex shrink-0 items-center justify-center rounded-2xl border p-3 ${highlighted ? 'border-[#8A2CE7]/15' : 'border-black/[0.06]'
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
                className={`text-center text-2xl uppercase font-bold ${highlighted ? 'text-primary' : 'text-[#9CA0AA]'} max-md:text-lg max-md:capitalize`}
            >
                {name}
            </span>
        </div>
    );
}

export function HeroApps({ competitorName, competitorImage }: HeroAppsProps) {
    return (
        <div className='relative z-[1] flex items-end justify-center gap-6 sm:gap-8'>
            <AppLogo image={AppFlowyImage} name='AppFlowy' highlighted isLabelAtEnd />
            <span className='pb-2 text-xl font-semibold text-text-primary sm:text-2xl'>vs</span>
            <AppLogo image={competitorImage} name={competitorName} />
        </div>
    );
}
