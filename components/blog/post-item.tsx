import { Badge } from '@/components/ui/badge';
import { PostData } from '@/lib/posts';
import { colorArrayTint, stringToColor } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

function PostItem({
  showDescription,
  post,
  showCategories,
}: {
  showDescription?: boolean;
  post: PostData;
  showCategories?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={'post-item flex h-full w-full cursor-pointer flex-col gap-2 overflow-hidden'}
    >
      <img
        src={post.og_image}
        alt={post.title}
        className={'mb-[12px] min-h-[230px] flex-1 overflow-hidden rounded-[16px] object-cover object-left'}
      />
      {showCategories && (
        <div className={'flex flex-wrap gap-2'}>
          {post.categories.map((category) => (
            <Badge
              style={{
                borderColor: 'transparent',
                background: stringToColor(category, colorArrayTint),
              }}
              key={category}
              variant='outline'
            >
              {category}
            </Badge>
          ))}
        </div>
      )}
      <div className={'w-full truncate text-[24px] font-semibold hover:underline'}>{post.title}</div>
      {showDescription && (
        <div className={'h-[48px] overflow-hidden whitespace-pre-wrap break-words text-base font-medium'}>
          {post.description}
        </div>
      )}
      <div className={'text-sm opacity-50'}>
        {post.date} by {post.author}
      </div>
    </Link>
  );
}

export default PostItem;
