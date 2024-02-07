/**
 * @desc This file contains all the configurations for the pages
 */

import editor from '@/assets/images/blocks/editor.png';
import board from '@/assets/images/blocks/board.png';
import darkEditor from '@/assets/images/blocks/dark/editor.svg';
import darkBoard from '@/assets/images/blocks/dark/board.svg';
import React from 'react';
import Link from 'next/link';

/**
 * What's new page
 * @desc This variable is used to configure the what's new page.
 */
export const whatIsNewConfig = {
  title: 'What’s New?',
};

/**
 * Download page
 */
export const downloadPageConfig = {
  downloadOSImageAlt: 'Download for your OS',
  mobileSubtitle: 'Native, Interactive, Intuitive.',
  downloadMobileImgAlt: 'AppFlowy for iOS and Android',
  downloadOtherPlatformTitle: 'Work across all your devices',
};

/**
 * About Us page
 */
export const aboutPageConfig = {
  ourMissionTitle: (
    <span>
      Our{' '}
      <span className={'primary-word'}>
        mission
        <span className={'primary-line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 318 19' fill='none'>
            <path
              d='M315.402 12.9724C229.301 6.2039 169.137 -3.34175 27.6868 5.45314C25.2248 5.60622 25.1498 9.10811 27.608 9.31281L118.594 16.8891C62.9766 10.3012 32.5512 10.4258 2.19871 14.2183'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </span>
      </span>{' '}
      is to enable everyone to achieve more with secure workplace tools
    </span>
  ),
  missions: [
    {
      title: 'One-size doesn’t fit all',
      desc: (
        <div>
          <div>
            {`While co-founder Annie Wang was working on an enterprise proprietary collaboration platform in her previous company, she came to realize that there isn't a one-size-fits-all workplace solution that suits every enterprise's needs well.`}
          </div>
          <br />
          <div>
            Likewise, workplace apps, such as Notion and Airtable, are often forced to prioritize features for some
            customers at the expense of the rest. This usually leads to a poor cross-platform experience and products
            that struggle to scale without becoming bulky and slow.
          </div>
        </div>
      ),
    },
    {
      title: 'The limitation',
      desc: (
        <div>
          <div>
            Most proprietary collaboration workplace tools share one major limitation: Customers find it hard or
            expensive to have 100% control of their data.
          </div>
          <br />
          <div>
            Users worry about entrusting sensitive data to these tools and are naturally concerned about their longevity.
            Furthermore overcoming vendor lock-in poses a significant challenge.
          </div>
        </div>
      ),
    },

    {
      title: 'Our solution',
      desc: (
        <div className={'our-mission-desc'}>
          <div>AppFlowy - a secure, open source workspace for wikis and projects, made to suit everyone.</div>
          <div className={'list'}>
            <div>Put control of your data in your hands</div>
            <div>Ensure the user interface is fast and intuitive.</div>
            <div>
              Make integration and customization easy with no vendor lock in. Add AppFlowy into your existing workflows
              or build a customized workspace with our open source building blocks such as AppFlowy Editor and Kanban
              Board.
            </div>
            <div>
              Build an open source codebase with a community-driven open toolbox of plugins, templates, and themes so you
              can design and modify AppFlowy your way without limits.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Our mission',
      desc: (
        <div className={'our-mission-desc'}>
          <div>
            We aim to enable everyone to unleash their potential and achieve more with secure workplace tools by
            upholding these core values from the very beginning:
          </div>
          <div className={'list'}>
            <div>Data privacy first</div>
            <div>Community-driven extensibility</div>
            <div>Reliable and fast native app experience</div>
            <div>Continuous, fast-paced innovation</div>
            <div>Commitment to an open source philosophy</div>
          </div>
        </div>
      ),
    },
  ],
  communityTitle: (
    <span>
      <span className={'primary-word'}>
        Join
        <span className={'primary-circle'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 194 92' fill='none'>
            <path
              d='M0.491297 30.7697C147.062 -19.929 187.724 7.76295 192.036 29.5091C197.083 54.9642 160.15 80.0439 92.0711 88.221C23.9919 96.398 11.9303 76.6518 11.615 59.8615C11.2488 40.3544 30.9777 27.6029 84.6975 18.4985'
              stroke='currentColor'
              strokeWidth='3'
            />
          </svg>
        </span>
      </span>{' '}
      {`one of the world's fastest growing open source communities`}
    </span>
  ),
  communityData: [
    {
      value: 260,
      label: 'GitHub Contributors',
      link: {
        text: 'Get started',
        href: 'https://docs.appflowy.io/docs/documentation/software-contributions/contributing-to-appflowy\n',
      },
    },
    {
      value: 5000,
      label: 'Community members',
      link: {
        text: 'Join Discord',
        href: 'https://discord.gg/9Q2xaN37tV',
      },
    },
    {
      value: 5000,
      label: 'Newsletter subscribers',
      link: {
        text: 'Subscribe',
        href: '/subscribe-newsletter',
      },
    },
  ],
  developers: {
    title: 'Contributed and used by makers from',
    logos: [
      '/images/developer-logo-1.svg',
      '/images/developer-logo-2.svg',
      '/images/developer-logo-3.svg',
      '/images/developer-logo-4.svg',
      '/images/developer-logo-5.svg',
    ],
  },
  ourValuesTitle: 'Our Values',
  values: [
    {
      title: 'Mission Driven',
      list: [
        'Our mission is to enable everyone to unleash the potential and achieve more with secure workplace tools.',
        'We are true believers in open source—a fundamentally superior approach to achieve the mission.',
        'We actively lead and support the AppFlowy open-source community, where a diverse group of people is empowered to contribute to the common good.',
        'We think strategically, make wise decisions, and act accordingly, with an eye toward what’s sustainable in the long run and not what’s convenient in the moment.',
      ],
    },
    {
      title: 'Aim High and Iterate',
      list: [
        'We strive for excellence with a growth mindset.',
        'We dream big, start small, and move fast.',
        'We take smaller steps and ship smaller, simpler features.',

        'We don’t wait, but instead iterate and work as part of the community.',

        'We focus on results over process and prioritize progress over perfection.',
      ],
    },
    {
      title: 'Transparency',
      list: [
        'We make information about AppFlowy public by default unless there is a compelling reason not to.',
        'We are straightforward and kind with ourselves and each other.',
        'We surface issues constructively and proactively.',
        'We say “why” and provide sufficient context for our actions rather than just disclosing the “what.” ',
      ],
    },
    {
      title: 'Collaboration',
      list: [
        'We pride ourselves on being a great team.',

        'We foster collaboration, value diversity and inclusion, and encourage sharing.',

        'We thrive as individuals within the context of our team and succeed together.',

        'We play very effectively with people of diverse backgrounds and cultures.',

        'We make time to help each other in pursuit of our common goals.',
      ],
    },
    {
      title: 'Honesty',
      list: [
        'We are honest with ourselves.',

        'We admit mistakes freely and openly.',

        'We provide candid, helpful, timely feedback to colleagues with respect, regardless of their status or whether they disagree with us.',

        'We are vulnerable in search of truth and don’t defend our point to just win over others.',
      ],
    },
  ],
  ourInvestorsTitle: 'Our investors',
  investors: [
    {
      name: 'OSS Capital',
      desc: 'For an open future',
    },
    {
      name: 'HongShan',
      desc: 'The entrepreneurs behind the entrepreneurs',
    },
    {
      name: 'Bob Young',
      desc: 'Co-Founder of Red Hat',
    },
    {
      name: 'Steve Chen',
      desc: 'Co-Founder of YouTube',
    },
    {
      name: 'Tom Preston-Werner',
      desc: 'Co-Founder of GitHub',
    },
    {
      name: 'Justin Hoffman',
      desc: 'SVP at Elastic',
    },
    {
      name: 'Preetha Parthasarathy',
      desc: 'Angel Investor',
    },
    {
      name: 'Amr Awadallah',
      desc: 'Co-Founder of Cloudera',
    },
    {
      name: 'Clint Smith',
      desc: 'Chief Legal at Discord',
    },
    {
      name: 'David Mytton',
      desc: 'Co-Founder of Server Density',
    },
    {
      name: 'Matt Mullenweg',
      desc: 'Founder of Automattic',
    },
    {
      name: 'Kevin Xu',
      desc: 'Senior Director at GitHub',
    },
    {
      name: 'Peer Richelsen',
      desc: 'Co-Founder of Cal.com',
    },
    {
      name: 'Paul Copplestone',
      desc: 'Co-Founder of Supabase',
    },
    {
      name: 'Arkadiusz Zarowski',
      desc: 'Investor',
    },
    {
      name: 'Maneesh Sharma',
      desc: 'COO at LambdaTest',
    },
  ],
};

/**
 * Join Us Page
 */
export const joinPageConfig = {
  title: 'Join our team',
  subtitle:
    'Explore remote-friendly opportunities, contribute to open source, and join the mission to make secure workplace tools fit for everyone',
  currentJobTitle: (
    <span>
      Current{' '}
      <span className={'primary-word'}>
        Job
        <span className={'primary-circle'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 163 90' fill='none'>
            <path
              d='M1.49956 30.119C126.5 -24.9989 156.955 14.4573 160.5 34.0007C164.044 53.5441 147.499 78.5011 85.9994 86.5014C24.4994 94.5017 7.90746 75.1104 7.58697 57.7431C7.21462 37.5656 25.7239 24.4176 76.1601 15.1131'
              stroke='currentColor'
              strokeWidth='3'
            />
          </svg>
        </span>
      </span>{' '}
      Openings
    </span>
  ),
  goodPoints: [
    {
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'>
          <path
            d='M25.9506 2.71356C26.1506 1.99442 25.724 1.24817 25.0174 1.04464C24.2974 0.85468 23.5775 1.28882 23.3775 2.00796L14.0447 37.2864C13.8581 38.0056 14.2713 38.7518 14.9913 38.9554C15.6979 39.1453 16.4312 38.7112 16.6178 37.992L25.9506 2.71356Z'
            fill='#9327FF'
          />
          <path
            d='M11.6144 31.6101C11.1004 32.13 10.2568 32.13 9.74275 31.6101L2.92781 24.7188C0.357397 22.1061 0.357397 17.8939 2.92781 15.2812L9.74275 8.38989C10.2568 7.87004 11.1004 7.87004 11.6144 8.38989C12.1285 8.90975 12.1285 9.76275 11.6144 10.2826L4.79965 17.174C3.24423 18.7335 3.24423 21.2665 4.79965 22.8261L11.6144 29.7174C12.1285 30.2373 12.1285 31.0903 11.6144 31.6101Z'
            fill='#9327FF'
          />
          <path
            d='M28.3945 31.6017C28.9206 32.1328 29.7839 32.1328 30.31 31.6017L37.0273 24.8205C39.6576 22.1515 39.6576 17.8485 37.0273 15.1795L30.31 8.3983C29.7839 7.86723 28.9206 7.86723 28.3945 8.3983C27.8685 8.92936 27.8685 9.80074 28.3945 10.3318L35.1118 17.113C36.7035 18.7062 36.7035 21.2938 35.1118 22.887L28.3945 29.6682C27.8685 30.1993 27.8685 31.0706 28.3945 31.6017Z'
            fill='#9327FF'
          />
        </svg>
      ),
      content: (
        <div className={'point'}>
          <div className={'bold'}>Fast-growing open-source.</div>
          <div>
            As a founding member, you will help shape both what and how we build a world-class open source product.
          </div>
        </div>
      ),
    },
    {
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'>
          <path
            d='M14 17C15.1067 17 16 16.1067 16 15C16 13.8933 15.1067 13 14 13C12.8933 13 12 13.8933 12 15C12 16.1067 12.8933 17 14 17Z'
            fill='#9327FF'
          />
          <path
            d='M26 17C27.1067 17 28 16.1067 28 15C28 13.8933 27.1067 13 26 13C24.8933 13 24 13.8933 24 15C24 16.1067 24.8933 17 26 17Z'
            fill='#9327FF'
          />
          <path
            d='M30.8228 25.9404C31.1957 25.3136 30.9608 24.517 30.2979 24.1644C29.6211 23.8118 28.7785 24.0469 28.4194 24.6737C26.7621 27.4945 23.5857 29.3881 19.9533 29.3881C16.3762 29.3881 13.2548 27.5468 11.5837 24.8174C11.197 24.1905 10.3547 23.9816 9.69175 24.3342C9.02882 24.6998 8.80768 25.4964 9.18058 26.1233C11.3351 29.6363 15.3542 32 19.9533 32C24.6353 32 28.7097 29.5579 30.8228 25.9404Z'
            fill='#9327FF'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1 20C1 9.50928 9.50928 1 20 1C30.4907 1 39 9.50928 39 20C39 30.4907 30.4907 39 20 39C9.50928 39 1 30.4907 1 20ZM20 3.71429C11.0021 3.71429 3.71429 11.0021 3.71429 20C3.71429 28.9979 11.0021 36.2857 20 36.2857C28.9979 36.2857 36.2857 28.9979 36.2857 20C36.2857 11.0021 28.9979 3.71429 20 3.71429Z'
            fill='#9327FF'
          />
        </svg>
      ),
      content: (
        <div className={'point'}>
          <div className={'bold'}>Community-focused.</div>
          <div>
            We actively lead and support our passionate and engaged community, where a diverse group of people is
            empowered to contribute to the common good.
          </div>
        </div>
      ),
    },
    {
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M37.2414 26.8886C38.8483 27.459 40 29.0035 40 30.8261C40 33.1357 38.1476 35 35.8621 35H4.13793C1.85241 35 0 33.1357 0 30.8261C0 29.0035 1.15172 27.459 2.75862 26.8886V7.17391C2.75862 4.86435 4.61103 3 6.89655 3H33.1034C35.389 3 37.2414 4.86435 37.2414 7.17391V26.8886ZM34.4828 26.6522V7.17391C34.4828 6.4087 33.8648 5.78261 33.1034 5.78261H6.89655C6.13517 5.78261 5.51724 6.4087 5.51724 7.17391V26.6522H34.4828ZM35.8621 29.4348C36.6234 29.4348 37.2414 30.0609 37.2414 30.8261C37.2414 31.5913 36.6234 32.2174 35.8621 32.2174H4.13793C3.37655 32.2174 2.75862 31.5913 2.75862 30.8261C2.75862 30.0609 3.37655 29.4348 4.13793 29.4348H35.8621Z'
            fill='#9327FF'
          />
        </svg>
      ),
      content: (
        <div className={'point'}>
          <div className={'bold'}>Remote-friendly.</div>
          <div>
            We’re a remote-friendly team and work async, so we can work wherever we’re happiest and contribute from
            anywhere at any time
          </div>
        </div>
      ),
    },
    {
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M39 1.43429C39 0.903172 38.6945 0.40074 38.2079 0.156713C37.7197 -0.0873153 37.1351 -0.0443146 36.6893 0.271486L17.0974 14.0089L12.1077 10.3341C11.5654 9.93213 10.8157 9.96088 10.2954 10.3772L1.52613 17.5545C1.1929 17.8272 1 18.2292 1 18.6598V31.5645C1 32.354 1.65477 33 2.46154 33H37.5385C38.3452 33 39 32.354 39 31.5645V1.43429ZM17.9261 16.9517L36.0769 4.219V30.1291H3.92308V19.3344L11.279 13.3056L16.2 16.9373C16.7101 17.3105 17.4087 17.3249 17.9261 16.9517Z'
            fill='#9327FF'
          />
          <path
            d='M1.42857 37C0.64 37 0 37.675 0 38.5C0 39.325 0.64 40 1.42857 40H38.5714C39.36 40 40 39.325 40 38.5C40 37.675 39.36 37 38.5714 37H1.42857Z'
            fill='#9327FF'
          />
        </svg>
      ),
      content: (
        <div className={'point'}>
          <div className={'bold'}>Backed by top VCs.</div>
          <div> We’re well-funded by top VCs and great angel investors.</div>
        </div>
      ),
    },
  ],
  jobs: [
    // {
    //   title: 'Senior Backend Developer Rust',
    //   link: 'https://apply.workable.com/appflowy/j/3DEE4EA0C0/',
    // },
  ],
};

