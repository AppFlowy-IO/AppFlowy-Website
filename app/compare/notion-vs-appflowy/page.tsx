import Object1 from '@/assets/images/vs-notion/OBJECTS-1.png';
import Object2 from '@/assets/images/vs-notion/OBJECTS-2.png';
import GetStart from '@/components/product/get-start';
// import ImportLink from '@/components/vs-notion/import-link';
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

const site_url = process.env.ENVIRONMENT === 'test' ? 'https://test.appflowy.io' : 'https://appflowy.io';
const title = 'Notion vs AppFlowy | The #1 Open Source Notion Alternative is AppFlowy';
const description = 'Open source, fast, offline support, self-hosting';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${site_url}/compare/notion-vs-appflowy`,
      type: 'website',
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
      'best notion alternative, leading notion alternative, free notion alternative, offline notion alternative, self-hosted notion alternative, top notion alternative',
  };
}

function generateListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
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
            description: 'Free and open-source',
          },
          featureList: [],
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
            'Self-hosting available',
            'AI model selection',
            'High customization',
            'Native mobile and desktop apps',
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
    },
    dateModified: '2024-10-14',
  };
}

const points = ['Offline mode', 'Self-hosting', 'AI model selection', 'Customization', 'Native mobile and desktop apps'];
// const environment = process.env.ENVIRONMENT || 'development';
//
// let importBaseURL: string = 'https://appflowy.com';
//
// if (environment === 'test') {
//   importBaseURL = 'https://test.appflowy.com';
// }

function Page() {
  return (
    <>
      <Script id='ld-json' type='application/ld+json'>
        {JSON.stringify(generateListSchema())}
      </Script>
      <div className={'vs-notion-page'}>
        <div className={'af-container'}>
          <div className={'af-box section-1'}>
            <div className={'flex items-center justify-center gap-2'}>
              <Image src={AppFlowyImage} alt={'AppFlowy'} width={56} height={56} />
              <span className={'text-sm font-semibold'}>vs</span>
              <Image src={NotionImage} alt={'Notion'} width={56} height={56} />
            </div>
            <div className={'main-content'}>
              <h1>
                The #1 Open Source <span className={'text-primary'}>Notion Alternative</span>
              </h1>
              <div className={'desc'}>Open source, fast, offline support, self-hosting</div>
            </div>
            {/*<ImportLink importBaseURL={importBaseURL} />*/}
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
                <Image src={Object1} alt={'AI model selection'} width={151} height={121} />
                <div className={'card-title'}>
                  AI model selection
                  <div className={'card-desc'}>
                    Run Mistral 7B and Llama 3 on your machine. Choose from{' '}
                    <span className={'whitespace-nowrap'}>GPT 4-o</span> and Claude 3 Sonnet.
                  </div>
                </div>
              </div>
              <div className={'card'}>
                <Image src={Object2} alt={'Available everywhere'} width={151} height={121} />

                <div className={'card-title'}>
                  Available everywhere
                  <div className={'card-desc'}>Self-host AppFlowy wherever you want, no vendor lock-in.</div>
                </div>
              </div>

              <div className={'card'}>
                <Image src={Object3} alt={'100% offline mode'} width={189} height={121} />

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
                <div className='w-1/2 px-[48px] py-6 text-[#58585a] max-md:px-4 max-md:py-4'>Compare features</div>
                <div className='w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4'>Notion</div>
                <div className='w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4'>AppFlowy</div>
              </div>
              {points.map((point) => (
                <div
                  key={point}
                  className={
                    'flex w-full items-center justify-between rounded-[15px] border border-gray-100 bg-white text-[24px] max-lg:text-base max-md:text-sm'
                  }
                >
                  <div className='w-1/2 px-[48px] py-10 font-medium text-black max-md:px-4 max-md:py-5'>{point}</div>
                  <div className='flex w-1/4 items-center justify-center px-[48px] py-6 max-md:px-4 max-md:py-5'>
                    <Image src={CloseImage} alt={'Close'} width={20} height={20} />
                  </div>
                  <div className='flex w-1/4 items-center justify-center px-[48px] py-6 max-md:px-4 max-md:py-5'>
                    <Image src={RightImage} alt={'Right'} width={26} height={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <GetStart />
      </div>
    </>
  );
}

export default Page;
