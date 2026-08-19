import Twitter from '@/components/icons/twitter';
import Github from '@/components/icons/github';
import Discord from '@/components/icons/discord';
import { webApplicationUrl } from '@/lib/web-application';
import Youtube from '@/components/icons/youtube';

export const externalLinks = [
  {
    key: 'discord',
    icon: (
      <i className={'text-white'}>
        <Discord />
      </i>
    ),
    link: 'https://discord.gg/9Q2xaN37tV',
  },
  {
    key: 'youtube',
    icon: (
      <i className={'text-white'}>
        <Youtube />
      </i>
    ),
    link: 'https://www.youtube.com/@AppFlowyHQ',
  },
  {
    key: 'twitter',
    icon: (
      <i className={'text-white'}>
        <Twitter />
      </i>
    ),
    link: 'https://twitter.com/appflowy',
  },

  {
    key: 'github',
    icon: (
      <i className={'text-white'}>
        <Github />
      </i>
    ),
    link: 'https://github.com/AppFlowy-IO/appflowy',
  },
];

export const links = [
  {
    name: 'Company',
    children: [
      {
        name: 'Contacts',
        link: '/contact',
      },
      {
        name: 'About Us',
        link: '/about',
      },
      {
        name: 'Privacy',
        link: '/privacy',
      },
      {
        name: 'Terms',
        link: '/terms',
      },
      {
        name: 'Careers',
        link: '/join',
        badge: 1,
      },
      {
        name: 'Pricing',
        link: '/pricing',
      },
    ],
  },
  {
    name: 'Download',
    link: '/download',
    children: [
      {
        name: 'iOS & Android',
        link: '/download#ios-and-android',
      },

      {
        name: 'macOS',
        link: '/download#macOS',
      },

      {
        name: 'Windows',
        link: '/download#Windows',
      },

      {
        name: 'Linux',
        link: '/download#Linux',
      },
      {
        name: 'Browser',
        link: webApplicationUrl,
      },
    ],
  },
  {
    name: 'Resources',
    children: [
      {
        name: 'Product guides',
        link: 'https://appflowy.com/guide/getting-started-with-appflowy',
      },
      {
        name: 'Developer docs',
        link: 'https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production',
      },
      {
        name: 'Templates',
        link: '/templates',
      },
      {
        name: 'Videos',
        link: 'https://www.youtube.com/@AppFlowyHQ',
      },
      {
        name: "What's new",
        link: '/what-is-new',
      },
      {
        name: 'Zapier integration',
        link: 'https://zapier.com/apps/appflowy/integrations',
      },
      {
        name: 'AppFlowy Blocks',
        link: '/appflowy-blocks',
      },
      {
        name: 'RSS',
        link: '/blog/feed.xml',
      },
    ],
  },
  {
    name: 'Compare',
    children: [
      {
        name: 'vs Notion',
        link: '/compare/notion-vs-appflowy',
      },
    ],
  },
  {
    name: 'Support',
    children: [
      {
        // TODO: temporary link
        name: 'General support',
        link: '/contact',
      },
      {
        name: 'Contact sales',
        // Opens the contact dialog in place instead of navigating.
        action: 'contact-sales' as const,
      },
      {
        name: 'Report a bug',
        link: 'https://github.com/AppFlowy-IO/AppFlowy/issues/new/choose',
      },
      {
        name: 'Request a feature',
        link: 'https://github.com/AppFlowy-IO/AppFlowy/issues/new/choose',
      },
      {
        name: 'Community server',
        link: 'https://discord.gg/9Q2xaN37tV',
      },
      {
        name: 'Forums',
        link: 'https://forum.appflowy.com/',
      },
    ],
  },
];
