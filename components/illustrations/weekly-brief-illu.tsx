import WeeklyBrief from '@/assets/images/product/weekly-brief.webp';
import Image from 'next/image';
import { IllustrationProps } from './types';

function WeeklyBriefIllu({ className }: IllustrationProps) {
  return (
    <Image
      src={WeeklyBrief}
      loading={'eager'}
      className={className}
      alt={'Weekly brief'}
      width={1280}
      height={696}
    />
  );
}

export default WeeklyBriefIllu;
