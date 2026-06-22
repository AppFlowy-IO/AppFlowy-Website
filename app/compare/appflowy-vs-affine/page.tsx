import Object1 from '@/assets/images/vs-notion/OBJECTS-1.png';
import Object2 from '@/assets/images/vs-notion/OBJECTS-2.png';
import GetStart from '@/components/product/get-start';
import ImportLink from '@/components/vs-notion/import-link';
import Object3 from '@/assets/images/vs-notion/OBJECTS-3.png';
import AffineImage from '@/assets/images/vs-notion/affine.svg';
import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import CloseImage from '@/assets/images/vs-notion/x.svg';
import RightImage from '@/assets/images/vs-notion/right.svg';
import { Metadata } from 'next';
import Script from 'next/script';

import React from 'react';
import Image from 'next/image';
import 'styles/vs-notion.scss';
import { QASection } from '../components/qa-section';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;
const title = 'AppFlowy vs. Affine (2026): The Best Self-Hosted Notion Alternative';
const description = 'Both are open-source, both are self-hostable, and both aim to replace Notion. But only one is stable, mature, and ready for your team today. Compare AppFlowy and AFFiNE side-by-side.';

const vsAffineFAQs = [
    {
        id: 'vs-affine-1',
        question: 'How do AppFlowy and Affine truly open source?',
        answer:
            'No, Affine is not fully open source by OSI standards.\n\nWhile the frontend client is permissively licensed (MPL 2.0 / MIT), all content under `packages/backend` and `packages/common/native` is licensed under a separate license with significant restrictions. The backend server\'s "EE" license places limitations on use, modification, and distribution that would not generally be considered open source.\n\nAFFiNE maintainers have clarified that the server part is "not required and it\'s an addon — you can still use AFFiNE offline without any issue, but sync and collaboration features will not be available." However, this creates a practical problem: most users rely on their Cloud Workspace, which requires internet connection all the time.\n\nAppFlowy, by contrast, is genuinely open source under the AGPL license, with a clear open-core model. All components, including the backend, are available under the same open-source license, providing true transparency and no hidden proprietary layers.',
    },
    {
        id: 'vs-affine-2',
        question: 'Is Affine local-first?',
        answer:
            'No, Affine is not truly local-first.\n\nWhile Affine claims to be "offline-first," it has several critical limitations:\n\n1. Not fully air-gappable: There\'s a GitHub issue noting that due to dependencies like CloudFront for initial registration, it\'s not actually possible to run self-hosted AFFiNE in a fully air-gapped environment without internet.\n\n2. Non-transparent storage: AFFiNE\'s local storage is not fully transparent or user-configurable. Users cannot choose an exact folder path for their workspace data, which makes it difficult to manage, move, or back up data. Unlike Obsidian\'s vault system or AppFlowy\'s, there\'s no option to change the storage location — only import and export options exist.\n\n3. Hidden in browser-level app data: This has been a persistent community complaint. Users have called out the irony directly: an "offline-first" productivity app that promotes structure doesn\'t let you decide where your data is stored, leaving it buried in browser-level app data.\n\nAppFlowy, by contrast, provides true local-first capabilities with complete transparency and control over where your data is stored, making it genuinely suitable for offline and air-gapped environments.',
    },
    {
        id: 'vs-affine-3',
        question: 'What are Affine\'s customization options?',
        answer: "AFFiNE's customization story is primarily a developer/fork-it story, not an end-user story. If you can write code against BlockSuite, you have real extensibility, but there's no open-source, drop-in backend you can pair with BlockSuite freely in production at team scale.\n\nFor regular users, you get basic appearance settings and templates — nothing close to Obsidian's plugin ecosystem or even Notion's property/view customization depth. The \"extensive customization\" claim is quite overstated for non-technical users.\n\nAppFlowy offers significantly deeper end-user customization through its modular architecture, allowing organizations to customize authentication, integrate local and on-prem LLMs, configure storage, and white-label applications without requiring code-level fork customization.",
    },
    {
        id: 'vs-affine-4',
        question: 'Is Affine privacy-focused?',
        answer:
            "Affine has telemetry concerns even when self-hosted. You cannot run it fully in an intranet because some core things are needed from Affine servers.\n\nTelemetry is on by default and collects functionality usage, program errors, and crash data. While an opt-out exists in Settings → General → toggle off \"Enable Telemetry\", it's not opt-in — meaning data flows by default unless you know to turn it off.\n\nCritical issues with the toggle:\n\n1. Unreliable: Disabling the \"Enable Telemetry\" toggle has historically broken things. At least one user reported that disabling telemetry caused AFFiNE to show a black screen and stop loading entirely on their self-hosted Umbrel instance.\n\n2. Doesn't catch everything: Sentry (error/crash tracking) was found to still send network requests even when telemetry was disabled — a community PR had to fix this specifically for self-hosted instances, since Sentry was hooked into React's router and firing on every page navigation.\n\n3. Network-level blocking fails: Users have noted that blocking all AFFiNE domains at the network level causes other things to break — so it's not a clean alternative.\n\nFor self-hosted users, the `TELEMETRY_ENABLE=false` environment variable is more complete, but even then Sentry behavior may vary by version.\n\nBottom line: The toggle exists, but it's not fully reliable and doesn't cover all data flows.\n\nAppFlowy provides true privacy-first design with optional telemetry that can be disabled cleanly without breaking functionality, and full support for air-gapped deployments with zero external communication.",
    },
    {
        id: 'vs-affine-6',
        question: 'How do Affine and AppFlowy databases compare?',
        answer: "Affine's database capabilities are significantly limited compared to AppFlowy:\n\nAffine database limitations:\n\n1. Only 2 views: Table and Kanban. No Gallery, Calendar, List, Feed, or Chart views.\n\n2. Missing critical property types: Affine lacks Relation, Rollup, and Formula fields. You cannot filter by relation fields — for example, filtering tasks by which project they belong to. This is the single biggest gap making AFFiNE unsuitable for real project management or CRM-style workflows.\n\n3. No linked views: Can't embed a database on another page with different filters. Can't relate it to a separate database. Both are core to how power users build Notion-style systems.\n\n4. UX limitations:\n   - Full-page database views not supported; embedded block model becomes cramped with more than 3 columns\n   - Database row pages cannot be opened as full-page; property hiding is inflexible and counterintuitive\n   - Limited bulk row actions compared to AppFlowy's multi-row bulk edit, delete, and duplicate capabilities\n\n5. Document blocks missing: No toggle/collapsible headings, table of contents, button blocks, breadcrumb blocks, or multi-column layout blocks.\n\nAppFlowy advantages:\n\nAppFlowy supports Grid, Kanban, Calendar, Gallery, List, Feed, and Chart views with advanced filters, two-way relations, rollups, calculations, database templates, grouping, sorting, linked views, and multi-row bulk actions.\n\nAppFlowy's database UX is meaningfully more polished and feature-complete for practical workflows. For users migrating from Notion to do real project management or structured data work, AppFlowy is the stronger choice today.",
    },
    {
        id: 'vs-affine-7',
        question: 'What unique features does Affine have that AppFlowy doesn\'t?',
        answer: "Affine's standout feature is its Canvas/whiteboard integration. The ability to place databases on an infinite canvas, convert frames to databases, and switch seamlessly between document and edgeless modes is genuinely differentiated. For visual thinkers and teams that combine brainstorming with structured documentation, this hybrid doc-plus-canvas workflow is unique among open-source tools.\n\nAppFlowy does not currently offer an equivalent infinite canvas feature. However, AppFlowy compensates with significantly stronger database functionality, more mature enterprise features (SAML SSO, admin panels, audit logs), and a fully open-source backend without license restrictions. The choice depends on whether your workflow prioritizes visual canvas planning or structured data management.",
    },
    {
        id: 'vs-affine-8',
        question: 'Which is better for enterprise self-hosting?',
        answer: "AppFlowy is significantly better for enterprise self-hosting:\n\nAuthentication & SSO:\n- AppFlowy: SAML 2.0 is available and well-documented\n- AFFiNE: Has OIDC but SAML is unclear and SSO reliability has regression issues\n\nKubernetes & Helm:\n- AppFlowy: Official, supported Helm chart available\n- AFFiNE: No official, supported Helm chart. The previously official repo at `github.com/toeverything/helm-charts` was reported as abandoned and missing files.\n\nAdmin Panel:\n- AppFlowy: Has a Super Admin panel for managing seats, upgrading plans, and accessing priority support. Team and Enterprise plan management flows through the self-hosted admin panel with role-based access controls and workspace oversight.\n- AFFiNE: Admin panel exists but is functional but sparse and poorly documented. Users have reported difficulty finding the administrative panel or understanding what administrative actions are available.\n\nAI Configuration:\n- AppFlowy: Supports local model configuration (Ollama/local LLM integration) with on-prem LLM support for self-hosted deployments\n- AFFiNE: Has a self-host AI configuration guide but routes primarily through AFFiNE Cloud or external providers without documented local model support\n\nSecurity:\n- AppFlowy: Security audit logs available in Team/Enterprise plans\n- AFFiNE: No security audit log capability\n\nOverall: AppFlowy's admin panel is more mature for team management, authentication is more reliable, Kubernetes support is official and documented, and security features are more complete.",
    },
    {
        id: 'vs-affine-9',
        question: 'Can I migrate from Notion to AppFlowy?',
        answer: "Yes. AppFlowy provides tools to help individuals and organizations migrate existing content from Notion. AppFlowy provides the most complete Notion migration experience among other self-hosted alternatives.\n\nYou can import pages, documents, databases, and workspace content from Notion into AppFlowy, allowing teams to transition without rebuilding their knowledge base from scratch. For most organizations, migration is a gradual process where teams can evaluate AppFlowy, import existing content, and move workflows over time.\n\nAppFlowy has already successfully migrated numerous teams off Notion while fully preserving their pages, databases, and media with high reliability. Enterprise teams with large workspaces can contact AppFlowy directly to receive hands-on migration assistance.\n\nAppFlowy continues to improve migration tooling and compatibility to make switching from Notion as seamless as possible, while providing additional benefits such as self-hosting, data ownership, local LLMs, and deployment flexibility.",
    }
];

