'use client';
import logo from '@/assets/images/logo.svg';
import { Button } from '@/components/ui/button';
import ScrollFillText from '@/components/shared/scroll-fill-text';
import { EventName, collectEvent } from '@/lib/collect';
import { webApplicationUrl } from '@/lib/web-application';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function GetStart() {
  return (
    <div className='flex w-full justify-center'>
      <div className='section-8 min-w-0 max-w-full py-20 relative inset-0'>
        <div className='circle-gradient'></div>
        <div className='section-8-title flex flex-col items-center justify-center gap-6 text-center max-md:gap-5'>
          <div className='section-8-logo flex h-[84px] w-[84px] items-center justify-center rounded-[20px] border bg-white shadow-[0_0_40px_0_rgba(73,87,240,0.08)]'>
            <Image src={logo} alt={'AppFlowy'} className='h-[56px] w-[56px]' />
          </div>
          <h2 className='text-style-h1 font-semibold '>
            {/* Lines are `w-fit` blocks, so they need centring of their own here. */}
            <ScrollFillText lineClassName='mx-auto'>Get started for free</ScrollFillText>
          </h2>
          <div className='section-8-desc max-w-[1020px] text-center text-text-tertiary font-normal text-style-h5 max-md:max-w-[640px] '>
            The AI workspace where you achieve more without losing control of your data
          </div>
        </div>
        <div className='section-8-btns py-12 m-auto flex items-center justify-center gap-3 max-sm:w-full max-sm:max-w-[300px] max-sm:flex-col sm:align-center max-sm:gap-3'>
          <Button
            asChild
            size={'xl'}
            className={'min-w-[180px] rounded-lg bg-night-blue text-white transition-colors hover:bg-night-blue/90 max-sm:w-full'}
          >
            <Link
              href={'/contact'}
              onClick={() => {
                collectEvent(EventName.navigatorContactSalesBtn, {
                  type: 'click',
                });
              }}
            >
              Contact Sales
            </Link>
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
