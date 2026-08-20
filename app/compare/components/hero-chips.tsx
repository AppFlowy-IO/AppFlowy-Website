import React from 'react';

function SparkleBurst() {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 16 16'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            className='shrink-0'
            aria-hidden
        >
            <line x1='11.20' y1='8.00' x2='15.40' y2='8.00' />
            <line x1='10.26' y1='10.26' x2='12.10' y2='12.10' />
            <line x1='8.00' y1='11.20' x2='8.00' y2='15.40' />
            <line x1='5.74' y1='10.26' x2='3.90' y2='12.10' />
            <line x1='4.80' y1='8.00' x2='0.60' y2='8.00' />
            <line x1='5.74' y1='5.74' x2='3.90' y2='3.90' />
            <line x1='8.00' y1='4.80' x2='8.00' y2='0.60' />
            <line x1='10.26' y1='5.74' x2='12.10' y2='3.90' />
        </svg>
    );
}

export function HeroChips({ items }: { items: string[] }) {
    return (
        <div className='relative z-[1] flex flex-wrap items-center justify-center gap-2 px-[5vw]'>
            {items.map((item) => (
                <span
                    key={item}
                    className='inline-flex items-center gap-2 rounded-full bg-primary/[0.06] px-4 py-2 font-inter text-sm font-medium leading-none text-primary'
                >
                    <SparkleBurst />
                    {item}
                </span>
            ))}
        </div>
    );
}
