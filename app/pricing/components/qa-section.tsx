'use client';

import React from 'react';
import { DeploymentTabs } from './pricing-tabs';
import { usePricingState } from './pricing-state-context';
import { FAQAccordion } from './faq-accordion';

const cloudFAQs = [
  {
    id: 'cloud-1',
    question: 'How is pricing calculated for the paid plans?',
    answer: 'Each workspace is tied to a specific plan. For example, you can have two Pro workspaces and three Free workspaces simultaneously. If one Pro workspace has one member and another has five members, you\'ll need to make separate payments for each workspace. Each Pro workspace is charged per member.\n\nA Pro workspace with only you: $12.50 per month / $120 per year\nA Pro workspace with five members (including you): $12.50 × 5 = $62.50 per month or $120 × 5 = $600 per year\n\nGuest editors available in Pro are free of charge – but they can only access individual pages they are invited to.'
  },
  {
    id: 'cloud-2',
    question: 'How do I cancel my paid plan?',
    answer: 'Your AppFlowy subscription, annual or monthly, will automatically renew until you cancel it. You can cancel your subscription by going to Settings in the left-hand sidebar on a desktop computer, then selecting Billing, then Change plan, then click Downgrade under the Free plan column. After you cancel, you\'ll lose access to all the paid features immediately.'
  },
  {
    id: 'cloud-3',
    question: 'How does adding and removing members work?',
    answer: 'If you added members, your account will be charged a prorated amount based on the percentage of the billing cycle left when a user was added. If you removed members, you will not receive credit but instead will still have use of that seat for a different user for the remainder of the billing period.\n\nNote: After cancellation, you\'ll immediately lose access to all Pro features.'
  },
  {
    id: 'cloud-4',
    question: 'Can I change my payment method?',
    answer: 'You can change your payment method at any time in your billing settings.'
  },
  {
    id: 'cloud-5',
    question: 'How do I change my subscription between monthly and annual billing?',
    answer: 'You can change your billing period by going to Settings → Billing → Edit period.'
  }
];

const selfHostedFAQs = [
  {
    id: 'self-1',
    question: 'How is pricing calculated for the Team plan?',
    answer: 'Pricing for the Team plan is based on user seats per instance, with each instance requiring its own unique commercial license code. For example, if you need to create 20 users in your AppFlowy instance via the Super Admin panel, you\'ll need to purchase a Team plan license with 20 seats.'
  },
  {
    id: 'self-2',
    question: 'I host three AppFlowy instances for three different companies. How should I make purchase?',
    answer: 'Each instance requires a unique commercial license code. You\'ll need to check out three times separately to obtain three unique commercial license codes.'
  },
  {
    id: 'self-3',
    question: 'How do I purchase additional seats for my existing AppFlowy instance?',
    answer: 'If you\'re not on the Team plan, you\'ll need to upgrade first. During the upgrade process, you can select your desired number of seats.\n\nIf you\'re already on the Team plan, simply visit appflowy.com/self-hosted to purchase additional seats.'
  },
  {
    id: 'self-4',
    question: 'Is there a trial license?',
    answer: 'We offer a limited time trial license for the Team and Enterprise plans. Please contact us.'
  },
  {
    id: 'self-5',
    question: 'How to upgrade my plan?',
    answer: 'Visit your self-hosted admin panel to upgrade your plan.'
  },
  {
    id: 'self-6',
    question: 'Do you offer monthly subscriptions?',
    answer: 'We do not offer monthly subscriptions for self-hosters due to the nature of our digital product.'
  },
  {
    id: 'self-7',
    question: 'Do your plans come with customer support?',
    answer: 'We provide dedicated support for Team and Enterprise customers. You can access priority support information in the Super Admin panel under the Manage plan tab.'
  },
  {
    id: 'self-8',
    question: 'What about instances with more than 1000 users?',
    answer: 'For instances exceeding 1000 users, you\'ll need to purchase an Enterprise plan. Please contact us to discuss your specific requirements.'
  },
  {
    id: 'self-9',
    question: 'Do you have discounts for non-profit or educational organizations?',
    answer: 'We do not currently offer special discounts for non-profit or educational organizations. However, we do provide discounts for our Enterprise plan. Please contact us for more information.'
  },
  {
    id: 'self-10',
    question: 'Do you have affiliate programs?',
    answer: 'Yes, we have a percentage-based commission model for cloud providers or deployment service providers. You can find more details here.'
  }
];

export function QASection() {
  const { deploymentMode, setDeploymentMode } = usePricingState();

  const currentFAQs = deploymentMode === 'cloud' ? cloudFAQs : selfHostedFAQs;

  return (
    <section className="w-full bg-[#F5F5FA] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-[156px]">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="w-full max-w-[1100px] mx-auto text-center">
          {/* Title with padding */}
          <div className="px-6 sm:px-8 lg:px-12 xl:px-8">
            <h2 className="text-[#101012] leading-[105%] tracking-[-0.03em] font-medium font-inter text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px]">
              Questions & <span className="text-[#8427E0]">answers</span>
            </h2>
          </div>
          
          {/* Deployment Tabs - no horizontal padding */}
          <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-[60px] flex justify-center">
            <DeploymentTabs 
              deploymentMode={deploymentMode}
              onDeploymentChange={setDeploymentMode}
            />
          </div>

          {/* FAQ Accordion with padding */}
          <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-[60px] text-left px-6 sm:px-8 lg:px-12 xl:px-8">
            <FAQAccordion items={currentFAQs} />
          </div>
        </div>
      </div>
    </section>
  );
}