export async function generateMetadata(): Promise<Metadata> {
    return {
        title,
        description,
        alternates: {
            canonical: `${site_url}/compare/affine-vs-appflowy`,
        },
        robots: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
        },
        openGraph: {
            title,
            description,
            url: `${site_url}/compare/affine-vs-appflowy`,
            type: 'article',
            siteName: 'AppFlowy',
            publishedTime: new Date().toISOString(),
            modifiedTime: new Date().toISOString(),
            images: [
                {
                    url: `${site_url}/blog-og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: 'AppFlowy vs. Affine: The Best Self-Hosted Notion Alternative',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${site_url}/blog-og-image.png`],
        },
        keywords: [
            'appflowy vs affine',
            'affine vs appflowy',
            'affine comparison',
            'appflowy open source alternative',
            'self-hosted productivity app',
            'affine review',
            'best notion alternative',
            'open source notion alternative',
            'self-hosted workspace',
            'local first productivity',
            'privacy focused workspace',
        ],
    };
}

function generateListSchema() {
    const webPageSchema = {
        '@type': ['WebPage', 'ItemPage'],
        name: title,
        description: description,
        url: `${site_url}/compare/affine-vs-appflowy`,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: [
                {
                    '@type': 'SoftwareApplication',
                    position: 1,
                    name: 'AppFlowy',
                    applicationCategory: 'ProductivityApplication',
                    operatingSystem: 'All',
                    featureList: [
                        'Fully open-source (AGPL)',
                        'True local-first and offline-first',
                        'Multiple database views (Grid, Kanban, Calendar, Gallery, List, Feed, Chart)',
                        'Local and on-prem LLM support',
                        'Enterprise-ready self-hosting',
                        'Complete data ownership',
                    ],
                },
                {
                    '@type': 'SoftwareApplication',
                    position: 2,
                    name: 'AFFiNE',
                    applicationCategory: 'ProductivityApplication',
                    operatingSystem: 'All',
                    featureList: [
                        'Open-source frontend (permissively licensed)',
                        'Proprietary backend server',
                        'Canvas/whiteboard integration',
                        'Table and Kanban views',
                        'Limited offline capabilities',
                    ],
                },
            ],
        },
        publisher: {
            '@type': 'Organization',
            name: 'AppFlowy',
            logo: {
                '@type': 'ImageObject',
                url: `${site_url}/blog-og-image.png`,
            },
            sameAs: [
                'https://github.com/AppFlowy-IO/AppFlowy',
                'https://twitter.com/appflowy',
            ],
        },
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.main-content', '.desc', '.vs-notion-faq'],
        },
        dateModified: new Date().toISOString().split('T')[0],
    };

    const faqSchema = {
        '@type': 'FAQPage',
        mainEntity: vsAffineFAQs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return {
        "@context": "https://schema.org",
        "@graph": [webPageSchema, faqSchema]
    };
}

