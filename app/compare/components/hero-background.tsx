import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface HeroIconGridProps {
    competitorName: string;
    competitorImage: StaticImageData;
}

function AppPill({ image, name }: { image: StaticImageData; name: string }) {
    return (
        <div className='flex h-[52px] shrink-0 items-center gap-2.5 rounded-full bg-white px-4 shadow-[0_8px_24px_rgba(20,15,40,0.08)] sm:h-16 sm:gap-3 sm:px-5'>
            <Image src={image} alt={name} width={40} height={40} className='h-7 w-7 shrink-0 sm:h-10 sm:w-10' />
            <span className='whitespace-nowrap font-inter text-sm font-semibold text-[#101012] sm:text-base'>{name}</span>
        </div>
    );
}

function Shell() {
    return <div className='h-14 w-14 shrink-0 rounded-2xl bg-white/70 sm:h-[72px] sm:w-[72px]' />;
}

export function HeroGlow() {
    return (
        <div
            aria-hidden
            className='pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1400px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(140,120,255,0.35)_0%,rgba(140,120,255,0)_65%)] blur-3xl'
        />
    );
}

export function HeroIconGrid({ competitorName, competitorImage }: HeroIconGridProps) {
    return (
        <div
            aria-hidden
            className='relative z-[1] flex flex-col items-center gap-3 sm:gap-4'
            style={{
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 35%, black 100%)',
                maskImage: 'linear-gradient(to bottom, transparent, black 35%, black 100%)',
            }}
        >
            <div className='flex items-center gap-3 sm:gap-4'>
                <Shell />
                <Shell />
                <Shell />
                <Shell />
                <Shell />
            </div>
            <div className='flex items-center gap-3 sm:gap-4'>
                <Shell />
                <AppPill image={AppFlowyImage} name='AppFlowy' />
                <AppPill image={competitorImage} name={competitorName} />
                <Shell />
            </div>
        </div>
    );
}
