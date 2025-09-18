export interface ComparisonPlan {
  id: string;
  name: string;
  price: {
    amount: string;
    period: string;
  };
  billingInfo?: string;
  cta: {
    text: string;
    variant: 'upgrade' | 'contact';
  };
}

export interface ComparisonFeature {
  id: string;
  name: string;
  tooltip?: string;
  support: {
    [planId: string]: boolean | string;
  };
}

export interface ComparisonFeatureGroup {
  id: string;
  title: string;
  features: ComparisonFeature[];
}

export const comparisonPlans: ComparisonPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: {
      amount: '$0',
      period: 'month'
    },
    cta: {
      text: 'Current Plan',
      variant: 'upgrade'
    }
  },
  {
    id: 'seed',
    name: 'Seed',
    price: {
      amount: '$1',
      period: 'month'
    },
    billingInfo: 'billed annually',
    cta: {
      text: 'Upgrade',
      variant: 'upgrade'
    }
  },
  {
    id: 'one',
    name: 'One',
    price: {
      amount: '$6',
      period: 'month'
    },
    billingInfo: 'billed annually',
    cta: {
      text: 'Upgrade',
      variant: 'upgrade'
    }
  },
  {
    id: 'team',
    name: 'Team',
    price: {
      amount: '$10',
      period: 'seat / month'
    },
    billingInfo: 'billed annually',
    cta: {
      text: 'Upgrade',
      variant: 'upgrade'
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      amount: 'Custom',
      period: ''
    },
    cta: {
      text: 'Contact us',
      variant: 'contact'
    }
  }
];

// Feature groups with group titles and features
export const comparisonFeatureGroups: ComparisonFeatureGroup[] = [
  {
    id: 'access-platform',
    title: 'Access & Platform',
    features: [
      {
        id: 'appflowy-web',
        name: 'AppFlowy Web',
        tooltip: 'The AppFlowy web app, right in your browser',
        support: {
          free: true,
          seed: true,
          one: true,
          team: true,
          enterprise: true
        }
      },
      {
        id: 'super-admin-panel',
        name: 'Super admin panel',
        tooltip: 'For self‑hosters to manage their AppFlowy instance',
        support: {
          free: true,
          seed: true,
          one: true,
          team: true,
          enterprise: true
        }
      },
      {
        id: 'seat-limit',
        name: 'Seat limit',
        tooltip: 'Number of user seats per instance, unlimited workspaces',
        support: {
          free: '1',
          seed: '1',
          one: '1',
          team: 'Up to 1000',
          enterprise: 'Unlimited'
        }
      },
      {
        id: 'desktop-mobile',
        name: 'Desktop & mobile applications',
        tooltip: 'A comprehensive admin portal to manage your workspaces',
        support: {
          free: false,
          seed: true,
          one: true,
          team: true,
          enterprise: true
        }
      }
    ]
  },
  {
    id: 'ai',
    title: 'AI',
    features: [
      {
        id: 'appflowy-local-ai',
        name: 'AppFlowy Local AI',
        tooltip: 'Run local AI right inside AppFlowy',
        support: {
          free: false,
          seed: true,
          one: true,
          team: true,
          enterprise: true
        }
      },
      {
        id: 'appflowy-cloud-ai',
        name: 'AppFlowy Cloud AI',
        tooltip: 'Self-hosted cloud AI, seamlessly integrated to power AppFlowy\'s AI features',
        support: {
          free: false,
          seed: false,
          one: true,
          team: true,
          enterprise: true
        }
      }
    ]
  },
  {
    id: 'share-collaboration',
    title: 'Share & Collaboration',
    features: [
      {
        id: 'publish-pages',
        name: 'Publish pages',
        tooltip: 'Publish pages to web; Create a website with AppFlowy',
        support: {
          free: true,
          seed: true,
          one: true,
          team: true,
          enterprise: true
        }
      },
      {
        id: 'guest-editors',
        name: 'Guest editors',
        tooltip: 'Guests get page access instead of full workspace access',
        support: {
          free: 'Up to 3',
          seed: 'Up to 3',
          one: 'Up to 10',
          team: 'Up to 100',
          enterprise: 'Unlimited'
        }
      },
      {
        id: 'workspace-members',
        name: 'Workspace members',
        tooltip: 'Real-time multi-user collaboration in the same workspace, with member management and granular permissions',
        support: {
          free: false,
          seed: false,
          one: false,
          team: true,
          enterprise: true
        }
      }
    ]
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security',
    features: [
      {
        id: 'vault-workspaces',
        name: 'Vault workspaces',
        tooltip: 'Private and offline with local RAG search and AI integrations',
        support: {
          free: false,
          seed: false,
          one: true,
          team: true,
          enterprise: true
        }
      },
      {
        id: 'sso-saml',
        name: 'SSO incl. SAML 2.0',
        support: {
          free: false,
          seed: false,
          one: false,
          team: true,
          enterprise: true
        }
      },
      {
        id: 'security-audit-log',
        name: 'Security audit log',
        support: {
          free: false,
          seed: false,
          one: false,
          team: false,
          enterprise: true
        }
      }
    ]
  },
  {
    id: 'support-services',
    title: 'Support & Services',
    features: [
      {
        id: 'priority-support',
        name: 'Priority support',
        tooltip: 'Dedicated support from AppFlowy Team',
        support: {
          free: false,
          seed: false,
          one: false,
          team: true,
          enterprise: true
        }
      },
      {
        id: 'managed-deployment',
        name: 'Managed deployment',
        tooltip: 'Deploy AppFlowy on your infra by AppFlowy Team',
        support: {
          free: false,
          seed: false,
          one: false,
          team: false,
          enterprise: true
        }
      },
      {
        id: 'whitelabel',
        name: 'Whitelabel',
        tooltip: 'Get a white-label version of AppFlowy with your own branding',
        support: {
          free: false,
          seed: false,
          one: false,
          team: false,
          enterprise: true
        }
      },
      {
        id: 'support-contract',
        name: 'Support contract',
        tooltip: 'AppFlowy-built bespoke customizations for your organization',
        support: {
          free: false,
          seed: false,
          one: false,
          team: false,
          enterprise: true
        }
      }
    ]
  }
];

// Keep the old export for backward compatibility if needed
export const comparisonFeatures: ComparisonFeature[] = comparisonFeatureGroups.flatMap(group => group.features);