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
import Mobile from '@/components/icons/mobile';
import Desktop from '@/components/icons/desktop';

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
    placement: 'left',
    children: [
      {
        name: 'Download',
        key: 'download-group-1',

        children: [
          {
            key: '1',
            name: 'iOS & Android',
            href: '/download#ios-and-android',
            icon: <Mobile />,
            desc: '',
          },
          {
            key: '2',
            name: 'macOS & Windows & Linux',
            href: '/download#macOS',
            icon: <Desktop />,
            desc: '',
          },
        ],
      },
    ],
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
            desc: '300+ are helping build secure workplace solutions',
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
            desc: 'Get tips and support from 5,000+  users',
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
            desc: 'Access the AppFlowy source code',
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
            name: 'Self-hosting AppFlowy with AppFlowy Cloud',
            href: 'https://docs.appflowy.io/docs/guides/appflowy/self-hosting-appflowy',
            image: {
              src: '/images/self-hosting-appflowy.webp',
              alt: 'Self-hosting AppFlowy with AppFlowy Cloud',
            },
          },
          {
            key: '2',
            name: 'AppFlowy 2nd Anniversary and 2023 Roundup',
            href: 'https://blog.appflowy.io/appflowy-2nd-anniversary-and-2023-roundup/',
            image: {
              src: '/images/appflowy-2nd-anniversary-and-2023-roundup.png',
              alt: 'AppFlowy 2nd Anniversary and 2023 Roundup',
            },
          },
          {
            key: '3',
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
          {
            key: 'menu.templates',
            name: 'Templates',
            desc: 'Ready-made pages from industry leaders and the community',
            icon: (
              <svg xmlns='http://www.w3.org/2000/svg' width='46' height='46' viewBox='0 0 20 20' fill='none'>
                <path
                  d='M8.125 3.125H4.375C4.04348 3.125 3.72554 3.2567 3.49112 3.49112C3.2567 3.72554 3.125 4.04348 3.125 4.375V8.125C3.125 8.45652 3.2567 8.77446 3.49112 9.00888C3.72554 9.2433 4.04348 9.375 4.375 9.375H8.125C8.45652 9.375 8.77446 9.2433 9.00888 9.00888C9.2433 8.77446 9.375 8.45652 9.375 8.125V4.375C9.375 4.04348 9.2433 3.72554 9.00888 3.49112C8.77446 3.2567 8.45652 3.125 8.125 3.125ZM8.125 8.125H4.375V4.375H8.125V8.125ZM15.625 3.125H11.875C11.5435 3.125 11.2255 3.2567 10.9911 3.49112C10.7567 3.72554 10.625 4.04348 10.625 4.375V8.125C10.625 8.45652 10.7567 8.77446 10.9911 9.00888C11.2255 9.2433 11.5435 9.375 11.875 9.375H15.625C15.9565 9.375 16.2745 9.2433 16.5089 9.00888C16.7433 8.77446 16.875 8.45652 16.875 8.125V4.375C16.875 4.04348 16.7433 3.72554 16.5089 3.49112C16.2745 3.2567 15.9565 3.125 15.625 3.125ZM15.625 8.125H11.875V4.375H15.625V8.125ZM8.125 10.625H4.375C4.04348 10.625 3.72554 10.7567 3.49112 10.9911C3.2567 11.2255 3.125 11.5435 3.125 11.875V15.625C3.125 15.9565 3.2567 16.2745 3.49112 16.5089C3.72554 16.7433 4.04348 16.875 4.375 16.875H8.125C8.45652 16.875 8.77446 16.7433 9.00888 16.5089C9.2433 16.2745 9.375 15.9565 9.375 15.625V11.875C9.375 11.5435 9.2433 11.2255 9.00888 10.9911C8.77446 10.7567 8.45652 10.625 8.125 10.625ZM8.125 15.625H4.375V11.875H8.125V15.625ZM15.625 10.625H11.875C11.5435 10.625 11.2255 10.7567 10.9911 10.9911C10.7567 11.2255 10.625 11.5435 10.625 11.875V15.625C10.625 15.9565 10.7567 16.2745 10.9911 16.5089C11.2255 16.7433 11.5435 16.875 11.875 16.875H15.625C15.9565 16.875 16.2745 16.7433 16.5089 16.5089C16.7433 16.2745 16.875 15.9565 16.875 15.625V11.875C16.875 11.5435 16.7433 11.2255 16.5089 10.9911C16.2745 10.7567 15.9565 10.625 15.625 10.625ZM15.625 15.625H11.875V11.875H15.625V15.625Z'
                  fill='#9327FF'
                />
              </svg>
            ),
            href: '/templates',
          },
        ],
      },
      {
        key: 'featured',
        name: 'Featured',
        children: [
          {
            key: '1',
            name: 'Self-hosting AppFlowy with AppFlowy Cloud',
            href: 'https://docs.appflowy.io/docs/guides/appflowy/self-hosting-appflowy',
            image: {
              src: '/images/self-hosting-appflowy.webp',
              alt: 'Self-hosting AppFlowy with AppFlowy Cloud',
            },
          },
          {
            key: '2',
            name: 'AppFlowy 2nd Anniversary and 2023 Roundup',
            href: 'https://blog.appflowy.io/appflowy-2nd-anniversary-and-2023-roundup/',
            image: {
              src: '/images/appflowy-2nd-anniversary-and-2023-roundup.png',
              alt: 'AppFlowy 2nd Anniversary and 2023 Roundup',
            },
          },
          {
            key: '3',
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
    name: 'Pricing',
    href: '/pricing',
    key: 'pricing',
  },
];

export interface Item {
  href?: string;
  children?: Item[];
  key: string;
  name: string;
  desc?: string;
  placement?: 'left' | 'right' | 'center';
  icon?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };
}
