import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import Check from '@/components/icons/check';
import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

export type ComparisonValue = boolean | string;

export interface ComparisonPoint {
    text: string;
    competitor?: ComparisonValue;
    appflowy: ComparisonValue;
}

interface ComparisonTableProps {
    competitorName: string;
    competitorImage: StaticImageData;
    points: ComparisonPoint[];
}

function Cross() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 16 16' fill='none'>
            <path d='M4 4L12 12M12 4L4 12' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
        </svg>
    );
}

function Mark({ value, isAppFlowy }: { value: ComparisonValue; isAppFlowy: boolean }) {
    if (typeof value === 'string') {
        return (
            <p
                className={cn(
                    'font-inter text-center text-sm font-medium sm:text-base',
                    isAppFlowy ? 'text-primary' : 'text-[#9CA0AA]'
                )}
            >
                {value}
            </p>
        );
    }

    return (
        <div
            className={cn(
                'h-4 w-4 md:h-[18px] md:w-[18px]',
                value ? (isAppFlowy ? 'text-primary' : 'text-[#9CA0AA]') : 'text-[#D3D5DC]'
            )}
        >
            {value ? <Check /> : <Cross />}
        </div>
    );
}

export function ComparisonTable({ competitorName, competitorImage, points }: ComparisonTableProps) {
    return (
        <div className='flex w-full min-w-0 max-w-[1100px] flex-col'>
            {/* Header row */}
            <div className='flex w-full items-stretch'>
                <div className='flex w-1/2 items-center px-4 py-6 sm:px-6 md:px-8 md:py-8'>
                    <p className='font-inter text-base font-semibold text-[#101012] sm:text-lg'>Compare features</p>
                </div>
                <div className='flex w-1/4 flex-col items-center justify-center gap-2 rounded-t-[20px] bg-[#F5F4FC] px-2 py-6 sm:px-4 md:py-8'>
                    <Image src={AppFlowyImage} alt='AppFlowy' width={40} height={40} className='h-8 w-8 md:h-10 md:w-10' />
                    <p className='font-inter text-sm font-semibold text-[#101012] sm:text-base'>AppFlowy</p>
                </div>
                <div className='flex w-1/4 flex-col items-center justify-center gap-2 px-2 py-6 sm:px-4 md:py-8'>
                    <Image src={competitorImage} alt={competitorName} width={40} height={40} className='h-8 w-8 md:h-10 md:w-10' />
                    <p className='font-inter text-sm font-semibold text-[#101012] sm:text-base'>{competitorName}</p>
                </div>
            </div>

            {/* Rows */}
            <div className='divide-y divide-[#EDEDF2] border-t border-[#EDEDF2]'>
                {points.map((point, index) => {
                    const isLast = index === points.length - 1;

                    return (
                        <div key={point.text} className='flex w-full items-stretch'>
                            <div className='flex w-1/2 items-center px-4 py-4 sm:px-6 md:px-8 md:py-5'>
                                <p className='font-inter text-sm text-[#3A3A3D] sm:text-base'>{point.text}</p>
                            </div>
                            <div
                                className={cn(
                                    'flex w-1/4 items-center justify-center bg-[#F5F4FC] px-2 py-4 sm:px-4 md:py-5',
                                    isLast && 'rounded-b-[20px]'
                                )}
                            >
                                <Mark value={point.appflowy} isAppFlowy={true} />
                            </div>
                            <div className='flex w-1/4 items-center justify-center px-2 py-4 sm:px-4 md:py-5'>
                                <Mark value={point.competitor ?? false} isAppFlowy={false} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
