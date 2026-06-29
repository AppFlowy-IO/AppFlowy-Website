import Object1 from '@/assets/images/vs-notion/OBJECTS-1.png';
import Object2 from '@/assets/images/vs-notion/OBJECTS-2.png';
import Object3 from '@/assets/images/vs-notion/OBJECTS-3.png';
import GetStart from '@/components/product/get-start';
import OutlineImage from '@/assets/images/vs-notion/outline.svg';
import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import CloseImage from '@/assets/images/vs-notion/x.svg';
import RightImage from '@/assets/images/vs-notion/right.svg';
import { Metadata } from 'next';
import Script from 'next/script';

import React from 'react';
import Image from 'next/image';
import 'styles/vs-notion.scss';

import { QASection } from '../components/qa-section';
import SelfHostLink from '../components/self-host-link';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;
const title = 'AppFlowy vs Outline | The Best Self-Hosted Enterprise Wiki';
const description = 'Compare AppFlowy and Outline: two self-hosted enterprise wikis. Discover why AppFlowy offers more with databases, AI, native apps, and comprehensive workspace features beyond documentation.';

const vsOutlineFAQs = [
    {
        id: 'vs-outline-1',
        question: 'Is Outline open source?',
        answer:
            'Not in the traditional sense.\n\nOutline uses the Business Source License (BSL), which provides access to the source code and allows self-hosting, but includes commercial-use restrictions. The license is not recognized by the Open Source Initiative as an open-source license.\n\nAppFlowy\'s cloud backend follows an open-core model under the AGPL license, while its web codebase is fully open source.',
    },
    {
        id: 'vs-outline-2',
        question: 'Can I self-host both AppFlowy and Outline?',
        answer:
            'Yes, both AppFlowy and Outline can be self-hosted.\n\nBoth AppFlowy and Outline are designed for organizations that want full ownership of their data and infrastructure.',
    },
    {
        id: 'vs-outline-3',
        question: "What's the biggest difference between AppFlowy and Outline?",
        answer:
            "AppFlowy is a broader workspace that combines wikis, databases, kanban boards, project management, and AI-powered tools in a single platform.\n\nOutline is primarily a team wiki focused on documentation and knowledge management.\n\nFor teams currently stitching together Outline + a project management tool, AppFlowy is a compelling consolidation play that provides everything Outline does for docs, plus databases, kanban, and project management in one tool.",
    },
    {
        id: 'vs-outline-4',
        question: 'Does Outline support databases and project management?',
        answer:
            'No. It does not include databases, kanban boards, or project management features.\n\nOutline focuses on documentation and wiki functionality.\n\nAppFlowy includes all of these capabilities alongside its document editor.',
    },
    {
        id: 'vs-outline-5',
        question: 'Do both tools support collaborative editing?',
        answer:
            'Yes.\n\nBoth platforms support real-time collaboration, inline comments, version history, hierarchical document structures, and granular permissions.\n\nCollaborators can leave feedback directly in the document — right where it matters. They can highlight any text or pin a comment to a specific block to leave feedback, ask questions, or discuss ideas. They can also react to comments with emojis for quick responses. Version history tracks every change made to your documents over time.',
    },
    {
        id: 'vs-outline-6',
        question: 'Do AppFlowy and Outline support AI features?',
        answer:
            'While Both products offer AI-powered search, Outline\'s AI capabilities are more limited than AppFlowy.\n\nAppFlowy also includes additional AI capabilities such as AI writing assistance, AI chat, AI meeting notes, AI transcripts, and support for local AI models.',
    },
    {
        id: 'vs-outline-7',
        question: 'Does Outline have desktop and mobile apps?',
        answer:
            'No, Outline does not have native desktop or mobile applications.\n\nOutline is primarily a web-based application.\n\nAppFlowy provides native applications across major desktop and mobile platforms in addition to its web app.',
    },
    {
        id: 'vs-outline-8',
        question: 'Which platform has better integrations?',
        answer:
            'Outline currently offers broader integration support and live embeds for many popular tools, including services like YouTube, Figma, and Miro.\n\nAppFlowy currently supports integrations such as Google Drive, Google Calendar, YouTube, and Zapier.',
    },
    {
        id: 'vs-outline-9',
        question: 'Which platform offers more customization?',
        answer:
            'AppFlowy offers more customization options.\n\nUsers can customize fonts, font size, page width, profile cards, cursor colors, selection colors, page covers, and page icons.\n\nOutline\'s customization options are more limited.',
    },
    {
        id: 'vs-outline-10',
        question: 'Which platform is better as a Notion alternative?',
        answer:
            'AppFlowy is the stronger choice if you\'re looking for a broader workspace that combines wikis, databases, project management, and AI features in a single tool.',
    },
    {
        id: 'vs-outline-11',
        question: 'Should I choose AppFlowy or Outline?',
        answer:
            'Choose Outline if:\n* You primarily need a web-based team wiki.\n* Documentation is your main use case.\n* Cost efficiency is a priority.\n\nChoose AppFlowy if:\n* You want documentation, databases, kanban boards, and project management in one platform.\n* You want AI features such as AI Meeting Notes, AI Transcripts, AI-based information retrieval from your knowledge base.\n* Native desktop and mobile applications are important along with a stable web app.\n* You are looking for a broader workspace rather than a standalone wiki.',
    }
];

