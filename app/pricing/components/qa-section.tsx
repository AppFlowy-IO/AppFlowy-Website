'use client';

import React from 'react';
import Link from 'next/link';
import { DeploymentTabs } from './pricing-tabs';
import { usePricingState } from './pricing-state-context';
import { FAQAccordion } from './faq-accordion';
import { getCloudFAQs } from '../config/cloud-faqs';

const selfHostedFAQs = [
  {
    id: 'self-1',
    question: 'How is pricing calculated for the Team plan?',
    answer:
      "Pricing for the Team plan is based on user seats per instance, with each instance requiring its own unique commercial license code. For example, if you need to create 20 users in your AppFlowy instance via the Super Admin panel, you'll need to purchase a Team plan license with 20 seats.",
  },
  {
    id: 'self-2',
    question: 'I host three AppFlowy instances for three different companies. How should I make purchase?',
    answer:
      "Each instance requires a unique commercial license code. You'll need to check out three times separately to obtain three unique commercial license codes.",
  },
  {
    id: 'self-3',
    question: 'How do I purchase additional seats for my existing AppFlowy instance?',
    answer:
      "If you're not on the Team plan, you'll need to upgrade first. During the upgrade process, you can select your desired number of seats.\n\nIf you're already on the Team plan, simply visit your self-hosted admin panel to purchase additional seats.",
  },
  {
    id: 'self-4',
    question: 'Is there a trial license?',
    answer: (
      <>
        We offer a limited time trial license for the Team and Enterprise plans. Please{' '}
        <Link href='/pricing?action=contact' scroll={false} className='text-[#8427E0] underline hover:text-[#7020C7]'>
          contact us
        </Link>
        .
      </>
    ),
  },
  {
    id: 'self-5',
    question: 'How to upgrade my plan?',
    answer: 'Visit your self-hosted admin panel to upgrade your plan.',
  },
  {
    id: 'self-6',
    question: 'Do you offer monthly subscriptions?',
    answer: 'We do not offer monthly subscriptions for self-hosters due to the nature of our digital product.',
  },
  {
    id: 'self-7',
    question: 'Do your plans come with customer support?',
    answer:
      'We provide dedicated support for Team and Enterprise customers. You can access priority support information in the Super Admin panel under the Upgrade Plan tab.',
  },
  {
    id: 'self-8',
    question: 'What about instances with more than 1000 users?',
    answer: (
      <>
        {`For instances exceeding 1000 users, you'll need to purchase an Enterprise plan.`} Please{' '}
        <Link href='/pricing?action=contact' scroll={false} className='text-[#8427E0] underline hover:text-[#7020C7]'>
          contact us
        </Link>{' '}
        to discuss your specific requirements.
      </>
    ),
  },
  {
    id: 'self-9',
    question: 'Do you have discounts for non-profit or educational organizations?',
    answer: (
      <>
        We do not currently offer special discounts for non-profit or educational organizations. However, we do provide
        discounts for our Enterprise plan. Please{' '}
        <Link href='/pricing?action=contact' scroll={false} className='text-[#8427E0] underline hover:text-[#7020C7]'>
          contact us
        </Link>{' '}
        for more information.
      </>
    ),
  },
];

export function QASection() {
  const { deploymentMode, setDeploymentMode, cloudProPricing } = usePricingState();

  const currentFAQs = deploymentMode === 'cloud' ? getCloudFAQs(cloudProPricing) : selfHostedFAQs;

  return (
    <section className='relative isolate w-full overflow-hidden bg-gradient-to-b from-white via-[#FAFAFF] to-[#F6F6FF] px-4 py-20 md:py-[120px] sm:px-6'>
      <div className='mx-auto w-full max-w-[960px]'>
        <h2 className='text-center font-inter text-[28px] font-bold leading-9 tracking-[-0.03em] text-[#140F28] sm:text-[44px] lg:text-[56px] lg:leading-[68px]'>
          Questions &amp; answers
        </h2>
        <div className='mt-10 flex justify-center'>
          <DeploymentTabs deploymentMode={deploymentMode} onDeploymentChange={setDeploymentMode} />
        </div>
        <div className='mt-5 text-left'>
          <FAQAccordion key={deploymentMode} items={currentFAQs} />
        </div>
      </div>
    </section>
  );
}
