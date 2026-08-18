'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { StaticImageData } from "next/image";
import { useInView } from "framer-motion";
import { useAutoPlay } from "@/lib/hooks/use-auto-play";
import { useScrollTabLock } from "@/lib/hooks/use-scroll-tab-lock";

import AISearchImage from '@/assets/images/product-showcase-new/ai-search.webp';
import AINotesImage from '@/assets/images/product-showcase-new/ai-notes.webp';
import DocsImage from '@/assets/images/product-showcase-new/docs.webp';
import KnowledgeImage from '@/assets/images/product-showcase-new/knowledge-base.webp';
import ProjectsImage from '@/assets/images/product-showcase-new/projects.webp';
import 'styles/showcase.scss';

type Tab = {
    id: string;
    label: string;
    title: string;
    image: StaticImageData;
    mobileScale?: number;
    clouds: [string, string, string];
};

const tabs: Tab[] = [
    {
        id: "ai",
        label: "AI Search",
        title: "Get answers in seconds,|grounded in your sources.",
        image: AISearchImage,
        mobileScale: 1.075,
        clouds: [
            "rgba(196, 205, 255, 0.95)",
            "rgba(249, 227, 255, 0.95)",
            "rgba(252, 235, 255, 0.74)",
        ],
    },
    {
        id: "knowledge",
        label: "Knowledge Base",
        title: "A single source of truth for|teams and AI agents.",
        image: KnowledgeImage,
        clouds: [
            "rgba(255, 200, 201, 0.72)",
            "rgba(255, 239, 206, 0.88)",
            "rgba(255, 239, 206, 0.88)",
        ],
    },
    {
        id: "projects",
        label: "Projects",
        title: "Manage projects end-to-end.|Ship faster with less overhead.",
        image: ProjectsImage,
        mobileScale: 1,
        clouds: [
            "rgba(172, 249, 230, 0.82)",
            "rgba(230, 255, 187, 0.9)",
            "rgba(172, 249, 230, 0.82)",
        ],
    },
    {
        id: "meetings",
        label: "AI Meeting Notes",
        title: "Turn meetings into actions and insights,|right where you work.",
        image: AINotesImage,
        mobileScale: 1.075,
        clouds: [
            "rgba(181, 196, 255, 0.75)",
            "rgba(181, 234, 255, 0.92)",
            "rgba(252, 235, 255, 0.62)",
        ],
    },
    {
        id: "docs",
        label: "Docs",
        title:
            "Get your team on the same page.|Co-edit in real-time or comment async.",
        image: DocsImage,
        clouds: [
            "rgba(181, 234, 255, 0.86)",
            "rgba(249, 227, 255, 0.9)",
            "rgba(249, 227, 255, 0.9)",
        ],
    },
];

const autoplayOptions = tabs.map((tab) => ({ value: tab.id }));
const autoplayDuration = 5000;
const TRANSITION_MS = 850;

const cloudBaseClass = "absolute rounded-full blur-[95px] pointer-events-none [transform:translateZ(0)]";

function GradientLayer({ tab, leaving = false }: { tab: Tab; leaving?: boolean }) {
    return (
        <div
            aria-hidden="true"
            className={
                leaving
                    ? "absolute inset-0 z-0 overflow-hidden bg-white pointer-events-none gradient-layer--leaving"
                    : "absolute inset-0 z-0 overflow-hidden bg-white pointer-events-none"
            }
            style={{
                "--cloud-one": tab.clouds[0],
                "--cloud-two": tab.clouds[1],
                "--cloud-three": tab.clouds[2],
            } as CSSProperties}
        >
            <div className={`${cloudBaseClass} w-[740px] h-[560px] right-[-170px] bottom-[-190px] bg-[var(--cloud-one)]`} />
            <div className={`${cloudBaseClass} w-[640px] h-[520px] left-[-190px] bottom-[-160px] bg-[var(--cloud-two)]`} />
            <div className={`${cloudBaseClass} w-[720px] h-[460px] left-[-140px] top-[-230px] bg-[var(--cloud-three)]`} />
        </div>
    );
}

const illustrationBaseClass =
    "absolute left-1/2 bottom-0 z-[1] block h-full max-h-[560px] w-[min(1120px,100%)] object-cover object-bottom pointer-events-none select-none -translate-x-1/2 [will-change:transform,opacity]";

// Fades the bottom edge of the screenshots into the card's gradient, matching
// the fade under the hero product image.
const bottomFadeFrom = (start: string): CSSProperties => ({
    maskImage: `linear-gradient(to bottom, black ${start}, transparent 100%)`,
    WebkitMaskImage: `linear-gradient(to bottom, black ${start}, transparent 100%)`,
});

const illustrationFadeStyle = bottomFadeFrom("82%");
const mobileIllustrationFadeStyle = bottomFadeFrom("86%");

function illustrationSizeClass(tabId: string) {
    return tabId === "ai" ? "w-[min(1120px,104%)] max-h-[552px]" : "";
}

const titleBaseClass =
    "[grid-area:1/1] m-0 text-text-primary text-center showcase-title mb-5 sm:mb-12";

function TitleBlock({ tab, className = "", hidden = false }: { tab: Tab; className?: string; hidden?: boolean }) {
    const lines = tab.title.split("|");

    return (
        <h1 className={`${titleBaseClass} ${className}`} aria-hidden={hidden || undefined}>
            {lines[0]}
            <span className="block">{lines[1]}</span>
        </h1>
    );
}

