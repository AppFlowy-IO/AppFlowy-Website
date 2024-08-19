import Image from 'next/image';
import React from 'react';
import image from '@/assets/images/product/local-ai.png';

function AiLocalLightIcon() {
  return (
    <i>
      <Image src={image} alt={''} width={170} height={121} />
    </i>
  );
}

export default AiLocalLightIcon;
