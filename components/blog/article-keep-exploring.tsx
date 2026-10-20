import { BLOG_TOPICS, getPrimaryTopicForPost, TopicPost } from '@/lib/blog-topics';
import { PostData } from '@/lib/posts';
import BlogPostCard from '@/components/blog/blog-post-card';
import Link from 'next/link';

interface ArticleKeepExploringProps {
  post: TopicPost;
  relatedPosts: PostData[];
}

export default function ArticleKeepExploring({ post, relatedPosts }: ArticleKeepExploringProps) {
  const primaryTopic = getPrimaryTopicForPost(post);
  const otherTopics = BLOG_TOPICS.filter((topic) => topic.slug !== primaryTopic?.slug);
  const visibleRelatedPosts = relatedPosts.slice(0, 3);
  const hasRelatedPosts = visibleRelatedPosts.length > 0;

  return (
    <div className='mx-auto w-full max-w-[1040px]'>
      {hasRelatedPosts ? (
        <div className='py-10'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <h2 className='text-[20px] font-bold leading-7 text-[#140F28]'>Related articles</h2>
            <Link
              href='/blog'
              className='inline-flex shrink-0 items-center gap-1 text-base font-normal leading-6 text-[#AAAAAA] transition-colors hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-4 active:text-[#854CFF]'
            >
              More articles
              <span
                aria-hidden='true'
                className='h-6 w-6 shrink-0 bg-current [-webkit-mask:url(/images/blog/icons/arrow-right.svg)_center/contain_no-repeat] [mask:url(/images/blog/icons/arrow-right.svg)_center/contain_no-repeat]'
              />
            </Link>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {visibleRelatedPosts.map((relatedPost) => (
              <BlogPostCard
                variant='related'
                showCategories={false}
                headingLevel='h3'
                key={relatedPost.slug}
                post={relatedPost}
              />
            ))}
          </div>
        </div>
      ) : null}

      <section className='pb-40 pt-10' aria-labelledby='explore-topics-title'>
        <h2 id='explore-topics-title' className='text-[20px] font-bold leading-7 text-[#140F28]'>
          Explore by topic
        </h2>
        <nav aria-label='Explore blog topics' className='mt-6 flex flex-wrap gap-2'>
          {otherTopics.map((topic) => (
            <Link
              aria-label={`Explore ${topic.name} articles and guides`}
              className='inline-flex h-9 items-center rounded-full border border-[#E6E6E6] bg-white px-4 text-sm font-medium leading-5 text-[#140F28] transition-colors hover:border-[#854CFF] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-2'
              href={`/blog/${topic.slug}`}
              key={topic.slug}
            >
              {topic.name}
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}
