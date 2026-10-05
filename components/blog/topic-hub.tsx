import BlogPostCard from '@/components/blog/blog-post-card';
import TopicSectionIcon, { TopicSectionIconKind } from '@/components/blog/topic-section-icon';
import SeoData from '@/components/layout/seo-data';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { BLOG_TOPICS, BlogTopicSlug, getBlogTopic, postMatchesTopic } from '@/lib/blog-topics';
import { getAllPostsMetadata } from '@/lib/posts';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://appflowy.com';

export function createTopicHubMetadata(topicSlug: BlogTopicSlug): Metadata {
  const topic = getBlogTopic(topicSlug);

  if (!topic) return {};

  const canonicalUrl = `${siteUrl}/blog/${topic.slug}`;

  return {
    title: `${topic.title} | AppFlowy`,
    description: topic.description,
    keywords: [...topic.categoryNames, ...topic.matchTerms],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: topic.title,
      description: topic.description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'AppFlowy Blog | In the Flow',
      images: [
        {
          url: `${siteUrl}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: topic.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.title,
      description: topic.description,
      images: [`${siteUrl}/images/og-image.png`],
    },
  };
}

function TopicLinkCards({
  title,
  links,
  icon,
}: {
  title: string;
  links: readonly { href: string; label: string; description: string }[];
  icon: TopicSectionIconKind;
}) {
  if (!links.length) return null;

  return (
    <section aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-title`}>
      <div className='mb-6 flex items-center gap-3'>
        <TopicSectionIcon kind={icon} />
        <h2 id={`${title.toLowerCase().replace(/\s+/g, '-')}-title`} className='text-3xl font-semibold text-[#101012]'>
          {title}
        </h2>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {links.map((link) => (
          <Link
            className='hover:border-primary/40 group rounded-2xl border border-[#E5E5EA] bg-white p-6 transition-colors hover:bg-[#FAF7FF]'
            href={link.href}
            key={link.href}
          >
            <h3 className='mb-2 text-lg font-semibold text-[#101012] group-hover:text-primary'>{link.label}</h3>
            <p className='text-sm leading-6 text-[#5D606B]'>{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function TopicHub({ topicSlug }: { topicSlug: BlogTopicSlug }) {
  const topic = getBlogTopic(topicSlug);

  if (!topic) return null;

  const posts = getAllPostsMetadata().filter((post) => postMatchesTopic(post, topic));
  const otherTopics = BLOG_TOPICS.filter((item) => item.slug !== topic.slug);
  const canonicalPath = `/blog/${topic.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: topic.title,
        description: topic.description,
        url: `${siteUrl}${canonicalPath}`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: posts.length,
          itemListElement: posts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: post.title,
            url: `${siteUrl}/blog/${post.slug}`,
          })),
        },
      },
      generateBreadcrumbSchema([
        { name: 'Blog', path: '/blog' },
        { name: topic.name, path: canonicalPath },
      ]),
    ],
  };

  return (
    <>
      <SeoData id={`blog-topic-${topic.slug}-ld-json`} data={schema} />
      <main className='bg-white px-6 pb-28 pt-36 sm:px-8 lg:px-14 lg:pt-44'>
        <div className='mx-auto flex w-full max-w-[1100px] flex-col gap-20'>
          <header>
            <Breadcrumbs
              className='mb-10'
              items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: topic.name }]}
            />
            <h1 className='max-w-[900px] text-4xl font-medium leading-tight text-[#101012] sm:text-5xl lg:text-[58px]'>
              {topic.title}
            </h1>
            <p className='mt-6 max-w-[820px] text-lg leading-8 text-[#4B4E59]'>{topic.intro}</p>
          </header>

          <TopicLinkCards title='Start with a practical resource' links={topic.resourceLinks} icon='resources' />
          <TopicLinkCards title='Use an AppFlowy template' links={topic.templateLinks} icon='templates' />

          <section aria-labelledby='topic-articles-title'>
            <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
              <div className='flex items-center gap-3'>
                <TopicSectionIcon kind='articles' />
                <h2 id='topic-articles-title' className='text-3xl font-semibold text-[#101012]'>
                  {topic.name} articles
                </h2>
              </div>
              <p className='text-sm text-[#6C6F78]'>{posts.length} guides and comparisons</p>
            </div>

            <div className='grid grid-cols-3 gap-x-5 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1'>
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>

          <section aria-labelledby='other-blog-topics-title' className='border-t border-[#E6E6E6] pt-12'>
            <div className='mb-8 flex max-w-[720px] items-start gap-3'>
              <TopicSectionIcon kind='topics' />
              <div>
                <h2 id='other-blog-topics-title' className='text-3xl font-semibold text-[#101012]'>
                  Explore other topics
                </h2>
                <p className='mt-3 text-base leading-7 text-[#5D606B]'>
                  Continue with AppFlowy guides, comparisons, and practical resources for other ways of working.
                </p>
              </div>
            </div>

            <nav aria-label='Other blog topic hubs' className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {otherTopics.map((item) => (
                <Link
                  className='group flex min-h-[210px] flex-col rounded-2xl border border-[#E5E5EA] bg-white p-6 transition-colors hover:border-[#B9A1EB] hover:bg-[#FAF7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-4'
                  href={`/blog/${item.slug}`}
                  key={item.slug}
                >
                  <h3 className='text-lg font-semibold leading-7 text-[#101012] transition-colors group-hover:text-primary'>
                    {item.name}
                  </h3>
                  <p className='mt-3 text-sm leading-6 text-[#5D606B]'>{item.description}</p>
                  <span className='mt-auto pt-5 text-sm font-medium text-primary'>
                    Explore {item.name.toLowerCase()}
                    <span aria-hidden='true' className='ml-1 transition-transform group-hover:translate-x-1'>
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </nav>
          </section>
        </div>
      </main>
    </>
  );
}
