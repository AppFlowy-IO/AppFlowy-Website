'use client';

import React, { useState, useCallback } from 'react';
import ScrollFillText from '@/components/shared/scroll-fill-text';

const FEATURES = [
    // row 1
    {
        id: 'ai-search',
        label: 'AI Search',
        pricePerYear: 420,
    },
    {
        id: 'ai-writing',
        label: 'AI Writing Assistant',
        pricePerYear: 240,
    },
    {
        id: 'ai-chatbot',
        label: 'AI Chatbot',
        pricePerYear: 240,
    },
    {
        id: 'ai-research',
        label: 'AI Research',
        pricePerYear: 480,
    },
    // row 2
    {
        id: 'ai-meeting',
        label: 'AI Meeting Notes',
        pricePerYear: 216,
    },
    {
        id: 'project-management',
        label: 'Project Management Tool',
        pricePerYear: 288,
    },
    {
        id: 'documentation',
        label: 'Documentation',
        pricePerYear: 240,
    },
    {
        id: 'crm',
        label: 'Basic CRM',
        pricePerYear: 240,
    },
    // row 3
    {
        id: 'team-wiki',
        label: 'Team Wiki',
        pricePerYear: 120,
    },
    {
        id: 'databases',
        label: 'Databases',
        pricePerYear: 240,
    },
    {
        id: 'site-builder',
        label: 'Site Builder',
        pricePerYear: 240,
    },
    {
        id: 'forms',
        label: 'Forms',
        pricePerYear: 180,
    },
] as const;

// Filter out hidden entries for rendering
const VISIBLE_FEATURES = FEATURES.filter((f) => !('hidden' in f && (f as { hidden?: boolean }).hidden));

// AppFlowy price per user per year
const APPFLOWY_PRICE_PER_USER_YEAR = 120;

// ─── Helper ──────────────────────────────────────────────────────────────────
function formatDollars(value: number): string {
    if (value >= 1000) {
        return `$${(value / 1000).toFixed(0).replace(/\.0$/, '')}k`;
    }

    return `$${Math.round(value).toLocaleString()}`;
}

// ─── Savings Amount ───────────────────────────────────────────────────────────
function SavingsAmount({ value, active }: { value: number; active: boolean }) {
    return (
        <div
            className={`font-inter text-[40px] leading-[48px] sm:text-[60px] font-semibold sm:leading-[72px] tracking-[-1px] transition-all duration-300 sm:text-[60px] sm:leading-[72px] ${active ? 'text-white' : 'text-white/25'
                }`}
        >
            {active ? formatDollars(value) : '$0'}
        </div>
    );
}

// ─── Checkbox Component ───────────────────────────────────────────────────────
interface FeatureCheckboxProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (id: string, checked: boolean) => void;
}

