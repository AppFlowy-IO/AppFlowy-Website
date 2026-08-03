import {
  RequestResourcesIcon,
  VideoTutorialsIcon,
  DeveloperDocsIcon,
  ProductGuideIcon,
  BlogIcon,
  TemplatesIcon,
  WhatsNewIcon,
  WebAppIcon,
  DesktopIcon,
  MobileIcon,
} from '@/components/icons/navigation-icons';

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
            icon: <MobileIcon />,
            desc: '',
          },
          {
            key: '2',
            name: 'macOS & Windows & Linux',
            href: '/download#macOS',
            icon: <DesktopIcon />,
            desc: '',
          },
          {
            key: '3',
            name: 'Web app',
            href: '/app',
            icon: <WebAppIcon />,
            desc: '',
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
        name: 'Discover',
        children: [
          {
            key: 'menu.updates',
            name: "What's new",
            desc: 'The latest and greatest from AppFlowy',
            icon: <WhatsNewIcon />,
            href: '/what-is-new',
          },
          {
            key: 'menu.newsletter',
            name: 'Blog',
            desc: 'Receive the latest updates and stories from AppFlowy',
            icon: <BlogIcon />,
            href: '/blog',
          },
          {
            key: 'menu.templates',
            name: 'Templates',
            desc: 'Ready-made pages from industry leaders and the community',
            icon: <TemplatesIcon />,
            href: '/templates',
          },
        ],
      },
      {
        key: 'resources-group-2',
        name: 'Learn',
        children: [
          {
            key: '1',
            name: 'Product Guides',
            desc: 'Achieve more with AppFlowy',
            icon: <ProductGuideIcon />,
            href: 'https://appflowy.com/guide/getting-started-with-appflowy',
          },
          {
            key: '2',
            name: 'Developers Docs',
            desc: 'Everything technical',
            icon: <DeveloperDocsIcon />,
            href: 'https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production',
          },
          {
            key: '3',
            name: 'Video Tutorials',
            desc: 'Learn how to use and self-host AppFlowy',
            icon: <VideoTutorialsIcon />,
            href: 'https://www.youtube.com/@AppFlowyHQ',
          },
          {
            key: '4',
            name: 'Request a resource',
            desc: 'Suggest a topic for a new guide or tutorial',
            icon: <RequestResourcesIcon />,
            href: 'https://tally.so/r/npoyeb',
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
              src: '/images/getting-started.webp',
              alt: 'Getting Started With AppFlowy',
            },
          },
          {
            key: '2',
            name: 'Self-hosting AppFlowy with AppFlowy Cloud',
            href: 'https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production',
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
              src: '/images/how-to-contribute-to-appflowy.webp',
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
  {
    name: 'Self-host',
    href: 'https://appflowy.com/docs/Step-by-step-Self-Hosting-Guide---From-Zero-to-Production',
    key: 'self-host',
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
