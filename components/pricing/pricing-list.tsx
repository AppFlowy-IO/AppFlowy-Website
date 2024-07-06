'use client';
import { Divider } from '@mui/material';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

const freePlan = {
  plan: 'Free',
  planDesc: 'For individuals and small groups to organize everything',
  price: 'Free',
  priceDesc: 'forever',
  contentTitle: '',
  content: ['Unlimited pages & blocks', '5 GB storage', 'Up to 3 workspace members', 'Intelligent search', '100 AI responses powered by GPT-4o'],
};

const proPlan = {
  plan: 'Pro',
  planDesc: 'For small teams to manage projects and team knowledge',
  price: 'US$10',
  priceDesc: 'per user per month\n' +
    'billed annually',
  contentTitle: 'Everything in Free +',
  content: ['Unlimited storage', 'Up to 10 workspace members', 'Unlimited AI responses', 'Choose your preferred most advanced AI models', 'Custom domains (coming soon)'],
};

function PricingList() {
  const [selectedTab, setSelectedTab] = useState('yearly');
  const [hoverPlan, setHoverPlan] = useState<string | null>(null);

  const handleClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const options = useMemo(() => [
    {
      label: <div>Yearly <span className={'primary'}>*</span>SAVE 20%</div>,
      value: 'yearly',
      plans: [freePlan, proPlan],
    },
    {
      label: 'Monthly',
      value: 'monthly',
      plans: [
        freePlan,
        {
          ...proPlan,
          price: 'US$12.5',
          priceDesc: 'per user per month\n' +
            'US$10 billed annually',
        },
      ],
    },
  ], []);

  const handleMouseEnter = (plan: string | null) => {
    setHoverPlan(plan);
  };

  return (
    <div className={'content'}>
      <div className={'pricing-tabs'}>

        {options.map((option) => (
          <div
            key={option.value}
            className={`pricing-tab ${selectedTab === option.value ? 'selected' : ''}`}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </div>
        ))}

      </div>
      <div className={'pricing-list'}>
        {options.find((option) => option.value === selectedTab)?.plans.map((plan, index) => (
          <div key={index} className={`pricing-card ${hoverPlan === plan.plan ? 'selected' : ''}`}>
            <div className={'pricing-card-title'}>
              {plan.plan}
            </div>
            <div className={'pricing-card-desc'}>
              {plan.planDesc}
            </div>
            <Divider className={'divider'} />
            <div className={'pricing-card-price'}>
              {plan.price}
              <div className={'pricing-card-price-desc'}>
                {plan.priceDesc}
              </div>
            </div>
            <Link href={'/download'} onMouseEnter={() => handleMouseEnter(plan.plan)}
                  onMouseLeave={() => handleMouseEnter(null)}
                  className={`download-btn ${hoverPlan === plan.plan ? 'selected' : ''}`}
            >
              Get Started
            </Link>
            <div className={'pricing-card-content'}>
              {plan.contentTitle && (
                <div className={'pricing-card-content-title'}>
                  {plan.contentTitle}
                </div>
              )}
              {plan.content.map((item, index) => (
                <div key={index} className={'pricing-card-content-item'}>
                  <span className={'w-[16px]'}><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 8L6.58974 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round"
                    />
                  </svg>
                  </span>
                  <div className={'flex-1'}>{item}</div>

                </div>
              ))}
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}

export default PricingList;