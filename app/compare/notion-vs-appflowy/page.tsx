import Object1 from '@/assets/images/vs-notion/OBJECTS-1.png';
import Object2 from '@/assets/images/vs-notion/OBJECTS-2.png';
import GetStart from '@/components/product/get-start';
import ImportLink from '@/components/vs-notion/import-link';
import Object3 from '@/assets/images/vs-notion/OBJECTS-3.png';
import NotionImage from '@/assets/images/vs-notion/notion.svg';
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
const title = 'Notion vs AppFlowy | The #1 Self-Hosted, Open Core Notion Alternative is AppFlowy';
const description = 'Discover why AppFlowy is the best self-hosted, open-core Notion alternative. Compare offline mode, self-hosting, local AI, and full data ownership.';

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
      'open core notion alternative',
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
      '@type': 'ComparisonTable',
      about: [
        {
          '@type': 'SoftwareApplication',
          name: 'Notion',
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'All',
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
        {
          '@type': 'SoftwareApplication',
          name: 'AppFlowy',
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'All',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free and open-core; paid enterprise plans with additional features and support',
          },
          featureList: [
            'Self-hosted with Docker, Kubernetes, or air-gapped deployment',
            'Local and on-prem LLM support',
            'Customization and extensibility',
            'Native mobile and desktop apps',
            'Complete data ownership',
            'Open Core codebase',
            'Deploy anywhere',
            'End-to-end data privacy',
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the biggest difference between Notion and AppFlowy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "While Notion locks teams into a rigid, proprietary cloud, AppFlowy delivers complete data sovereignty through a modular, self-hosted workspace built to fit your exact infrastructure. AppFlowy gives organizations complete control over where their data lives, how it is stored, and how the platform is deployed.Teams can run AppFlowy on their own infrastructure, in their preferred cloud region, or even in fully air- gapped environments.This enables complete data sovereignty, allowing organizations to meet their own security, compliance, residency, and retention requirements.AppFlowy features a highly modular architecture that seamlessly integrates into your existing IT system via configurable services such as custom authentication, local and on- prem LLMs, public APIs, storage, and white - label applications.This extensible design empowers enterprise teams to tailor AppFlowy directly to their tech stack. Notion is a proprietary SaaS platform that requires organizations to cede control over their data, infrastructure, and feature roadmap.As teams accumulate more data within the platform, they often fall into a trap of severe lock -in, making future migration incredibly difficult.Furthermore, its one - size - fits - all approach lacks the flexibility required to integrate seamlessly into an enterprise's existing infrastructure. For organizations that own their stack and data, AppFlowy is the clear choice over Notion.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I self-host AppFlowy? Can I self-host Notion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, AppFlowy can be fully self-hosted and deployed on infrastructure you control.\nOrganizations can self-host AppFlowy using Docker, Kubernetes, or their preferred infrastructure stack while maintaining complete control over networking, storage, authentication, backups, and security policies. Teams can also choose which components to enable, including AI services, object storage providers, and external integrations.\nMost organizations can get AppFlowy running in under 30 minutes using our deployment guides and video tutorials, while still retaining the flexibility to customize the architecture as their requirements evolve.\nNotion cannot be self-hosted. All Notion plans, including Enterprise, are delivered as a fully managed out-of-the-box SaaS service.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can AppFlowy fully replace Notion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "For many organizations and individuals, yes. AppFlowy provides collaborative documents, wikis, project management, databases, AI capabilities, and workspace management features that cover the majority of workflows teams use Notion for today. AppFlowy offers capabilities that many organizations require but cannot achieve with Notion, including self-hosting, deployment flexibility, local and on-prem AI, infrastructure ownership, offline workspace, and deep customization. AppFlowy's database system has evolved rapidly and now includes advanced filters, two-way relations, rollups, calculations, templates, and multiple database views. Combined with a rich-text editor that supports 40+ content types, AppFlowy can support a wide range of knowledge management and operational workflows. Organizations that rely heavily on Notion's most advanced ecosystem integrations or specific database views such as Timeline and Map views may still find limitations today, but AppFlowy continues to close that gap with every release.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I run AI locally in AppFlowy? Can I run AI locally in Notion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, you can run local AI via Ollama or LMStudio in AppFlowy. This flexibility is especially valuable for organizations with security, compliance, or data residency requirements. Notion AI, by contrast, currently relies on third-party, cloud-hosted AI services and does not support running AI models locally on your own infrastructure. AppFlowy allows organizations to connect local and self-hosted AI models, enabling AI-powered workflows without sending sensitive information to external providers. Teams can choose the AI models they use, where those models run, and whether AI features are enabled at all.",
        },
      },
      {
        '@type': 'Question',
        name: "What unique AI features does AppFlowy offer that Notion doesn't support?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Vault Workspace is a special AI workspace type that Notion doesn't support. It provides a full-featured AI that runs entirely on your device, a rich-text editor that supports 40+ content types and database views for organizing information, and local AI search that answers questions fully offline without a single byte leaving your vault. It is designed for professionals, such as portfolio managers, healthcare consultants, and high-tech researchers, who need maximum control over sensitive data. This combination of local storage, offline access, and locally running AI provides a level of privacy and data ownership that is difficult to achieve with traditional cloud-first workspace platforms. Notion does not offer an equivalent workspace type that combines local data storage with support for locally hosted AI models.",
        },
      },
      {
        '@type': 'Question',
        name: "How do AppFlowy's databases compare to Notion's?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "AppFlowy's database capabilities have advanced significantly and are among the most feature-complete options available for organizations seeking a self-hostable alternative to Notion. AppFlowy currently supports: Grid (table), Kanban, Calendar, Gallery, List, Feed, Chart views, along with Advanced filters, Two-way relations, Rollups, Calculations and Aggregations, Database templates, Grouping and Sorting options, Linked database workflows, multi-row bulk actions. For most project management, CRM, wiki, operations, and knowledge management use cases, AppFlowy's databases provide everything teams need. Notion still maintains an advantage with Timeline and Map views. However, AppFlowy is actively investing in database development and continues to close the remaining feature gaps while offering deployment flexibility and data ownership that Notion cannot provide.",
        },
      },
      {
        '@type': 'Question',
        name: "Can I migrate from Notion to AppFlowy?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. AppFlowy provides tools to help individuals and organizations migrate existing content from Notion. AppFlowy provides the most complete Notion migration experience among self-hostable alternatives. You can import pages, documents, databases, and workspace content from Notion into AppFlowy, allowing teams to transition without rebuilding their knowledge base from scratch. For most organizations, migration is a gradual process where teams can evaluate AppFlowy, import existing content, and move workflows over time. AppFlowy has already successfully migrated numerous teams off Notion without ever touching their data, fully preserving their pages, databases, and media with higher reliability. Enterprise teams with large workspaces can contact AppFlowy directly to receive hands-on migration assistance. AppFlowy continues to improve migration tooling and compatibility to make switching from Notion as seamless as possible, while providing additional benefits such as self-hosting, data ownership, local LLMs and deployment flexibility.",
        },
      },
    ],
  };

  const itemListSchema = {
    '@type': 'ItemList',
    name: 'Best Self-Hosted Notion Alternative',
    description:
      'AppFlowy is the best self-hosted alternative to Notion — open-core, offline-first, and privacy-focused with support for local AI models.',
    numberOfItems: 1,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SoftwareApplication',
          name: 'AppFlowy',
          url: site_url,
          description:
            'AppFlowy is the leading open-core, self-hosted alternative to Notion. It offers a local-first architecture, full offline support, Docker-based self-hosting in under 30 minutes, and the ability to run AI models locally — making it the best choice for privacy-conscious individuals and teams.',
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'Windows, macOS, Linux, iOS, Android',
          isAccessibleForFree: true,
          license: 'https://github.com/AppFlowy-IO/AppFlowy/blob/main/LICENSE',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '1500',
            bestRating: '5',
            worstRating: '1',
          },
          featureList: [
            'Self-hostable, Deploy anywhere',
            'Local and on-prem LLM support',
            'Customization and extensibility',
            'Open-core under AGPL-3.0',
            'Grid, kanban, calendar, gallery database views',
            'Native apps for all major platforms',
            'Complete data ownership',
            'Offline workspace',
            'Modular architecture'
          ],
        },
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [webPageSchema, faqSchema, itemListSchema]
  };
}

