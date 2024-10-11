import Object1 from '@/assets/images/vs-notion/OBJECTS-1.png';
import Object2 from '@/assets/images/vs-notion/OBJECTS-2.png';
import GetStart from '@/components/product/get-start';
import ImportLink from '@/components/vs-notion/import-link';
import Object3 from '@/assets/images/vs-notion/OBJECTS-3.png';
import NotionImage from '@/assets/images/vs-notion/notion.svg';
import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import CloseImage from '@/assets/images/vs-notion/x.svg';
import RightImage from '@/assets/images/vs-notion/right.svg';

import React from 'react';
import Image from 'next/image';
import 'styles/vs-notion.scss';

const points = ['Offline mode', 'Self-hosting', 'AI model selection', 'Customization', 'Native mobile and desktop apps'];
const environment = process.env.ENVIRONMENT || 'development';

let importBaseURL: string = 'https://appflowy.com';

if (environment === 'test') {
  importBaseURL = 'https://test.appflowy.com';
}

function Page() {
  return (
    <div className={'vs-notion-page'}>
      <div className={'af-container'}>
        <div className={'af-box section-1'}>
          <div className={'flex items-center justify-center gap-2'}>
            <Image src={AppFlowyImage} alt={'AppFlowy'} width={56} height={56} />
            <span className={'text-sm font-semibold'}>vs</span>
            <Image src={NotionImage} alt={'Notion'} width={56} height={56} />
          </div>
          <div className={'main-content'}>
            <div>
              The Best Open Source <span className={'text-primary'}>Notion Alternative</span>
            </div>
            <div className={'desc'}>Open source, fast, offline support, self-hosting</div>
          </div>
          <ImportLink importBaseURL={importBaseURL} />
        </div>
      </div>
      <div className={'af-container'}>
        <div className={'af-box section-2'}>
          <div className={'section-2-title'}>
            {`Enjoy the `}
            <span className={'text-primary'}>flexibility</span>
            {`\n`}without losing control of your data
          </div>
          <div className={'cards'}>
            <div className={'card'}>
              <Image src={Object1} alt={'AI model selection'} width={151} height={121} />
              <div className={'card-title'}>
                AI model selection
                <div className={'card-desc'}>
                  Run Mistral 7B and Llama 3 on your machine. Choose from{' '}
                  <span className={'whitespace-nowrap'}>GPT 4-o</span> and Claude 3 Sonnet.
                </div>
              </div>
            </div>
            <div className={'card'}>
              <Image src={Object2} alt={'Available everywhere'} width={151} height={121} />

              <div className={'card-title'}>
                Available everywhere
                <div className={'card-desc'}>Self-host AppFlowy wherever you want, no vendor lock-in.</div>
              </div>
            </div>

            <div className={'card'}>
              <Image src={Object3} alt={'100% offline mode'} width={189} height={121} />

              <div className={'card-title'}>
                100% offline mode
                <div className={'card-desc'}>{`Remain local and sync as required.\nOne account, any device.`}</div>
              </div>
            </div>
          </div>
          <div className={'flex w-full min-w-0 max-w-[1100px] flex-col gap-1'}>
            <div className={'flex w-full items-center justify-between'}>
              <div className='w-1/2 px-[48px] py-6 text-[#58585a] max-md:px-4 max-md:py-4'>Compare features</div>
              <div className='w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4'>Notion</div>
              <div className='w-1/4 px-[48px] py-6 text-center text-[#58585a] max-md:px-4 max-md:py-4'>AppFlowy</div>
            </div>
            {points.map((point) => (
              <div
                key={point}
                className={'flex w-full items-center justify-between rounded-[15px] border border-gray-100 bg-white'}
              >
                <div className='w-1/2 px-[48px] py-10 font-medium text-black max-md:px-4 max-md:py-6'>{point}</div>
                <div className='flex w-1/4 items-center justify-center px-[48px] py-10 max-md:px-4 max-md:py-6'>
                  <Image src={CloseImage} alt={'Close'} width={12} height={12} />
                </div>
                <div className='flex w-1/4 items-center justify-center px-[48px] py-10 max-md:px-4 max-md:py-6'>
                  <Image src={RightImage} alt={'Right'} width={20} height={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <GetStart />
    </div>
  );
}

export default Page;
