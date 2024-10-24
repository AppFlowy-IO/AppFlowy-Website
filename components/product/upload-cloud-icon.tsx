import image from '@/assets/images/product/upload-cloud.png';
import Image from 'next/image';
import React from 'react';

function UploadCloudIcon() {
  return (
    <i>
      <Image src={image} alt={'Upload Cloud'} width={189} height={121} />
    </i>
  );
}

export default UploadCloudIcon;