export async function generateMetadata(): Promise<Metadata> {
    return {
        title,
        description,
        alternates: {
            canonical: `${site_url}/compare/appflowy-vs-outline`,
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
            url: `${site_url}/compare/appflowy-vs-outline`,
            type: 'article',
            siteName: 'AppFlowy',
            publishedTime: '2024-10-14T00:00:00Z',
            modifiedTime: new Date().toISOString(),
            images: [
                {
                    url: `${site_url}/blog-og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: 'AppFlowy vs Outline - The Best Self-Hosted Enterprise Wiki',
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
            'appflowy vs outline',
            'outline alternative',
            'self-hosted wiki',
            'enterprise wiki alternative',
            'outline vs appflowy',
            'best team wiki alternative',
            'open-source wiki',
            'self-hosted wiki alternative',
            'team wiki',
            'knowledge management',
            'documentation tool',
            'wiki with database',
            'wiki with ai',
            'wiki with project management',
            'wiki with kanban',
            'wiki with native apps',
        ],
    };
}

function generateListSchema() {
    const webPageSchema = {
        '@type': ['WebPage', 'ItemPage'],
        name: title,
        description: description,
        url: `${site_url}/compare/appflowy-vs-outline`,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    item: {
                        '@type': 'SoftwareApplication',
                        name: 'AppFlowy',
                        applicationCategory: 'ProductivityApplication',
                        operatingSystem: 'Windows, macOS, Linux, Android, iOS, Web',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                            description: 'Self-hosted workspace with documentation, databases, and AI features',
                        },
                        featureList: [
                            'Self-hosted workspace with documentation',
                            'Databases and kanban boards',
                            'Local and on-prem LLM support',
                            'AI-powered features',
                            'Native desktop and mobile apps',
                            'Complete data ownership',
                        ],
                    },
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    item: {
                        '@type': 'SoftwareApplication',
                        name: 'Outline',
                        applicationCategory: 'ProductivityApplication',
                        operatingSystem: 'Web',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                            description: 'Self-hosted team wiki focused on documentation',
                        },
                        featureList: [
                            'Web-based team wiki',
                            'Block-based editor',
                            'Version history',
                            'Collaborative editing',
                        ],
                    },
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
                'https://appflowy.com',
                'https://github.com/AppFlowy-IO/AppFlowy',
                'https://twitter.com/appflowy',
                'https://www.linkedin.com/company/appflowy',
                'https://www.youtube.com/@AppFlowyHQ',
            ],
        },
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.main-content', '.desc', '.vs-outline-faq'],
        },
        dateModified: new Date().toISOString().split('T')[0],
    };

    const faqSchema = {
        '@type': 'FAQPage',
        mainEntity: vsOutlineFAQs.map(faq => ({
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

const points = [
    {
        text: 'Local and on-prem LLM support',
        competitor: false,
    },
    {
        text: 'Database support',
        competitor: false,
    },
    {
        text: 'Kanban boards',
        competitor: false,
    },
    {
        text: 'Calendar views',
        competitor: false,
    },
    {
        text: 'AI writing assistance',
        competitor: false,
    },
    {
        text: 'AI meeting notes',
        competitor: false,
    },
    {
        text: 'AI transcript',
        competitor: false,
    },
    {
        text: 'Native desktop & mobile apps',
        competitor: false,
    },
    {
        text: 'Self-hosted',
        competitor: true,
    },
    {
        text: 'Collaborative editing',
        competitor: true,
    },
    {
        text: 'Version history',
        competitor: true,
    },
    {
        text: 'Granular permissions',
        competitor: true,
    },
    {
        text: 'Block-based editor',
        competitor: true,
    },
    {
        text: 'Hierarchical docs/wiki structure',
        competitor: true,
    },
    {
        text: 'Inline comments',
        competitor: true,
    },
    {
        text: 'SSO/SAML',
        competitor: true,
    },
];

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
                                src={OutlineImage}
                                alt={'Outline'}
                                width={56}
                                height={56}
                            />
                        </div>
                        <div className={'main-content'}>
                            <h1>
                                AppFlowy vs Outline: The Best Self-Hosted Enterprise<span className={'text-primary'}> Team Wiki</span>
                            </h1>
                            <p className={'desc'}>Self-hosted, knowledge management, Notion alternatives, database, cross platform</p>
                        </div>
                        <SelfHostLink />
                    </div>
                </div>
                <div className={'af-container'}>
                    <div className={'af-box section-2'}>
                        <h2 className={'section-2-title'}>
                            {`Your workspace with `}
                            <span className={'text-primary'}>more capabilities</span>
                            <br />
                            than documentation alone
                        </h2>
                        <div className={'cards'}>
                            <div className={'card'}>
                                <Image
                                    src={Object1}
                                    alt={'AI Workspace'}
                                    width={151}
                                    height={121}
                                />
                                <div className={'card-title'}>
                                    <h4>AI Workspace</h4>
                                    <p className={'card-desc'}>
                                        AI Meeting Notes, AI Writers, and AI Search. Run local models offline or connect a self-hosted LLM.
                                    </p>
                                </div>
                            </div>
                            <div className={'card'}>
                                <Image
                                    src={Object2}
                                    alt={'Projects and Databases'}
                                    width={151}
                                    height={121}
                                />

                                <div className={'card-title'}>
                                    <h4>Projects & Databases</h4>
                                    <p className={'card-desc'}>Capture every detail in a database. Visualize in various formats, from calendars to boards.</p>
                                </div>
                            </div>

                            <div className={'card'}>
                                <Image
                                    src={Object3}
                                    alt={'Cross-platform'}
                                    width={189}
                                    height={121}
                                />

                                <div className={'card-title'}>
                                    <h4>Cross-platform</h4>
                                    <p className={'card-desc'}>{`Works consistently across platforms your team works on, including desktop and mobile.`}</p>
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
                                <p className="w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4">Outline</p>
                                <p className="w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4">AppFlowy</p>
                            </div>
                            {points.map((point) => (
                                <div
                                    key={point.text}
                                    className={
                                        'flex w-full items-center justify-between rounded-[15px] border border-gray-100 bg-white text-[24px] max-lg:text-base max-md:text-sm'
                                    }
                                >
                                    <div className="w-1/2 px-[48px] py-10 font-medium text-black max-md:px-4 max-md:py-5">{point.text}</div>
                                    <div className="flex w-1/4 items-center justify-center px-[48px] py-6 max-md:px-4 max-md:py-5">
                                        {point.competitor ?
                                            <Image
                                                src={RightImage}
                                                alt={'Right'}
                                                width={26}
                                                height={16}
                                            />
                                            :
                                            <Image
                                                src={CloseImage}
                                                alt={'Close'}
                                                width={20}
                                                height={20}
                                            />
                                        }
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
                <div className={'vs-outline-faq'}>
                    <QASection items={vsOutlineFAQs} />
                </div>

                <GetStart />
            </div>
        </>
    );
}

export default Page;
