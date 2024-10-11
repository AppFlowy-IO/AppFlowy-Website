'use client';

import Share from '@/components/shared/share-group';
import { Badge } from '@/components/ui/badge';
import { PostData } from '@/lib/posts';
import { cn, colorArrayTint, stringToColor } from '@/lib/utils';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function Outline({ post }: { post: PostData }) {
  const hash = typeof window !== 'undefined' ? window.location.hash : '';

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));

      if (el) {
        el.scrollIntoView();
      }
    }
  }, [hash]);
  return (
    <div className='relative col-span-12 flex flex-col gap-[30px] max-md:gap-4 lg:col-span-4 xl:col-start-9'>
      <div className={cn('prose-toc hidden w-full gap-2 rounded-[10px] bg-[#EEEEFD] p-10 max-xl:p-4 lg:block')}>
        <h2 className='mb-4 text-[24px] font-semibold leading-[31px]'>Table of Contents</h2>
        <ReactMarkdown>{post.toc}</ReactMarkdown>
      </div>
      {post.tags && (
        <div className='flex w-full flex-wrap gap-2'>
          {post.tags.map((tag) => (
            <Badge
              style={{
                borderColor: 'transparent',
                background: stringToColor(tag, colorArrayTint),
              }}
              key={tag}
              variant='outline'
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <div className={'flex w-full items-center gap-5'}>
        <span className={'text-black opacity-50'}>Share</span>
        <Share />
      </div>
    </div>
  );
}

export default Outline;
