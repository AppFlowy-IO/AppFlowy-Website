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
import Viewport from '@/components/icons/viewport';
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
            name: 'Wirte for AppFlowy',
            href: 'https://appflowy.gitbook.io/docs/essential-documentation/contribute-to-appflowy/write-for-appflowy',
            icon: <Send />,
            desc: 'Lorem ipsum dolor sit amet',
          },
          {
            key: '2',
            name: 'Top Contributors',
            href: '/contributors',
            icon: <Star />,
            desc: 'Lorem ipsum dolor sit amet',
          },
          {
            key: '3',
            name: 'Appflowy Mentorship',
            href: 'https://docs.appflowy.io/docs/essential-documentation/contribute-to-appflowy/appflowy-mentorship-program/mentorship-2022',
            icon: <Eye />,
            desc: 'Lorem ipsum dolor sit amet',
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
            href: 'https://discord.com/invite/9Q2xaN37tV',
            icon: (
              <i className={'text-primary'}>
                <Discord />
              </i>
            ),
            desc: 'Lorem ipsum dolor sit amet',
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
            desc: 'Lorem ipsum dolor sit amet',
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
            desc: 'Lorem ipsum dolor sit amet',
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
            desc: 'Lorem ipsum dolor sit amet',
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
            desc: 'Lorem ipsum dolor sit amet',
            icon: <Docs />,
            href: 'https://docs.appflowy.io/docs/essential-documentation/readme/welcome-to-appflowy',
          },
          {
            key: '2',
            name: 'Appflowy Blocks',
            desc: 'Lorem ipsum dolor sit amet',
            icon: <Blocks />,
            href: '/appflowy-blocks',
          },
          {
            key: '3',
            name: 'Roadmap',
            desc: 'Lorem ipsum dolor sit amet',
            icon: <Roadmap />,
            href: 'https://github.com/orgs/AppFlowy-IO/projects/5/views/12',
          },
          {
            key: '4',
            name: "What's new",
            desc: 'Lorem ipsum dolor sit amet',
            icon: <Ring />,
            href: '/what-is-new',
          },
        ],
      },
      {
        key: 'resources-group-2',
        name: 'Learns',
        children: [
          {
            key: '1',
            name: 'Guides & Tutorials',
            desc: 'Lorem ipsum dolor sit amet',
            icon: <Book />,
            href: 'https://blog.appflowy.io/tag/tutorials/',
          },
          {
            key: '2',
            name: 'Request a resource',
            desc: 'Lorem ipsum dolor sit amet',
            icon: <Send />,
            href: '',
          },
          {
            key: 'menu.newsletter',
            name: 'Newsletter',
            desc: 'Lorem ipsum dolor sit amet',
            icon: <Email />,
            href: 'https://blog.appflowy.io/',
          },
          {
            key: 'menu.live-demo',
            name: 'Live demo',
            desc: 'Lorem ipsum dolor sit amet',
            icon: <Viewport />,
            href: '/live-demo',
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
}
