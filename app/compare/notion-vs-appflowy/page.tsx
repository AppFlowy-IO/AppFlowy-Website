import GetStart from '@/components/product/get-start';
import ImportLink from '@/components/vs-notion/import-link';
import NotionImage from '@/assets/images/vs-notion/notion.svg';
import { Metadata } from 'next';
import Script from 'next/script';

import React from 'react';
import 'styles/vs-notion.scss';
import { QASection } from '../components/qa-section';
import { ComparisonTable } from '../components/comparison-table';
import { FeatureCards } from '../components/feature-cards';
import { HeroGlow, HeroIconGrid } from '../components/hero-background';
import { HeroChips } from '../components/hero-chips';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;
const title = 'Notion vs AppFlowy | The #1 Self-Hosted, Open-Core Notion Alternative is AppFlowy';
const description = 'Discover why AppFlowy is the best self-hosted, open-core Notion alternative. Compare offline mode, self-hosting, local AI, and full data ownership.';

const vsNotionFAQs = [
  {
    id: 'vs-notion-1',
    question: 'What is the biggest difference between Notion and AppFlowy?',
    answer:
      "While Notion locks teams into a rigid, proprietary cloud, AppFlowy delivers complete data sovereignty through a modular, self-hosted workspace built to fit your exact infrastructure.\n\nAppFlowy gives organizations complete control over where their data lives, how it is stored, and how the platform is deployed. Teams can run AppFlowy on their own infrastructure, in their preferred cloud region, or even in fully air-gapped environments. This ensures teams remain in full control of their data, allowing organizations to meet their own security, compliance, residency, and retention requirements.\n\nAppFlowy features a highly modular architecture that seamlessly integrates into your existing IT system via configurable services such as custom authentication, local and on-prem LLMs, public APIs, storage, and white-label applications. This extensible design empowers enterprise teams to tailor AppFlowy directly to their tech stack.\n\nNotion is a proprietary SaaS platform that requires organizations to cede control over their data, infrastructure, and feature roadmap. As teams accumulate more data within the platform, they often find themselves deeply locked in, making future migration increasingly difficult. Furthermore, its one-size-fits-all approach lacks the flexibility required to integrate into an enterprise's existing infrastructure. For organizations that own their stack and data, AppFlowy is the clear choice over Notion.",
  },
  {
    id: 'vs-notion-2',
    question: 'Can I self-host AppFlowy? Can I self-host Notion?',
    answer:
      'Yes, AppFlowy can be fully self-hosted and deployed on infrastructure you control.\n\nOrganizations can self-host AppFlowy using Docker, Kubernetes, or their preferred infrastructure stack while maintaining complete control over networking, storage, authentication, backups, and security policies. Teams can also choose which components to enable, including AI services, object storage providers, and external integrations.\n\nMost organizations can get AppFlowy running in under 30 minutes using our deployment guides and video tutorials, while still retaining the flexibility to customize the architecture as their requirements evolve.\n\nNotion cannot be self-hosted. All Notion plans, including Enterprise, are delivered as a fully managed out-of-the-box SaaS service.',
  },
  {
    id: 'vs-notion-3',
    question: 'Can AppFlowy fully replace Notion?',
    answer: "For many organizations and individuals, yes.\n\nAppFlowy provides collaborative documents, wikis, project management, databases, AI capabilities, and workspace management features that cover the majority of workflows teams use Notion for today.\n\nAppFlowy offers capabilities that many organizations require but cannot achieve with Notion, including self-hosting, deployment flexibility, local and on-prem AI, infrastructure ownership, offline workspace, and deep customization.\n\nAppFlowy's database system has evolved rapidly and now includes advanced filters, two-way relations, rollups, calculations, templates, and multiple database views. Combined with a rich-text editor that supports 40+ content types, AppFlowy can support a wide range of knowledge management and operational workflows.\n\nOrganizations that rely heavily on Notion's most advanced ecosystem integrations or specific database views such as Timeline and Map views may still find limitations today, but AppFlowy continues to close that gap with every release.",
  },
  {
    id: 'vs-notion-4',
    question: 'Can I run AI locally in AppFlowy? Can I run AI locally in Notion?',
    answer:
      "Yes, you can run local AI via Ollama or LMStudio in AppFlowy.\n\nThis flexibility is especially valuable for organizations with security, compliance, or data residency requirements.\n\nNotion AI, by contrast, currently relies on third-party, cloud-hosted AI services and does not support running AI models locally on your own infrastructure.\n\nAppFlowy allows organizations to connect local and self-hosted AI models, enabling AI-powered workflows without sending sensitive information to external providers. Teams can choose the AI models they use, where those models run, and whether AI features are enabled at all.",
  },
  {
    id: 'vs-notion-5',
    question: "What unique AI features does AppFlowy offer that Notion doesn't support?",
    answer: "Vault Workspace is a special AI workspace type that Notion doesn't support. It provides a full-featured AI that runs entirely on your device, a rich-text editor that supports 40+ content types and database views for organizing information, and local AI search that answers questions fully offline without a single byte leaving your vault. It is designed for professionals, such as portfolio managers, healthcare consultants, and high-tech research scientists, who need maximum control over sensitive data.\n\nThis combination of local storage, offline access, and locally running AI provides a level of privacy and data ownership that is difficult to achieve with traditional cloud-first workspace platforms.\n\nNotion does not offer an equivalent workspace type that combines local data storage with support for locally hosted AI models."
  },
  {
    id: 'vs-notion-6',
    question: "How do AppFlowy's databases compare to Notion's?",
    answer: "AppFlowy's database capabilities have advanced significantly and are among the most feature-complete options available for organizations seeking a self-hosted alternative to Notion.\n\nAppFlowy currently supports: Grid (table), Kanban, Calendar, Gallery, List, Feed, Chart views, along with Advanced filters, Two-way relations, Rollups, Calculations, Database templates, Grouping and Sorting options, Linked views of data source, Multi-row bulk actions.\n\nFor most project management, CRM, wiki, operations, and knowledge management use cases, AppFlowy's databases provide everything teams need. Notion still maintains an advantage with Timeline and Map views. However, AppFlowy is actively investing in database development and continues to close the remaining feature gaps while offering deployment flexibility and data ownership that Notion cannot provide.",
  },
  {
    id: 'vs-notion-7',
    question: "Can I migrate from Notion to AppFlowy?",
    answer: "Yes. AppFlowy provides tools to help individuals and organizations migrate existing content from Notion. AppFlowy provides the most complete Notion migration experience among other self-hosted alternatives.\n\nYou can import pages, documents, databases, and workspace content from Notion into AppFlowy, allowing teams to transition without rebuilding their knowledge base from scratch. For most organizations, migration is a gradual process where teams can evaluate AppFlowy, import existing content, and move workflows over time.\n\nAppFlowy has already successfully migrated numerous teams off Notion without ever touching their data, fully preserving their pages, databases, and media with higher reliability. Enterprise teams with large workspaces can contact AppFlowy directly to receive hands-on migration assistance.\n\nAppFlowy continues to improve migration tooling and compatibility to make switching from Notion as seamless as possible, while providing additional benefits such as self-hosting, data ownership, local LLMs, and deployement flexibility."
  }
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    alternates: {
      canonical: `${site_url}/compare/notion-vs-appflowy`,
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
      url: `${site_url}/compare/notion-vs-appflowy`,
      type: 'article',
      siteName: 'AppFlowy',
      publishedTime: '2024-10-14T00:00:00Z',
      modifiedTime: new Date().toISOString(),
      images: [
        {
          url: `${site_url}/blog-og-image.png`,
          width: 1200,
          height: 630,
          alt: 'The Best Self-Hosted Notion Alternative - AppFlowy',
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
      'best notion alternative',
      'leading self-hostable notion alternative',
      'leading notion alternative',
      'free notion alternative',
      'offline notion alternative',
      'best self-hosted notion alternative',
      'top notion alternative',
      'appflowy vs notion',
      'notion vs appflowy',
      'self-host notion alternative',
      'notion alternative air-gapped',
      'notion alternative local ai',
      'notion alternative local llm',
      'open-core notion alternative',
      'local ai notion alternative',
      'easy to self-host notion alternative',
      'deploy anywhere notion alternative',
      'privacy-focused notion alternative',
    ],
  };
}

function generateListSchema() {
  const webPageSchema = {
    '@type': ['WebPage', 'ItemPage'],
    name: title,
    description: description,
    url: `${site_url}/compare/notion-vs-appflowy`,
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
            name: 'Notion',
            applicationCategory: 'ProductivityApplication',
            operatingSystem: 'Windows, macOS, Linux, Android, iOS, Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: 'Free plan available; paid plans from $10/user/month',
            },
            featureList: [
              'Cloud-based workspace',
              'Linked databases and rollups',
              'Notion AI (add-on)',
              'Third-party integrations',
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
      cssSelector: ['.main-content', '.desc', '.vs-notion-faq'],
    },
    dateModified: new Date().toISOString().split('T')[0],
  };

  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: vsNotionFAQs.map(faq => ({
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
    text: 'Self-hosted',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Complete data control',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Local and on-prem LLM support',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Open-core',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Customization and extensibility',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Offline workspace',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Native desktop & mobile apps',
    competitor: false,
    appflowy: true,
  },
  {
    text: 'Collaborative editing',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Relational databases',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Kanban, calendar, gallery views',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'AI chat, writing, summary',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'AI meeting notes',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Version history',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Granular permissions',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Block-based editor',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Hierarchical docs/wiki structure',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'Inline comments',
    competitor: true,
    appflowy: true,
  },
  {
    text: 'SSO/SAML',
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
            <HeroGlow />
            <HeroIconGrid competitorName='Notion' competitorImage={NotionImage} />
            <div className={'main-content'}>
              <h1 className='text-style-h1'>The #1 Self-Hosted Notion Alternative</h1>
            </div>
            <HeroChips items={['Open-Core', 'Self-hosted', 'Local and on-prem AI', 'Cross platform']} />
            <ImportLink importBaseURL={importBaseURL} />
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
            <FeatureCards
              items={[
                {
                  title: 'On-prem and local AI',
                  description: "AI on your terms, not your vendor's. Run local models offline or connect a self-hosted LLM.",
                },
                {
                  title: 'Deploy Anywhere',
                  description: 'Run AppFlowy on your hardware, your cloud region, or in a fully air-gapped environment.',
                },
                {
                  title: 'Cross-platform',
                  description: 'Works consistently across platforms your team works on, including completely offline.',
                },
              ]}
            />
            <ComparisonTable competitorName='Notion' competitorImage={NotionImage} points={points} />
          </div>
        </div>
        <div className={'vs-notion-faq'}>
          <QASection items={vsNotionFAQs} />
        </div>

        <GetStart />
      </div>
    </>
  );
}

export default Page;
