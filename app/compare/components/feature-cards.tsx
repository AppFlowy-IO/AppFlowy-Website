import React from 'react';

export interface FeatureCardItem {
    title: string;
    description: string;
}

interface FeatureCardsProps {
    items: FeatureCardItem[];
}

function SparkleIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none'>
            <path
                d='M12 3L13.7 9.3L20 11L13.7 12.7L12 19L10.3 12.7L4 11L10.3 9.3L12 3Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

function PieChartIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none'>
            <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.5' />
            <path d='M12 12V4M12 12L18.5 15.7' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

function LayersIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none'>
            <rect x='3' y='8' width='13' height='13' rx='3' stroke='currentColor' strokeWidth='1.5' strokeLinejoin='round' />
            <path
                d='M8 8V6a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-2'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

const ICONS = [SparkleIcon, PieChartIcon, LayersIcon];

export function FeatureCards({ items }: FeatureCardsProps) {
    return (
        <div className='flex w-full min-w-0 max-w-[1100px] flex-col gap-6 sm:flex-row'>
            {items.map((item, index) => {
                const Icon = ICONS[index % ICONS.length];

                return (
                    <div
                        key={item.title}
                        className='flex w-full flex-1 flex-col items-start gap-8 rounded-[20px] bg-white p-8 shadow-[0_2px_10px_rgba(16,16,18,0.05)]'
                    >
                        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-night-blue p-3 text-white sm:h-14 sm:w-14'>
                            <Icon />
                        </div>
                        <div className='flex flex-col gap-3 text-left'>
                            <h4 className='font-inter text-xl font-semibold leading-[120%] text-[#101012]'>{item.title}</h4>
                            <p className='font-inter text-base font-normal leading-[150%] text-[#58585A]'>{item.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
