'use client';

import LinkedInIcon from '@/components/icons/linked-in-icon';
import Twitter from '@/components/icons/twitter';
import { createHubSpotSubscriber } from '@/lib/hubspotAPI';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { useToast } from '@/hooks/use-toast';

function Subscriber() {
  const [email, setEmail] = React.useState('');
  const { toast } = useToast();
  const handleSubscribe = async () => {
    try {
      await createHubSpotSubscriber(email);
      toast({
        title: 'Subscribed successfully',
        description: 'Thank you for subscribing',
      });
      setEmail('');
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to subscribe, please try again',
      });
    }
  };

  return (
    <div className={'flex flex-col gap-10'}>
      <div className={'flex items-center gap-[10px]'}>
        <div className={'flex h-[60px] w-[300px] items-center rounded-[16px] bg-white px-6 py-3'}>
          <input
            className={'text-base focus:outline-none'}
            placeholder={'Enter your email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div onClick={handleSubscribe} className={'download-btn cursor-pointer'}>
          Subscribe
        </div>
      </div>
      <div className={'flex items-center justify-center gap-6'}>
        <div className={'text-sm opacity-50'}>Follow us on</div>
        <div className={'share flex items-center gap-3'}>
          <Link className={cn('share-btn')} href={'https://twitter.com/appflowy'}>
            <Twitter />
          </Link>
          <Link className={cn('share-btn')} href={'https://www.linkedin.com/company/appflowy'}>
            <LinkedInIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Subscriber;
