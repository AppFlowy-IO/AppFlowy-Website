import { StaticImageData } from 'next/image';
import macImg1 from '@/assets/images/download/mac-download-step-1.webp';
import macImg2 from '@/assets/images/download/mac-download-step-2.webp';
import macImg3 from '@/assets/images/download/mac-download-step-3.webp';

import winImg1 from '@/assets/images/download/win-download-step-1.webp';
import winImg2 from '@/assets/images/download/win-download-step-2.webp';
import winImg3 from '@/assets/images/download/win-download-step-3.webp';

import linuxImg1 from '@/assets/images/download/linux-download-step-1.webp';
import linuxImg2 from '@/assets/images/download/linux-download-step-2.webp';
import linuxImg3 from '@/assets/images/download/linux-download-step-3.webp';

export type DesktopOS = 'macos' | 'windows' | 'linux';

export interface DownloadStep {
  title: string;
  description: string;
  image?: StaticImageData;
}

const manualDownloadStep = {
  title: '1. Download AppFlowy',
  description: `Your download should start automatically. If it doesn't, you can download it manually.`,
};

export function getOsFromName(name?: string): DesktopOS {
  const normalized = name?.toLowerCase().replaceAll(' ', '');

  if (normalized?.includes('windows')) return 'windows';
  if (normalized?.includes('linux')) return 'linux';
  return 'macos';
}

export function getDownloadSteps(os: DesktopOS): DownloadStep[] {
  switch (os) {
    case 'windows':
      return [
        {
          ...manualDownloadStep,
          image: winImg1,
        },
        {
          title: '2. Install AppFlowy',
          description: `Open the installer (.exe) from your downloads folder and follow the setup wizard.`,
          image: winImg2,
        },
        {
          title: '3. Launch AppFlowy',
          description: `Open AppFlowy from your Start menu to get started.`,
          image: winImg3,
        },
      ];
    case 'linux':
      return [
        {
          ...manualDownloadStep,
          image: linuxImg1,
        },
        {
          title: '2. Install AppFlowy',
          description: `Install the package (AppImage, .deb, or .rpm) using your preferred method.`,
          image: linuxImg2,
        },
        {
          title: '3. Launch AppFlowy',
          description: `Open AppFlowy from your applications menu to get started.`,
          image: linuxImg3,
        },
      ];
    case 'macos':
    default:
      return [
        { ...manualDownloadStep, image: macImg1 },
        {
          title: '2. Install AppFlowy',
          description: `Open AppFlowy.dmg, then drag AppFlowy into your Applications folder.`,
          image: macImg2,
        },
        {
          title: '3. Launch AppFlowy',
          description: `Open AppFlowy from your Applications folder to get started.`,
          image: macImg3,
        },
      ];
  }
}
