import image from '@/assets/images/product/folder.png';
import Image from 'next/image';
import React from 'react';

function FolderIcon() {
  return (
    <i>
      <Image src={image} width={150} height={121} alt={'Folder Icon'} />
    </i>
  );
}

export default FolderIcon;
