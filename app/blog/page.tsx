import Articles from '@/components/blog/articles';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Script from 'next/script';
import React from 'react';
import OpenGraphImage from '../../public/images/og-image.png';
import { getAllPosts, PostData } from '@/lib/posts';

const site_url = process.env.ENVIRONMENT === 'test' ? 'https://test.appflowy.com' : 'https://appflowy.com';
const name = 'AppFlowy Blog | In the Flow';

export async function generateMetadata(): Promise<Metadata> {
  const posts = getAllPosts();

  const description = `Receive the latest updates and tips from AppFlowy. Offline mode, self-hosting, iOS and Android, Markdown editing, GPT-4, Claude, Llama, and team collaboration.`;

  return {
    title: name,
    description: description,
    openGraph: {
      title: name,
      description: description,
      url: `${site_url}/blog`,
      type: 'website',
      siteName: 'In the Flow',
      images: [
        {
          url: OpenGraphImage.src,
          width: 1200,
          height: 630,
          alt: 'AppFlowy Blog',
        },
      ],
    },
    category: posts.flatMap((post) => post.categories || []).join(', '),
    creator: posts.flatMap((post) => post.author || []).join(', '),
    alternates: {
      canonical: `${site_url}/blog`,
      types: {
        'application/rss+xml': `${site_url}/blog/feed.xml`,
      },
    },
    keywords: posts
      .flatMap((post) => post.tags || [])
      .slice(0, 10)
      .join(', '),
  };
}

function generateListSchema(posts: PostData[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog`,
    },
    name,
    description: 'Explore the latest from AppFlowy: news, features, and insights from our AI collaborative workspace.',
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.title,
        headline: post.title,
        description: post.description,
        image: post.cover_image ? `${siteUrl}${post.cover_image}` : undefined,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: post.author,
        },
      },
    })),
    publisher: {
      '@type': 'Organization',
      name: 'AppFlowy',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/appflowy.ico`,
      },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
  };
}

function Blog() {
  const posts = getAllPosts();
  const listSchema = generateListSchema(posts, site_url);

  return (
    <>
      <Script id='ld-json' type='application/ld+json'>
        {JSON.stringify(listSchema)}
      </Script>
      <div
        className={cn(
          'bg-white',
          'flex flex-col items-center px-[100px] pb-[32px] pt-[161px]',
          'max-xl:px-14',
          'max-md:px-8',
          'max-sm:px-6 max-sm:pb-[16px] max-sm:pt-[120px]'
        )}
      >
        <div className={'flex w-full max-w-[1100px] flex-col'}>
          <h1 className={cn('text-left text-[54px] font-medium', 'max-md:text-[7vw]', 'relative')}>
            In the Flow
            <span
              className={cn(
                'relative -right-5 top-[-25px] text-[28px] font-normal',
                'max-md:-right-2 max-md:top-[-4vw] max-md:text-base'
              )}
            >
              Blog
            </span>
          </h1>
        </div>
      </div>
      <div
        className={cn('bg-white', 'flex flex-col items-center pb-[110px] max-xl:px-14', 'max-sm:px-6 max-sm:py-[32px]')}
      >
        <div className={cn('flex w-full max-w-[1100px] flex-col items-center gap-[32px]')}>
          <Articles posts={posts} />
        </div>
      </div>
    </>
  );
}

export default Blog;
