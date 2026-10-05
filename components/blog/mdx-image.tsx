'use client';

import 'react-medium-image-zoom/dist/styles.css';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import Zoom from 'react-medium-image-zoom';

export type CaptionAlign = 'left' | 'center' | 'right';

const ZoomContent = ({ img }: { img: React.ReactElement | null }) => {
  return (
    <figure
      className='
        [&_img]:bg-default
        [&_img]:rounded-md
        [&_img]:border
      '
    >
      {img}
    </figure>
  );
};

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}

export interface ImageProps extends Omit<NextImageProps, 'src'> {
  src: string;
  zoomable?: boolean;
  caption?: string;
  captionAlign?: CaptionAlign;
  containerClassName?: string;
}

/**
 * An advanced Image component that extends next/image with:
 * - src: prop can either be a string or an object with theme alternatives {dark: string, light: string}
 * - zoomable: {boolean} (optional) to make the image zoomable on click
 * - caption: {string} (optional) to add a figcaption
 * - captionAlign: {'left' | 'center' | 'right'} (optional) to align the caption
 * - containerClassName: {string} (optional) to style the parent <figure> container
 */
const Image = ({
  src,
  alt = '',
  zoomable,
  caption,
  captionAlign,
  containerClassName,
  className,
  style,
  ...imageProps
}: ImageProps) => {
  const sizes = zoomable
    ? '(max-width: 768px) calc(100vw - 48px), (max-width: 1200px) 66vw, 733px'
    : '(max-width: 768px) calc(100vw - 48px), (max-width: 1200px) 66vw, 33vw';
  const image = <NextImage alt={alt} src={src} sizes={sizes} className={className} style={style} {...imageProps} />;

  return (
    <figure className={cn('next-image--dynamic-fill', containerClassName)}>
      {zoomable ? (
        <Zoom ZoomContent={ZoomContent} zoomMargin={40}>
          {image}
        </Zoom>
      ) : (
        <span>{image}</span>
      )}
      {caption ? <figcaption className={cn(getCaptionAlign(captionAlign))}>{caption}</figcaption> : null}
    </figure>
  );
};

const getCaptionAlign = (align?: CaptionAlign) => {
  switch (align) {
    case 'left':
      return 'text-left';
    case 'right':
      return 'text-right';
    case 'center':
    default:
      return 'text-center';
  }
};

export default Image;
