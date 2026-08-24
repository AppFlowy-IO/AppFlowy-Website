import ReleaseReview from '@/assets/images/product/release-review.webp';
import Image from 'next/image';
import { IllustrationProps } from './types';

function ReleaseReviewIllu({ className }: IllustrationProps) {
  return (
    <Image
      src={ReleaseReview}
      loading={'eager'}
      className={className}
      alt={'Release review'}
      width={1280}
      height={696}
    />
  );
}

export default ReleaseReviewIllu;
