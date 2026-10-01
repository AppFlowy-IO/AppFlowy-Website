import { BLOG_TOPICS, getPrimaryTopicForPost, getTopicsForPost, TopicPost } from '@/lib/blog-topics';
import { PostData } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const FALLBACK_COVER = '/images/og-image.png';

interface ArticleKeepExploringProps {
  post: TopicPost;
  relatedPosts: PostData[];
}

function getValidDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function RelatedArticleCard({ post }: { post: PostData }) {
  const cover = post.thumb_image || post.og_image || post.cover_image || FALLBACK_COVER;
  const publishedDate = getValidDate(post.date);

  return (
    <article className='min-w-0'>
      <Link
        className='group flex h-full flex-col rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-4'
        href={`/blog/${post.slug}`}
      >
        <div className='relative h-[200px] overflow-hidden rounded-xl bg-[#F5F5FA]'>
          <Image
            alt={post.title}
            className='object-cover transition-transform duration-300 group-hover:scale-[1.02]'
            fill
            loading='lazy'
            sizes='(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) calc(50vw - 32px), 336px'
            src={cover}
          />
        </div>

        <h3 className='mt-4 overflow-hidden text-[20px] font-bold leading-7 text-[#140F28] transition-colors [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] group-hover:text-[#854CFF]'>
          {post.title}
        </h3>
        <p className='mt-2 overflow-hidden text-base leading-6 text-[#5A5A5A] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]'>
          {post.description}
        </p>
        <p className='mt-3 text-sm leading-5 text-[#AAAAAA]'>
          {publishedDate ? <time dateTime={post.date}>{formatDate(publishedDate)}</time> : null}
          {publishedDate ? ' by ' : ''}
          {post.author}
        </p>
      </Link>
    </article>
  );
}

export default function ArticleKeepExploring({ post, relatedPosts }: ArticleKeepExploringProps) {
  const primaryTopic = getPrimaryTopicForPost(post);
  const postTopics = getTopicsForPost(post);
  const templateLink = primaryTopic?.templateLinks[0] ?? postTopics.flatMap((topic) => topic.templateLinks)[0];
  const otherTopics = BLOG_TOPICS.filter((topic) => topic.slug !== primaryTopic?.slug);
  const visibleRelatedPosts = relatedPosts.slice(0, 3);
  const hasRelatedPosts = visibleRelatedPosts.length > 0;

  return (
    <div className='mx-auto w-full max-w-[1040px]'>
      {hasRelatedPosts ? (
        <div>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <h2 className='text-[20px] font-medium leading-7 text-[#140F28]'>Related articles</h2>

            {primaryTopic ? (
              <Link
                className='inline-flex items-center gap-2 text-sm font-semibold text-[#7047EB] hover:text-[#854CFF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-4'
                href={`/blog/${primaryTopic.slug}`}
              >
                View all {primaryTopic.name.toLowerCase()} articles
                <span aria-hidden='true'>→</span>
              </Link>
            ) : null}
          </div>

          <div className='mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
            {visibleRelatedPosts.map((relatedPost) => (
              <RelatedArticleCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      ) : null}

      <div className={hasRelatedPosts ? 'mt-10 border-t border-[#E6E6E6] pt-8' : ''}>
        <div className={templateLink ? 'grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]' : ''}>
          <div>
            <h2 className='text-base font-semibold leading-6 text-[#140F28]'>Explore by topic</h2>
            <nav aria-label='Explore blog topics' className='mt-4 flex flex-wrap gap-2'>
              {otherTopics.map((topic) => (
                <Link
                  aria-label={`Explore ${topic.name} articles and guides`}
                  className='rounded-full border border-[#E6E6E6] bg-white px-4 py-2 text-sm font-medium leading-5 text-[#140F28] transition-colors hover:border-[#B9A1EB] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-2'
                  href={`/blog/${topic.slug}`}
                  key={topic.slug}
                >
                  {topic.name}
                </Link>
              ))}
            </nav>
          </div>

          {templateLink ? (
            <div className='border-t border-[#E6E6E6] pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0'>
              <p className='text-sm font-medium uppercase leading-5 tracking-[0.08em] text-[#854CFF]'>
                Try it in AppFlowy
              </p>
              <Link
                className='group mt-3 inline-flex items-center gap-2 text-base font-semibold leading-6 text-[#140F28] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-2'
                href={templateLink.href}
              >
                {templateLink.label}
                <span aria-hidden='true' className='text-[#854CFF] transition-transform group-hover:translate-x-1'>
                  →
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
