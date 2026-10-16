import { CloudProPricing, annualSavingsPercent, formatPrice } from '../lib/cloud-pricing';

export function getCloudFAQs(pricing: CloudProPricing | null) {
  const monthly = pricing ? formatPrice(pricing.monthlyCents) : '';
  const annualMonthly = pricing ? formatPrice(pricing.yearlyCents / 12) : '';
  const annualTotal = pricing ? formatPrice(pricing.yearlyCents) : '';
  const savings = pricing ? annualSavingsPercent(pricing) : 0;
  const examples = pricing
    ? `A Pro workspace with only you: ${annualMonthly} per month billed annually (${annualTotal}/year), or ${monthly} billed monthly\nA Pro workspace with five members (including you): ${annualMonthly} × 5 = ${formatPrice(
        (pricing.yearlyCents * 5) / 12
      )} per month billed annually (${formatPrice(pricing.yearlyCents * 5)}/year), or ${monthly} × 5 = ${formatPrice(
        pricing.monthlyCents * 5
      )} billed monthly`
    : 'Cloud Pro prices are temporarily unavailable. Please refresh to see current rates.';

  return [
    {
      id: 'cloud-1',
      question: 'How is pricing calculated for the paid plans?',
      answer: `Each workspace is tied to a specific plan. For example, you can have two Pro workspaces and three Personal workspaces simultaneously. If one Pro workspace has one member and another has five members, you'll need to make separate payments for each workspace. Each Pro workspace is charged per member.\n\n${examples}\n\nGuest editors available in Pro are free of charge.`,
    },
    {
      id: 'cloud-2',
      question: 'How do I cancel my paid plan?',
      answer:
        'Your AppFlowy subscription, annual or monthly, will automatically renew until you cancel it. You can cancel your subscription by going to Settings in the left-hand sidebar on a desktop computer, then selecting Billing, then Change plan, then click Downgrade under the Personal plan column. After cancellation, your workspace will immediately move to the Personal plan, and any usage above the free limits may be restricted.',
    },
    {
      id: 'cloud-3',
      question: 'How does adding and removing members work?',
      answer:
        'If you added members, your account will be charged a prorated amount based on the percentage of the billing cycle left when a user was added. If you removed members, you will not receive credit but instead will still have use of that seat for a different user for the remainder of the billing period.\n\nNote: After cancellation, your workspace will immediately move to the Personal plan, and any usage above the free limits may be restricted.',
    },
    {
      id: 'cloud-4',
      question: 'Can I change my payment method?',
      answer: 'You can change your payment method at any time in your billing settings.',
    },
    {
      id: 'cloud-5',
      question: 'How do I change my subscription between monthly and annual billing?',
      answer: `You can change your billing period by going to Settings → Billing → Edit period.${
        pricing
          ? ` Pro costs ${monthly} per member per month when billed monthly, or ${annualMonthly} per member per month when billed annually (${annualTotal} per member per year).`
          : ''
      }${
        savings > 0 ? ` Annual billing saves ${savings}% compared with monthly billing.` : ''
      }`,
    },
  ];
}
