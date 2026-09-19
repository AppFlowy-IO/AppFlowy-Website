import GetStart from '@/components/product/get-start';
import OutlineImage from '@/assets/images/vs-notion/outline.svg';
import { Metadata } from 'next';
import SeoData from '@/components/layout/seo-data';
import { generateBreadcrumbSchema } from '@/lib/schema';

import React from 'react';
import 'styles/vs-notion.scss';

import { QASection } from '../components/qa-section';
import SelfHostLink from '../components/self-host-link';
import { ComparisonTable } from '../components/comparison-table';
import { HeroApps } from '../components/hero-apps';
import { HeroFeaturePills } from '../components/hero-feature-pills';
import { FeatureCards } from '../components/feature-cards';

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
            'While both products offer AI-powered search, Outline\'s AI capabilities are more limited than AppFlowy.\n\nAppFlowy also includes additional AI capabilities such as AI writing assistance, AI chat, AI meeting notes, AI transcripts, and support for local AI models.',
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
            publishedTime: '2026-07-02T00:00:00Z',
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
            'AppFlowy review',
            'Outline review',
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

    const breadcrumbSchema = generateBreadcrumbSchema([{ name: 'AppFlowy vs Outline', path: '/compare/appflowy-vs-outline' }]);

    return {
        "@context": "https://schema.org",
        "@graph": [webPageSchema, faqSchema, breadcrumbSchema]
    };
}

const points = [
    {
        text: 'Local and on-prem LLM support',
        appflowy: true,
        competitor: false,
    },
    {
        text: 'Database support',
        appflowy: true,
        competitor: false,
    },
    {
        text: 'Kanban boards',
        appflowy: true,
        competitor: false,
    },
    {
        text: 'AI writing assistance',
        appflowy: true,
        competitor: false,
    },
    {
        text: 'AI meeting notes',
        appflowy: true,
        competitor: false,
    },
    {
        text: 'AI transcript',
        appflowy: true,
        competitor: false,
    },
    {
        text: 'Calendar views',
        appflowy: true,
        competitor: false,
    },
    {
        text: 'List views',
        appflowy: true,
    },
    {
        text: 'Gallery views',
        appflowy: true,
    },
    {
        text: 'Chart views',
        appflowy: true,
    },
    {
        text: 'Feed views',
        appflowy: true,
    },
    {
        text: 'Timeline views',
        appflowy: true,
    },
    {
        text: 'Form views',
        appflowy: true,
    },
    {
        text: 'Native desktop & mobile apps',
        appflowy: true,
        competitor: false,
    },
    {
        text: 'Self-hosted',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'Collaborative editing',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'Version history',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'Granular permissions',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'Publish pages',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'Block-based editor',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'Hierarchical docs/wiki structure',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'Inline comments',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'SSO/SAML',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'Audit logs',
        appflowy: true,
        competitor: true,
    },
];

function Page() {
    return (
        <>
            <SeoData id='ld-json' data={generateListSchema()} />
            <div className={'vs-notion-page'}>
                <div className={'af-container'}>
                    <div className={'af-box section-1'}>
                        <HeroApps competitorName='Outline' competitorImage={OutlineImage} />
                        <div className={'main-content'}>
                            <h1 className='whitespace-pre-wrap break-words text-style-h1 font-bold my-3'>The Best Self-Hosted Enterprise<br></br>Team Wiki</h1>
                            <HeroFeaturePills
                                className='desc'
                                items={['Self-hosted', 'Knowledge management', 'Notion alternative', 'Database', 'Cross-platform']}
                            />
                        </div>
                        <SelfHostLink />
                    </div>
                </div>
                <div className={'af-container'}>
                    <div className={'af-box section-2 bg-white'}>
                        <h2 className={'text-style-h1 font-bold w-full text-left sm:w-auto sm:text-center'}>
                            {`Your workspace with `}
                            <span className={'text-primary'}>more capabilities</span>
                            <br />
                            than wikis alone
                        </h2>
                        <FeatureCards
                            items={[
                                {
                                    icon: 'sparkle',
                                    title: 'AI Workspace',
                                    description: 'AI Meeting Notes, AI Writers, and AI Search. Run local models offline or connect a self-hosted LLM.',
                                },
                                {
                                    icon: 'database',
                                    title: 'Projects & Databases',
                                    description: 'Capture every detail in a database. Visualize in various formats, from calendars to boards.',
                                },
                                {
                                    icon: 'layers',
                                    title: 'Cross-platform',
                                    description: 'Works consistently across platforms your team works on, including desktop and mobile.',
                                },
                            ]}
                        />
                        <div className={'section-2-blobs'}>
                            <div className={'section-2-blob section-2-blob-1'} />
                            <div className={'section-2-blob section-2-blob-2'} />
                            <div className={'section-2-blob section-2-blob-3'} />
                        </div>
                    </div>
                </div>
                <div className="af-box section-2">
                    <ComparisonTable competitorName='Outline' competitorImage={OutlineImage} points={points} />
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
