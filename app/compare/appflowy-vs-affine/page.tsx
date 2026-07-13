import Object1 from '@/assets/images/vs-notion/OBJECTS-1.png';
import Object2 from '@/assets/images/vs-notion/OBJECTS-2.png';
import Object3 from '@/assets/images/vs-notion/OBJECTS-4.png';
import GetStart from '@/components/product/get-start';
import ImportLink from '@/components/vs-notion/import-link';
import AFFiNEImage from '@/assets/images/vs-notion/AFFiNE.svg';
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
const title = 'AppFlowy vs. AFFiNE: The Best Self-Hosted Notion Alternative for Enterprise Teams';
const description = 'A practical comparison of collaboration, permissions, identity management, self-hosting, databases, AI, and data control for enterprise teams.';

const vsAFFiNEFAQs = [
    {
        id: 'vs-AFFiNE-1',
        question: 'What is the best self-hosted Notion alternative for enterprise teams?',
        answer:
            'AppFlowy is one of the best self-hosted Notion alternatives for enterprise teams that need data ownership, structured databases, granular permissions, SAML SSO, SCIM, LDAP, audit logs, local AI, and on-prem deployment support. It is designed for organizations that want a Notion-style workspace while keeping control over their infrastructure and data.',
    },
    {
        id: 'vs-AFFiNE-2',
        question: 'Is AppFlowy more enterprise-ready than AFFiNE?',
        answer:
            'Yes. AppFlowy is more enterprise-ready than AFFiNE for organizations that need enterprise collaboration, identity management, advanced databases, auditability, publishing, self-hosting, and flexible AI deployment. AFFiNE is stronger for whiteboarding, journaling, and visual thinking, while AppFlowy is stronger for governed team workflows and structured enterprise use cases such as project management and team wikis.',
    },
    {
        id: 'vs-AFFiNE-3',
        question: 'Which is better for teams migrating from Notion: AppFlowy or AFFiNE?',
        answer: "AppFlowy is better suited for teams migrating from Notion, especially if they rely on databases for project management, CRM workflows, content calendars, product roadmaps, team wikis, or internal operations. AppFlowy has stronger database capabilities, including linked views of a data source, relations, rollups, calculations, database templates, charts, calendar view, feed view, list view, and gallery view.\n\nAFFiNE currently supports Table and Kanban views, but it is more limited for complex structured data workflows because it lacks advanced property types such as Relation, Rollup, and Formula fields, as well as critical power features such as linked views and database rows as pages that can be shared and mentioned.",
    },
    {
        id: 'vs-AFFiNE-4',
        question: 'Which tool has a better Notion importer: AppFlowy or AFFiNE?',
        answer:
            "AppFlowy has a better Notion importer for teams migrating an existing Notion workspace because it can import Notion exports while closely preserving the original structure. This is especially important for teams whose most valuable Notion data lives in databases. \n\nAFFiNE’s importer is more limited because it can lose database structure during import, which makes migration harder for teams that rely on Notion databases for project management, CRM workflows, content calendars, product roadmaps, team wikis, or internal operations.",
    },
    {
        id: 'vs-AFFiNE-5',
        question: 'Does AppFlowy support enterprise identity management?',
        answer:
            "Yes. AppFlowy supports SAML single sign-on, SCIM user provisioning, LDAP integration, and domain verification. These features help enterprise IT teams centralize authentication, automate onboarding and offboarding, and connect AppFlowy with existing identity and directory systems.",
    },
    {
        id: 'vs-AFFiNE-6',
        question: 'Does AFFiNE support SSO, SCIM, LDAP, or domain verification?',
        answer: "No. AFFiNE does not support SAML SSO, SCIM user provisioning, LDAP integration, or domain verification. This makes AFFiNE less suitable for enterprise teams that require centralized identity management and automated user lifecycle control.",
    },
    {
        id: 'vs-AFFiNE-7',
        question: 'Which open-source Notion alternative is better for enterprise self-hosting, and how do AppFlowy and AFFiNE differ in licensing?',
        answer: "AppFlowy is the stronger open-source Notion alternative for enterprise self-hosting because its core self-hosted stack does not include hidden proprietary layers or enterprise license restrictions. AppFlowy follows an open-core model, with its cloud backend under the AGPL license and its web codebase fully open source. Organizations can inspect, modify, and deploy the platform with greater transparency and control.\n\nAFFiNE’s frontend client and editor are open source.However, its backend server components are source- available under an Enterprise Edition license rather than open source under a standard open - source license.This means the backend code can be publicly reviewed, but production use, modification, compilation, and redistribution of the EE - licensed backend require commercial authorization.",
    },
    {
        id: 'vs-AFFiNE-8',
        question: 'Does AppFlowy support Helm chart deployment for enterprise self-hosting?',
        answer: "Yes. AppFlowy provides an official Helm chart, making it easier for enterprise teams to deploy and manage AppFlowy on Kubernetes. This gives infrastructure teams a more standardized, repeatable deployment path for self-hosted environments. AFFiNE does not provide an official Helm chart, which makes AppFlowy a stronger fit for organizations that require Kubernetes-based deployment workflows.",
    },
    {
        id: 'vs-AFFiNE-9',
        question: 'Which tool is better for privacy-conscious enterprise teams?',
        answer: "AppFlowy is better suited for privacy-conscious enterprise teams because it supports self-hosting, local AI, on-prem LLMs, no telemetry, granular permissions, and enterprise identity management. These capabilities give organizations stronger control over workspace data, usage data, AI workflows, and infrastructure.\n\nAFFiNE collects telemetry by default, including functionality usage, program errors, and crash data. Users can opt out in Settings, and self- hosted deployments can disable telemetry through environment variables.",
    },
    {
        id: 'vs-AFFiNE-10',
        question: 'Why should enterprises choose AppFlowy over AFFiNE?',
        answer: "Enterprises should choose AppFlowy over AFFiNE if they need self-hosting, advanced databases, external guest editors, granular permissions, SSO, SCIM, LDAP, audit logs, local AI, on-prem LLMs, publishing, custom domains, PDF export, and stronger data ownership. AFFiNE is a good fit for personal productivity, whiteboarding, and daily journaling, but AppFlowy is better aligned with enterprise workspace requirements.",
    },
    {
        id: 'vs-AFFiNE-11',
        question: 'Is AppFlowy a better enterprise collaboration tool than AFFiNE?',
        answer: "Yes, AppFlowy is a better collaboration tool especially for enterprise teams because it provides features such as External guest editors, granular permissions, SSO, SCIM, and LDAP. External guest editing is essential for enterprise collaboration while restricting access only to selected pages. Workspace owners can now queue guest invitations that require admin approval before the invite email is sent. Admins receive email notifications for new pending requests and can review, approve, or reject invites from the admin dashboard. For enterprise it is quintessential to limit access to information within the organization, this is where AppFlowy's granular permissions helps enterprise organizations. AppFlowy supports user provisioning and single sign on methods that makes it easy for enterprise teams to onboard new members or remove existing ones. \n\nWhile both AppFlowy and AFFiNE offer collaborative document editing, AppFlowy proves out to be the better collaboration tool for enterprises.",
    },
    {
        id: 'vs-AFFiNE-12',
        question: 'Should I choose AppFlowy or AFFiNE?',
        answer: "Choose AFFiNE if your main priorities are whiteboarding, journaling, personal knowledge management, and visual thinking. AFFiNE is a good fit for individuals or families that want a flexible workspace for notes, brainstorming, and creative ideation.\n\nChoose AppFlowy if you need a more complete Notion alternative for project management, team wikis, databases, and enterprise collaboration.AppFlowy is better suited for teams that need Notion- style databases, external guest collaboration, publishing, and enterprise - grade features such as SAML SSO, SCIM, audit logs, and granular permissions.\n\nIn short, AFFiNE is stronger for visual and personal workflows, while AppFlowy is stronger for structured work, team collaboration, and enterprise - ready self - hosted deployments.",
    },
];

