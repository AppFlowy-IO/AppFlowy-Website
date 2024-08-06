'use client';
import { Divider } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

const plans = [{
  title: 'AppFlowy AI MAX',
  desc: 'Unlimited AI and access to advanced models',
  price: 'US$8',
  buttonProps: {
    disabled: false,
    label: 'Unlock',
  },
  priceDesc: 'per user per month billed annually\nUS$10 billed monthly',
  content: ['Unlimited AI responses powered by GPT-4o, Claude 3.5 Sonnet, and more', 'Select your preferred, most advanced models'],
}, {
  title: 'AppFlowy AI On-device',
  buttonProps: {
    disabled: true,
    label: 'Coming soon',
  },
  desc: 'Local AI on your own hardware for ultimate privacy',
  price: 'US$8',
  priceDesc: 'per user per month billed annually\nUS$10 billed monthly',
  content: ['Run large language models locally - No internet required', 'Chat with your local files (coming soon)'],
}];

function Unlock() {
  const [hoverPlan, setHoverPlan] = useState<string | null>(null);

  return (
    <div className={'content'}>
      <div className={'ai-power'}>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`ai-power-card ${hoverPlan === plan.title ? 'selected' : ''}`}

          >
            <div className={'ai-power-card-title'}>
              {plan.title}
            </div>
            <div className={'ai-power-card-desc'}>
              {plan.desc}
            </div>
            <Divider className={'divider'} />
            <div className={'ai-power-card-price'}>
              {plan.price}
              <div className={'ai-power-card-price-desc'}>
                {plan.priceDesc}
              </div>
            </div>
            {
              plan.buttonProps.disabled ? <div
                  className={'coming-soon download-btn disabled'}>{plan.buttonProps.label}</div> :
                <Link
                  href={'/download'} className={`download-btn ${hoverPlan === plan.title ? 'selected' : ''}`}
                  onMouseEnter={() => setHoverPlan(plan.title)} onMouseLeave={() => setHoverPlan(null)}
                >
                  {plan.buttonProps.label}
                </Link>
            }

            <div className={'ai-power-card-content'}>
              {plan.content.map((item, index) => (
                <div key={index} className={'ai-power-card-content-item'}>
                  <span className={'w-[16px]'}><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 8L6.58974 12L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round"
                    />
                  </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Unlock;