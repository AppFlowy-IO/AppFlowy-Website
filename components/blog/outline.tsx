'use client';

import Share from '@/components/shared/share-group';
import { PostData } from '@/lib/posts';
import { useEffect } from 'react';
import Image from 'next/image';
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
    <aside className='hidden min-w-0 self-start lg:block'>
      <div className='flex w-full flex-col gap-10'>
        {post.toc ? (
          <nav
            aria-label='Table of contents'
            className='prose-toc hidden w-full lg:block'
            onMouseOver={(event) => {
              const target = event.target;

              if (!(target instanceof Element)) return;

              const row = target.closest('li > a, li > p');
              const list = event.currentTarget.querySelector(':scope > ul');

              if (!row || !(list instanceof HTMLElement) || !list.contains(row)) return;

              const offset = row.getBoundingClientRect().top - list.getBoundingClientRect().top;

              list.style.setProperty('--toc-indicator-offset', `${offset}px`);
            }}
            onMouseLeave={(event) => {
              const list = event.currentTarget.querySelector(':scope > ul');

              if (list instanceof HTMLElement) list.style.removeProperty('--toc-indicator-offset');
            }}
          >
            <h2 className='mb-3 text-sm font-normal leading-5 text-[#AAAAAA]'>Table of Contents</h2>
            <ReactMarkdown components={{ p: ({ children }) => <>{children}</> }}>{post.toc}</ReactMarkdown>
          </nav>
        ) : null}

        <div className='blog-article-share flex w-full flex-col items-start gap-4'>
          <span className='text-base font-normal leading-6 text-[#5A5A5A]'>Share</span>
          <Share
            compact
            content={`Read “${post.title}” on the AppFlowy blog`}
            copyLinkIcon={
              <span className='flex h-5 w-5 translate-y-[0.33px] items-center justify-center'>
                <Image src='/images/blog/icons/copy-link.svg' alt='' width={16} height={16} />
              </span>
            }
          />
        </div>
      </div>
    </aside>
  );
}

export default Outline;
