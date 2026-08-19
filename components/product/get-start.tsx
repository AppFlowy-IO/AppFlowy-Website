'use client';
import logo from '@/assets/images/logo.svg';
import { Button } from '@/components/ui/button';
import ScrollFillText from '@/components/shared/scroll-fill-text';
import { EventName, collectEvent } from '@/lib/collect';
import { webApplicationUrl } from '@/lib/web-application';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useContactDialog } from '@/components/shared/contact-dialog-provider';

interface GetStartProps {
  /** The blurred glow behind the section. Off for pages that want a plain white band. */
  showGlow?: boolean;
}

function GetStart({ showGlow = true }: GetStartProps) {
  const { openContactDialog } = useContactDialog();

  return (
    <div className='flex w-full justify-center'>
      <div className='section-8 min-w-0 max-w-full py-20 relative inset-0 isolate bg-white'>
        {showGlow && <div className='circle-gradient pointer-events-none absolute bottom-[-50vh] left-1/2 -z-10 h-[clamp(500px,50vw,700px)] w-[clamp(500px,50vw,700px)] -translate-x-1/2 rounded-full bg-[#dcdcff] blur-[175px] max-[720px]:hidden' />}
        <div className='section-8-title relative z-[1] flex flex-col items-center justify-center gap-6 text-center max-md:gap-3'>
          <div className='section-8-logo flex h-[84px] w-[84px] items-center justify-center rounded-[20px] mb-7 border border-black/[0.08] bg-white shadow-[0_0_40px_0_rgba(73,87,240,0.08)]'>
            <Image src={logo} alt={'AppFlowy'} className='h-[56px] w-[56px]' />
          </div>
          <h2 className='text-style-h1 font-semibold tracking-[-0.04em]'>
            {/* Lines are `w-fit` blocks, so they need centring of their own here. */}
            <ScrollFillText lineClassName='mx-auto'>Get started for free</ScrollFillText>
          </h2>
          <div className='section-8-desc relative z-[1] max-w-[1020px] text-center px-4 tracking-[-0.02em] text-text-secondary font-normal text-style-h5 max-md:max-w-[640px]'>
            The AI workspace where you achieve more without losing control of your data
          </div>
        </div>
        <div className='section-8-btns relative z-[1] py-12 m-auto flex items-center justify-center gap-3 max-sm:w-full max-sm:max-w-[300px] max-sm:flex-col sm:align-center max-sm:gap-3'>
          <Button
            size={'xl'}
            className={'min-w-[180px] rounded-lg bg-night-blue text-white transition-colors hover:bg-night-blue/90 max-sm:w-full'}
            onClick={() => {
              collectEvent(EventName.navigatorContactSalesBtn, {
                type: 'click',
              });
              openContactDialog({ title: 'Contact sales', source: 'get-started-section' });
            }}
          >
            Contact Sales
          </Button>
          <Button
            asChild
            size={'xl'}
            variant={'outline'}
            className={'min-w-[180px] flex-none max-sm:w-full'}
          >
            <Link href={webApplicationUrl}>Get started free</Link>
          </Button>
        </div>

      </div>

    </div>
  );
}

export default GetStart;