export async function generateMetadata(): Promise<Metadata> {
    return {
        title,
        description,
        alternates: {
            canonical: `${site_url}/compare/AFFiNE-vs-appflowy`,
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
            url: `${site_url}/compare/AFFiNE-vs-appflowy`,
            type: 'article',
            siteName: 'AppFlowy',
            publishedTime: new Date().toISOString(),
            modifiedTime: new Date().toISOString(),
            images: [
                {
                    url: `${site_url}/blog-og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: 'AppFlowy vs. AFFiNE: The Best Self-Hosted Notion Alternative',
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
            'appflowy vs AFFiNE',
            'AFFiNE comparison',
            'best self-hosted Notion alternative',
            'self-hosted productivity app',
            'AFFiNE review',
            'best notion alternative',
            'open core notion alternative',
            'self-hosted workspace',
            'local first productivity',
            'privacy focused workspace',
            'enterprise collaboration tool',
            'enterprise project management',
            'enterprise team wiki',
            'enterprise knowledge management',

        ],
    };
}

function generateListSchema() {
    const webPageSchema = {
        '@type': ['WebPage', 'ItemPage'],
        name: title,
        description: description,
        url: `${site_url}/compare/AFFiNE-vs-appflowy`,
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
                        'Fully open-core (AGPL)',
                        'Enterprise-ready self-hosting',
                        'Complete data ownership',
                        'Multiple database views (Grid, Kanban, Calendar, Gallery, List, Feed, Chart)',
                        'Granular permissions, SAML SSO, SCIM, LDAP, audit logs',
                        'Full AI features with on-prem & local LLMs',
                    ],
                },
                {
                    '@type': 'SoftwareApplication',
                    position: 2,
                    name: 'AFFiNE',
                    applicationCategory: 'ProductivityApplication',
                    operatingSystem: 'All',
                    featureList: [
                        'Proprietary backend server',
                        'Canvas/whiteboard integration',
                        'Personal knowledge management and journaling',
                        'Basic Table and Kanban views',
                        'No support for SAML SSO, SCIM, LDAP, or audit logs',
                        'Limited AI features with local LLMs'
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
            cssSelector: ['.main-content', '.desc', '.vs-affine-faq'],
        },
        dateModified: new Date().toISOString().split('T')[0],
    };

    const faqSchema = {
        '@type': 'FAQPage',
        mainEntity: vsAFFiNEFAQs.map(faq => ({
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
        text: 'Space level granular permissions',
        appflowy: true,
    },
    {
        text: 'SAML single sign on (SSO)',
        appflowy: true,
    },
    {
        text: 'User provisioning (SCIM)',
        appflowy: true,
    },
    {
        text: 'External guest editors',
        appflowy: true,
    },
    {
        text: 'Guest invite requests',
        appflowy: true,
    },
    {
        text: 'Audit logs',
        appflowy: true,
    },
    {
        text: 'LDAP integration',
        appflowy: true,
    },
    {
        text: 'Customizable LLM embeddings',
        appflowy: true,
    },
    {
        text: 'Domain verification',
        appflowy: true,
    },
    {
        text: 'AI search with self-hosted LLMs',
        appflowy: true,
    },
    {
        text: 'AI Meeting Notes with self-hosted LLMs',
        appflowy: true,
    },
    {
        text: 'AI Transcripts with self-hosted LLMs',
        appflowy: true,
    },
    {
        text: 'Calendar views',
        appflowy: true,
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
        text: 'Form views',
        appflowy: true,
    },
    {
        text: 'Feed views',
        appflowy: true,
    },
    {
        text: 'Linked views of a data source',
        appflowy: true,
    },
    {
        text: 'Database relations and rollups',
        appflowy: true,
    },
    {
        text: 'Database templates',
        appflowy: true,
    },
    {
        text: 'Publish pages',
        appflowy: true,
    },
    {
        text: 'Custom domains',
        appflowy: true,
    },
    {
        text: 'Export to PDF',
        appflowy: true,
    },
    {
        text: 'Official Helm chart',
        appflowy: true,
    },
    {
        text: 'Whiteboard',
        competitor: true,
        appflowy: false,
    },
    {
        text: 'Dedicated daily journaling',
        competitor: true,
        appflowy: false,
    },
    {
        text: 'Collaborative editing',
        competitor: true,
        appflowy: true,
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
];

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
                                src={AFFiNEImage}
                                alt={'AFFiNE'}
                                width={56}
                                height={56}
                            />
                        </div>
                        <div className={'main-content'}>
                            <h1>
                                AppFlowy vs. AFFiNE:
                                <br></br><span className={'text-primary'}>The Best Self-Hosted Notion Alternative</span>
                            </h1>
                            <p className={'desc'}>A practical comparison of collaboration, permissions, identity management, self-hosting, databases, AI, and data control for enterprise teams.</p>
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
                                    alt={'Custom on-prem AI'}
                                    width={151}
                                    height={121}
                                />
                                <div className={'card-title'}>
                                    <h4>AI Workspace</h4>
                                    <p className={'card-desc'}>
                                        AI Meeting Notes, AI Writers, AI Transcripts and AI Search with on-prem and self-hosted LLMs.
                                    </p>
                                </div>
                            </div>
                            <div className={'card'}>
                                <Image
                                    src={Object2}
                                    alt={'Projects & Databases'}
                                    width={151}
                                    height={121}
                                />

                                <div className={'card-title'}>
                                    <h4>Projects & Databases</h4>
                                    <p className={'card-desc'}>Capture every detail in a database. Visualize work in distinct formats, from calendars to boards.</p>
                                </div>
                            </div>

                            <div className={'card'}>
                                <Image
                                    src={Object3}
                                    alt={'Enterprise-grade'}
                                    width={189}
                                    height={121}
                                />

                                <div className={'card-title'}>
                                    <h4>Enterprise-grade</h4>
                                    <p className={'card-desc'}>{`Granular permissions, SAML SSO, LDAP, audit logs, custom migration, and flexible deployment.`}</p>
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
                                        {point.appflowy ?
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={'vs-affine-faq'}>
                    <QASection items={vsAFFiNEFAQs} />
                </div>

                <GetStart />
            </div>
        </>
    );
}

export default Page;
