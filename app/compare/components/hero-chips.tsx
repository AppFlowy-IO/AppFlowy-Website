import { cn } from '@/lib/utils';
import React from 'react';

function SparkleDot() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none'>
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

export function HeroChips({ items }: { items: string[] }) {
    return (
        <div className='relative z-[1] flex flex-wrap items-center justify-center gap-2 px-[5vw]'>
            {items.map((item, index) => (
                <span
                    key={item}
                    className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-inter text-sm font-medium',
                        index === 0 ? 'bg-night-blue text-white' : 'bg-night-blue/10 text-night-blue'
                    )}
                >
                    <SparkleDot />
                    {item}
                </span>
            ))}
        </div>
    );
}
