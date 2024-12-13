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
        loading={'lazy'}
        className={`max-xl:min-h-auto max-sm:min-h-fit mb-[12px] aspect-[2/1] max-sm:aspect-auto min-h-[176px] w-full flex-1 scale-100 overflow-hidden rounded-[16px] border object-cover ${imageClassName}`}
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
      <h2 className={'w-full overflow-hidden text-[24px] h-[74px] max-sm:text-[20px] max-sm:h-fit font-semibold hover:underline'}>{post.title}</h2>
      {showDescription && (
        <div
          className={
            'h-[76px] w-full overflow-hidden whitespace-pre-wrap break-words text-base font-medium max-sm:h-fit'
          }
        >
          {post.description}
        </div>
      )}
      <div className={'w-full truncate text-sm opacity-50'}>
        <time className={''} dateTime={post.date}>
          {formatDate(new Date(post.date))}
        </time>
        {` `}
        by {post.author}
      </div>
    </Link>
  );
}

export default PostItem;
