import React from 'react';
import StarFill from '@/components/icons/star-fill';
import HeroDownloadBtn from '@/components/home/hero-section/download-btn';
import Checkbox from '@/components/icons/checkbox';
import Image from 'next/image';
import desktop from '@/assets/images/hero-section/desktop.svg';
import mobile from '@/assets/images/hero-section/mobile.svg';
import darkDesktop from '@/assets/images/hero-section/dark/desktop.svg';
import darkMobile from '@/assets/images/hero-section/dark/mobile.svg';
import { heroSectionConfig } from '@/lib/config/home';

const HeroSection = ({ dark }: { dark: boolean }) => {
  const desktopSrc = dark ? darkDesktop.src : desktop.src;
  const mobileSrc = dark ? darkMobile.src : mobile.src;

  return (
    <div className={'hero-section'}>
      {/* Free, Open Source, 100% Offline Mode, Cross Platform, Cloud */}
      <div className={'feature'}>
        {heroSectionConfig.feature.map((item) => (
          <span className={'item'} key={item}>
            <StarFill />
            <span className={'ml-1'}>{item}</span>
          </span>
        ))}
      </div>
      {/* A privacy-first open source workspace for your notes, wikis, and projects */}
      <div className={'title'}>
        {heroSectionConfig.title}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 187 8' fill='none'>
            <path
              d='M1.99845 5.17918C13.2328 3.5076 39.0706 0.39757 52.5468 1.33013C66.0231 2.26269 52.3694 5.47825 43.8581 6.96946C77.1745 3.94181 152.038 -1.2717 184.96 2.09545'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='square'
            />
          </svg>
        </div>
      </div>
      {/* Download app */}
      <div className={'btn'}>
        <HeroDownloadBtn />
      </div>

      {/* Image */}
      <div className={'hero-section-image'}>
        <div className={'image-bg'} />

        <div className={'desktop-img'}>
          <Image width={1042} height={586} alt={heroSectionConfig.imageAlt} src={desktopSrc} />
        </div>
        <div className={'mobile-img'}>
          <Image width={255} height={539} alt={heroSectionConfig.imageAlt} src={mobileSrc} />
        </div>
      </div>
      {/* AppFlowy is the smart workspace where you have the full control and get more done, better and faster. */}
      <div className={'desc'}>
        <div className={'icon'}>
          <Checkbox />
        </div>
        <div className={'mt-[20px]'}>{heroSectionConfig.desc}</div>
      </div>
    </div>
  );
};

export default HeroSection;
