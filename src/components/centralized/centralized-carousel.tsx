'use client';
import React from 'react';
import ToggleGroup from '@/components/shared/toggle-group';
import Carousel from '@/components/shared/carousel';

function CentralizedCarousel() {
  return (
    <Carousel
      className={'h-[535px] w-[951px]'}
      operation={({ swipeToImage, activeImageIndex }) => (
        <ToggleGroup
          type='single'
          onValueChange={(index) => {
            const imageIndex = Number(index);

            if (imageIndex !== activeImageIndex) {
              swipeToImage(imageIndex - activeImageIndex);
            }
          }}
          elements={[<div key={'1'}>1</div>, <div key={'2'}>2</div>, <div key={'3'}>3</div>]}
        />
      )}
      images={[]}
    />
  );
}

export default CentralizedCarousel;
