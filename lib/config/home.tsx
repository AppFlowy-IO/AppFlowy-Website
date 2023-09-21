import card1 from '@/assets/images/product-showcase/card-1.svg';
import card2 from '@/assets/images/product-showcase/card-2.svg';
import card3 from '@/assets/images/product-showcase/card-3.svg';
import darkCard1 from '@/assets/images/product-showcase/dark/card-1.svg';
import darkCard2 from '@/assets/images/product-showcase/dark/card-2.svg';
import darkCard3 from '@/assets/images/product-showcase/dark/card-3.svg';

import Checkbox from '@/components/icons/checkbox';
import Folder from '@/components/icons/folder';
import Send from '@/components/icons/send';

import communityImage1 from '@/assets/images/community/img-1.svg';
import communityImage2 from '@/assets/images/community/img-2.svg';
import comminityDarkImage1 from '@/assets/images/community/dark/img-1.svg';
import comminityDarkImage2 from '@/assets/images/community/dark/img-2.svg';

export const heroSectionConfig = {
  title: 'A privacy-first open source workspace for your notes, wikis, and projects',
  desc: (
    <span>
      <span className={'bold'}>Appflowy </span>
      is the smart workspace where you have the full control and get more done, better and faster.
    </span>
  ),
  imageAlt: 'Appflowy',
  feature: ['Free', 'Open Source', '100% Offline Mode', 'Cross Platform', 'Cloud'],
};

export const productShowCaseConfig = {
  desc: (
    <span>
      <span className={'bold'}>An extensible and customizable</span> knowledge base built on a community-driven open
      toolbox of plugins, templates, themes, and more.
    </span>
  ),
  imageAlt: "AppFlowy's product showcase",
  title: (
    <span>
      <span className={'black bold'}>
        A <span className={'highlight'}>centralized</span> place for your tasks, notes, and projects.
      </span>{' '}
      Organize and visualize your data in table, board, calendar, and more.
    </span>
  ),
  subTitle: 'Easy-to-use and beautiful',
  cards: [
    {
      image: {
        src: card1.src,
        darkSrc: darkCard1.src,
        alt: '',
      },
      size: {
        width: 368,
        height: 353,
      },
      title: 'Customize themes, colours, fonts',
    },
    {
      image: {
        src: card2.src,
        darkSrc: darkCard2.src,
        alt: '',
      },
      size: {
        width: 238,
        height: 132,
      },
      title: 'Switch between dark and light themes',
    },
    {
      image: {
        src: card3.src,
        alt: '',
        darkSrc: darkCard3.src,
      },
      size: {
        width: 367,
        height: 294,
      },
      title: 'Go way beyond text & bullet points',
    },
  ],
};
export const supportAIConfig = {
  title: "Discover AI's\nfull power in a stunning\nrich-text editor",
  imageAlt: 'AI-powered rich-text editor',
  features: [
    {
      title: 'Without\nswitching',
      icon: <Checkbox />,
      desc: 'Right inside appflowy, you can enjoy the full power of AI without tool switching. ',
    },
    {
      title: 'Data\ncontrol',
      icon: <Folder />,
      desc: 'Your data is not sent to any AI service providers such as OpenAI, unless you choose to send. ',
    },
    {
      title: 'Сhoose \n' + 'AI service',
      desc: 'OpenAI, Stability AI and Langchain. you can choose the service you like.',
      icon: <Send />,
    },
  ],
};
export const mobileConfig = {
  title: 'Convenient mobile\napplication',
};
export const dataSecurityConfig = {
  title: 'Built for who care about\ndata security',
  cards: [
    {
      title: 'Data control',
      desc: 'You can host AppFlowy wherever you want; no vendor lock-in.',
    },
    {
      title: 'Always available',
      desc: 'AppFlow works completely offline, internet or service issues will never be your problem.',
    },
    {
      title: 'You own your \n' + 'data, forever',
      desc: "Your notes live on your device, period. You can encrypt them or back them up however you want; it's your decision, not ours.",
    },
  ],
};
export const communityConfig = {
  title: 'AppFlowy is built with a vibrant community',
  numbers: [
    {
      value: 2000000,
      text: 'Community members',
    },
    {
      value: 45,
      text: 'Countries represented',
    },
    {
      value: 129,
      text: 'Contributors',
    },
  ],
  intros: [
    {
      title: 'Build by the people for the people',
      content:
        'We collaboratively create apps that suit others’ needs by developing a versatile toolbox of plugins, templates, and more.\n' +
        "Join us to build a toolbox that empowers anyone to create their own system - play and tweak without a limit on what's possible.",
      btnText: 'Join Us',
      btnLink: '/join',
      image: {
        src: communityImage1.src,
        darkSrc: comminityDarkImage1.src,
        alt: '',
      },
    },
    {
      title: 'Do it yourself',
      content:
        'There isn’t a one size fit all solution and there shouldn’t be. Look for something unique? There’s no need to wait. Make your AppFlowy plugin, and unlock endless possibilities.',
      btnText: 'Developer Docs',
      btnLink: 'https://docs.appflowy.io/docs/essential-documentation/readme/welcome-to-appflowy',
      image: {
        src: communityImage2.src,
        darkSrc: comminityDarkImage2.src,
        alt: '',
      },
    },
  ],
};
export const startForFree = {
  title: 'Get started for free',
  desc: 'Choose to own your data and a smarter way to wor',
  imageAlt: '',
};
