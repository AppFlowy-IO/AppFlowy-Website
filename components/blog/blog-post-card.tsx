import type { PostMetadata } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

const FALLBACK_COVER = '/images/og-image.png';
const FALLBACK_AVATAR = '/images/blog/authors/appflowy.png';

function getValidDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function BlogPostCard({ post }: { post: PostMetadata }) {
  const cover = post.thumb_image || post.og_image || FALLBACK_COVER;
  const authorImage = post.author_image_url || FALLBACK_AVATAR;
  const categories = Array.isArray(post.categories) ? post.categories : [];
  const postDate = getValidDate(post.date);

  return (
    <article className='min-w-0 [contain-intrinsic-size:432px] [content-visibility:auto]'>
      <Link
        className='group flex min-h-[432px] flex-col gap-8 rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-4'
        href={`/blog/${post.slug}`}
      >
        <div className='flex flex-col gap-4'>
          <div className='h-[200px] overflow-hidden rounded-[12px] bg-[#F5F5FA]'>
            <img
              alt={post.title}
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]'
              loading='lazy'
              src={cover}
            />
          </div>

          <div className='min-h-8 flex flex-wrap items-start gap-2 overflow-hidden'>
            {categories.slice(0, 2).map((category) => (
              <span
                className='rounded-lg bg-[rgba(133,76,255,0.1)] px-3 py-1 text-base font-medium leading-6 text-[#854CFF]'
                key={category}
              >
                {category}
              </span>
            ))}
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className='h-14 overflow-hidden text-[20px] font-bold leading-7 text-[#140F28] transition-colors [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] group-hover:text-[#854CFF]'>
              {post.title}
            </h2>
            <p className='h-12 overflow-hidden text-base font-normal leading-6 text-[#5A5A5A] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]'>
              {post.description}
            </p>
          </div>
        </div>

        <div className='mt-auto flex min-w-0 items-end justify-between gap-3'>
          <div className='flex min-w-0 items-center gap-2'>
            <img
              alt=''
              className='h-6 w-6 shrink-0 rounded-full object-cover'
              height={24}
              loading='lazy'
              src={authorImage}
              width={24}
            />
            <span className='truncate text-base font-medium leading-6 text-[#140F28]'>{post.author}</span>
          </div>
          <div className='flex shrink-0 items-center gap-2 whitespace-nowrap text-sm leading-5 text-[#AAAAAA] max-xl:text-xs'>
            {postDate ? <time dateTime={post.date}>{formatDate(postDate)}</time> : null}
            <span aria-hidden='true'>•</span>
            <span>{post.reading_time || 1} min read</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default BlogPostCard;
