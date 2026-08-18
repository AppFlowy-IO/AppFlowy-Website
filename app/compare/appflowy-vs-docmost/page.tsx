import GetStart from '@/components/product/get-start';
import DocmostImage from '@/assets/images/vs-notion/docmost.svg';
import { Metadata } from 'next';
import Script from 'next/script';

import React from 'react';
import 'styles/vs-notion.scss';

import { QASection } from '../components/qa-section';
import SelfHostLink from '../components/self-host-link';
import { ComparisonTable } from '../components/comparison-table';
import { FeatureCards } from '../components/feature-cards';
import { HeroApps } from '../components/hero-background';
import { HeroChips } from '../components/hero-chips';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;
const title = 'AppFlowy vs Docmost: The Best On-Premises Notion Alternative';
const description =
    'Compare AppFlowy and Docmost: two self-hosted knowledge platforms. Discover why AppFlowy offers more with databases, AI features, native cross-platform apps, and broader workspace features beyond docs.';

const vsDocmostFAQs = [
    {
        id: 'vs-docmost-1',
        question: 'Is AppFlowy or Docmost the more complete self-hosted Notion alternative?',
        answer:
            'AppFlowy is the more complete self-hosted Notion alternative for organizations that want documentation, advanced databases, project management, AI, and native applications in a single self-hosted workspace.\n\nDocmost is primarily designed as a collaborative wiki and documentation platform. It also offers Table and Kanban boards, but these are paid features and currently provide a narrower range of database and project-management capabilities.\n\nAppFlowy supports more database views, advanced database features, relational workflows, AI Meeting Notes, and native desktop and mobile apps.',
    },
    {
        id: 'vs-docmost-2',
        question: 'What is the biggest difference between AppFlowy and Docmost?',
        answer:
            'The biggest difference is product scope. Docmost focuses primarily on wikis, documentation, and browser-based knowledge management. AppFlowy is a broader workspace that combines wikis, databases, Kanban boards, project management, and AI-powered workflows in one platform.\n\nAppFlowy supports multidimensional project tracking through Grid, Kanban, Calendar, Gallery, List, Feed, and Chart views. It also treats database records as editable pages, allowing teams to add rich-text content, comments, relations, and cross-references directly within structured records.\n\nFor teams currently using Docmost alongside a separate project-management tool such as Jira or Trello, AppFlowy may help consolidate documentation and project workflows into one workspace.',
    },
    {
        id: 'vs-docmost-3',
        question: 'Is AppFlowy only a note-taking app?',
        answer:
            'No. AppFlowy is an AI collaborative workspace for wikis, projects, databases, and AI-assisted workflows.\n\nTeams can organize structured information, manage projects through multiple database views, create relational workflows, collaborate on documents, and use features such as AI Meeting Notes, AI Transcripts, AI writing assistance, and AI-powered workspace search. Thus AppFlowy is more than only a note-taking app.',
    },
    {
        id: 'vs-docmost-4',
        question: 'Do AppFlowy and Docmost support advanced databases and project management?',
        answer:
            'Both products support structured databases, but their capabilities differ substantially.\n\nDocmost Bases support Table and Kanban views, properties, filters, sorting, formulas, and structured records. Docmost does not currently document the ability to place linked views of the same Base across different pages.\n\nAppFlowy supports a broader project-management feature set, including Grid, Kanban, Calendar, Gallery, List, Feed, and Chart views. It also supports advanced filters, grouping, multi-row editing, relations, rollups, linked database views, and reusable database templates. In AppFlowy, each database entry can act as fully-featured text pages, thus users can invite collaborators and add comments to individual database entries.',
    },
    {
        id: 'vs-docmost-5',
        question: 'Are AppFlowy database rows and Kanban cards fully editable pages?',
        answer:
            'Yes. Every AppFlowy database row represents a page that can be opened and edited as a full page. Teams can add rich-text content, subpages, embedded content, relations, cross-references, and contextual comment threads inside database rows.\n\nKanban cards represent the same underlying database records, so they can also be opened and edited as pages.\n\nDocmost describes Base rows as structured records with editable properties. Its current documentation does not describe each Base record as a full rich-text page with an independent page body. Thus teams can not add comments or mentions inside Base records and Kanban cards in Docmost, which limits collaborative workflows compared to AppFlowy.',
    },
    {
        id: 'vs-docmost-6',
        question: 'Does AppFlowy support version history?',
        answer:
            'Yes. AppFlowy supports document version history. Users can review previous versions of a document and restore an earlier version when necessary.\n\nClaims that AppFlowy does not support version history are outdated and do not reflect the current product.',
    },
    {
        id: 'vs-docmost-7',
        question: 'Does AppFlowy support real-time collaborative editing without requiring a manual refresh?',
        answer:
            'Yes. AppFlowy supports real-time collaborative editing across its supported platforms. Changes made by collaborators are synchronized and displayed without requiring users to refresh the interface manually.\n\nReal-time collaboration is available in documents and structured database workflows, allowing team members to work together in the same workspace.',
    },
    {
        id: 'vs-docmost-8',
        question: 'Can AppFlowy users create separate spaces, sections, and nested pages?',
        answer:
            'Yes. AppFlowy allows teams to organize their work into workspaces and spaces, create pages within those spaces, and nest pages inside other pages. Pages can be reordered through drag and drop, allowing teams to build structured company wikis, departmental knowledge bases, and project hierarchies.\n\nAppFlowy also supports multi-column document layouts, allowing users to arrange content blocks side by side.',
    },
    {
        id: 'vs-docmost-9',
        question: 'Can the official AppFlowy app connect to both AppFlowy Cloud and self-hosted deployments?',
        answer:
            'Yes. The official AppFlowy desktop application connects to AppFlowy Cloud by default, but users can change the server endpoint from the login or workspace settings to connect to a self-hosted AppFlowy deployment.\n\nConnecting to a self-hosted server through this standard workflow does not require installing a separately compiled application. Therefore, bundle ID conflicts do not prevent users from connecting the official AppFlowy app to a self-hosted server.',
    },
    {
        id: 'vs-docmost-10',
        question: 'Do AppFlowy and Docmost offer native desktop and mobile apps?',
        answer:
            'AppFlowy provides native applications for Windows, macOS, Linux, iOS, and Android, in addition to its web app. It also supports offline work and synchronizes changes after connectivity is restored.\n\nAs of July 2026, Docmost’s official website and documentation describe it as a web-based platform and do not list official native desktop, iOS, or Android applications.',
    },
    {
        id: 'vs-docmost-11',
        question: 'Which platform has better integrations?',
        answer:
            'Docmost currently offers wider integration support for many popular tools, including services like Figma, Airtable, and Miro.\n\nAppFlowy currently supports integrations such as Google Drive, Google Calendar, YouTube, and Zapier.',
    },
    {
        id: 'vs-docmost-12',
        question: 'Which platform offers more customization?',
        answer:
            'AppFlowy offers broader workspace and interface customization. Users can customize fonts, font sizes, page widths, profile cards, cursor colors, selection colors, page covers, and page icons. Enterprise customers can also request white-labeling.\n\nDocmost supports text and highlight color palettes and allows paid customers to remove Docmost branding from public pages. However, its public documentation does not currently describe full product white-labeling equivalent to AppFlowy’s enterprise offering.',
    },
    {
        id: 'vs-docmost-13',
        question: 'Which platform is better as a Notion alternative?',
        answer:
            'AppFlowy is the stronger Notion alternative for teams that need powerful databases, broad cross-platform access, and a more customizable modern workspace.\n\nPowerful databases for team workflows: AppFlowy supports advanced database capabilities such as multiple views, relations, rollups, linked database views, templates, grouping, advanced filters, and bulk editing. Database rows and Kanban cards can also be opened as fully editable pages, making AppFlowy better suited to project management and structured team workflows.\n\nCross-platform availability: AppFlowy is available on the web, Windows, macOS, Linux, iOS, and Android. It also supports offline access, giving teams a consistent workspace across desktop, mobile, and browser environments. Docmost is primarily web-based.\n\nModern UX and customization: AppFlowy offers a more flexible interface with customizable fonts, page widths, colors, page covers, icons, multi-column layouts, and other visual settings. This gives teams more control over how their workspace looks and feels.\n\nChoose AppFlowy if you want to move away from Notion without giving up advanced databases, cross-platform access, or a modern and customizable workspace. Choose Docmost if your primary need is a lightweight, browser-based wiki for documentation.',
    },
    {
        id: 'vs-docmost-14',
        question: 'Should an enterprise team choose AppFlowy or Docmost?',
        answer:
            'Choose Docmost when your primary requirement is a browser-based internal wiki and documentation system, and Table or Kanban-based structured data is sufficient.\n\nChoose AppFlowy when your organization needs a broader self-hosted Notion alternative that combines documents, wikis, advanced databases, project management, guest collaboration, native desktop and mobile applications, offline access, and AI-powered meeting and knowledge workflows.\n\nAppFlowy is particularly suitable for teams looking to consolidate documentation, project management, structured databases, and AI-assisted workflows into one controlled workspace.',
    },
];

