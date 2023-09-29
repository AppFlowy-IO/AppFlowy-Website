import React from 'react';
import StarFill from '@/components/icons/star-fill';
import HeroDownloadBtn from '@/components/home/hero-section/download-btn';
import Image from 'next/image';
import desktop from '@/assets/images/hero-section/desktop.png';
import mobile from '@/assets/images/hero-section/mobile.png';
import darkDesktop from '@/assets/images/hero-section/dark/desktop.svg';
import darkMobile from '@/assets/images/hero-section/dark/mobile.svg';
import { heroSectionConfig } from '@/lib/config/home';

const HeroSection = ({ dark }: { dark: boolean }) => {
  const desktopSrc = dark ? darkDesktop.src : desktop.src;
  const mobileSrc = dark ? darkMobile.src : mobile.src;

  return (
    <div className={'hero-section'}>
      <div className={'linear-circle-1'} />
      {/* Free, Open Source, 100% Offline Mode, Cross Platform, Cloud */}
      <div className={'feature'}>
        {heroSectionConfig.tags.map((item) => (
          <span className={'item'} key={item}>
            <StarFill />
            <span className={'ml-1'}>{item}</span>
          </span>
        ))}
      </div>
      {/* A privacy-first open source workspace for your notes, wikis, and projects */}
      <div className={'title'}>
        {heroSectionConfig.mainTitle}
        {/* AppFlowy is the smart workspace where you have the full control and get more done, better and faster. */}
        <div className={'desc'}>{heroSectionConfig.subtitle}</div>
      </div>
      {/* Download app */}
      <div className={'btn'}>
        <HeroDownloadBtn />
      </div>

      {/* Image */}
      <div className={'hero-section-image'}>
        <div className={'image-bg'} />

        <div className={'relative max-sm:mt-[60px]'}>
          <div className={'desktop-img'}>
            <Image width={1054} height={598} alt={heroSectionConfig.firstImgAlt} src={desktopSrc} />
          </div>
          <div className={'mobile-img'}>
            <Image width={267} height={551} alt={heroSectionConfig.firstImgAlt} src={mobileSrc} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
