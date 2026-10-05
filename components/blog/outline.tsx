'use client';

import Share from '@/components/shared/share-group';
import { PostData } from '@/lib/posts';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function Outline({ post }: { post: PostData }) {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));

      if (el) {
        window.requestAnimationFrame(() => el.scrollIntoView());
      }
    }
  }, []);

  return (
    <aside className='min-w-0 self-start lg:sticky lg:top-[124px]'>
      <div className='flex w-full flex-col gap-8'>
        {post.toc ? (
          <nav
            aria-label='Table of contents'
            className='prose-toc hidden max-h-[calc(100dvh-220px)] w-full overflow-y-auto overscroll-contain pr-2 [scrollbar-gutter:stable] lg:block'
          >
            <h2 className='mb-3 text-sm font-normal leading-5 text-[#AAAAAA]'>Table of Contents</h2>
            <ReactMarkdown>{post.toc}</ReactMarkdown>
          </nav>
        ) : null}

        <div className='flex w-full items-center gap-5'>
          <span className='text-base leading-6 text-[#AAAAAA]'>Share</span>
          <Share compact content={`Read “${post.title}” on the AppFlowy blog`} />
        </div>
      </div>
    </aside>
  );
}

export default Outline;