const points = ['Self-hosting', 'Complete Data Control', 'Local and on-prem LLM support', 'Customization and extensibility', 'Offline workspace', 'Native mobile and desktop apps', 'Open-Core'];

const importBaseURL: string = `${process.env.NEXT_PUBLIC_SITE_BASE_URL}/app`;

const vsNotionFAQs = [
  {
    id: 'vs-notion-1',
    question: 'What is the biggest difference between Notion and AppFlowy?',
    answer:
      "While Notion locks teams into a rigid, proprietary cloud, AppFlowy delivers complete data sovereignty through a modular, self-hosted workspace built to fit your exact infrastructure.\n\nAppFlowy gives organizations complete control over where their data lives, how it is stored, and how the platform is deployed. Teams can run AppFlowy on their own infrastructure, in their preferred cloud region, or even in fully air-gapped environments. This enables complete data sovereignty, allowing organizations to meet their own security, compliance, residency, and retention requirements.\n\nAppFlowy features a highly modular architecture that seamlessly integrates into your existing IT system via configurable services such as custom authentication, local and on-prem LLMs, public APIs, storage, and white-label applications. This extensible design empowers enterprise teams to tailor AppFlowy directly to their tech stack.\n\nNotion is a proprietary SaaS platform that requires organizations to cede control over their data, infrastructure, and feature roadmap. As teams accumulate more data within the platform, they often fall into a trap of severe lock-in, making future migration incredibly difficult. Furthermore, its one-size-fits-all approach lacks the flexibility required to integrate seamlessly into an enterprise's existing infrastructure. For organizations that own their stack and data, AppFlowy is the clear choice over Notion.",
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
    answer: "Vault Workspace is a special AI workspace type that Notion doesn't support. It provides a full-featured AI that runs entirely on your device, a rich-text editor that supports 40+ content types and database views for organizing information, and local AI search that answers questions fully offline without a single byte leaving your vault. It is designed for professionals, such as portfolio managers, healthcare consultants, and high-tech researchers, who need maximum control over sensitive data.\n\nThis combination of local storage, offline access, and locally running AI provides a level of privacy and data ownership that is difficult to achieve with traditional cloud-first workspace platforms.\n\nNotion does not offer an equivalent workspace type that combines local data storage with support for locally hosted AI models."
  },
  {
    id: 'vs-notion-6',
    question: "How do AppFlowy's databases compare to Notion's?",
    answer: "AppFlowy's database capabilities have advanced significantly and are among the most feature-complete options available for organizations seeking a self-hostable alternative to Notion.\n\nAppFlowy currently supports: Grid (table), Kanban, Calendar, Gallery, List, Feed, Chart views, along with Advanced filters, Two-way relations, Rollups, Calculations and Aggregations, Database templates, Grouping and Sorting options, Linked database workflows, multi-row bulk actions.\n\nFor most project management, CRM, wiki, operations, and knowledge management use cases, AppFlowy's databases provide everything teams need. Notion still maintains an advantage with Timeline and Map views. However, AppFlowy is actively investing in database development and continues to close the remaining feature gaps while offering deployment flexibility and data ownership that Notion cannot provide.",
  },
  {
    id: 'vs-notion-7',
    question: "Can I migrate from Notion to AppFlowy?",
    answer: "Yes. AppFlowy provides tools to help individuals and organizations migrate existing content from Notion. AppFlowy provides the most complete Notion migration experience among self-hostable alternatives.\n\nYou can import pages, documents, databases, and workspace content from Notion into AppFlowy, allowing teams to transition without rebuilding their knowledge base from scratch. For most organizations, migration is a gradual process where teams can evaluate AppFlowy, import existing content, and move workflows over time.\n\nAppFlowy has already successfully migrated numerous teams off Notion without ever touching their data, fully preserving their pages, databases, and media with higher reliability. Enterprise teams with large workspaces can contact AppFlowy directly to receive hands-on migration assistance.\n\nAppFlowy continues to improve migration tooling and compatibility to make switching from Notion as seamless as possible, while providing additional benefits such as self-hosting, data ownership, local LLMs and deployement flexibility."
  }
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
                src={NotionImage}
                alt={'Notion'}
                width={56}
                height={56}
              />
            </div>
            <div className={'main-content'}>
              <h1>
                The #1 Self-Hosted <span className={'text-primary'}>Notion Alternative</span>
              </h1>
              <p className={'desc'}>Open core, self-hosted, local and on-prem AI, cross platform</p>
            </div>
            <ImportLink importBaseURL={importBaseURL} />
          </div>
        </div>
        <div className={'af-container'}>
          <div className={'af-box section-2'}>
            <h2 className={'section-2-title'}>
              {`Enjoy the `}
              <span className={'text-primary'}>flexibility</span>
              {`\n`}without losing control of your data
            </h2>
            <div className={'cards'}>
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
                    AI on your terms, not your vendor&apos;s. Run local models offline or connect a self-hosted LLM.
                  </p>
                </div>
              </div>
              <div className={'card'}>
                <Image
                  src={Object2}
                  alt={'Deploy Anywhere'}
                  width={151}
                  height={121}
                />

                <div className={'card-title'}>
                  Deploy Anywhere
                  <p className={'card-desc'}>Run AppFlowy on your hardware, your cloud region, or in a fully air-gapped environment.</p>
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
                  <p className={'card-desc'}>{`Works consistently across platforms your team works on; including completely offline.`}</p>
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
                <p className="w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4">Notion</p>
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
          <QASection items={vsNotionFAQs} />
        </div>

        <GetStart />
      </div>
    </>
  );
}

export default Page;
