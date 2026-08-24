import AiOverview from '@/assets/images/product/ai-overview.webp';
import Image from 'next/image';
import { IllustrationProps } from './types';

function AiOverviewIllu({ className }: IllustrationProps) {
  return (
    <Image
      src={AiOverview}
      loading={'eager'}
      className={className}
      alt={'AI overview'}
      width={1280}
      height={696}
    />
  );
}

export default AiOverviewIllu;
