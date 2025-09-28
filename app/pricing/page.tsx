import { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';
import { PricingHeroContainer } from './components/pricing-hero-container';
import { AiPowerSection } from './components/ai-power-section';
import { QuestionsSection } from './components/questions-section';
import { QASection } from './components/qa-section';
import { PricingStateProvider } from './components/pricing-state-context';
import { GetStartedSection } from './components/get-started-section';
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
      'unlimited storage workspace'
    ].join(', '),
    category: 'Software as a Service',
    authors: [{ name: 'AppFlowy Team' }],
    creator: 'AppFlowy',
    publisher: 'AppFlowy',
  };
}

// Generate structured data for pricing page
function generatePricingSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
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
          name: 'Free Plan',
          description: 'For individuals and small groups to organize everything',
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
            unitText: 'user',
          },
        },
        {
          '@type': 'Offer',
          name: 'Pro Plan',
          description: 'For small teams to manage projects and team knowledge',
          price: '10',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '10',
            priceCurrency: 'USD',
            billingIncrement: 'month',
          },
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            unitText: 'user per month',
          },
        },
        {
          '@type': 'Offer',
          name: 'Self-hosted Plans',
          description: 'Enterprise-grade self-hosted solutions starting from $1/month',
          priceRange: '$1-Custom',
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
}

function PricingPage() {
  const pricingSchema = generatePricingSchema(site_url);

  return (
    <>
      <Script
        id="pricing-ld-json"
        type="application/ld+json"
      >
        {JSON.stringify(pricingSchema)}
      </Script>
      <PricingStateProvider>
        <div className="pricing-page">
        {/* Pricing Hero - Main title and deployment selection with full-width background */}
        <div className="w-full bg-[#F5F5FA] pt-[104px]">
          <PricingHeroContainer>
            <h1 className="pricing-hero-title mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-[60px]">
              <div className="text-[#101012] leading-[105%] tracking-[-0.03em] font-medium font-inter text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px]">
                Your work solution.
              </div>
              <div className="text-[#8427E0] leading-[105%] tracking-[-0.03em] font-medium font-inter text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px]">
                Start free.
              </div>
            </h1>
            
          </PricingHeroContainer>
        </div>

        {/* Section 2 - AI Power */}
        <AiPowerSection />

        {/* Section 3 - Questions */}
        <QuestionsSection />

        {/* Section 4 - Q&A */}
        <QASection />

        {/* Section 5 - Get Started */}
        <GetStartedSection />
        </div>
      </PricingStateProvider>
    </>
  );
}

export default PricingPage;