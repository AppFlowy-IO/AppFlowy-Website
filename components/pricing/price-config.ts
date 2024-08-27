export const yearlyPrice = [
  {
    label: 'Free',
    desc: 'For individuals up to 2 members to organize everything',
    price: 'Free',
    duration: 'forever',
    contentTitle: '',
    content: [
      '1 collaborative workspace up to 2 members',
      'Unlimited pages & blocks',
      '5 GB storage',
      'Intelligent search',
      '100 AI responses',
      'Mobile app',
      'Real-time collaboration',
    ],
  },
  {
    label: 'Pro',
    desc: 'For small teams to manage projects and team knowledge',
    price: '$10',
    duration: 'per user per month\n' + 'billed annually',
    contentTitle: 'Everything in Free +',
    content: [
      'Unlimited storage',
      'Up to 10 workspace members',
      'Unlimited AI responses',
      'Unlimited file uploads',
      'Custom namespace (coming soon)',
    ],
    isMostPopular: true,
  },
];

export const monthlyPrice = [
  yearlyPrice[0],
  {
    ...yearlyPrice[1],
    price: '$12.5',
    duration: 'per user per month\n' + 'billed monthly',
  },
];
