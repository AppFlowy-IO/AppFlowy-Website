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
const title = 'Notion vs AppFlowy | The #1 Open Source, Self Hosted Notion Alternative is AppFlowy';
const description = 'Discover why AppFlowy is the best self-hosted, open-source Notion alternative. Compare offline mode, self-hosting, local AI, and full data ownership.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    alternates: {
      canonical: `${site_url}/compare/notion-vs-appflowy`,
    },
    openGraph: {
      title,
      description,
      url: `${site_url}/compare/notion-vs-appflowy`,
      type: 'website',
      siteName: 'AppFlowy',
      images: [
        {
          url: `${site_url}/blog-og-image.png`,
          width: 1200,
          height: 630,
          alt: 'The Best Open Source Notion Alternative - AppFlowy',
        },
      ],
    },
    keywords:
      'best notion alternative, leading self-hostable notion alternative, leading notion alternative, free notion alternative, offline notion alternative, best self-hosted notion alternative, top notion alternative',
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
            'Guest sharing and permissions',
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
            description: 'Free and open-source',
          },
          featureList: [
            'Full offline mode',
            'Self-hosting available via Docker in under 30 minutes',
            'AI model selection including local models (Mistral, Llama)',
            'High customization',
            'Native mobile and desktop apps',
            'Local-first data ownership',
            'Open-source codebase',
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
          text: "It comes down to where your data lives & who controls it. Notion is a cloud-first, proprietary service. Your data is stored on Notion's servers. It requires an internet connection to work seamlessly, and you are tied to their ecosystem.\n\nAppFlowy is a self-hosted, open-core alternative. Your data lives directly on your computer or a server managed by you. It works 100% offline.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I self-host AppFlowy? Can I self-host Notion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AppFlowy can be fully self-hosted via AppFlowy Cloud, which you can run on your own server using Docker in under 30 minutes. This gives you complete control over your data, backups, and access. AppFlowy can be self-hosted in under 30 minutes. Notion cannot be self-hosted — it is a fully managed SaaS product with no on-premise option, even on Enterprise plans.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does AppFlowy have an offline mode like Notion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "AppFlowy is built to be 'local-first,' it doesn't need an internet connection to load your workspaces, databases, or pages. You can work completely offline, and it will sync to the cloud later if you choose to use their cloud sync feature. Notion, on the other hand, is primarily a cloud-based service. While it has some offline capabilities, it's not designed to work fully offline and can be unreliable without an internet connection.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I run AI locally in AppFlowy? Can I run AI locally in Notion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, and this is a massive differentiator for privacy enthusiasts. AppFlowy AI allows you to connect to local, open-source large language models (like Mistral 7B or Llama 3) running directly on your own machine. This means you can use AI to summarize, brainstorm, or write without your data ever leaving your hardware. Notion does not support local AI models.',
        },
      },
      {
        '@type': 'Question',
        name: "How do AppFlowy's databases compare to Notion's?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Notion's databases are widely considered more mature — they support linked views, rollups, relations between databases, and a wide range of filter/sort options. AppFlowy supports grid, kanban, calendar, and gallery views and is actively developing its database layer. For most personal and small-team use cases, AppFlowy's databases are sufficient. For complex, cross-linked relational setups (e.g. a CRM or product roadmap with multiple linked tables), Notion is a good choice. AppFlowy is rapidly iterating on its database features and plans to support linked views and rollups in the near future.",
        },
      },
    ],
  };

  const itemListSchema = {
    '@type': 'ItemList',
    name: 'Best Self-Hosted Notion Alternative',
    description:
      'AppFlowy is the best self-hosted alternative to Notion — open-source, offline-first, and privacy-focused with support for local AI models.',
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
            'AppFlowy is the leading open-source, self-hosted alternative to Notion. It offers a local-first architecture, full offline support, Docker-based self-hosting in under 30 minutes, and the ability to run AI models locally — making it the best choice for privacy-conscious individuals and teams.',
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
            ratingValue: '4.6',
            reviewCount: '500',
            bestRating: '5',
            worstRating: '1',
          },
          featureList: [
            'Self-hostable via Docker',
            'Works 100% offline',
            'Local AI model support (Mistral, Llama)',
            'Open-source under AGPL-3.0',
            'Grid, kanban, calendar, gallery database views',
            'Native apps for all major platforms',
            'End-to-end data ownership',
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

const points = ['Offline mode', 'Self-hosting', 'AI model selection', 'Customization', 'Native mobile and desktop apps'];

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
                src={NotionImage}
                alt={'Notion'}
                width={56}
                height={56}
              />
            </div>
            <div className={'main-content'}>
              <h1>
                The #1 Open Source <span className={'text-primary'}>Notion Alternative</span>
              </h1>
              <div className={'desc'}>Open source, fast, offline support, self-hosting</div>
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
                  alt={'AI model selection'}
                  width={151}
                  height={121}
                />
                <div className={'card-title'}>
                  AI model selection
                  <div className={'card-desc'}>
                    Run Mistral 7B and Llama 3 on your machine. Choose from{' '}
                    <span className={'whitespace-nowrap'}>GPT 4-o</span> and Claude 3 Sonnet.
                  </div>
                </div>
              </div>
              <div className={'card'}>
                <Image
                  src={Object2}
                  alt={'Available everywhere'}
                  width={151}
                  height={121}
                />

                <div className={'card-title'}>
                  Available everywhere
                  <div className={'card-desc'}>Self-host AppFlowy wherever you want, no vendor lock-in.</div>
                </div>
              </div>

              <div className={'card'}>
                <Image
                  src={Object3}
                  alt={'100% offline mode'}
                  width={189}
                  height={121}
                />

                <div className={'card-title'}>
                  100% offline mode
                  <div className={'card-desc'}>{`Remain local and sync as required.\nOne account, any device.`}</div>
                </div>
              </div>
            </div>
            <div
              className={
                'flex w-full min-w-0 max-w-[1100px] flex-col gap-1 text-[26px] max-lg:text-[18px] max-md:text-base'
              }
            >
              <div className={'flex w-full items-center justify-between'}>
                <div className="w-1/2 px-[48px] py-6 text-[#58585a] max-md:px-4 max-md:py-4">Compare features</div>
                <div className="w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4">Notion</div>
                <div className="w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4">AppFlowy</div>
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
          <QASection />
        </div>

        <GetStart />
      </div>
    </>
  );
}

export default Page;
