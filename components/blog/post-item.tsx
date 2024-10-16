import { Badge } from '@/components/ui/badge';
import { PostData } from '@/lib/posts';
import { colorArrayTint, formatDate, stringToColor } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

function PostItem({
  showDescription,
  post,
  showCategories,
  useThumbnail = true,
  imageClassName,
}: {
  showDescription?: boolean;
  post: PostData;
  showCategories?: boolean;
  useThumbnail?: boolean;
  imageClassName?: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={'post-item flex h-full w-full cursor-pointer flex-col gap-2 overflow-hidden'}
    >
      <img
        src={useThumbnail ? post.thumb_image : post.og_image}
        alt={post.title}
        className={`max-xl:min-h-auto mb-[12px] min-h-[230px] w-full flex-1 overflow-hidden rounded-[16px] object-cover ${imageClassName}`}
      />
      {showCategories && (
        <div className={'flex w-full flex-wrap gap-2'}>
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
        <div className={'h-[48px] w-full overflow-hidden whitespace-pre-wrap break-words text-base font-medium'}>
          {post.description}
        </div>
      )}
      <div className={'w-full truncate text-sm opacity-50'}>
        <time className={'uppercase'} dateTime={post.date}>
          {formatDate(new Date(post.date))}
        </time>
        {` `}
        by {post.author}
      </div>
    </Link>
  );
}

export default PostItem;