export const contactPageConfig = {
  title: (
    <span>
      <span className={'primary-word'}>
        Contact
        <span className={'primary-line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 294 12' fill='none'>
            <path
              d='M1.998 9.763C19.6792 8.04544 60.3895 4.723 81.7808 5.1737C103.172 5.62441 81.7565 8.72387 68.3748 10.2173C120.929 6.77299 239.12 0.392411 291.446 2.42423'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </span>
      </span>{' '}
      Us
    </span>
  ),
  desc: (
    <span>
      We’re happy to answer your specific questions.
      <br />
      For technical issues and general inquiries,
      <br />
      ask in our{' '}
      <Link target={'_blank'} className={'link'} href={'https://discord.gg/9Q2xaN37tV'}>
        Discord community
      </Link>
      <br />
      to get a quicker response.
    </span>
  ),
};

/**
 * Appflowy Blocks Page
 */
export const blocksPageConfig = {
  title: 'AppFlowy Blocks',
  subtitle:
    'AppFlowy is not only an open-source alternative to Notion but an application infra provider as well. We publish reliable and customizable standalone building blocks such as AppFlowy Editor and Kanban Board for developers to build their own applications.',
  blocks: [
    {
      title: 'AppFlowy Editor',
      desc: 'A highly customizable rich-text editor for Flutter',
      imageSrc: editor.src,
      imageDarkSrc: darkEditor.src,
      imageAlt: 'AppFlowy Editor',
      link: 'https://pub.dev/packages/appflowy_editor',
      imageWidth: 538,
      imageHeight: 335,
    },
    {
      title: 'AppFlowy Board',
      desc: 'A customizable and draggable Kanban Board widget',
      imageSrc: board.src,
      imageDarkSrc: darkBoard.src,
      imageAlt: 'AppFlowy Board',
      link: 'https://pub.dev/packages/appflowy_board',
      imageWidth: 562,
      imageHeight: 316,
    },
  ],
};

/**
 * Contributors Page
 */
export const contributorsPageConfig = {
  mainTitle: (
    <span>
      Our{' '}
      <span className={'primary-word'}>
        contributors
        <span className={'primary-line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 174 6' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M106.807 3.9591C81.7425 4.09808 56.6418 4.63763 41.1919 5.09271L40.4968 3.89976C44.4561 3.60192 49.4056 3.12313 51.7877 2.65633C51.805 2.65294 51.822 2.64957 51.8388 2.64623C51.1372 2.56719 50.1551 2.48702 48.8298 2.41146C42.7384 2.0642 33.7504 2.15212 24.8882 2.41425C16.0624 2.67531 7.49844 3.10457 2.31994 3.4198L0.810975 3.51165L0.0492773 2.32051L1.55824 2.22865C6.80467 1.90928 15.448 1.47614 24.363 1.21244C33.2416 0.949818 42.528 0.850615 48.9957 1.21933C50.6068 1.31117 51.8868 1.4172 52.8566 1.54069C53.7273 1.65156 54.7074 1.81858 55.2917 2.12296C55.6402 2.30451 55.8266 2.52468 55.7642 2.75258C55.7073 2.96001 55.4598 3.11864 55.2263 3.22852C54.986 3.34159 54.6767 3.44185 54.3367 3.53115C69.0739 3.18325 87.7795 2.85763 106.47 2.754C131.562 2.61487 156.782 2.87427 172.315 4.03618L173.864 4.15203L173.555 5.33478L172.007 5.21893C156.837 4.08419 131.917 3.81987 106.807 3.9591ZM52.7558 2.40838C52.7559 2.4084 52.7548 2.40903 52.7522 2.41029C52.7545 2.409 52.7557 2.40837 52.7558 2.40838Z'
              fill='currentColor'
            />
          </svg>
        </span>
      </span>
    </span>
  ),
  subtitle: 'Here’s the list of our top contributors!',
  learnMoreTitle: (
    <span>
      Learn more about how to{' '}
      <span className={'primary-word'}>
        contribute
        <span className={'primary-line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 155 6' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M154.286 0.127551C154.335 0.15582 154.461 0.235943 154.543 0.400098C154.706 0.725891 154.785 1.1502 154.536 1.54006C154.322 1.87568 153.958 2.02293 153.68 2.09776C153.102 2.25291 152.28 2.2509 151.452 2.20425C150.682 2.16079 149.825 2.07209 149.017 1.98842C148.934 1.97975 148.85 1.97113 148.768 1.96261C147.875 1.87054 147.071 1.79265 146.479 1.78519C146.036 1.77961 145.593 1.77377 145.151 1.7677C145.026 1.77597 144.901 1.78432 144.774 1.79276C139.273 2.16032 131.951 2.68982 124.617 3.2323C117.382 3.76741 110.137 4.31503 104.619 4.73212L104.393 4.74925C101.62 4.95882 99.2972 5.13438 97.6503 5.25725C96.827 5.31868 96.172 5.36698 95.7141 5.3998C95.4854 5.4162 95.3048 5.4288 95.1768 5.43726C95.0706 5.44426 94.9586 5.45164 94.9071 5.45076L94.2676 5.43982L94.2895 4.16084L94.929 4.17179C94.9194 4.17163 94.9255 4.17127 94.9568 4.1694C94.9828 4.16785 95.0262 4.16526 95.0925 4.16088C95.2169 4.15266 95.3946 4.14027 95.6227 4.12392C96.0786 4.09124 96.732 4.04305 97.5552 3.98163C99.2013 3.85882 101.524 3.68332 104.296 3.47373L104.528 3.45626C110.045 3.03921 117.288 2.49167 124.522 1.95663C126.431 1.81545 128.339 1.67513 130.215 1.5383C126.335 1.48807 122.456 1.45747 118.575 1.47524C102.514 1.54874 86.4822 1.93994 70.4492 2.33117C47.2189 2.89803 23.9861 3.46495 0.659717 3.06565L0.0202313 3.05471L0.0421244 1.77574L0.68161 1.78668C23.9987 2.18582 47.1673 1.61998 70.3643 1.05344C86.3994 0.661822 102.448 0.269871 118.569 0.196091C125.107 0.166165 131.646 0.27331 138.178 0.380345C140.492 0.418262 142.805 0.456164 145.117 0.487954C147.68 0.317698 149.827 0.1845 151.362 0.104405C152.172 0.0621993 152.816 0.0344518 153.265 0.023987C153.487 0.0187957 153.671 0.0175936 153.805 0.0218971C153.87 0.0239617 153.941 0.027747 154.004 0.0362844C154.033 0.0401685 154.086 0.0481812 154.145 0.0663387C154.174 0.0752166 154.226 0.0933106 154.286 0.127551Z'
              fill='currentColor'
            />
          </svg>
        </span>
      </span>{' '}
      to AppFlowy
    </span>
  ),
  learnMoreLink: 'https://docs.appflowy.io/docs/documentation/software-contributions/contributing-to-appflowy',
};

export const downloadVersion = {
  ios: <span>Requires iOS 12.0 or above.</span>,
  android: <span>Requires Android OS 10 or above.</span>,
};
