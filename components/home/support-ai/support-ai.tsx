import React from 'react';
import Image from 'next/image';
import mainImage from '@/assets/images/support-ai/img.svg';
import Background from '@/components/home/support-ai/background';
import { supportAIConfig } from '@/lib/config/home';

const SupportAI = () => {
  return (
    <div className={'support-ai'}>
      <Background />
      <div className={'title'}>
        {supportAIConfig.title}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 187 8' fill='none'>
            <path
              d='M1.99845 5.17918C13.2328 3.5076 39.0706 0.39757 52.5468 1.33013C66.0231 2.26269 52.3694 5.47825 43.8581 6.96946C77.1745 3.94181 152.038 -1.2717 184.96 2.09545'
              stroke='#9327FF'
              strokeWidth='2'
              strokeLinecap='square'
            ></path>
          </svg>
        </div>
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
        <div className={'bg'} />
        <Image src={mainImage.src} width={953} height={536} alt={supportAIConfig.imageAlt} />
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
