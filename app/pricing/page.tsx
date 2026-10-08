import { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import SeoData from '@/components/layout/seo-data';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { PricingHeroContainer } from './components/pricing-hero-container';
import { AiPowerSection } from './components/ai-power-section';
import { QuestionsSection } from './components/questions-section';
import { QASection } from './components/qa-section';
import { PricingStateProvider } from './components/pricing-state-context';
import { TrustedBrandsSection } from './components/trusted-brands-section';
import { PricingCtaFooter } from './components/pricing-cta-footer';
import OpenGraphImage from '../../public/images/og-image.png';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL!;
const title = 'AppFlowy Pricing - Cloud & Self-hosted Plans';
const description =
  'Choose the perfect AppFlowy plan for your team.\nOpen source, true offline support, self-hosted, snappy performance, easy to use, and cross-platform.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${site_url}/pricing`,
      type: 'website',
      siteName: 'AppFlowy',
      images: [
        {
          url: OpenGraphImage.src,
          width: 1200,
          height: 630,
          alt: 'AppFlowy Pricing Plans',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OpenGraphImage.src],
    },
    alternates: {
      canonical: `${site_url}/pricing`,
    },
    keywords: [
      'AppFlowy pricing',
      'collaborative workspace pricing',
      'AI workspace plans',
      'self-hosted workspace',
      'cloud workspace',
      'team collaboration pricing',
      'notion alternative pricing',
      'free workspace tool',
      'enterprise workspace',
      'unlimited storage workspace',
    ].join(', '),
    category: 'Software as a Service',
    authors: [{ name: 'AppFlowy Team' }],
    creator: 'AppFlowy',
    publisher: 'AppFlowy',
  };
}

// Generate structured data for pricing page
function generatePricingSchema(siteUrl: string) {
  const webPageSchema = {
    '@type': 'WebPage',
    name: title,
    description,
    url: `${siteUrl}/pricing`,
    mainEntity: {
      '@type': 'Product',
      name: 'AppFlowy',
      description: 'AI-powered collaborative workspace with cloud and self-hosted options',
      brand: {
        '@type': 'Brand',
        name: 'AppFlowy',
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Personal Plan',
          description: 'For personal productivity',
          price: '0',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '0',
            priceCurrency: 'USD',
            billingIncrement: 'month',
          },
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            value: 1,
            unitText: 'workspace owner',
          },
        },
        {
          '@type': 'Offer',
          name: 'Pro Plan (Annual billing)',
          description: 'For professional work and teams',
          price: '12',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '12',
            priceCurrency: 'USD',
            billingIncrement: 'month',
          },
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            unitText: 'member per month, billed annually',
          },
        },
        {
          '@type': 'Offer',
          name: 'Pro Plan (Monthly billing)',
          description: 'For professional work and teams',
          price: '16',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '16',
            priceCurrency: 'USD',
            billingIncrement: 'month',
          },
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            unitText: 'member per month, billed monthly',
          },
        },
        {
          '@type': 'Offer',
          name: 'Self-hosted Plans',
          description: 'Self-hosted plans from Free to Enterprise',
          priceRange: '$0-Contact us',
          priceCurrency: 'USD',
        },
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'AppFlowy',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/appflowy.ico`,
      },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [webPageSchema, generateBreadcrumbSchema([{ name: 'Pricing', path: '/pricing' }])],
  };
}

function PricingPage() {
  const pricingSchema = generatePricingSchema(site_url);

  return (
    <>
      <SeoData id='pricing-ld-json' data={pricingSchema} />
      <PricingStateProvider>
        {/* Opaque so the global body gradient in globals.scss does not show through. */}
        <div className='pricing-page bg-white pt-[68px] lg:pt-[72px]'>
          <PricingHeroContainer>
            <h1 className='pricing-hero-title mx-auto mb-0 flex h-[88px] flex-col items-center justify-center sm:h-[136px]'>
              <div className='font-inter text-[36px] font-bold leading-[68px] tracking-[-0.03em] text-[#140F28] sm:text-[44px] lg:text-[56px]'>
                Your work solution
              </div>
              <div className='font-inter text-[36px] font-bold leading-[68px] tracking-[-0.03em] text-[#140F28] sm:text-[44px] lg:text-[56px]'>
                Start free
              </div>
            </h1>
            <Image
              src='/images/pricing/hero-underline.svg'
              alt=''
              aria-hidden='true'
              width={280}
              height={10}
              className='pointer-events-none absolute left-1/2 top-[155px] z-10 hidden h-[10px] w-[280px] -translate-x-1/2 sm:top-[211px] sm:block'
            />
          </PricingHeroContainer>

          <AiPowerSection />
          <TrustedBrandsSection />
          <QuestionsSection />
          <QASection />
          <PricingCtaFooter />
        </div>
      </PricingStateProvider>
    </>
  );
}

export default PricingPage;
