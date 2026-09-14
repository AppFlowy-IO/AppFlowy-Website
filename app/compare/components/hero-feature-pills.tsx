import Check from '@/components/icons/check';
import React from 'react';

interface HeroFeaturePillsProps {
    items: string[];
    className?: string;
}

const ITEMS_PER_ROW = 4;

export function HeroFeaturePills({ items, className }: HeroFeaturePillsProps) {
    const rows: string[][] = [];

    for (let i = 0; i < items.length; i += ITEMS_PER_ROW) {
        rows.push(items.slice(i, i + ITEMS_PER_ROW));
    }

    return (
        <div className={`flex flex-col items-center mb-5 gap-3 ${className ?? ''}`}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className='flex flex-wrap items-center justify-center gap-3'>
                    {row.map((item) => (
                        <span
                            key={item}
                            className='flex items-center gap-2 rounded-full bg-[#854CFF]/[0.06] px-4 py-3 text-sm font-medium text-[#5317D5] sm:text-base max-md:font-normal max-md:text-xs max-md:px-3 max-md:py-2'
                        >
                            <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#854CFF]/[0.1] p-1 text-[#854CFF]'>
                                <Check />
                            </span>
                            {item}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}
