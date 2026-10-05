import Article from '@/components/blog/article';
import ArticleKeepExploring from '@/components/blog/article-keep-exploring';
import Outline from '@/components/blog/outline';
import Breadcrumbs from '@/components/shared/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAllPosts, PostData, getPostData, getRelatedPosts } from '@/lib/posts';

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SeoData from '@/components/layout/seo-data';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { getPrimaryTopicForPost, getTopicsForPost } from '@/lib/blog-topics';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://appflowy.com';
const longDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  year: 'numeric',
});

function formatPublishedDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? value : longDateFormatter.format(date);
}

function absoluteUrl(value: string | undefined, fallback: string) {
  if (!value) return fallback;

  return value.startsWith('http://') || value.startsWith('https://') ? value : `${site_url}${value}`;
}

function getAuthor(post: PostData) {
  const isAppFlowy = ['appflowy', 'appflowy team', 'the appflowy team'].includes(post.author.trim().toLowerCase());

  return {
    '@type': isAppFlowy ? 'Organization' : 'Person',
    name: post.author,
    url: isAppFlowy ? site_url : post.author_url || site_url,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (post.unpublished) {
    notFound();
  }

  const canonicalUrl = post.canonical_url || `${site_url}/blog/${params.slug}`;
  const metadataTitle = post.seo_title || post.title;
  const metadataDescription = post.seo_description || post.description;
  const socialImage = absoluteUrl(post.og_image || post.thumb_image, `${site_url}/images/og-image.png`);
  const author = getAuthor(post);

  return {
    title: metadataTitle,
    description: metadataDescription,
    openGraph: {
      title: metadataTitle,
      description: metadataDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.last_modified || post.date,
      authors: [author.url],
      tags: post.tags,
      siteName: 'AppFlowy Blog | In the Flow',
      images: [
        {
          url: socialImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadataTitle,
      description: metadataDescription,
      images: [socialImage],
    },
    authors: [{ name: post.author, url: author.url }],
    keywords: post.tags.join(', '),
    category: post.categories.join(', '),
    creator: post.author,
    robots: post.archived
      ? {
          index: false,
          follow: true,
        }
      : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts({ includeArchived: true });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function generateListSchema(slug: string, post: PostData, siteUrl: string) {
  const primaryTopic = getPrimaryTopicForPost(post);
  const articleUrl = post.canonical_url || `${siteUrl}/blog/${slug}`;
  const imageUrl = absoluteUrl(post.og_image || post.thumb_image, `${siteUrl}/images/og-image.png`);
  const author = getAuthor(post);
  const blogPostingSchema = {
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#article`,
    url: articleUrl,
    headline: post.title,
    image: [imageUrl],
    datePublished: post.date,
    dateModified: post.last_modified || post.date,
    author,
    publisher: {
      '@type': 'Organization',
      name: 'AppFlowy',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/appflowy-rss-logo.png`,
        width: 704,
        height: 248,
      },
    },
    description: post.seo_description || post.description,
    keywords: post.tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${siteUrl}/blog#blog`,
      name: 'AppFlowy Blog | In the Flow',
      url: `${siteUrl}/blog`,
    },
    wordCount: post.word_count,
    articleSection: post.categories.join(', '),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      blogPostingSchema,
      generateBreadcrumbSchema([
        { name: 'Blog', path: '/blog' },
        ...(primaryTopic ? [{ name: primaryTopic.name, path: `/blog/${primaryTopic.slug}` }] : []),
        { name: post.title, path: `/blog/${slug}` },
      ]),
    ],
  };
}

async function getData(slug: string) {
  let post: PostData;

  try {
    post = await getPostData(slug);
  } catch (error) {
    console.error(`[getData] Failed to get data for slug: "${slug}"`);
    console.error(`[getData] Error:`, error);
    notFound();
  }

  if (post.unpublished) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post);

  return { post, relatedPosts };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { post, relatedPosts } = await getData(params.slug);
  const primaryTopic = getPrimaryTopicForPost(post);
  const postTopics = getTopicsForPost(post);
  const publishedDate = formatPublishedDate(post.date);

  return (
    <>
      <main className='bg-white pt-[104px] text-[#140F28]'>
        <header className='px-6'>
          <div className='mx-auto w-full max-w-[1040px] pb-16 pt-10 sm:pb-20 sm:pt-12'>
            <Breadcrumbs
              className='mb-8'
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                ...(primaryTopic ? [{ label: primaryTopic.name, href: `/blog/${primaryTopic.slug}` }] : []),
                { label: post.title },
              ]}
            />

            {post.categories?.length ? (
              <div className='flex flex-wrap gap-2'>
                {post.categories.map((category) => {
                  const topic = postTopics.find((item) => item.categoryNames.includes(category));
                  const categoryClassName =
                    'inline-flex rounded-lg bg-[rgba(133,76,255,0.1)] px-3 py-1 text-base font-medium leading-6 text-[#854CFF] transition-colors';

                  return topic ? (
                    <Link
                      aria-label={`Browse ${topic.name} guides`}
                      className={`${categoryClassName} hover:bg-[rgba(133,76,255,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-2`}
                      href={`/blog/${topic.slug}`}
                      key={category}
                    >
                      {category}
                    </Link>
                  ) : (
                    <span className={categoryClassName} key={category}>
                      {category}
                    </span>
                  );
                })}
              </div>
            ) : null}

            <h1 className='mt-3 max-w-[1040px] break-words text-[36px] font-bold leading-[44px] tracking-[-0.02em] text-[#140F28] sm:text-[44px] sm:leading-[52px] lg:text-[56px] lg:leading-[68px]'>
              {post.title}
            </h1>

            <div className='mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-5 text-[#AAAAAA]'>
              <Link
                className='flex min-w-0 items-center gap-2 font-medium text-[#140F28] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-2'
                href={post.author_url || '/blog'}
              >
                <Avatar className='h-6 w-6 border border-[#E6E6E6]'>
                  <AvatarImage src={post.author_image_url} alt='' />
                  <AvatarFallback className='text-[10px]'>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className='truncate'>{post.author}</span>
              </Link>
              <span aria-hidden='true'>•</span>
              <time dateTime={post.date}>{publishedDate}</time>
              <span aria-hidden='true'>•</span>
              <span>{post.reading_time || 1} min read</span>
            </div>
          </div>
        </header>

        <section className='px-6 pb-20' aria-label='Article content'>
          <div className='mx-auto grid w-full max-w-[1040px] gap-12 lg:grid-cols-[minmax(0,680px)_320px] lg:gap-10'>
            <div className='min-w-0'>
              {post.cover_image ? (
                <div className='relative mb-7 h-[220px] w-full overflow-hidden rounded-xl bg-[#F5F5FA] sm:h-[280px]'>
                  <Image
                    alt={post.title}
                    className='object-cover'
                    fill
                    priority
                    sizes='(max-width: 1023px) calc(100vw - 48px), 680px'
                    src={post.cover_image}
                  />
                </div>
              ) : null}

              {post.content ? <Article content={post.content} /> : null}
            </div>

            <Outline post={post} />
          </div>
        </section>

        <section className='border-t border-[#E6E6E6] px-6 py-10 sm:py-12' aria-label='Related resources'>
          <ArticleKeepExploring post={post} relatedPosts={relatedPosts} />
        </section>
      </main>

      <SeoData id='ld-json' data={generateListSchema(params.slug, post, site_url)} />
    </>
  );
}
