import Twitter from '@/components/icons/twitter';
import Reddit from '@/components/icons/reddit';
import Github from '@/components/icons/github';
import Discord from '@/components/icons/discord';

export const externalLinks = [
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
    key: 'reddit',
    icon: (
      <i className={'text-white'}>
        <Reddit />
      </i>
    ),
    link: 'https://www.reddit.com/r/AppFlowy',
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
  {
    key: 'discord',
    icon: (
      <i className={'text-white'}>
        <Discord />
      </i>
    ),
    link: 'https://discord.gg/9Q2xaN37tV',
  },
];

export const links = [
  {
    name: 'Product',
    children: [
      {
        name: 'Templates',
        link: '/templates',
      },
      {
        name: "What's New",
        link: '/what-is-new',
      },
      {
        name: 'Roadmap',
        link: 'https://github.com/orgs/AppFlowy-IO/projects/5/views/12',
      },
      {
        name: 'Blog',
        link: '/blog',
      },
      {
        name: 'Email Newsletter',
        link: '/subscribe-newsletter',
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
        link: 'https://appflowy.com',
      },
    ],
  },
  {
    name: 'Community',
    children: [
      {
        name: 'GitHub',
        link: 'https://github.com/AppFlowy-IO/AppFlowy',
      },
      {
        name: 'Twitter',
        link: 'https://twitter.com/appflowy',
      },
      {
        name: 'Discord',
        link: 'https://discord.gg/9Q2xaN37tV',
      },
      {
        name: 'Community Hub',
        link: 'https://forum.appflowy.io/',
      },
      {
        name: 'Report a bug',
        link: 'https://github.com/AppFlowy-IO/AppFlowy/issues/new/choose',
      },
      {
        name: 'Request a feature',
        link: 'https://github.com/AppFlowy-IO/AppFlowy/issues/new/choose',
      },
    ],
  },
  {
    name: 'Resources',
    children: [
      {
        name: 'Guides & Tutorials',
        link: 'https://docs.appflowy.io/docs/guides/appflowy',
      },
      {
        name: 'Developer Docs',
        link: 'https://docs.appflowy.io/docs/essential-documentation/readme/welcome-to-appflowy',
      },
      {
        name: 'AppFlowy Blocks',
        link: '/appflowy-blocks',
      },
      {
        name: 'Request a resource',
        link: 'https://tally.so/r/npoyeb',
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
    name: 'Company',
    children: [
      {
        name: 'About Us',
        link: '/about',
      },
      {
        name: 'Careers',
        link: '/join',
        badge: 1,
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
        name: 'Contacts',
        link: '/contact',
      },
    ],
  },
];