function FeatureCheckbox({ id, label, checked, onChange }: FeatureCheckboxProps) {
    return (
        <button
            id={`feature-checkbox-${id}`}
            role="checkbox"
            aria-checked={checked}
            onClick={() => onChange(id, !checked)}
            className={`group flex w-full items-center justify-between gap-3 rounded-[10px] border px-4 py-4 text-left transition-all duration-200 select-none touch-manipulation cursor-pointer ${checked
                ? 'border-text-tertiary bg-white'
                : 'border-white bg-white hover:border-[#101012]/25 hover:shadow-sm'
                }`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
        >
            <span
                className={`text-font-size-body-standard font-medium transition-colors ${checked ? 'text-[#101012]' : 'text-[#4A4A5A]'
                    }`}
            >
                {label}
            </span>
            {/* Custom circle checkbox */}
            <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${checked
                    ? 'border-[#101012] bg-[#101012]'
                    : 'border-[rgba(213,215,222,0.80)] bg-transparent group-hover:border-[#101012]/40'
                    }`}
            >
                {checked && (
                    <svg width="10" height="8" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 5L4.5 8.5L11 1.5"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>
        </button>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function PricingCalculator() {
    // Select all available options by default
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        new Set(VISIBLE_FEATURES.map((f) => f.id))
    );
    const [teamSize, setTeamSize] = useState<number>(100);

    const handleFeatureChange = useCallback((id: string, checked: boolean) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);

            if (checked) next.add(id);
            else next.delete(id);
            return next;
        });
    }, []);

    // ── Savings calculation ──────────────────────────────────────────────────
    // We sum up the benchmark price of each selected capability. For AI features
    // the benchmark is charged only ONCE regardless of how many AI features are
    // ticked, because a single AI tool subscription covers all of them.
    const selectedFeatures = VISIBLE_FEATURES.filter((f) => selectedIds.has(f.id));

    let estimatedMarketCostPerUserYear = 0;

    for (const f of selectedFeatures) {
        estimatedMarketCostPerUserYear += f.pricePerYear;
    }

    const estimatedMarketCostYear = estimatedMarketCostPerUserYear * teamSize;
    const appflowyTotalYear = APPFLOWY_PRICE_PER_USER_YEAR * teamSize;

    const annualSavings = Math.max(0, estimatedMarketCostYear - appflowyTotalYear);
    const monthlySavings = Math.round(annualSavings / 12);

    const hasSelection = selectedIds.size > 0;

    return (
        <section className='w-full bg-[#F6F6FF] flex justify-center'>
            <div className="mx-auto w-full max-w-[1440px] items-center px-[80px] py-[120px] max-xl:px-[4vw]  max-lg:items-start">
                <div>
                    {/* Section Header */}
                    <div className="mb-10 sm:mb-12 lg:mb-14">
                        <h2 className="text-style-h1 font-bold">
                            <ScrollFillText>More productivity, fewer tools</ScrollFillText>
                        </h2>
                        <p className="mt-2 text-style-h5 text-text-secondary font-normal">
                            Bring your teams and workflows into one AI workspace. Move faster and cut costs without constantly switching between tools.
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {VISIBLE_FEATURES.map((feature) => (
                            <FeatureCheckbox
                                key={feature.id}
                                id={feature.id}
                                label={feature.label}
                                checked={selectedIds.has(feature.id)}
                                onChange={handleFeatureChange}
                            />
                        ))}
                    </div>

                    {/* Results Panel */}
                    <div
                        className="mt-6 overflow-hidden rounded-2xl"
                        style={{ background: 'linear-gradient(135deg, #1A1225 0%, #0F0A1A 100%)' }}
                    >
                        <div className="flex flex-col gap-8 p-6 sm:p-12 lg:flex-row lg:items-center lg:gap-0">
                            {/* Team Size Control */}
                            <div className="flex-1 lg:border-white/10 lg:pr-8">
                                <div className="mb-5 flex flex-col gap-6 max-lg:mb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
                                    <span className="text-xl font-medium text-text-inverse max-lg:text-2xl">Team size</span>
                                    {/* +/- controls */}
                                    <div className="flex items-center gap-4 max-lg:w-full max-lg:justify-between">
                                        <button
                                            id="team-size-decrease"
                                            aria-label="Decrease team size"
                                            onClick={() => setTeamSize((v) => Math.max(1, v - 1))}
                                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-white/50 hover:bg-white/10 active:scale-95 select-none touch-manipulation"
                                            style={{ WebkitTapHighlightColor: 'transparent' }}
                                        >
                                            <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
                                                <path d="M1 1H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                        <span className="min-w-[3ch] text-center text-[24px] leading-[28px] font-semibold text-white ">
                                            {teamSize}
                                        </span>
                                        <button
                                            id="team-size-increase"
                                            aria-label="Increase team size"
                                            onClick={() => setTeamSize((v) => Math.min(1000, v + 1))}
                                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-white/50 hover:bg-white/10 active:scale-95 select-none touch-manipulation"
                                            style={{ WebkitTapHighlightColor: 'transparent' }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M6 1V11M1 6H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Slider */}
                                <div className="relative">
                                    <input
                                        id="team-size-slider"
                                        type="range"
                                        min={1}
                                        max={1000}
                                        value={teamSize}
                                        onChange={(e) => setTeamSize(Number(e.target.value))}
                                        className="pricing-calculator-slider w-full cursor-pointer appearance-none"
                                        style={{
                                            height: '4px',
                                            borderRadius: '9999px',
                                            background: `linear-gradient(to right, #a76de1 0%, #8427E0 ${teamSize / 10}%, rgba(255,255,255,0.15) ${teamSize / 10}%, rgba(255,255,255,0.15) 100%)`,
                                            outline: 'none',
                                        }}
                                    />
                                    <div className="mt-3 flex justify-between">
                                        <span className="text-sm text-text-tertiary">1 user</span>
                                        <span className="text-sm text-text-tertiary">500 users</span>
                                        <span className="text-sm text-text-tertiary">1000 users</span>
                                    </div>
                                </div>
                            </div>

                            {/* Savings Display */}
                            <div className="flex flex-1 items-center justify-around max-lg:flex-col max-lg:items-start max-lg:justify-start max-lg:gap-8 max-lg:border-t max-lg:border-dashed max-lg:border-white/20 max-lg:pt-8 lg:pl-8">
                                {/* Monthly */}
                                <div className="text-left">
                                    <SavingsAmount value={monthlySavings} active={hasSelection} />
                                    <div className="mt-2 text-style-h5 font-normal text-white/50">Monthly savings</div>
                                </div>

                                {/* Annual */}
                                <div className="text-left">
                                    <SavingsAmount value={annualSavings} active={hasSelection} />
                                    <div className="mt-2 text-style-h5 font-normal text-white/50">Annual savings</div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </section>
    );
}
