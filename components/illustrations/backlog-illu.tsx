import Backlog from '@/assets/images/product/backlog.webp';
import Image from 'next/image';
import { IllustrationProps } from './types';

function BacklogIllu({ className }: IllustrationProps) {
  return (
    <Image
      src={Backlog}
      loading={'eager'}
      className={className}
      alt={'Backlog'}
      width={1280}
      height={696}
    />
  );
}

export default BacklogIllu;