export async function generateMetadata(): Promise<Metadata> {
    return {
        title,
        description,
        alternates: {
            canonical: `${site_url}/compare/appflowy-vs-docmost`,
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
            url: `${site_url}/compare/appflowy-vs-docmost`,
            type: 'article',
            siteName: 'AppFlowy',
            publishedTime: '2024-10-14T00:00:00Z',
            modifiedTime: new Date().toISOString(),
            images: [
                {
                    url: `${site_url}/blog-og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: 'AppFlowy vs Docmost: The Best Self-Hosted Knowledge Workspace',
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
            'appflowy vs docmost',
            'self-hosted knowledge base',
            'enterprise wiki alternative',
            'docmost vs appflowy',
            'self-hosted productivity app',
            'Docmost review',
            'AppFlowy review',
            'best team wiki alternative',
            'open-core knowledge workspace',
            'open core notion alternative',
            'complete notion alternative',
            'self-hosted docs',
            'self-hosted wiki',
            'knowledge management',
            'workspace with database',
            'workspace with ai',
            'workspace with project management',
        ],
    };
}

function generateListSchema() {
    const webPageSchema = {
        '@type': ['WebPage', 'ItemPage'],
        name: title,
        description: description,
        url: `${site_url}/compare/appflowy-vs-docmost`,
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
                            'Fully open-core (AGPL)',
                            'Self-hosted workspace with documentation',
                            'Databases and kanban boards',
                            'Multiple database views (Grid, Kanban, Calendar, Gallery, List, Feed, Chart)',
                            'Full AI features with on-prem & local LLMs',
                            'Local and on-prem LLM support',
                            'AI-powered features',
                            'Native desktop and mobile apps',
                            'Enterprise-ready self-hosting'
                        ],
                    },
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    item: {
                        '@type': 'SoftwareApplication',
                        name: 'Docmost',
                        applicationCategory: 'ProductivityApplication',
                        operatingSystem: 'Web',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                            description: 'Self-hosted team wiki focused on documentation',
                        },
                        featureList: [
                            'On-prem wiki for documentation',
                            'Wiki-style documents',
                            'Collaborative editing',
                            'Table and Kanban views (paid)',
                            'Enterprise-ready self-hosting',
                            'Browser-based documentation platform',
                            'AI Search, AI Chat, MCP',
                            'Built-in diagramming tools'
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
            cssSelector: ['.main-content', '.desc', '.vs-docmost-faq'],
        },
        dateModified: new Date().toISOString().split('T')[0],
    };

    const faqSchema = {
        '@type': 'FAQPage',
        mainEntity: vsDocmostFAQs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return {
        '@context': 'https://schema.org',
        '@graph': [webPageSchema, faqSchema],
    };
}

const points = [
    {
        text: 'AI Meeting Notes',
        appflowy: true,
    },
    {
        text: 'AI Transcripts',
        appflowy: true,
    },
    {
        text: 'External guest editors',
        appflowy: true,
    },
    {
        text: 'Publish pages',
        appflowy: true,
    },
    {
        text: 'Database Relations and Rollups',
        appflowy: true,
    },
    {
        text: 'Database Calculations',
        appflowy: true,
    },
    {
        text: 'Database Templates',
        appflowy: true,
    },
    {
        text: 'Database row as a page',
        appflowy: true,
    },
    {
        text: 'Linked view of a data source',
        appflowy: true,
    },
    {
        text: 'Calendar, Gallery, Feed, List, Chart database views',
        appflowy: true,
    },
    {
        text: 'Task reminders',
        appflowy: true,
    },
    {
        text: 'Native desktop and mobile apps',
        appflowy: true,
    },
    {
        text: 'White labeling',
        appflowy: true,
    },
    {
        text: 'Official Helm chart',
        appflowy: true,
    },
    {
        text: 'Self-Hosted',
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
        competitor: true,
        appflowy: true,
    },
    {
        text: 'Inline comments',
        competitor: true,
        appflowy: true,
    },
    {
        text: 'Local AI support',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'SSO/SAML',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'User provisioning (SCIM)',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'LDAP integration',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'Audit logs',
        appflowy: true,
        competitor: true,
    },
    {
        text: 'Air-gapped ready',
        appflowy: true,
        competitor: true,
    },
];

function Page() {
    return (
        <>
            <Script id='ld-json' type='application/ld+json'>
                {JSON.stringify(generateListSchema())}
            </Script>
            <div className={'vs-notion-page'}>
                <div className={'af-container'}>
                    <div className={'af-box section-1'}>
                        <HeroApps competitorName='Docmost' competitorImage={DocmostImage} />
                        <div className={'main-content'}>
                            <h1 className='text-style-h1'>The Best On-Premises Notion Alternative</h1>
                        </div>
                        <HeroChips
                            items={[
                                'Self-hosted',
                                'Knowledge base',
                                'Project management',
                                'Relational database',
                                'All-in-one workspace',
                                'Cross-platform apps',
                            ]}
                        />
                        <SelfHostLink />
                    </div>
                </div>
                <div className={'af-container'}>
                    <div className={'af-box section-2'}>
                        <h2 className={'section-2-title'}>
                            {`Why AppFlowy is the better choice for `}
                            <span className={'text-primary'}>your team</span>
                            <br />
                        </h2>
                        <FeatureCards
                            items={[
                                {
                                    title: 'AI Workspace',
                                    description: 'AI Meeting Notes, AI Writers, and AI Search. Run local models offline or connect a self-hosted LLM.',
                                },
                                {
                                    title: 'Projects & Databases',
                                    description: 'Capture every detail in a database. Visualize in various formats, from calendars to boards.',
                                },
                                {
                                    title: 'Cross-platform',
                                    description: 'Works consistently across platforms your team works on, including desktop and mobile',
                                },
                            ]}
                        />
                        <ComparisonTable competitorName='Docmost' competitorImage={DocmostImage} points={points} />
                    </div>
                </div>
                <div className={'vs-docmost-faq'}>
                    <QASection items={vsDocmostFAQs} />
                </div>

                <GetStart />
            </div>
        </>
    );
}

export default Page;
