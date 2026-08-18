import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface HeroAppsProps {
    competitorName: string;
    competitorImage: StaticImageData;
}

function AppLogo({
    image,
    name,
    highlighted,
}: {
    image: StaticImageData;
    name: string;
    highlighted?: boolean;
}) {
    return (
        <span
            className={
                highlighted
                    ? 'flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#8A2CE7]/15 bg-white shadow-[0_10px_40px_rgba(138,44,231,0.16)] sm:h-[72px] sm:w-[72px]'
                    : 'flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-black/[0.06] bg-white sm:h-[72px] sm:w-[72px]'
            }
        >
            <Image
                src={image}
                alt={name}
                width={40}
                height={40}
                className={
                    highlighted
                        ? 'h-9 w-9 shrink-0 sm:h-10 sm:w-10'
                        : 'h-9 w-9 shrink-0 opacity-75 grayscale sm:h-10 sm:w-10'
                }
            />
        </span>
    );
}

export function HeroApps({ competitorName, competitorImage }: HeroAppsProps) {
    return (
        <div className='relative z-[1] flex items-center justify-center gap-4 sm:gap-5'>
            <AppLogo image={AppFlowyImage} name='AppFlowy' highlighted />
            <AppLogo image={competitorImage} name={competitorName} />
        </div>
    );
}
