import Caption from '@/components/blog/caption';
import React from 'react';

interface Props {
  src: string;
  alt: string;
  caption?: string;
}

function Video(props: Props) {
  const { src, caption, alt } = props;

  const isLocalVideo = src.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i);

  return (
    <>
      <div className='video-container' style={{ paddingBottom: !isLocalVideo ? '56.25%' : '0' }}>
        {isLocalVideo ? (
          <video autoPlay={false} className='w-full rounded-md' controls preload='metadata' title={alt}>
            <source src={src} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            className='aspect-video w-full rounded-md'
            src={src}
            title={alt}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          />
        )}
      </div>
      {caption && <Caption content={caption} />}
    </>
  );
}

export default Video;
