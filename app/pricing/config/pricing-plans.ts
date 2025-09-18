import { BillingCycle } from '../components/billing-switch';

export interface PricingPlan {
  id: 'free' | 'pro';
  name: string;
  subtitle: string;
  popular?: boolean;
  pricing: {
    yearly: {
      price: string;
      period: string;
      billingInfo: string;
      originalPrice?: string;
    };
    monthly: {
      price: string;
      period: string;
      billingInfo: string;
      originalPrice?: string;
    };
  };
  features: string[];
  cta: {
    text: string;
    variant: 'primary' | 'secondary';
  };
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    subtitle: 'For individuals and small groups to organize everything',
    pricing: {
      yearly: {
        price: 'Free',
        period: 'forever',
        billingInfo: ''
      },
      monthly: {
        price: 'Free',
        period: 'forever',
        billingInfo: ''
      }
    },
    features: [
      '1 collaborative workspace up to 3 members',
      'Unlimited pages & blocks',
      '5 GB storage',
      '30 days revision history',
      'Intelligent search',
      '1,000 AI responses',
      'Up to 20 pages for AI Chat with uploaded files'
    ],
    cta: {
      text: 'Get Started',
      variant: 'secondary'
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'For small teams to manage projects and team knowledge',
    popular: true,
    pricing: {
      yearly: {
        price: 'US$10',
        period: 'per user per month',
        billingInfo: 'billed annually',
        originalPrice: '$12.5'
      },
      monthly: {
        price: 'US$12.5',
        period: 'per user per month',
        billingInfo: 'billed monthly'
      }
    },
    features: [
      'Everything in Free, and',
      'Unlimited storage',
      'Up to 10 workspace members',
      '6 months revision history',
      '10,000 AI responses per user per month',
      'Up to 100 pages for AI Chat with uploaded files'
    ],
    cta: {
      text: 'Get Started',
      variant: 'primary'
    }
  }
];

export function getPlanPricing(plan: PricingPlan, billingCycle: BillingCycle) {
  return plan.pricing[billingCycle];
}