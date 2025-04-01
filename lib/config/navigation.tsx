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
            href: 'https://forum.appflowy.com/',
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
            href: '/blog/appflowy-2nd-anniversary-and-2023-roundup',
            image: {
              src: '/images/appflowy-2nd-anniversary-and-2023-roundup.png',
              alt: 'AppFlowy 2nd Anniversary and 2023 Roundup',
            },
          },
          {
            key: '3',
            name: 'How to Contribute to AppFlowy',
            href: '/blog/how-to-contribute-to-appflowy/',
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
            name: 'What\'s new',
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
            href: 'https://appflowy.com/guide/getting-started-with-appflowy',
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
            name: 'Blog',
            desc: 'Receive the latest updates and stories from AppFlowy',
            icon: <Email />,
            href: '/blog',
          },
          {
            key: 'menu.templates',
            name: 'Templates',
            desc: 'Ready-made pages from industry leaders and the community',
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g opacity="1">
                  <path
                    d="M10.4469 2.8263L10.3987 2.81336L10.3857 2.86166L8.66025 9.30116L8.64731 9.34946L8.69561 9.3624L10.2392 9.776L10.2763 9.78593L10.2954 9.75271L11.1005 8.35836C11.7227 7.28058 13.2784 7.28058 13.9006 8.35836L15.2183 10.6407L15.2787 10.7452L15.3099 10.6286L16.9218 4.613L16.9348 4.5647L16.8865 4.55176L10.4469 2.8263ZM16.203 12.2648L16.1716 12.2918L16.1923 12.3277L18.2307 15.8584C18.853 16.9361 18.0752 18.2834 16.8307 18.2834H8.17041C7.22595 18.2834 6.54962 17.5072 6.55126 16.6611L6.55136 16.6087L6.49899 16.611C6.41664 16.6148 6.33381 16.6167 6.25053 16.6167C3.2866 16.6167 0.883862 14.214 0.883862 11.25C0.883862 8.2861 3.2866 5.88336 6.25053 5.88336C6.80273 5.88336 7.33536 5.96674 7.83657 6.12157L7.88618 6.1369L7.89962 6.08674L8.87243 2.45618C9.10352 1.59374 9.99 1.08193 10.8524 1.31302L17.2919 3.03848C18.1544 3.26957 18.6662 4.15605 18.4351 5.01848L16.7096 11.458C16.6222 11.7842 16.4411 12.0602 16.203 12.2648ZM9.43271 11.247L9.46529 11.1906L9.40235 11.1737L8.29013 10.8757C7.42769 10.6446 6.91588 9.75812 7.14697 8.89568L7.46769 7.69872L7.47994 7.65301L7.43497 7.63827C7.06218 7.51609 6.66402 7.45003 6.25053 7.45003C4.15185 7.45003 2.45053 9.15135 2.45053 11.25C2.45053 13.3487 4.15185 15.05 6.25053 15.05C6.61697 15.05 6.97138 14.9981 7.30677 14.9013L7.32613 14.8957L7.3362 14.8783L9.43271 11.247ZM16.9173 16.7167L16.874 16.6417L12.5438 9.14169L12.5005 9.06669L12.4572 9.14169L8.12711 16.6417L8.08381 16.7167H8.17041H16.8307H16.9173Z"
                    fill="#9327FF"
                    stroke="#9327FF"
                    strokeWidth="0.1"
                  />
                </g>
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
            name: 'Getting Started With AppFlowy',
            href: 'https://appflowy.com/guide/getting-started-with-appflowy',
            image: {
              src: '/images/getting-started.png',
              alt: 'Getting Started With AppFlowy',
            },
          },
          {
            key: '2',
            name: 'Self-hosting AppFlowy with AppFlowy Cloud',
            href: 'https://docs.appflowy.io/docs/guides/appflowy/self-hosting-appflowy',
            image: {
              src: '/images/self-hosting-appflowy.webp',
              alt: 'Self-hosting AppFlowy with AppFlowy Cloud',
            },
          },
          {
            key: '3',
            name: 'How to Contribute to AppFlowy',
            href: '/blog/how-to-contribute-to-appflowy/',
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