function FeaturePreview({ activeTab, previousTab }: { activeTab: Tab; previousTab: Tab | null }) {
    return (
        <div className="relative h-[720px] overflow-hidden rounded-2xl bg-white flex flex-col items-center pt-[60px] px-20 isolate max-[1100px]:h-[680px] max-[1100px]:pt-12 max-[1100px]:px-7">
            <GradientLayer tab={activeTab} />
            {previousTab ? <GradientLayer tab={previousTab} leaving /> : null}
            <div className="relative z-[1] w-full grid">
                <TitleBlock tab={activeTab} className={previousTab ? "title--enter" : ""} />
                {previousTab ? <TitleBlock tab={previousTab} className="title--leave" hidden /> : null}
            </div>
            <div className="relative z-[1] flex-1 w-full min-h-0 flex items-end justify-center overflow-visible max-[760px]:mt-4">
                <img
                    className={`${illustrationBaseClass} ${illustrationSizeClass(activeTab.id)} ${previousTab ? "feature-illustration--enter" : ""}`}
                    src={activeTab.image.src}
                    alt={`${activeTab.label} illustration`}
                    style={illustrationFadeStyle}
                />
                {previousTab ? (
                    <img
                        className={`${illustrationBaseClass} ${illustrationSizeClass(previousTab.id)} feature-illustration--leave`}
                        src={previousTab.image.src}
                        alt=""
                        aria-hidden="true"
                        style={illustrationFadeStyle}
                    />
                ) : null}
            </div>
        </div>
    );
}

function MobileFeatureCard({ tab }: { tab: Tab }) {
    return (
        <div className="relative h-[270px] overflow-hidden rounded-xl bg-white flex flex-col items-center pt-5 px-3 pb-0">
            <GradientLayer tab={tab} />
            <TitleBlock tab={tab} className="relative z-[1]" />
            <img
                className="relative z-[1] mt-4 w-full h-auto object-contain pointer-events-none select-none"
                src={tab.image.src}
                alt={`${tab.label} illustration`}
                style={{ scale: tab.mobileScale ? tab.mobileScale : 1.05, ...mobileIllustrationFadeStyle }}
            />
        </div>
    );
}

function ShowcaseSection() {
    const [{ currentId, previousId }, setTransition] = useState<{
        currentId: string;
        previousId: string | null;
    }>({ currentId: tabs[0].id, previousId: null });
    const autoplayStoppedRef = useRef(false);
    const activeTab = tabs.find((tab) => tab.id === currentId) || tabs[0];
    const previousTab = tabs.find((tab) => tab.id === previousId) || null;

    const sectionRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef);
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab.id);

    const goToTab = useCallback((id: string) => {
        setTransition((prev) =>
            prev.currentId === id ? prev : { currentId: id, previousId: prev.currentId }
        );
    }, []);

    // Clears the outgoing tab once its leave animation has finished.
    useEffect(() => {
        if (previousId === null) return;

        const timer = window.setTimeout(() => {
            setTransition((prev) => (prev.previousId === previousId ? { ...prev, previousId: null } : prev));
        }, TRANSITION_MS);

        return () => window.clearTimeout(timer);
    }, [currentId, previousId]);

    const { start, stop } = useAutoPlay({
        options: autoplayOptions,
        onChange: (action) => {
            const nextId = typeof action === "function" ? action(currentId) : action;

            goToTab(nextId);
        },
        duration: autoplayDuration,
    });

    // Scrolling over the pinned section cycles the tabs before the page moves on.
    useScrollTabLock({
        targetRef: pinRef,
        index: activeIndex,
        count: tabs.length,
        onStep: (direction) => goToTab(tabs[activeIndex + direction].id),
        onEngage: () => {
            autoplayStoppedRef.current = true;
            stop();
        },
    });

    useEffect(() => {
        if (autoplayStoppedRef.current) return;

        if (!inView) {
            stop();
        } else {
            start();
        }
    }, [inView, start, stop]);

    return (
        <div
            ref={sectionRef}
            className="w-full max-w-[1440px] px-[80px] py-[120px] mx-auto max-[1100px]:px-5 max-[1100px]:py-12 max-[760px]:px-3 max-[760px]:py-6"
        >
            <section
                ref={pinRef}
                className="w-full flex flex-col gap-5 max-[760px]:gap-3"
                aria-label="AppFlowy feature previews"
            >
                <nav
                    className="grid grid-cols-5 gap-3 max-[1100px]:grid-cols-3 max-[760px]:hidden"
                    aria-label="Product features"
                >
                    {tabs.map((tab) => (
                        <button
                            aria-pressed={currentId === tab.id}
                            className={`min-h-[52px] rounded-xl grid place-items-center px-5 py-4 text-h5 font-medium whitespace-nowrap transition-[background-color,color] duration-180 ease-in-out ${currentId === tab.id
                                ? "bg-text-primary text-white"
                                : "bg-[#F6F5F6] text-text-primary hover:bg-[#ECECEE] active:bg-text-primary active:text-white"
                                }`}
                            key={tab.id}
                            onClick={() => {
                                autoplayStoppedRef.current = true;
                                stop();
                                goToTab(tab.id);
                            }}
                            type="button"
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="max-[760px]:hidden">
                    <FeaturePreview activeTab={activeTab} previousTab={previousTab} />
                </div>
                <div className="hidden max-[760px]:flex max-[760px]:flex-col max-[760px]:gap-4">
                    {tabs.map((tab) => (
                        <MobileFeatureCard key={tab.id} tab={tab} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ShowcaseSection;