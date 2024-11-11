'use client';

import Share from '@/components/shared/share-group';
import { Badge } from '@/components/ui/badge';
import { PostData } from '@/lib/posts';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useClient } from '@/lib/hooks/use-client';
import { fixSidebarOnScroll } from '@/lib/fixedScroll';

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
  const { isMobile } = useClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const headerHeight = document.querySelector('.appflowy-header')?.getBoundingClientRect().height || 68;
    const sidebar = outlineRef.current;
    const container = containerRef.current;

    if (!sidebar || !container) return;
    const contanerWidth = container.getBoundingClientRect().width;
    sidebar.style.width = `${contanerWidth}px`;
    const handleScroll = () => {
      fixSidebarOnScroll({
        sidebar,
        container,
        headerHeight,
        gap: 20,
        enebaleScroll: false,
      });
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);
  return (
    <div ref={containerRef} style={{
      minHeight: outlineRef.current?.getBoundingClientRect().height,
    }} className="relative col-span-12 mb-10 overflow-hidden lg:col-span-4 xl:col-start-9">
      <div ref={outlineRef} className={'flex w-full flex-col gap-[30px] max-md:gap-4'}>
        <div className={cn('prose-toc hidden w-full gap-2 rounded-[10px] bg-[#EEEEFD] p-10 max-xl:p-4 lg:block')}>
          <h2 className="mb-4 text-[24px] font-semibold leading-[31px]">Table of Contents</h2>
          <ReactMarkdown>{post.toc}</ReactMarkdown>
        </div>
        {post.tags && (
          <div className="flex w-full flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className={'flex w-full items-center gap-5'}>
          <span className={'text-black opacity-50'}>Share</span>
          <Share content={'Check out this article! '}/>
        </div>
      </div>

    </div>
  );
}

export default Outline;
