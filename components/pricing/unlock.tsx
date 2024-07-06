'use client';
import { Divider } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

const plans = [{
  title: 'AppFlowy AI MAX',
  desc: 'Easily plug customized AI into existing workflow to gain smarter and faster results',
  price: '$8',
  priceDesc: 'per user per month billed annually\n10 billed monthly',
  content: ['Unlimited AI responses', 'Unlimited pages up to 30 MB per file for AI Chat with uploaded files'],
}, {
  title: 'AppFlowy AI Local',
  desc: 'Easily plug customized AI into existing workflow to gain smarter and faster results',
  price: '$8',
  priceDesc: 'per user per month billed annually\n10 billed monthly',
  content: ['Local AI on your own hardware for ultimate privacy', 'Unlimited AI responses & file size for AI Chat'],
}];

function Unlock () {
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
            <Link href={'/download'} className={`download-btn ${hoverPlan === plan.title ? 'selected' : ''}`}
                  onMouseEnter={() => setHoverPlan(plan.title)} onMouseLeave={() => setHoverPlan(null)}
            >
              Unlock
            </Link>
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