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
            <div>
              Bring projects, wikis, and teams together <span className={'text-primary'}>with AI</span>
            </div>
            <div className={'desc'}>
              <span className={'text-primary font-bold'}>AppFlowy</span> is an AI collaborative workspace where you
              achieve more without losing control of your data
            </div>
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
          <div className={'section-3-title'}>
            AppFlowy AI <span className={'text-[#C89AFA]'}>for teams who want better outcomes</span>
          </div>
          <AiExamples />
          <div className={'flex w-full flex-col items-center justify-center gap-[80px] pt-[26px] max-md:gap-10'}>
            <div className={'section-3-subtitle'}>
              Accessible,
              <span className={'text-[#C89AFA]'}> collaborative, and contextual</span>
            </div>
            <div className={'cards'}>
              <div className={'card'}>
                <CollaborativeIcon />
                <div className={'card-title'}>
                  Collaborative
                  <div className={'card-desc'}>Supercharge any type of work in a collaborative team workspace.</div>
                </div>
              </div>
              <div className={'card'}>
                <AiLocalIcon />
                <div className={'card-title'}>
                  AppFlowy AI Local
                  <div className={'card-desc'}>
                    Everyone can run AppFlowy AI on their machine - ultimate privacy, no GPU or Internet required.
                  </div>
                </div>
              </div>
              <div className={'card'}>
                <AiModelIcon />
                <div className={'card-title'}>
                  Advanced AI models
                  <div className={'card-desc'}>
                    {`Access to advanced models such as OpenAI’s GPT-4 Turbo, Anthropic’s Claude 3, and Mistral's Large.`}
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
                Local AI
                <div className={'card-desc'}>Locally running, no Internet required, utmost privacy on any machine.</div>
              </div>
            </div>
            <div className={'card'}>
              <FolderIcon />
              <div className={'card-title'}>
                Always available
                <div className={'card-desc'}>
                  Enjoy 100% offline mode with AppFlowy. Remain local and sync as required. Once account, any device.
                </div>
              </div>
            </div>
            <div className={'card'}>
              <UploadCloudIcon />
              <div className={'card-title'}>
                You own your data, forever
                <div className={'card-desc'}>You can host AppFlowy wherever you want; no vendor lock-in.</div>
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
                <div className={'number'}>5K</div>
                <div className={'plus'} />
              </div>
              <div className={'label'}>Community members</div>
            </div>
            <div className={'community-number'}>
              <div className={'flex gap-2'}>
                <div className={'number'}>110</div>
                <div className={'plus'} />
              </div>
              <div className={'label'}>Countries represented</div>
            </div>
            <div className={'community-number'}>
              <div className={'flex gap-2'}>
                <div className={'number'}>300</div>
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
          src={iconsBg}
          alt={''}
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
