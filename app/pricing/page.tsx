import { Metadata } from 'next';
import React from 'react';
import { PricingHeroContainer } from './components/pricing-hero-container';
import { AiPowerSection } from './components/ai-power-section';
import { QuestionsSection } from './components/questions-section';
import { QASection } from './components/qa-section';
import { PricingStateProvider } from './components/pricing-state-context';
import { GetStartedSection } from './components/get-started-section';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${site_url}/pricing`,
    },
  };
}

function PricingPage() {
  return (
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
  );
}

export default PricingPage;