import Object1 from '@/assets/images/vs-notion/OBJECTS-1.png';
import Object2 from '@/assets/images/vs-notion/OBJECTS-2.png';
import Object3 from '@/assets/images/vs-notion/OBJECTS-4.png';
import GetStart from '@/components/product/get-start';
import ConfluenceImage from '@/assets/images/vs-notion/confluence.svg';
import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import { Metadata } from 'next';
import Script from 'next/script';

import React from 'react';
import Image from 'next/image';
import 'styles/vs-notion.scss';
import { QASection } from '../components/qa-section';
import SelfHostLink from '../components/self-host-link';
import { ComparisonTable } from '../components/comparison-table';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;
const title = 'Confluence vs AppFlowy | The Best Self-Hosted Confluence Data Center Alternative';
const description =
  'Confluence Data Center reaches end of life in 2029. Compare AppFlowy and Confluence on infrastructure control, data ownership, local AI, and long-term self-hosting.';

const vsConfluenceFAQs = [
  {
    id: 'vs-confluence-1',
    question: 'What is the biggest difference between Confluence and AppFlowy?',
    answer:
      'The biggest difference is control over your infrastructure and data ownership.\n\nConfluence Data Center is scheduled to reach end of life on March 28, 2029, when affected Data Center products and Marketplace apps will become read-only. New customers have also been unable to purchase Data Center subscriptions since March 30, 2026. AppFlowy gives organizations a long-term path to keep their knowledge, workflows, and AI on infrastructure they control.\n\nAppFlowy can run on your own infrastructure, in a private cloud, or in fully air-gapped environments. Its modular architecture also lets enterprise teams integrate custom authentication, storage, APIs, local or on-premises AI models, and white-label applications into their existing stack.',
  },
  {
    id: 'vs-confluence-2',
    question: 'Can I self-host AppFlowy as an alternative to Confluence Data Center?',
    answer:
      'Yes. AppFlowy is a self-hosted alternative to Confluence Data Center for organizations that want to keep their data and infrastructure under their own control. It offers collaborative documents, hierarchical wikis, comments, version history, granular permissions, and many of the other core capabilities teams rely on Confluence for.\n\nAppFlowy can be fully self-hosted using Docker, Kubernetes, or your preferred infrastructure, giving your organization control over networking, storage, authentication, backups, AI services, and security policies.\n\nConfluence Data Center remains available to existing customers during Atlassian’s transition period, but it is no longer a long-term self-hosting option. New customers can no longer purchase Data Center, and existing Confluence Data Center deployments will reach end of life on March 28, 2029.',
  },
  {
    id: 'vs-confluence-3',
    question: 'Can AppFlowy replace Confluence?',
    answer:
      'For organizations that primarily use Confluence for company knowledge, documentation, project hubs, meeting notes, policies, collaborative pages, and operational workflows, AppFlowy can replace a substantial portion of the platform.\n\nAppFlowy combines collaborative documents, hierarchical wikis, comments, version history, permissions, relational databases, project workflows, and AI in one workspace.\n\nOrganizations that rely heavily on custom Confluence macros, Jira-specific automation, Marketplace apps, or bespoke Atlassian integrations should assess those dependencies before migrating.',
  },
  {
    id: 'vs-confluence-4',
    question: 'Can AppFlowy match Confluence’s real-time collaboration and permissions?',
    answer:
      'Yes. AppFlowy supports multi-user real-time document collaboration, concurrent database editing, comments, version history, and granular access controls for team environments.\n\nTeams can collaborate simultaneously across documents and databases, including live Kanban and Grid updates.',
  },
  {
    id: 'vs-confluence-5',
    question: 'How does AppFlowy compare with Confluence for project and operational databases?',
    answer:
      'Confluence Cloud provides databases with structured fields, filters, sorting, relations, saved views, and Table, Card, and Board layouts.\n\nAppFlowy offers relational databases in self-hosted deployments with Grid, Kanban, Calendar, Gallery, List, Feed, Chart, and Form views, along with linked views, full-page records, database templates, relations, and rollups.\n\nThis makes AppFlowy particularly useful for organizations that want to manage projects and operational data without moving structured business data into Confluence Cloud.',
  },
  {
    id: 'vs-confluence-6',
    question: 'Does Confluence support linked database views?',
    answer:
      'Confluence supports embedding an entire database, keeping the content dynamically connected to the source and updating automatically. However, it does not support linked views of a data source.\n\nIn Confluence, a page generally embeds a view that has been created and saved on the source database:\nOne database → multiple saved source views → pages embed those views\n\nIn AppFlowy, each linked instance can have its own view configuration while continuing to reference the same underlying data:\nOne database → multiple linked instances → each instance has independent filters, sorts, groups, properties, and layout\n\nFor example, a central Projects database could appear as:\nEngineering workspace: Kanban filtered to Team = Engineering, grouped by status\nLeadership dashboard: Table filtered to strategic projects, sorted by risk\nQuarterly planning page: Calendar or timeline filtered to the current quarter\n\nAll three views operate on the same records, but each is configured for its specific audience without adding every contextual view to the source database’s shared view list.\n\nThis is particularly useful for executive dashboards, department homepages, project hubs, OKR reviews, and cross-functional planning.',
  },
  {
    id: 'vs-confluence-7',
    question: 'Can teams track and document projects in the same database record?',
    answer:
      'Yes. In AppFlowy, every database record is also a full working page.\n\nA project can combine structured properties such as owner, status, priority, and due date with goals, requirements, milestones, risks, decisions, comments, and weekly updates.\n\nIn Confluence, a database entry can link to a separate page or live doc for detailed content. AppFlowy keeps the structured record and working document together, reducing duplication and context switching.',
  },
  {
    id: 'vs-confluence-8',
    question: 'How do database templates help standardize recurring workflows?',
    answer:
      'AppFlowy lets teams apply templates directly to database records, so every new project, incident, risk, or customer account starts with the right structure.\n\nFor example, a Project template can include objectives, scope, milestones, risks, decisions, and weekly updates, all within the project record itself.\n\nConfluence can create a separate linked page from a template, while AppFlowy keeps the structured record and working document together, reducing context switching and standardizing recurring workflows.',
  },
  {
    id: 'vs-confluence-9',
    question: 'Can Confluence connect data across databases?',
    answer:
      'Yes. Confluence Cloud supports Entry links for connecting records across databases, Entry backlinks for showing reciprocal relationships, and Entry details for displaying fields from related records.\n\nAppFlowy also supports relational databases, but related records can additionally function as full working pages containing both structured properties and detailed collaborative content.\n\nThis lets teams connect projects, tasks, customers, risks, meetings, and other business data while keeping the context and documentation attached to each record.',
  },
  {
    id: 'vs-confluence-10',
    question: 'Can teams automatically aggregate data across related records?',
    answer:
      'With AppFlowy, yes. Relational rollups can automatically summarize information from related records.\n\nFor example, a Project can aggregate task count, completion, effort, deadlines, budget, or risk from its related Tasks.\n\nConfluence can display properties from linked entries and run simple calculations within a database view, but it does not provide the same relational rollup model.\n\nRollups are particularly useful for project portfolios, OKRs, sales pipelines, incident tracking, procurement, and other workflows that require automatic cross-database reporting.',
  },
  {
    id: 'vs-confluence-11',
    question: 'Which enterprise workflows benefit most from AppFlowy’s database model?',
    answer:
      'AppFlowy is particularly useful when a business record needs to be both structured data and an evolving working document.\n\nCommon use cases include:\nProduct development and epics\nProject and portfolio management\nOKR tracking\nIncident and risk management\nCustomer and account management\nSecurity and compliance reviews\nVendor and procurement workflows\nHiring and candidate management\nRecurring team reviews and meetings\n\nTeams can track structured properties, write detailed documentation, collaborate, create tailored views, and automatically aggregate related information without maintaining separate records and pages.',
  },
  {
    id: 'vs-confluence-12',
    question: 'How do AI capabilities compare between AppFlowy and Confluence?',
    answer:
      'Both Confluence and AppFlowy provide AI capabilities for writing, chat, summaries, search, and meeting workflows.\n\nThe key difference is deployment flexibility. AppFlowy lets organizations choose and self-host their AI models, run them locally or on-premises, operate AI inside fully air-gapped environments, or disable AI entirely.\n\nThis enables teams to use AI with sensitive company knowledge while keeping data and model infrastructure within their own security boundary.',
  },
  {
    id: 'vs-confluence-13',
    question: 'How do desktop and mobile support compare?',
    answer:
      'Confluence is primarily web-based and provides native mobile apps for iOS and Android, but it does not offer a native desktop application.\n\nAppFlowy provides native desktop applications for macOS, Windows, and Linux, native mobile apps for iOS and Android, and a web app.\n\nThis gives teams more flexibility to work across devices and environments, including desktop-first and self-hosted setups.',
  },
  {
    id: 'vs-confluence-14',
    question: 'Which platform offers more customization?',
    answer:
      'AppFlowy offers more customization options, white labeling and custom domains or URLs for sharing public pages. AppFlowy users can customize fonts, font size, page width, profile cards, cursor colors, selection colors, themes, page covers, and page icons.\n\nConfluence’s customization options are more limited. Confluence does not natively support custom domains or vanity URLs for shared pages, users have to use third-party apps to achieve custom domains or URLs for Confluence. It also does not support white labeling.',
  },
  {
    id: 'vs-confluence-15',
    question: 'Should I choose AppFlowy or Confluence?',
    answer:
      'Confluence may remain the stronger choice when an organization:\nIs committed to moving fully to Atlassian Cloud\nDepends extensively on Jira-native workflows\nUses a large number of specialized Marketplace apps\nHas developed custom macros or Atlassian automations\nPrefers a single vendor for its broader Atlassian stack\n\nAppFlowy is the stronger fit when an organization prioritizes:\nLong-term self-hosting\nInfrastructure and data ownership\nAir-gapped or restricted-network deployment\nLocal and on-prem AI\nNative desktop and mobile apps alongside a stable web app\nAdvanced relational workflows\nMinimal duplication and a single source of truth with powerful database features\nReducing dependence on the Atlassian ecosystem',
  },
  {
    id: 'vs-confluence-16',
    question: 'How should an enterprise migrate from Confluence to AppFlowy?',
    answer:
      'Start by assessing how your organization uses Confluence beyond storing pages.\n\nInventory your spaces, page hierarchies, attachments, permissions, templates, macros, Jira integrations, Marketplace apps, databases, identity requirements, and operational workflows.\n\nNext, migrate a representative pilot workspace and identify which Confluence structures should be recreated directly and which workflows can be simplified using AppFlowy databases, full-page records, templates, linked views, and rollups.\n\nOnce the target setup has been validated, migrate gradually by department or workspace rather than moving the entire organization at once.\n\nAppFlowy also provides custom Confluence migration assistance for enterprise customers. Contact us to discuss your migration requirements.',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    alternates: {
      canonical: `${site_url}/compare/appflowy-vs-confluence`,
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
      url: `${site_url}/compare/appflowy-vs-confluence`,
      type: 'article',
      siteName: 'AppFlowy',
      publishedTime: '2026-08-22T00:00:00Z',
      modifiedTime: new Date().toISOString(),
      images: [
        {
          url: `${site_url}/blog-og-image.png`,
          width: 1200,
          height: 630,
          alt: 'The Best Self-Hosted Confluence Alternative - AppFlowy',
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
      'confluence alternative',
      'confluence data center alternative',
      'confluence data center end of life',
      'self-hosted confluence alternative',
      'best confluence alternative',
      'open-core confluence alternative',
      'appflowy vs confluence',
      'confluence vs appflowy',
      'self-host confluence alternative',
      'confluence alternative air-gapped',
      'confluence alternative local ai',
      'confluence alternative local llm',
      'local ai confluence alternative',
      'easy to self-host confluence alternative',
      'deploy anywhere confluence alternative',
      'privacy-focused confluence alternative',
      'atlassian data center alternative',
    ],
  };
}

function generateListSchema() {
  const webPageSchema = {
    '@type': ['WebPage', 'ItemPage'],
    name: title,
    description: description,
    url: `${site_url}/compare/appflowy-vs-confluence`,
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
              'Self-hosted with Docker, Kubernetes, or air-gapped deployment',
              'Local and on-prem LLM support',
              'Customization and extensibility',
              'Complete data ownership',
              'Deploy anywhere',
              'End-to-end data privacy',
            ],
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Confluence',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'Windows, macOS, Android, iOS, Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: 'Free plan available; paid Cloud and Data Center plans',
            },
            featureList: [
              'Cloud-based and Data Center workspace',
              'Linked and embedded databases',
              'Confluence AI (add-on)',
              'Atlassian Marketplace integrations',
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
      cssSelector: ['.main-content', '.desc', '.vs-confluence-faq'],
    },
    dateModified: new Date().toISOString().split('T')[0],
  };

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: vsConfluenceFAQs.map(faq => ({
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
    text: 'Supported long-term self-hosting',
    competitor: 'Data Center becomes read-only on March 28, 2029',
    appflowy: true,
  },
  {
    text: 'Available to new self-hosted customers',
    competitor: 'No. New Data Center sales ended March 30, 2026',
    appflowy: true,
  },
  {
    text: 'Fully air-gapped deployment',
    competitor: 'Data Center only, through its remaining lifecycle',
    appflowy: true,
  },
  {
    text: 'Open-core',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Local and on-prem LLM support',
    competitor: 'No native local LLM execution; Rovo is a cloud service',
    appflowy: true,
  },
  {
    text: 'Native Jira and Atlassian ecosystem integration',
    competitor: 'Extensive',
    appflowy: 'More limited',
  },
  {
    text: 'Database layouts',
    competitor: 'Table, Card, Board',
    appflowy: 'Grid, Kanban, Calendar, Gallery, List, Feed, Chart, Form',
  },
  {
    text: 'Independent linked views of one data source',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Database entry is a full page',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Apply templates directly to database entries',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Relations between databases',
    competitor: 'Entry links and backlinks',
    appflowy: 'Two-way relations',
  },
  {
    text: 'Database Rollups',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Database templates',
    competitor: 'Templates for database creation; linked page templates',
    appflowy: 'Templates applied directly to database records',
  },
  {
    text: 'AI search with self-hosted AI',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'AI Meeting Notes with self-hosted AI',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'AI Transcripts with self-hosted AI',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Desktop Apps',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'White Labeling',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Collaborative editing',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'SSO and SAML',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Version history',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Hierarchical documents and wikis',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Inline comments',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Whiteboards',
    competitor: true,
    appflowy: false,
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
                src={ConfluenceImage}
                alt={'Confluence'}
                width={56}
                height={56}
              />
            </div>
            <div className={'main-content'}>
              <h1>
                The #1 Self-Hosted <span className={'text-primary'}>Confluence Alternative</span>
              </h1>
              <p className={'desc'}>Open-Core, self-hosted, local and on-prem AI, cross platform</p>
            </div>
            <SelfHostLink />
          </div>
        </div>
        <div className={'af-container'}>
          <div className={'af-box section-2'}>
            <h2 className={'section-2-title'}>
              {`Enjoy the `}
              <span className={'text-primary'}>flexibility</span>
              <br />
              without losing control of your data
            </h2>
            <div className={'cards'}>
              <div className={'card'}>
                <Image
                  src={Object2}
                  alt={'Self-host for the long term'}
                  width={151}
                  height={121}
                />

                <div className={'card-title'}>
                  <h4>Self-host for the long term</h4>
                  <p className={'card-desc'}>Run AppFlowy on your hardware, your cloud region, or in a fully air-gapped environment.</p>
                </div>
              </div>

              <div className={'card'}>
                <Image
                  src={Object3}
                  alt={'Beyond pages & macros'}
                  width={189}
                  height={121}
                />

                <div className={'card-title'}>
                  <h4>Beyond pages & macros</h4>
                  <p className={'card-desc'}>{`Manage projects in one workspace with relational databases, full-page database records, linked views, templates, and rollups.`}</p>
                </div>
              </div>

              <div className={'card'}>
                <Image
                  src={Object1}
                  alt={'On-prem and local AI'}
                  width={151}
                  height={121}
                />
                <div className={'card-title'}>
                  <h4>On-prem and local AI</h4>
                  <p className={'card-desc'}>
                    Use local or self-hosted AI while keeping sensitive workspace data in your own infrastructure.
                  </p>
                </div>
              </div>
            </div>
            <ComparisonTable competitorName='Confluence' competitorImage={ConfluenceImage} points={points} />
          </div>
        </div>
        <div className={'vs-confluence-faq'}>
          <QASection items={vsConfluenceFAQs} />
        </div>

        <GetStart />
      </div>
    </>
  );
}

export default Page;
