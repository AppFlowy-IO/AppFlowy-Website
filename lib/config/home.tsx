/**
 * @description
 * This file is used to configure the home page.
 */

import card1 from '@/assets/images/product-showcase/card-1.svg';
import card2 from '@/assets/images/product-showcase/card-2.svg';
import card3 from '@/assets/images/product-showcase/card-3.svg';
import darkCard1 from '@/assets/images/product-showcase/dark/card-1.svg';
import darkCard2 from '@/assets/images/product-showcase/dark/card-2.svg';
import darkCard3 from '@/assets/images/product-showcase/dark/card-3.svg';

import Checkbox from '@/components/icons/checkbox';
import Folder from '@/components/icons/folder';
import Send from '@/components/icons/send';

import communityImage1 from '@/assets/images/community/img-1.png';
import communityImage2 from '@/assets/images/community/img-2.png';
import comminityDarkImage1 from '@/assets/images/community/dark/img-1.svg';
import comminityDarkImage2 from '@/assets/images/community/dark/img-2.svg';

/**
 * @description
 * This variable is used to configure the hero section.
 */
export const heroSectionConfig = {
  mainTitle: (
    <span>
      {`A `}
      <span className={'primary-word'}>
        secure
        <div className={'primary-line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 238 22' fill='none'>
            <path
              d='M1.99943 18.1304C16.4236 13.9095 49.5671 5.8517 66.7478 7.38723C83.9285 8.92275 66.349 16.712 55.4117 20.4147C98.1076 12.2316 193.981 -2.58527 235.908 3.6119'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </div>
      </span>
      {` workspace\nfor your wikis and projects`}
    </span>
  ),
  subtitle: (
    <span>
      <span className={'bold'}>AppFlowy </span>
      is an AI-powered secure workspace where you achieve more without losing control of your data
    </span>
  ),
  firstImgAlt: 'Appflowy',
  tags: ['Free', 'Open source', 'Cross platform', 'Offline mode', 'Cloud'],
};

/**
 * @description
 * This variable is used to configure the features section.
 */
export const productShowCaseConfig = {
  subtitle: (
    <span>
      <span className={'bold'}>An extensible and customizable</span> knowledge base built on a community-driven open
      toolbox of plugins, templates, themes, and more.
    </span>
  ),
  secondImgAlt: "AppFlowy's product showcase",
  secondTitle: (
    <span>
      <span className={'black bold'}>
        A <span className={'highlight'}>centralized</span> place for your tasks, notes, and projects.
      </span>{' '}
      Organize and visualize your data in tables, boards, calendars, and more.
    </span>
  ),
  thirdTitle: (
    <span>
      <span className={'primary-word'}>
        Easy
        <span className={'primary-line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 179 19' fill='none'>
            <path
              d='M177.263 14.9724C129.071 7.4489 95.3553 -2.62395 16.3532 4.93072C14.0431 5.15164 13.9245 8.38732 16.2144 8.76384L67.2846 17.1611C36.1376 10.0862 19.1314 9.94373 2.19824 13.4691'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </span>
      </span>
      {`-to-use and beautiful`}
    </span>
  ),
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
  title: (
    <span>
      Discover{' '}
      <span className={'primary-word'}>
        {`AI's`}
        <span className={'primary-line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 160 19' fill='none'>
            <path
              d='M158.243 15.3474C115.271 7.71981 85.197 -2.42584 14.7927 4.95872C12.523 5.19678 12.3918 8.36289 14.6352 8.78198L60.2211 17.2981C32.4436 10.1562 17.2851 9.97696 2.19965 13.4656'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </span>
      </span>
      {`\nfull power in a stunning\nrich-text editor`}
    </span>
  ),
  imageAlt: 'AI-powered rich-text editor',
  features: [
    {
      title: 'No tool\nswitching',
      icon: <Checkbox />,
      desc: 'You can enjoy the full power of AI right inside of AppFlowy.',
    },
    {
      title: 'Data\ncontrol',
      icon: <Folder />,
      desc: 'Unless you choose otherwise, your data won’t be sent to any AI service providers such as OpenAI. ',
    },
    {
      title: 'Choose your\nAI service',
      desc: (
        <span>
          Whether it’s OpenAI, Stability AI or <span className={'no-wrap'}>Llama 2,</span> you can choose the AI service
          that works best for you.
        </span>
      ),
      icon: <Send />,
    },
  ],
};

export const dataSecurityConfig = {
  title: (
    <span>
      {`Built for people who\n`}
      <span className={'primary-word'}>
        value privacy
        <span className={'primary-line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 447 17' fill='none'>
            <path
              d='M2.00334 11.1304C29.163 7.4542 91.6327 0.650614 124.234 2.84564C156.835 5.04067 123.835 12.1705 103.26 15.461C183.818 8.89718 364.848 -2.27774 444.499 5.53286'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </span>
      </span>
    </span>
  ),
  cards: [
    {
      title: 'End-to-end encryption',
      desc: 'Ensure the utmost privacy and security of your data by opting to use end-to-end encryption.',
    },
    {
      title: 'Always available',
      desc: 'Enjoy AppFlowy 100% offline. Remain local and sync as required. One account, any device.',
    },
    {
      title: 'You own your data, forever',
      desc: 'Host AppFlowy wherever you want. No vendor lock-in.',
    },
  ],
};

export const mobileApplicationConfig = {
  title: (
    <span>
      AppFlowy for{' '}
      <span className={'primary-word'}>
        Mobile
        <span className={'primary-line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 247 17' fill='none'>
            <path
              d='M244.739 14.8474C229.745 10.6509 114.843 0.27214 96.9721 1.83718C79.1013 3.40221 97.3709 11.162 108.74 14.8462C64.3492 6.73561 44.7391 -0.658847 2.02227 3.85501'
              stroke='#9327FF'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </span>
      </span>{' '}
      Work on the go
    </span>
  ),
};

export const communityConfig = {
  title: (
    <span>
      {`AppFlowy is built with a vibrant `}
      <span className={'primary-word'}>
        community
        <span className={'primary-line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 381 15' fill='none'>
            <path
              d='M1.99979 9.37731C25.1033 6.25015 78.2435 0.462636 105.976 2.32985C133.708 4.19706 105.637 10.2621 88.1342 13.0612C156.662 7.47763 310.656 -2.02839 378.412 4.61575'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </span>
      </span>
    </span>
  ),
  numbers: [
    {
      value: 4000,
      text: 'Community members',
    },
    {
      value: 45,
      text: 'Countries represented',
    },
    {
      value: 200,
      text: 'Contributors',
    },
  ],
  intros: [
    {
      title: 'Built by the\ncommunity\nfor the community',
      content: (
        <>
          <div>
            We work together to make secure workplace tools fit for everyone by developing a versatile toolbox of
            plugins, templates, and more.
          </div>
          <br />
          <div>
            Join us to build a toolbox that empowers anyone to create their own system — play and tweak without limits.
          </div>
        </>
      ),
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
        'There isn’t a one-size-fits-all solution, and there shouldn’t be. Looking for something unique? There’s no need to wait. Design and modify AppFlowy your way and unlock endless possibilities.',
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
  title: (
    <span>
      Get started for {` `}
      <span className={'primary-word'}>
        free
        <span className={'primary-circle'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 193 80' fill='none'>
            <path
              d='M0.503462 14.4901C151.501 -15.9788 189.001 14.0126 191.001 34.5102C193.342 58.5039 154 77.5099 85.4809 77.5101C16.9614 77.5103 7.0495 57.997 8.50098 42.5039C10.1873 24.5039 31.135 14.9456 85.4809 12.5039'
              stroke='currentColor'
              strokeWidth='3'
            />
          </svg>
        </span>
      </span>
    </span>
  ),
  subtitle: 'Choose to work smarter and own your data',
  imageAlt: '',
};
