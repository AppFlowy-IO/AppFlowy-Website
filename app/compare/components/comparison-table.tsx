'use client';

import Check from '@/components/icons/check';
import { cn } from '@/lib/utils';
import { StaticImageData } from 'next/image';
import * as Tooltip from '@radix-ui/react-tooltip';
import React from 'react';

export type ComparisonValue = boolean | string;

export interface ComparisonPoint {
    text: string;
    /** Optional tooltip copy shown via an info icon next to the label. */
    info?: string;
    competitor?: ComparisonValue;
    appflowy: ComparisonValue;
}

interface ComparisonTableProps {
    competitorName: string;
    competitorImage?: StaticImageData;
    points: ComparisonPoint[];
}

function Cross() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 16 16' fill='none'>
            <path d='M4 4L12 12M12 4L4 12' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
        </svg>
    );
}

function InfoIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 20 20' fill='none'>
            <path
                d='M10 13.5V9.3M3 10C3 11.8565 3.7375 13.637 5.05025 14.9497C6.36301 16.2625 8.14348 17 10 17C11.8565 17 13.637 16.2625 14.9497 14.9497C16.2625 13.637 17 11.8565 17 10C17 8.14348 16.2625 6.36301 14.9497 5.05025C13.637 3.7375 11.8565 3 10 3C8.14348 3 6.36301 3.7375 5.05025 5.05025C3.7375 6.36301 3 8.14348 3 10Z'
                stroke='currentColor'
                strokeLinecap='round'
            />
            <path
                d='M9.29999 7.2C9.29999 7.01435 9.37374 6.8363 9.50501 6.70503C9.63629 6.57375 9.81434 6.5 9.99999 6.5C10.1856 6.5 10.3637 6.57375 10.495 6.70503C10.6262 6.8363 10.7 7.01435 10.7 7.2C10.7 7.38565 10.6262 7.5637 10.495 7.69497C10.3637 7.82625 10.1856 7.9 9.99999 7.9C9.81434 7.9 9.63629 7.82625 9.50501 7.69497C9.37374 7.5637 9.29999 7.38565 9.29999 7.2Z'
                fill='currentColor'
            />
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

export function ComparisonTable({ competitorName, points }: ComparisonTableProps) {
    return (
        <Tooltip.Provider delayDuration={150}>
            <div className='mt-5 w-full max-w-[1100px] overflow-x-auto sm:overflow-visible'>
                <div className='flex min-w-[480px] flex-col sm:min-w-0'>
                    {/* Header row */}
                    <div className='flex w-full items-stretch'>
                        <div className='sticky left-0 z-10 flex w-1/2 items-center px-4 py-6 sm:static sm:px-6 md:px-8 md:py-8 max-md:bg-[#F9F9FC] max-md:rounded-t-[8px]'>
                            <p className='font-inter text-base font-semibold text-[#101012] sm:text-lg'>Compare features</p>
                        </div>
                        <div className='flex w-1/4 items-center justify-center rounded-t-[20px] bg-[#F5F4FC] px-2 py-6 sm:px-4 md:py-8 max-md:rounded-t-[8px]'>
                            <p className='font-inter text-sm font-semibold text-[#101012] sm:text-base'>AppFlowy</p>
                        </div>
                        <div className='flex w-1/4 items-center justify-center px-2 py-6 sm:px-4 md:py-8'>
                            <p className='font-inter text-sm font-semibold text-[#101012] sm:text-base'>{competitorName}</p>
                        </div>
                    </div>

                    {/* Rows */}
                    <div className='divide-y divide-[#EDEDF2] border-t border-[#EDEDF2]'>
                        {points.map((point, index) => {
                            const isLast = index === points.length - 1;

                            return (
                                <div key={point.text} className='flex w-full items-stretch'>
                                    <div className='sticky left-0 z-10 flex w-1/2 items-center px-5 py-4 sm:static sm:px-6 md:px-8 md:py-5 max-md:bg-[#F9F9FC]'>
                                        <p className='font-inter text-sm text-[#3A3A3D] sm:text-base'>{point.text}</p>
                                        {point.info && (
                                            <Tooltip.Root>
                                                <Tooltip.Trigger asChild>
                                                    <button
                                                        type='button'
                                                        className='ml-1.5 inline-flex shrink-0 cursor-help text-[#9CA0AA]'
                                                        aria-label='More info'
                                                    >
                                                        <InfoIcon />
                                                    </button>
                                                </Tooltip.Trigger>
                                                <Tooltip.Portal>
                                                    <Tooltip.Content
                                                        className='z-50 max-w-[260px] rounded-xl bg-white px-4 py-3 text-sm text-[#3A3A3D] shadow-[0_8px_24px_rgba(0,0,0,0.12)]'
                                                        sideOffset={8}
                                                    >
                                                        {point.info}
                                                        <Tooltip.Arrow className='fill-white' />
                                                    </Tooltip.Content>
                                                </Tooltip.Portal>
                                            </Tooltip.Root>
                                        )}
                                    </div>
                                    <div
                                        className={cn(
                                            'flex w-1/4 items-center justify-center bg-[#F5F4FC] px-2 py-4 sm:px-4 md:py-5',
                                            isLast && 'rounded-b-[20px] max-md:rounded-b-[8px]'
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
            </div>
        </Tooltip.Provider >
    );
}
