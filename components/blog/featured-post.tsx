import { PostMetadata } from '@/lib/posts';
import Link from 'next/link';
import React from 'react';

const FALLBACK_COVER = '/images/og-image.png';
const FALLBACK_AVATAR = '/images/blog/authors/appflowy.png';
const longDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  year: 'numeric',
});

function FeaturedPost({ post }: { post: PostMetadata }) {
  const cover = post.og_image || post.thumb_image || FALLBACK_COVER;
  const authorImage = post.author_image_url || FALLBACK_AVATAR;
  const categories = Array.isArray(post.categories) ? post.categories : [];
  const parsedDate = new Date(post.date);
  const postDate = Number.isNaN(parsedDate.getTime()) ? null : parsedDate;

  return (
    <article className='mx-auto w-full max-w-[1160px] px-6 pb-20 xl:px-0'>
      <Link
        className='group grid min-h-[400px] grid-cols-2 gap-10 rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-4 max-lg:grid-cols-1 max-lg:gap-7'
        href={`/blog/${post.slug}`}
      >
        <div className='h-[400px] overflow-hidden rounded-[12px] bg-[#F5F5FA] max-sm:aspect-[7/5] max-sm:h-auto'>
          <img
            alt={post.title}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]'
            fetchPriority='high'
            src={cover}
          />
        </div>

        <div className='flex min-w-0 flex-col justify-between rounded-lg'>
          <div className='flex flex-col items-start gap-4'>
            <div className='flex flex-wrap gap-2'>
              {categories.slice(0, 2).map((category) => (
                <span
                  className='rounded-lg bg-[rgba(133,76,255,0.1)] px-3 py-1 text-base font-medium leading-6 text-[#854CFF]'
                  key={category}
                >
                  {category}
                </span>
              ))}
            </div>

            <h2 className='text-[40px] font-semibold leading-[48px] tracking-[-0.4px] text-[#140F28] transition-colors group-hover:text-[#854CFF] max-sm:text-[30px] max-sm:leading-[38px]'>
              {post.title}
            </h2>
            <p className='overflow-hidden text-base font-normal leading-6 text-[#5A5A5A] [-webkit-box-orient:vertical] [display:-webkit-box] [-webkit-line-clamp:4]'>
              {post.description}
            </p>
          </div>

          <div className='mt-8 flex min-w-0 items-center justify-between gap-4 max-sm:flex-col max-sm:items-start'>
            <div className='flex min-w-0 items-center gap-2'>
              <img
                alt=''
                className='h-6 w-6 shrink-0 rounded-full object-cover'
                height={24}
                src={authorImage}
                width={24}
              />
              <span className='truncate text-base font-medium leading-6 text-[#140F28]'>{post.author}</span>
            </div>
            <div className='flex shrink-0 items-center gap-3 whitespace-nowrap text-sm leading-5 text-[#AAAAAA]'>
              {postDate ? <time dateTime={post.date}>{longDateFormatter.format(postDate)}</time> : null}
              <span aria-hidden='true'>•</span>
              <span>{post.reading_time || 1} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default FeaturedPost;
