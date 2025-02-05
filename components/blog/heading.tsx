import React from 'react';
import { cn } from '@/lib/utils';
import slugify from 'slugify';

export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ level = 1, children, className }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const headingText = React.Children.toArray(children)
    .filter((child): child is string => typeof child === 'string')
    .join(' ');

  const slug = slugify(headingText, { lower: true, strict: true });

  const styles = {
    1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-14',
    2: 'scroll-m-20 text-3xl font-semibold tracking-tight mt-12',
    3: 'scroll-m-20 text-2xl font-semibold tracking-tight mt-10',
    4: 'scroll-m-20 text-xl font-semibold tracking-tight mt-8',
    5: 'scroll-m-20 text-lg font-semibold tracking-tight  mt-6',
    6: 'scroll-m-20 text-base font-semibold tracking-tight mt-4',
  };

  return (
    <Tag
      id={slug}
      className={cn(styles[level], className)}
    >
      <a
        href={`#${slug}`}
        className="no-underline"
      >
        {children}

      </a>
    </Tag>
  );
};

export default Heading;
