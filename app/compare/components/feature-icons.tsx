import React from 'react';

export function SparkleIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' color='#5317D5'>
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

export function DatabaseIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' color='#5317D5'>
            <rect x='3' y='4' width='18' height='7' rx='2' stroke='currentColor' strokeWidth='1.5' />
            <rect x='3' y='13' width='18' height='7' rx='2' stroke='currentColor' strokeWidth='1.5' />
            <circle cx='7' cy='7.5' r='1' fill='currentColor' />
            <circle cx='7' cy='16.5' r='1' fill='currentColor' />
        </svg>
    );
}

export function LayersIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' color='#5317D5'>
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

export function ServerIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' color='#5317D5'>
            <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.5' />
            <path d='M3 12h18' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
            <path
                d='M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
}

export function ShieldIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' color='#5317D5'>
            <path
                d='M12 3L19 6V11C19 15.4 16.1 19 12 20.5C7.9 19 5 15.4 5 11V6L12 3Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinejoin='round'
            />
            <path d='M9 12L11 14L15 10' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

export type FeatureIconName = 'sparkle' | 'database' | 'layers' | 'server' | 'shield';

export const FEATURE_ICONS: Record<FeatureIconName, () => React.JSX.Element> = {
    sparkle: SparkleIcon,
    database: DatabaseIcon,
    layers: LayersIcon,
    server: ServerIcon,
    shield: ShieldIcon,
};
