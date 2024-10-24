import CodeBlock from '@/components/blog/code-block';
import InlineCodeTag from '@/components/blog/inline-code';
import Link from '@/components/blog/link';
import Quote from '@/components/blog/quote';
import Caption from '@/components/blog/caption';
import Video from '@/components/blog/video';
import { cn } from '@/lib/utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image, { ImageProps } from './mdx-image';
import { HTMLAttributes } from 'react';
import Admonition from './admonition';
import Heading, { HeadingProps } from './heading';
import MDXTable from './mdx-table';
import remarkGfm from 'remark-gfm';

interface MyMDXComponentProps {
  source: string;
}

const ignoreClass = 'ignore-on-export';

const components = {
  table: MDXTable,
  thead: MDXTable.Head,
  tbody: MDXTable.Body,
  tr: MDXTable.Row,
  th: MDXTable.Header,
  td: MDXTable.Cell,
  p: (props: HTMLAttributes<HTMLParagraphElement>) => <div {...props} className={cn(props.className, 'my-3')} />,
  Admonition,
  h1: (props: HeadingProps) => <Heading level={1} {...props} />,
  h2: (props: HeadingProps) => <Heading level={2} {...props} />,
  h3: (props: HeadingProps) => <Heading level={3} {...props} />,
  h4: (props: HeadingProps) => <Heading level={4} {...props} />,
  h5: (props: HeadingProps) => <Heading level={5} {...props} />,
  h6: (props: HeadingProps) => <Heading level={6} {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: (props: any) => <InlineCodeTag {...props} />,
  CodeBlock,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre: (props: any) => {
    if (props.className !== ignoreClass) {
      return <CodeBlock {...props.children?.props} />;
    } else {
      return <code {...props} />;
    }
  },
  Quote: Quote,
  Caption,
  Img: ({ zoomable = true, className, ...props }: ImageProps & { wide?: boolean }) => (
    <Image
      fill
      className={cn('m-0 object-cover', 'rounded-md border', props.wide && 'wide', className)}
      zoomable={zoomable}
      {...props}
    />
  ),
  Video,
  a: Link,
};

const MyMDXRender: React.FC<MyMDXComponentProps> = ({ source }) => {
  return (
    <MDXRemote
      source={source}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
};

export default MyMDXRender;