const points = ['Offline Mode', 'Native Mobile and Desktop Apps', 'AI Model Selection', 'Easier to Migrate from Notion', 'Mature Database Views'];

const importBaseURL: string = `${process.env.NEXT_PUBLIC_SITE_BASE_URL}/app`;

function Page() {
    return (
        <>
            <Script
                id="ld-json"
                type="application/ld+json"
            >
                {JSON.stringify(generateListSchema())}
            </Script>
            <div className={'vs-notion-page'}>
                <div className={'af-container'}>
                    <div className={'af-box section-1'}>
                        <div className={'flex items-center justify-center gap-2'}>
                            <Image
                                src={AppFlowyImage}
                                alt={'AppFlowy'}
                                width={56}
                                height={56}
                            />
                            <span className={'text-sm font-semibold'}>vs</span>
                            <Image
                                src={AffineImage}
                                alt={'Affine'}
                                width={56}
                                height={56}
                            />
                        </div>
                        <div className={'main-content'}>
                            <h1>
                                AppFlowy vs. Affine (2026): <span className={'text-primary'}>The Best Self-Hosted Notion Alternative</span>
                            </h1>
                            <p className={'desc'}>A head-to-head comparison of the two leading open-source workspace platforms.</p>
                        </div>
                        <ImportLink importBaseURL={importBaseURL} />
                    </div>
                </div>
                <div className={'af-container'}>
                    <div className={'af-box section-2'}>
                        <h2 className={'section-2-title'}>
                            Where <span className={'text-primary'}>AppFlowy</span> <br />
                            pulls ahead
                        </h2>
                        <div className={'cards'}>
                            <div className={'card'}>
                                <Image
                                    src={Object1}
                                    alt={'Offline Mode'}
                                    width={151}
                                    height={121}
                                />
                                <div className={'card-title'}>
                                    <h4>Offline Mode</h4>
                                    <p className={'card-desc'}>
                                        True offline-first workspace. Work completely without internet, with full transparency over where your data is stored.
                                    </p>
                                </div>
                            </div>
                            <div className={'card'}>
                                <Image
                                    src={Object2}
                                    alt={'Native Mobile and Desktop Apps'}
                                    width={151}
                                    height={121}
                                />

                                <div className={'card-title'}>
                                    <h4>Native Mobile & Desktop Apps</h4>
                                    <p className={'card-desc'}>Native clients for iOS, Android, macOS, Windows, and Linux — not web-based, delivering true platform optimization.</p>
                                </div>
                            </div>

                            <div className={'card'}>
                                <Image
                                    src={Object3}
                                    alt={'AI Model Selection'}
                                    width={189}
                                    height={121}
                                />

                                <div className={'card-title'}>
                                    <h4>AI Model Selection</h4>
                                    <p className={'card-desc'}>{`Choose your own AI models, run them locally, or use on-prem LLMs. Your choice, not your vendor's.`}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className={
                                'flex w-full min-w-0 max-w-[1100px] flex-col gap-1 text-[26px] max-lg:text-[18px] max-md:text-base'
                            }
                        >
                            <div className={'flex w-full items-center justify-between'}>
                                <p className="w-1/2 px-[48px] py-6 text-[#58585a] max-md:px-4 max-md:py-4">Compare features</p>
                                <p className="w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4">AFFiNE</p>
                                <p className="w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4">AppFlowy</p>
                            </div>
                            {points.map((point) => (
                                <div
                                    key={point}
                                    className={
                                        'flex w-full items-center justify-between rounded-[15px] border border-gray-100 bg-white text-[24px] max-lg:text-base max-md:text-sm'
                                    }
                                >
                                    <div className="w-1/2 px-[48px] py-10 font-medium text-black max-md:px-4 max-md:py-5">{point}</div>
                                    <div className="flex w-1/4 items-center justify-center px-[48px] py-6 max-md:px-4 max-md:py-5">
                                        <Image
                                            src={CloseImage}
                                            alt={'Close'}
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className="flex w-1/4 items-center justify-center px-[48px] py-6 max-md:px-4 max-md:py-5">
                                        <Image
                                            src={RightImage}
                                            alt={'Right'}
                                            width={26}
                                            height={16}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={'vs-notion-faq'}>
                    <QASection items={vsAffineFAQs} />
                </div>

                <GetStart />
            </div>
        </>
    );
}

export default Page;
