import MDXContent from '@/components/blog/mdx-render';

import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function Article({ content }: { content: string }) {
  return (
    <CardContent className={'p-0'}>
      <article
        className={cn(
          'blog-article prose max-w-none text-base leading-6 text-[#140F28]',
          'prose-headings:scroll-mt-32 prose-headings:border-none prose-headings:font-sans prose-headings:font-medium prose-headings:tracking-normal prose-headings:text-[#140F28]',
          '[&_h1]:mb-3 [&_h1]:mt-8 [&_h1]:text-[28px] [&_h1]:leading-9',
          '[&_h2]:mb-2 [&_h2]:mt-7 [&_h2]:text-[24px] [&_h2]:leading-7',
          '[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-[20px] [&_h3]:leading-7',
          '[&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:text-lg [&_h4]:leading-7',
          'prose-lead:text-[#5A5A5A]',
          'prose-a:font-medium prose-a:text-[#140F28] prose-a:decoration-[#A6A8B0] prose-a:underline-offset-4 hover:prose-a:text-[#140F28] hover:prose-a:decoration-[#140F28]',
          'prose-blockquote:border-[#854CFF] prose-blockquote:text-[#5A5A5A]',
          'prose-hr:my-7 prose-hr:border-[#E6E6E6]',
          'prose-ol:ml-1 prose-ol:space-y-1 prose-ol:pl-6 prose-ol:leading-6',
          'prose-ul:ml-1 prose-ul:space-y-1 prose-ul:pl-6 prose-ul:leading-6',
          'prose-li:my-1 prose-li:text-base prose-li:leading-6',
          'prose-table:mt-5 prose-table:overflow-auto prose-table:rounded-lg prose-table:shadow-sm',
          'prose-img:mt-5 prose-img:rounded-xl prose-img:shadow-none',
          'prose-code:rounded-[4px] prose-code:border prose-code:bg-gray-100 prose-code:px-1.5 prose-code:font-mono prose-code:font-normal prose-code:text-black'
        )}
      >
        <MDXContent source={content} />
      </article>
    </CardContent>
  );
}

export default Article;
