import editor from '@/assets/images/blocks/editor.svg';
import board from '@/assets/images/blocks/board.svg';
import darkEditor from '@/assets/images/blocks/dark/editor.svg';
import darkBoard from '@/assets/images/blocks/dark/board.svg';

export const whatIsNewConfig = {
  title: 'What’s New?',
};

export const downloadPageConfig = {
  title: 'Download for your OS',
  mobileTitle: 'Appflowy for iOS and Android',
  mobileSubtitle: 'Native, Interactive, Intuitive.',
  acrossTitle: 'Work across all your devices',
  imageAlt: '',
};

export const aboutPageConfig = {
  title1: 'Our mission is to empower everyone to create apps that suit their needs',
  missions: [
    {
      title: 'The limitations',
      desc: "The limitations we encountered using these tools rooted in our past work experience with collaborative productivity tools lead to our firm belief that there is, and will be a glass ceiling on what's possible in the future for tools like Notion.",
    },
    {
      title: 'One-size fits all solution',
      desc: 'This emanates from these tools probable struggles to scale horizontally at some point. It implies that they will likely be forced to prioritize for a proportion of customers whose needs can be quite different from the rest. While decision-makers want a workplace OS, the truth is that it is not very possible to come up with a one-size fits all solution in such a fragmented market.',
    },
    {
      title: "When a customer's evolving",
      desc: "When a customer's evolving core needs are not satisfied, they either switch to another or build one from the ground up, in-house. Consequently, they either go under another ceiling or buy an expensive ticket to learn a hard lesson. This is a requirement for many resources and expertise, building a reliable and easy-to-use collaborative tool, not to mention the speed and native experience. The same may apply to individual users as well.",
    },
    {
      title: 'Our mission',
      desc: (
        <div className={'our-mission-desc'}>
          <div>
            All these restrictions necessitate our mission - to make it possible for anyone to create apps that suit
            their needs well.
          </div>
          <div className={'bold'}>
            We decided to achieve this mission by upholding the three most fundamental values:
          </div>
          <div className={'list'}>
            <div>Data privacy first</div>
            <div>Reliable native experience</div>
            <div>Community-driven extensibility</div>
          </div>
        </div>
      ),
    },
  ],
  title2: "Join one of the world's fastest growing open source communities",
  communityData: [
    {
      value: 2000000,
      label: 'Community members',
    },
    {
      value: 100,
      label: 'Github Stars',
    },
    {
      value: 45,
      label: 'Countries represented',
    },
    {
      value: 129,
      label: 'Contributors',
    },
  ],
  developers: {
    title: 'Trusted by developers and users from',
    logos: [
      '/images/developer-logo-1.svg',
      '/images/developer-logo-2.svg',
      '/images/developer-logo-3.svg',
      '/images/developer-logo-4.svg',
      '/images/developer-logo-5.svg',
    ],
  },
  title3: 'Our Values',
  values: [
    {
      title: 'Mission Driven',
      list: [
        'Our mission is to make it possible for anyone to create apps that suit their needs well.',
        'We are true believers in open source—a fundamentally superior approach to achieve the mission.',
        'We actively lead and support the AppFlowy open-source community, where a diverse group of people is empowered to contribute to the common good.',
        'We think strategically, make wise decisions, and act accordingly, with an eye toward what’s sustainable in the long run, not what’s convenient in the moment.',
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
  title4: 'Our investors',
  investors: [
    {
      name: 'Phin Barnes',
      desc: 'Partner at First Round Capital',
    },
    {
      name: 'Phin Barnes',
      desc: 'Partner at First Round Capital',
    },
    {
      name: 'Phin Barnes',
      desc: 'Partner at First Round Capital',
    },
    {
      name: 'Phin Barnes',
      desc: 'Partner at First Round Capital',
    },
    {
      name: 'Phin Barnes',
      desc: 'Partner at First Round Capital',
    },
    {
      name: 'Phin Barnes',
      desc: 'Partner at First Round Capital',
    },
    {
      name: 'Phin Barnes',
      desc: 'Partner at First Round Capital',
    },
    {
      name: 'Phin Barnes',
      desc: 'Partner at First Round Capital',
    },
    {
      name: 'Phin Barnes',
      desc: 'Partner at First Round Capital',
    },
  ],
};

export const joinPageConfig = {
  title: 'Join our team',
  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  title1: 'Current Job Openings',
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
            As a founding member, you will help shape both what and how we build a world-class open-source product.
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
          <div className={'bold'}>100% remote.</div>
          <div>Our fully remote team works asynchronously, so we can work wherever and whenever we’re happiest.</div>
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
          <div>We’re well-funded by top VCs and great angel investors.</div>
        </div>
      ),
    },
  ],
};

export const contactPageConfig = {
  title: 'Contact Us',
  desc: "Thanks for stopping by! Whether you have a question, comment, or just want to say hi, don't be a stranger. We're here to help, and we love connecting with our community.",
};

export const blocksPageConfig = {
  title: 'AppFlowy Blocks',
  desc: 'AppFlowy is not only an open-source alternative to Notion but an application infra provider as well. We publish reliable and customizable standalone building appflowy-blocks such as AppFlowy Editor and Kanban Board for developers to build their own applications.',
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

export const contributorsPageConfig = {
  title1: 'Our contributors',
  desc: 'Here’s the list of our top contributors!',
  title2: 'Learn more about how to contribute to AppFlowy',
  learnMoreLink: 'https://docs.appflowy.io/docs/essential-documentation/contribute-to-appflowy',
};
