import React, { useRef } from 'react';

import Background from '@/components/home/support-ai/background';
import { supportAIConfig } from '@/lib/config/home';
import animationData from '@/assets/lottie/ai/data';
import darkAnimationData from '@/assets/lottie/dark/ai/data';
import Lottie from 'react-lottie';
import { useInView } from 'framer-motion';

const SupportAI = ({ dark }: { dark: boolean }) => {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <div ref={ref} className={'support-ai'}>
      <Background dark={dark} />
      <div className={'title'}>{supportAIConfig.title}</div>
      <div className={'image relative aspect-video w-full'}>
        <div className={`absolute left-0 top-0 h-full w-full`}>
          {inView && (
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: dark ? darkAnimationData : animationData,
              }}
            />
          )}
        </div>
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
