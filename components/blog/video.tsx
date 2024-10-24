import Caption from '@/components/blog/caption';
import React from 'react';

interface Props {
  src: string;
  alt: string;
  caption?: string;
}

function Video(props: Props) {
  const { src, caption, alt } = props;

  return (
    <>
      <div className='video-container'>
        <iframe
          className='w-full'
          src={src}
          title={alt}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
      </div>
      {caption && <Caption content={caption} />}
    </>
  );
}

export default Video;
