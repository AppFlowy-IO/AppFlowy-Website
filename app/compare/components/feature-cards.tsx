import React from 'react';
import { FEATURE_ICONS, FeatureIconName } from './feature-icons';

export interface FeatureCardItem {
    icon: FeatureIconName;
    title: string;
    description: string;
}

interface FeatureCardsProps {
    items: FeatureCardItem[];
}

export function FeatureCards({ items }: FeatureCardsProps) {
    return (
        <div className='flex w-full min-w-0 max-w-[960px] flex-col gap-4 sm:flex-row'>
            {items.map((item) => {
                const Icon = FEATURE_ICONS[item.icon];

                return (
                    <div
                        key={item.title}
                        className='flex min-h-[320px] w-full flex-1 flex-col items-start gap-[60px] rounded-2xl bg-white p-7 '
                    >
                        <div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[rgba(133,76,255,0.08)] p-3 text-primary'>
                            <Icon />
                        </div>
                        <div className='flex flex-col gap-2 text-left'>
                            <h4 className='font-inter text-2xl font-medium leading-7 text-[#140F28]'>{item.title}</h4>
                            <p className='font-inter text-base font-normal leading-6 text-[#5A5A5A]'>{item.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
