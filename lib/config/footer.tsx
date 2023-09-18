import Twitter from '@/components/icons/twitter';
import Reddit from '@/components/icons/reddit';
import Github from '@/components/icons/github';
import Discord from '@/components/icons/discord';

export const externalLinks = [
  {
    key: 'twitter',
    icon: <Twitter color={'white'} />,
    link: 'https://twitter.com/appflowy',
  },
  {
    key: 'reddit',
    icon: <Reddit color={'white'} />,
    link: 'https://www.reddit.com/r/AppFlowy',
  },
  {
    key: 'github',
    icon: <Github color={'white'} />,
    link: 'https://github.com/AppFlowy-IO/appflowy',
  },
  {
    key: 'discord',
    icon: <Discord color={'white'} />,
    link: 'https://discord.com/invite/9Q2xaN37tV',
  },
];

export const links = [
  {
    name: 'Product',
    children: [
      {
        name: "What's New",
        link: '/what-is-new',
      },
      {
        name: 'Roadmap',
        link: 'https://github.com/orgs/AppFlowy-IO/projects/5/views/12',
      },
      {
        name: 'Newsletter',
        link: 'https://blog.appflowy.io/',
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
        name: 'MacOS',
        link: '/download#MacOS',
      },

      {
        name: 'Windows',
        link: '/download#Windows',
      },

      {
        name: 'Linux',
        link: '/download#Linux',
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
        link: 'https://discord.com/invite/9Q2xaN37tV',
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
        link: 'https://blog.appflowy.io/tag/tutorials/',
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
        link: '',
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
        badge: 0,
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
