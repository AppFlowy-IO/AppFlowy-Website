import '@/styles/product.scss';
import Communities from '@/components/product/communities';
import GetStart from '@/components/product/get-start';
import MobileViews from '@/components/product/mobile-views';
import MobileDownloadBtns from '@/components/shared/mobile-download-btns';
import AiExamples from '@/components/product/ai-examples';
import AiLocalIcon from '@/components/product/ai-local-icon';
import AiLocalLightIcon from '@/components/product/ai-local-light-icon';
import AiModelIcon from '@/components/product/ai-model-icon';
import CollaborativeIcon from '@/components/product/collaborative-icon';
import FolderIcon from '@/components/product/folder-icon';
import MainDownload from '@/components/product/main-download';
import MainProducts from '@/components/product/main-products';
import UploadCloudIcon from '@/components/product/upload-cloud-icon';
import UseCases from '@/components/product/use-cases';
import ScrollIcons from '@/components/shared/scroll-icons';
import Image from 'next/image';
import iconsBg from '@/assets/images/product/icons-bg.png';

import React from 'react';

export default function Page() {
  return (
    <div className={'product-page'}>
      <div className={'af-container'}>
        <div className={'af-box section-1'}>
          <div className={'main-content'}>
            <h1>
              Bring projects, wikis, and teams together <span className={'text-primary'}>with AI</span>
            </h1>
            <div className={'desc'}>The AI workspace where you achieve more without losing control of your data</div>
          </div>
          <MainDownload />
          <div className={'flex flex-col items-center gap-4'}>
            <MainProducts />
          </div>
        </div>
      </div>
      <div className={'w-full bg-[#EEEEFD] pb-[120px]'}>
        <ScrollIcons />
      </div>
      <div className={'af-container'}>
        <div className={'af-box section-3'}>
          <div className='glow'></div>
          <h2 className={'section-3-title'}>
            AppFlowy AI{' '}
            <span
              style={{
                color: 'rgba(200, 154, 250, 0.67)',
              }}
            >
              Your go-to teammate
            </span>
          </h2>
          <AiExamples />
          <div className={'flex w-full flex-col items-center justify-center gap-[80px] pt-[26px] max-md:gap-10'}>
            <div className={'section-3-subtitle gradient-text'}>
              Accessible, collaborative, and contextual
              <span className={'text-[#C89AFA]'}></span>
            </div>
            <div className={'cards'}>
              <div className={'card'}>
                <div className='glow'></div>
                <AiLocalIcon />
                <div className={'card-title'}>
                  AI model selection
                  <div className={'card-desc'}>
                    Run Mistral 7B and Llama 3 on your machine. Choose from{' '}
                    <span className={'whitespace-nowrap'}>GPT 4-o</span> and Claude 3 Sonnet.
                  </div>
                </div>
              </div>
              <div className={'card'}>
                <div className='glow'></div>
                <CollaborativeIcon />
                <div className={'card-title'}>
                  Collaborative
                  <div className={'card-desc'}>
                    AppFlowy AI is your go-to teammate who adapts to your changing needs and priorities.
                  </div>
                </div>
              </div>

              <div className={'card'}>
                <div className='glow'></div>
                <AiModelIcon />
                <div className={'card-title'}>
                  Contextual
                  <div className={'card-desc'}>
                    {`Get intelligent insight, extract actionable items, and generate takeaways across pages.`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'af-container'}>
        <div className={'af-box section-4'}>
          <div className={'section-4-title'}>
            <span className={'text-primary'}>Easy-to-use</span> and powerful
          </div>
          <UseCases />
        </div>
      </div>
      <div className={'af-container'}>
        <div className={'af-box section-5'}>
          <div className={'section-5-title'}>
            Built for people who value
            <span className={'text-primary'}> privacy</span>
          </div>
          <div className={'cards'}>
            <div className={'card'}>
              <AiLocalLightIcon />
              <div className={'card-title'}>
                AI On-device
                <div className={'card-desc'}>
                  {`Run Mistral 7B, Llama 3, and\nmore local models on your\nmachine for ultimate privacy.`}
                </div>
              </div>
            </div>
            <div className={'card'}>
              <FolderIcon />
              <div className={'card-title'}>
                Always available
                <div className={'card-desc'}>
                  {`100% offline mode. Remain local\nand sync as required.\nOne account, any device.`}
                </div>
              </div>
            </div>
            <div className={'card'}>
              <UploadCloudIcon />
              <div className={'card-title'}>
                Own your data
                <div className={'card-desc'}>{`Self-host AppFlowy wherever\nyou want; no vendor lock-in.`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'af-container'}>
        <div className={'af-box section-6'}>
          <div className={'section-6-title'}>
            AppFlowy
            <span className={'text-primary'}> for Mobile </span>
            Work on the go
          </div>
          <MobileDownloadBtns />
          <MobileViews />
        </div>
      </div>
      <div className={'af-container'}>
        <div className={'af-box section-7'}>
          <div className={'section-7-title'}>
            AppFlowy is built with a vibrant
            <span className={'text-primary'}> community</span>
          </div>
          <div className={'community-numbers'}>
            <div className={'community-number'}>
              <div className={'flex gap-2'}>
                <div className={'number'}>6K</div>
                <div className={'plus'} />
              </div>
              <div className={'label'}>Community members</div>
            </div>
            <div className={'community-number'}>
              <div className={'flex gap-2'}>
                <div className={'number'}>190</div>
                <div className={'plus'} />
              </div>
              <div className={'label'}>Countries represented</div>
            </div>
            <div className={'community-number'}>
              <div className={'flex gap-2'}>
                <div className={'number'}>330</div>
                <div className={'plus'} />
              </div>
              <div className={'label'}>Contributors</div>
            </div>
          </div>
          <Communities />
        </div>
      </div>
      <div className={'flex w-full items-center justify-center pb-[96px] max-md:pb-[10vh]'}>
        <Image
          loading={'eager'}
          src={iconsBg}
          alt={'AppFlowy AI workspace'}
          style={{
            width: '100%',
            height: 'auto',
          }}
          quality={100}
          width={1555}
          height={430}
        />
      </div>
      <GetStart />
    </div>
  );
}
