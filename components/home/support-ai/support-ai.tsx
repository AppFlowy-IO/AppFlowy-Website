import React from 'react';
import Lottie from 'lottie-react';
import AIAnimation from '@/assets/lottie/ai/data';

import Background from '@/components/home/support-ai/background';
import { supportAIConfig } from '@/lib/config/home';

const SupportAI = ({ dark }: { dark: boolean }) => {
  return (
    <div className={'support-ai'}>
      <Background dark={dark} />
      <div className={'title'}>
        {supportAIConfig.title}

        <div className={'icon'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 28 39' fill='none'>
            <path
              d='M21.078 1C16.7995 17.4444 6.2678 14.7037 1.00195 14.7037C9.88807 18.1296 11.8316 26.0092 8.5715 38C10.2171 31.9475 17.5234 21.2815 27.002 22.926C17.4577 18.8148 18.7742 11.6203 21.078 1Z'
              stroke='#9327FF'
              strokeWidth='3'
            />
          </svg>
        </div>
      </div>
      <div className={'image'}>
        <Lottie animationData={AIAnimation} />
      </div>
      <div className={'features'}>
        {supportAIConfig.features.map((item) => (
          <div className={'feature'} key={item.title}>
            <div className={'icon'}>{item.icon}</div>
            <div className={'feature-title'}>{item.title}</div>
            <div className={'desc'}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportAI;
