import type { ComparisonFeatureGroup, ComparisonPlan } from './comparison-data';
import type { BillingCycle } from '../components/billing-switch';
import { webApplicationUrl } from '@/lib/web-application';

const personalPlan: ComparisonPlan = {
  id: 'personal',
  name: 'Personal',
  description: 'for personal productivity',
  price: {
    amount: '$0',
    period: 'month',
  },
  cta: {
    text: 'Get started',
    variant: 'link',
    href: webApplicationUrl,
  },
};

export const cloudComparisonPlansByBillingCycle: Record<BillingCycle, ComparisonPlan[]> = {
  yearly: [
    personalPlan,
    {
      id: 'pro',
      name: 'Pro',
      description: 'for professional work and teams',
      price: {
        amount: '$16',
        period: 'member / month',
      },
      billingInfo: 'billed annually',
      cta: {
        text: 'Get started',
        variant: 'link',
        href: webApplicationUrl,
      },
    },
  ],
  monthly: [
    personalPlan,
    {
      id: 'pro',
      name: 'Pro',
      description: 'for professional work and teams',
      price: {
        amount: '$20',
        period: 'member / month',
      },
      billingInfo: 'billed monthly',
      cta: {
        text: 'Get started',
        variant: 'link',
        href: webApplicationUrl,
      },
    },
  ],
};

export const cloudComparisonFeatureGroups: ComparisonFeatureGroup[] = [
  {
    id: 'collaboration-project-management',
    title: 'Collaboration & project management',
    features: [
      {
        id: 'members',
        name: 'Members',
        tooltip: 'Collaborate with your teammates in real time.',
        support: {
          personal: '1 workspace owner',
          pro: 'Unlimited, charged per member',
        },
      },
      {
        id: 'guest-editors',
        name: 'Guest editors',
        tooltip: 'Guests are external collaborators outside your organization, such as agencies, partners, contractors, or vendors.',
        support: {
          personal: false,
          pro: 'Unlimited',
        },
      },
      {
        id: 'timeline-with-dependencies',
        name: 'Timeline with dependencies',
        tooltip: 'Plan projects visually across time with draggable date ranges and task dependencies.',
        support: {
          personal: false,
          pro: true,
        },
      },
      {
        id: 'dashboards',
        name: 'Dashboards',
        tooltip: 'Bring charts, tables, and lists into one dashboard for a unified view of your work.',
        support: {
          personal: false,
          pro: true,
        },
      },
      {
        id: 'custom-team-spaces',
        name: 'Custom team spaces',
        tooltip: 'Set granular, space-level permissions to choose who can view, edit, and comment.',
        support: {
          personal: false,
          pro: true,
        },
      },
      {
        id: 'permission-groups',
        name: 'Permission groups',
        tooltip: 'Create groups of people according to role or department to streamline page & teamspace permissions.',
        support: {
          personal: false,
          pro: true,
        },
      },
    ],
  },
  {
    id: 'data-workflows',
    title: 'Data & workflows',
    features: [
      {
        id: 'forms',
        name: 'Forms',
        tooltip: 'Collecting information, organize responses, analyze results without moving data between separate tools.',
        support: {
          personal: '1 form',
          pro: 'Unlimited',
        },
      },
      {
        id: 'charts',
        name: 'Charts',
        tooltip: 'Visualize data from databases in different ways (e.g. donut, bar, and line charts).',
        support: {
          personal: '1 chart',
          pro: 'Unlimited',
        },
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    features: [
      {
        id: 'ai-meeting-notes',
        name: 'AI meeting notes',
        tooltip: 'Automatically transcribes your meetings, along with a helpful summary.',
        support: {
          personal: 'Limited trial',
          pro: true,
        },
      },
      {
        id: 'ai-transcript',
        name: 'AI transcript',
        tooltip: 'Convert audio and video files into organized, share-ready notes.',
        support: {
          personal: 'Limited trial',
          pro: true,
        },
      },
      {
        id: 'ai-responses',
        name: 'AI responses',
        tooltip: 'Chat about anything, generate and edit docs, autofill databases, and find answers across your AppFlowy workspace.',
        support: {
          personal: 'Limited trial',
          pro: true,
        },
      },
      {
        id: 'ai-search',
        name: 'AI search',
        tooltip: 'Get answers in seconds, grounded in your sources.',
        support: {
          personal: true,
          pro: true,
        },
      },
      {
        id: 'local-ai',
        name: 'Local AI',
        tooltip: 'Run AI features directly on your device via Ollama and LMStudio integrations.',
        support: {
          personal: true,
          pro: true,
        },
      },
    ],
  },
  {
    id: 'publishing',
    title: 'Publishing',
    features: [
      {
        id: 'publish-pages',
        name: 'Publish pages',
        tooltip: 'Publish an unlimited number of pages to the web.',
        support: {
          personal: false,
          pro: true,
        },
      },
      {
        id: 'custom-namespace',
        name: 'Custom namespace',
        tooltip: 'Claim appflowy.com/your_name for your published page urls.',
        support: {
          personal: false,
          pro: true,
        },
      },
      {
        id: 'pdf-export',
        name: 'PDF export',
        tooltip: 'Export your pages as PDFs. Perfect for legal or compliance backups.',
        support: {
          personal: 'Single page',
          pro: 'Include subpages',
        },
      },
    ],
  },
  {
    id: 'usage-storage',
    title: 'Usage & storage',
    features: [
      {
        id: 'storage',
        name: 'Storage',
        tooltip: 'On the Personal plan, you can use up to 100 MB of storage for blocks, files, and databases.',
        support: {
          personal: 'Up to 100 MB',
          pro: 'Unlimited',
        },
      },
      {
        id: 'file-uploads',
        name: 'File uploads',
        tooltip: 'On the Personal plan, you can upload attachments up to 7 MB each.',
        support: {
          personal: 'Up to 7 MB',
          pro: 'Unlimited',
        },
      },
      {
        id: 'version-history',
        name: 'Version history',
        tooltip: 'Restore your page to a previous version.',
        support: {
          personal: '7 days',
          pro: '90 days',
        },
      },
    ],
  },
];
