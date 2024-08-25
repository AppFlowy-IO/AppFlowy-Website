'use client';

import AI1 from '@/assets/images/pricing/ai-1.png';
import { Tick } from '@/components/pricing/icons';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback } from 'react';
import AI2 from '@/assets/images/pricing/ai-2.png';

function UnlockCards() {
  const renderCard = useCallback(
    (item: { icon: React.ReactNode; title: string; desc: string; num: string; duration: string; content: string[] }) => (
      <div className={'ai-card'}>
        {item.icon}
        <div className={'flex flex-col gap-[14px]'}>
          <div className={'ai-card-title'}>{item.title}</div>
          <div className={'ai-card-desc'}>{item.desc}</div>
        </div>
        <div className={'flex flex-col gap-[10px]'}>
          <div className={'ai-card-num'}>{item.num}</div>
          <div className={'ai-card-duration'}>{item.duration}</div>
        </div>
        <Link href={'/download'}>
          <button className={'ai-card-btn'}>Unlock</button>
        </Link>
        <div className={'flex flex-col gap-2'}>
          {item.content.map((content, index) => (
            <div key={index} className={'ai-card-content-item'}>
              <Tick />
              <div className={'flex-1 whitespace-pre-wrap break-words'}>{content}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    []
  );

  return (
    <div className={'ai-cards'}>
      {renderCard({
        icon: <Image src={AI1} alt={''} width={65} height={90} />,
        title: 'AI MAX',
        desc: 'Access the most advanced AI models including GPT 4-o and Claude 3 Sonnet',
        num: '$8',
        duration: `per user per month\nbilled annually`,
        content: ['Unlimited AI responses', 'Unlimited file uploads'],
      })}
      {renderCard({
        icon: <Image src={AI2} alt={''} width={74.5} height={90} />,
        title: 'AI On-device for Mac',
        desc: 'Run Mistral 7B, Llama 8B, and more local models on your machine',
        num: '$8',
        duration: `per user per month\nbilled annually`,
        content: [
          'Local AI on your own hardware for ultimate privacy',
          'Unlimited AI responses',
          'Unlimited file uploads',
        ],
      })}
    </div>
  );
}

export default UnlockCards;
