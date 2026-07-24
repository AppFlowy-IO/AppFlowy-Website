'use client';

import React, { useState, useCallback } from 'react';

// ─── Feature Data ────────────────────────────────────────────────────────────
// METHODOLOGY: Each capability is assigned a single curated benchmark price
// derived from the annual per-user cost of *dedicated, specialist* SaaS tools
// for that capability only. Multi-feature platforms (Notion, ClickUp, Asana,
// Monday, etc.) are deliberately excluded from individual capability benchmarks
// because attributing a platform's full subscription price to a single feature
// would double-count their cost across capabilities.
//
// AI features (Search, Meeting Notes, Writing, Research, Chatbot) are grouped
// under a single "ai" group. When a user selects any combination of AI features,
// the AI benchmark is counted only ONCE — reflecting that a single AI assistant
// subscription covers all of these capabilities.
//
// Sources (all per user / per year, publicly listed):
//   AI capability  → Granola $420, Fireflies $468, Read AI $357 (dedicated AI tools)
//   Team Wiki      → Confluence $156, XWiki $84, Slab $180 (dedicated wikis)
//   Site Builder   → Wix $468 (dedicated site-builder)
//   Project Mgmt   → JIRA $166, Asana $228, Trello $210, Wrike $297 (dedicated PM)
//   Basic CRM      → Salesforce $300 (dedicated CRM)
//   Forms          → Typeform $218, Tally $177 (dedicated form tools)

// Dedicated AI assistant tools only (Granola, Fireflies, Read AI)
const AI_BENCHMARK = 400 // $415
const TEAM_WIKI_BENCHMARK = 140 // Confluence $156, XWiki $84, Slab $180 — dedicated wikis only -> $140
const CRM_BENCHMARK = 280 // Salesforce Starter — the canonical dedicated CRM benchmark
const SITE_BUILDER_BENCHMARK = 350 // Wix Business — dedicated site-builder
const PROJECT_MANAGEMENT_BENCHMARK = 200 // JIRA $166, Asana $228, Trello $210, Wrike $297 — dedicated PM tools
const FORMS_BENCHMARK = 175 // Typeform $218, Tally $177 — dedicated form tools (free-tier outliers excluded)

const FEATURES = [
    // row 1
    {
        id: 'ai-search',
        label: 'AI Search',
        pricePerYear: AI_BENCHMARK,
        group: 'ai',
    },
    {
        id: 'ai-writing',
        label: 'AI Writing Assistant',
        pricePerYear: AI_BENCHMARK,
        group: 'ai',
    },
    {
        id: 'ai-chatbot',
        label: 'AI Chatbot',
        pricePerYear: AI_BENCHMARK,
        group: 'ai',
    },
    {
        id: 'team-wiki',
        label: 'Team Wiki',
        pricePerYear: TEAM_WIKI_BENCHMARK,
        group: 'standalone',
    },
    // row 2
    {
        id: 'ai-meeting',
        label: 'AI Meeting Notes',
        pricePerYear: AI_BENCHMARK,
        group: 'ai',
    },
    {
        id: 'ai-research',
        label: 'AI Research',
        pricePerYear: AI_BENCHMARK,
        group: 'ai',
    },
    {
        id: 'crm',
        label: 'Basic CRM',
        pricePerYear: CRM_BENCHMARK,
        group: 'standalone',
    },
    // row 3
    {
        id: 'site-builder',
        label: 'Site Builder',
        pricePerYear: SITE_BUILDER_BENCHMARK,
        group: 'standalone',
    },
    {
        id: 'project-management',
        label: 'Project Management Tool',
        pricePerYear: PROJECT_MANAGEMENT_BENCHMARK,
        group: 'standalone',
    },
    {
        id: 'forms',
        label: 'Forms',
        pricePerYear: FORMS_BENCHMARK,
        group: 'standalone',
    },
] as const;

// Filter out hidden entries for rendering
const VISIBLE_FEATURES = FEATURES.filter((f) => !('hidden' in f && (f as { hidden?: boolean }).hidden));

// AppFlowy price per user per year
const APPFLOWY_PRICE_PER_USER_YEAR = 120;

