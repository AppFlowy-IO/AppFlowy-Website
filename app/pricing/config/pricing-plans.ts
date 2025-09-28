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
      '1 collaborative workspace up to 2 members',
      'Unlimited pages & blocks',
      '5 GB storage',
      'Intelligent search',
      '10 AI responses',
      '2 AI images',
      'Mobile app',
      'Real-time collaboration'
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
      'Up to 50 workspace members',
      'Up to 100 guest editors',
      'Unlimited AI responses',
      '50 AI images per month',
      'Unlimited file uploads',
      'Custom namespace'
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