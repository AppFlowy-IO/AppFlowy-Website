import image from '@/assets/images/product/folder.png';
import Image from 'next/image';
import React from 'react';

function FolderIcon() {
  return (
    <i>
      <Image src={image} alt={''} width={150} height={121} />
    </i>
  );
}

export default FolderIcon;