// ─── Helper ──────────────────────────────────────────────────────────────────
function formatDollars(value: number): string {
    if (value >= 1000) {
        return `$${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return `$${Math.round(value).toLocaleString()}`;
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
            className={`pricing-calculator-checkbox group ${checked ? 'checked' : ''}`}
        >
            <span className="pricing-calculator-checkbox__label">
                {label}
            </span>
            {/* Custom circle checkbox */}
            <span className="pricing-calculator-checkbox__circle">
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
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        new Set(['project-management', 'team-wiki'])
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
    let hasAiFeature = false;

    for (const f of selectedFeatures) {
        if (f.group === 'ai') {
            if (!hasAiFeature) {
                estimatedMarketCostPerUserYear += f.pricePerYear; // AI counted once
                hasAiFeature = true;
            }
        } else {
            estimatedMarketCostPerUserYear += f.pricePerYear;
        }
    }

    const estimatedMarketCostYear = estimatedMarketCostPerUserYear * teamSize;
    const appflowyTotalYear = APPFLOWY_PRICE_PER_USER_YEAR * teamSize;

    const annualSavings = Math.max(0, estimatedMarketCostYear - appflowyTotalYear);
    const monthlySavings = Math.round(annualSavings / 12);

    const hasSelection = selectedIds.size > 0;

    return (
        <section className="pricing-calculator-section">
            <div className="pricing-calculator-inner">
                <div className="pricing-calculator-content">
                    {/* Section Header */}
                    <div className="pricing-calculator-header">
                        <h2>
                            More productivity, fewer tools
                        </h2>
                        <p>
                            Select the capabilities your team needs. See how much you&apos;d spend assembling them from separate SaaS tools — and how much you save with AppFlowy.
                        </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="pricing-calculator-grid">
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
                    <div className="pricing-calculator-panel">
                        <div className="pricing-calculator-panel-inner">
                            {/* Team Size Control */}
                            <div className="pricing-calculator-team">
                                <div className="pricing-calculator-team-header">
                                    <span className="pricing-calculator-team-label">Team size</span>
                                    {/* +/- controls */}
                                    <div className="pricing-calculator-team-controls">
                                        <button
                                            id="team-size-decrease"
                                            aria-label="Decrease team size"
                                            onClick={() => setTeamSize((v) => Math.max(1, v - 1))}
                                            className="pricing-calculator-icon-button"
                                        >
                                            <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
                                                <path d="M1 1H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                        <span className="pricing-calculator-team-size">
                                            {teamSize}
                                        </span>
                                        <button
                                            id="team-size-increase"
                                            aria-label="Increase team size"
                                            onClick={() => setTeamSize((v) => Math.min(1000, v + 1))}
                                            className="pricing-calculator-icon-button"
                                        >
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M6 1V11M1 6H11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Slider */}
                                <div className="pricing-calculator-slider-wrap">
                                    <input
                                        id="team-size-slider"
                                        type="range"
                                        min={1}
                                        max={1000}
                                        value={teamSize}
                                        onChange={(e) => setTeamSize(Number(e.target.value))}
                                        className="pricing-calculator-slider w-full cursor-pointer appearance-none"
                                        style={{
                                            background: `linear-gradient(to right, #8427E0 0%, #8427E0 ${teamSize / 10}%, rgba(255,255,255,0.15) ${teamSize / 10}%, rgba(255,255,255,0.15) 100%)`,
                                        }}
                                    />
                                    <div className="pricing-calculator-slider-labels">
                                        <span>1 user</span>
                                        <span>500 users</span>
                                        <span>1000 users</span>
                                    </div>
                                </div>
                            </div>

                            {/* Savings Display */}
                            <div className="pricing-calculator-savings">
                                {/* Monthly */}
                                <div className="pricing-calculator-savings-item">
                                    <div
                                        className={`value ${hasSelection ? 'value--active' : 'value--inactive'}`}
                                    >
                                        {hasSelection ? formatDollars(monthlySavings) : '$0'}
                                    </div>
                                    <div className="label">Monthly Savings</div>
                                </div>

                                {/* Divider */}
                                <div className="pricing-calculator-divider" />

                                {/* Annual */}
                                <div className="pricing-calculator-savings-item">
                                    <div
                                        className={`value ${hasSelection ? 'value--active' : 'value--inactive'}`}
                                    >
                                        {hasSelection ? formatDollars(annualSavings) : '$0'}
                                    </div>
                                    <div className="label">Annual Savings</div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom bar – context message */}
                        {hasSelection && annualSavings > 0 && (
                            <div className="pricing-calculator-bar pricing-calculator-bar--active">
                                <p>
                                    AppFlowy covers all the feature above and is priced at{' '}
                                    <span className="pricing-calculator-price">${APPFLOWY_PRICE_PER_USER_YEAR}/user/year</span>
                                </p>
                            </div>
                        )}

                        {!hasSelection && (
                            <div className="pricing-calculator-bar pricing-calculator-bar--inactive">
                                <p>
                                    Select capabilities above to estimate your savings vs. assembling separate SaaS tools.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Disclaimer */}
                    <p className="pricing-calculator-disclaimer">
                        Estimates are based on publicly available annual per-user pricing for popular SaaS tools and represent the estimated market value of each capability. Actual pricing varies by vendor, plan, and contract.
                    </p>
                </div>
            </div>
        </section>
    );
}
