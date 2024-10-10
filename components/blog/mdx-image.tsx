'use client';

import 'react-medium-image-zoom/dist/styles.css';
import { useIsomorphicLayoutEffect, useWindowSize } from 'react-use';
import { useEffect, useState } from 'react';
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

const twBreakpointMap = {
  sm: 639,
  md: 767,
  lg: 1023,
  xl: 1027,
  '2xl': 1535,
};

export function useBreakpoint(breakpoint: number | keyof typeof twBreakpointMap = 'lg') {
  const [isBreakpoint, setIsBreakpoint] = useState(false);
  const { width } = useWindowSize();

  const _breakpoint = typeof breakpoint === 'string' ? twBreakpointMap[breakpoint] : breakpoint;

  useIsomorphicLayoutEffect(() => {
    if (width <= _breakpoint) {
      setIsBreakpoint(true);
    } else {
      setIsBreakpoint(false);
    }
  }, [width]);

  return isBreakpoint;
}

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
const Image = ({ src, alt = '', zoomable, ...props }: ImageProps) => {
  const [mounted, setMounted] = useState(false);
  const isLessThanLgBreakpoint = useBreakpoint();

  const Component = zoomable ? Zoom : 'span';
  const sizes = zoomable
    ? '(max-width: 768px) 200vw, (max-width: 1200px) 120vw, 200vw'
    : '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 33vw';
  const source = src;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <figure className={cn('next-image--dynamic-fill', props.containerClassName)}>
      <Component
        {...(zoomable ? { ZoomContent: ZoomContent, zoomMargin: isLessThanLgBreakpoint ? 20 : 80 } : undefined)}
      >
        <NextImage alt={alt} src={source} sizes={sizes} className={props.className} style={props.style} {...props} />
      </Component>
      {props.caption && <figcaption className={cn(getCaptionAlign(props.captionAlign))}>{props.caption}</figcaption>}
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
