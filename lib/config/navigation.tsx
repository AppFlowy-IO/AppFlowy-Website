import Send from '@/components/icons/send';
import Star from '@/components/icons/star';
import Eye from '@/components/icons/eye';
import Forum from '@/components/icons/forum';
import Github from '@/components/icons/github';
import Twitter from '@/components/icons/twitter';
import Discord from '@/components/icons/discord';
import Docs from '@/components/icons/docs';
import Blocks from '@/components/icons/blocks';
import Roadmap from '@/components/icons/roadmap';
import Ring from '@/components/icons/ring';
import Book from '@/components/icons/book';
import Email from '@/components/icons/email';

/**
 * Config for the navigation bar
 */
export const navigation: Item[] = [
  {
    name: 'Product',
    href: '/',
    key: 'product',
  },
  {
    name: 'Download',
    href: '/download',
    key: 'download',
  },
  {
    name: 'Community',
    key: 'community',
    children: [
      {
        name: 'Community',
        key: 'community-group-1',
        children: [
          {
            key: '1',
            name: 'Write for AppFlowy',
            href: 'https://appflowy.gitbook.io/docs/essential-documentation/contribute-to-appflowy/write-for-appflowy',
            icon: <Send />,
            desc: 'Help AppFlowy developers and end users — and get paid',
          },
          {
            key: '2',
            name: 'Top Contributors',
            href: '/contributors',
            icon: <Star />,
            desc: '200+ are helping build secure workplace solutions',
          },
          {
            key: '3',
            name: 'AppFlowy Mentorship',
            href: 'https://docs.appflowy.io/docs/appflowy/community/appflowy-mentorship-program/contributor-guidance',
            icon: <Eye />,
            desc: 'Hands-on learning for new developers',
          },
        ],
      },
      {
        name: 'Connect with us',
        key: 'community-group-2',
        children: [
          {
            key: '1',
            name: 'Discord',
            href: 'https://discord.gg/9Q2xaN37tV',
            icon: (
              <i className={'text-primary'}>
                <Discord />
              </i>
            ),
            desc: 'Get tips and support from 3,000+  users',
          },
          {
            key: '2',
            name: 'Twitter',
            href: 'https://twitter.com/appflowy',
            icon: (
              <i className={'text-primary'}>
                <Twitter />
              </i>
            ),
            desc: 'Follow the latest news',
          },
          {
            key: '3',
            name: 'Github',
            href: 'https://github.com/AppFlowy-IO/AppFlowy',
            icon: (
              <i className={'text-primary'}>
                <Github />
              </i>
            ),
            desc: 'Access 100% of the AppFlowy source code',
          },
          {
            key: '4',
            name: 'Community forum',
            href: 'https://forum.appflowy.io/',
            icon: (
              <i className={'text-primary'}>
                <Forum />
              </i>
            ),
            desc: 'Discuss questions and ideas',
          },
        ],
      },
      {
        key: 'featured',
        name: 'Featured',
        children: [
          {
            key: '1',
            name: 'Self-hosting AppFlowy Free Using Supabase',
            href: 'https://blog.appflowy.io/self-hosting-appflowy-free-using-supabase/',
            image: {
              src: '/images/appflowy_self_hosted_free_supabase.png',
              alt: 'Self-hosting AppFlowy Free Using Supabase',
            },
          },
          {
            key: '2',
            name: 'How to Contribute to AppFlowy',
            href: 'https://blog.appflowy.io/how-to-contribute-to-appflowy/',
            image: {
              src: '/images/how-to-contribute-to-appflowy.png',
              alt: 'How to Contribute to AppFlowy',
            },
          },
        ],
      },
    ],
  },
  {
    key: 'resources',
    name: 'Resources',
    children: [
      {
        key: 'resources-group-1',
        name: 'Docs',
        children: [
          {
            key: '1',
            name: 'Developers Docs',
            desc: 'Everything technical',
            icon: <Docs />,
            href: 'https://docs.appflowy.io/docs/essential-documentation/readme/welcome-to-appflowy',
          },
          {
            key: '2',
            name: 'AppFlowy Blocks',
            desc: 'Standalone packages to build your own productivity tools',
            icon: <Blocks />,
            href: '/appflowy-blocks',
          },
          {
            key: '3',
            name: 'Roadmap',
            desc: 'Shipped, in progress, and next up',
            icon: <Roadmap />,
            href: 'https://github.com/orgs/AppFlowy-IO/projects/5/views/12',
          },
          {
            key: '4',
            name: "What's new",
            desc: 'The latest and greatest from AppFlowy',
            icon: <Ring />,
            href: '/what-is-new',
          },
        ],
      },
      {
        key: 'resources-group-2',
        name: 'Learn',
        children: [
          {
            key: '1',
            name: 'Guides & Tutorials',
            desc: 'Achieve more with AppFlowy',
            icon: <Book />,
            href: 'https://docs.appflowy.io/docs/guides/appflowy',
          },
          {
            key: '2',
            name: 'Request a resource',
            desc: 'Suggest a topic for a new guide or tutorial',
            icon: <Send />,
            href: 'https://tally.so/r/npoyeb',
          },
          {
            key: 'menu.newsletter',
            name: 'Technical Blog',
            desc: 'Learn how we tackle technical challenges',
            icon: <Email />,
            href: 'https://blog.appflowy.io/',
          },
        ],
      },
      {
        key: 'featured',
        name: 'Featured',
        children: [
          {
            key: '1',
            name: 'Self-hosting AppFlowy Free Using Supabase',
            href: 'https://blog.appflowy.io/self-hosting-appflowy-free-using-supabase/',
            image: {
              src: '/images/appflowy_self_hosted_free_supabase.png',
              alt: 'Self-hosting AppFlowy Free Using Supabase',
            },
          },
          {
            key: '2',
            name: 'How to Contribute to AppFlowy',
            href: 'https://blog.appflowy.io/how-to-contribute-to-appflowy/',
            image: {
              src: '/images/how-to-contribute-to-appflowy.png',
              alt: 'How to Contribute to AppFlowy',
            },
          },
        ],
      },
    ],
  },
];

export interface Item {
  href?: string;
  children?: Item[];
  key: string;
  name: string;
  desc?: string;
  icon?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };
}
