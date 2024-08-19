import ScrollIcons from '@/components/shared/scroll-icons';
import { LearnMore } from '@/components/v2/pricing/icons';
import Prices from '@/components/v2/pricing/prices';
import UnlockCards from '@/components/v2/pricing/unlock-cards';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Card1 from '@/assets/images/pricing/card-1.png';
import Card2 from '@/assets/images/pricing/card-2.png';
import Card3 from '@/assets/images/pricing/card-3.png';
import Card4 from '@/assets/images/pricing/card-4.png';
import Help from '@/assets/images/pricing/help.png';
import Affiliate from '@/assets/images/pricing/affiliate.png';
import Contact from '@/assets/images/pricing/contact.png';
import '@/styles/pricing2.scss';

function Page() {
  return (
    <div className={'pricing-page'}>
      <div className={'af-container'}>
        <div className={'af-box section-1'}>
          <div className={'main-title'}>
            <div>Your work solution.</div>
            <div className={'text-primary'}>Start free.</div>
          </div>
          <Prices />
        </div>
      </div>
      <div className={'af-container'}>
        <div className={'af-box section-2'}>
          <div className={'flex max-w-[1100px]  flex-col gap-[60px]'}>
            <div className={'main-title'}>
              <span>
                <span className={'text-primary'}>Unlock</span> unlimited AI power
              </span>
              <div className={'subtitle'}>AppFlowy AI includes</div>
            </div>
            <div className={'cards'}>
              <div className={'card'}>
                <Image src={Card1} alt={''} width={257} height={320} />
                <div className={'desc'}>Find inspiration</div>
              </div>
              <div className={'card'}>
                <Image src={Card2} alt={''} width={257} height={320} />
                <div className={'desc'}>Write better</div>
              </div>
              <div className={'card'}>
                <Image src={Card3} alt={''} width={257} height={320} />
                <div className={'desc'}>Autofill tables</div>
              </div>
              <div className={'card'}>
                <Image src={Card4} alt={''} width={257} height={320} />
                <div className={'desc'}>Get answers</div>
              </div>
            </div>
          </div>
          <div className={'flex w-full max-w-[1100px] flex-col gap-[35px]'}>
            <div className={'w-full text-right text-base max-sm:text-xs'}>
              Prices in <span className={'font-bold'}>$ USD</span>
            </div>
            <UnlockCards />
          </div>
        </div>
      </div>
      <div className={'w-full bg-white pb-[110px]'}>
        <ScrollIcons />
      </div>
      <div className={'af-container section-3-container bg-[#200E34]'}>
        <div className={'af-box section-3'}>
          <div className={'title'}>
            <span>
              Have additional <span className={'text-[#C89AFA]'}>questions?</span>
            </span>
          </div>
          <div className={'cards'}>
            <div className={'card'}>
              <Image src={Help} alt={''} width={151} height={121} />
              <div className={'card-title'}>Help articles</div>
              <Link href={'https://docs.appflowy.io/docs'} className={'flex items-center gap-2'}>
                Learn more <LearnMore />
              </Link>
            </div>
            <div className={'card'}>
              <Image src={Affiliate} alt={''} width={151} height={121} />
              <div className={'card-title'}>Affiliate programs</div>
              <Link href={'/'} className={'flex items-center gap-2'}>
                Learn more <LearnMore />
              </Link>
            </div>
            <div className={'card'}>
              <Image src={Contact} alt={''} width={151} height={121} />
              <div className={'card-title'}>Contact support</div>
              <Link href={'/contact'} className={'flex items-center gap-2'}>
                Contact Us <LearnMore />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={'af-container bg-[#200E34]'}>
        <div className={'af-box section-4 gap-[30px]'}>
          <div className={'flex flex-col items-center gap-5'}>
            <div className={'title'}>
              <span>
                Get started for
                <span className={'text-[#C89AFA]'}> free</span>
              </span>
            </div>
            <div className={'desc'}>Choose to own your data and a smarter way to work</div>
          </div>

          <div className={'btns'}>
            <Link className={'download-btn'} href={'/download'}>
              Download
            </Link>
            <Link className={'live-demo-btn'} href={'/template-center'}>
              Template Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
