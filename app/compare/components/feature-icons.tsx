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
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" color="#5317D5">
            <path d="M2.92241 10.9586C2 11.9171 2 13.4599 2 16.5455V18.4545C2 21.5401 2 23.0829 2.92241 24.0414C3.84483 25 5.32943 25 8.29864 25C11.2678 25 12.7525 25 13.6748 24.0414C14.5973 23.0829 14.5973 21.5401 14.5973 18.4545V16.5455C14.5973 13.4599 14.5973 11.9171 13.6748 10.9586C12.7525 10 11.2678 10 8.29864 10C5.32943 10 3.84483 10 2.92241 10.9586Z" stroke="#5317D5" stroke-width="2" />
            <path d="M7.37207 6C7.56726 5.35866 7.84999 4.8412 8.25952 4.40588C9.58218 3 11.7109 3 15.9685 3C20.226 3 22.3548 3 23.6774 4.40588C25.0001 5.81178 25.0001 8.07451 25.0001 12.6V15.4C25.0001 19.9254 25.0001 22.1883 23.6774 23.5941C22.6264 24.7114 21.0661 24.9407 18.333 24.9878" stroke="#5317D5" stroke-width="2" />
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
        </svg >
    );
}

export function CalendarIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#5317D5">
            <path d="M8.14286 4.6V3M15.8571 4.6V3M3 10.3333H21M3 12.1111C3 8.7589 3 7.0828 4.05441 6.0414C5.10884 5 6.80588 5 10.2 5H13.8C17.1941 5 18.8912 5 19.9456 6.0414C21 7.0828 21 8.7589 21 12.1111V13.8889C21 17.2411 21 18.9172 19.9456 19.9586C18.8912 21 17.1941 21 13.8 21H10.2C6.80588 21 5.10884 21 4.05441 19.9586C3 18.9172 3 17.2411 3 13.8889V12.1111Z" stroke="#5317D5" stroke-width="2" stroke-linecap="round" />
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

export type FeatureIconName = 'sparkle' | 'database' | 'layers' | 'server' | 'shield' | 'calendar';

export const FEATURE_ICONS: Record<FeatureIconName, () => React.JSX.Element> = {
    sparkle: SparkleIcon,
    database: DatabaseIcon,
    layers: LayersIcon,
    server: ServerIcon,
    shield: ShieldIcon,
    calendar: CalendarIcon,
};
