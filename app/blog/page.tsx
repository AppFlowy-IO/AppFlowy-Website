import Articles from '@/components/blog/articles';
import PostItem from '@/components/blog/post-item';
import Subscriber from '@/components/blog/subscriber';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import Script from 'next/script';
import React from 'react';
import OpenGraphImage from '../../public/images/og-image.png';
import { getAllPosts, PostData } from '@/lib/posts';

const site_url = process.env.ENVIRONMEN === 'test' ? 'https://test.appflowy.io' : 'https://appflowy.io';

export async function generateMetadata(): Promise<Metadata> {
  const posts = getAllPosts();

  const latestPostTitles = posts
    .slice(0, 3)
    .map((post) => post.title)
    .join(', ');
  const description = `Explore the latest from AppFlowy: ${latestPostTitles}. Stay updated with news, features, and insights from our AI collaborative workspace.`;

  return {
    title: 'AppFlowy Blog - Latest Updates and Insights',
    description: description,
    openGraph: {
      title: 'AppFlowy Blog - Latest Updates and Insights',
      description: description,
      url: `${site_url}/blog`,
      type: 'website',
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
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/blog/${post.slug}`,
      name: post.title,
      description: post.description,
      image: post.cover_image ? `${siteUrl}${post.cover_image}` : undefined,
    })),
  };
}

function Blog() {
  const posts = getAllPosts();
  const listSchema = generateListSchema(posts, site_url);
  const pinnedPosts = posts.filter((post) => post.pinned).slice(0, 3);

  return (
    <>
      <Script id='ld-json' type='application/ld+json'>
        {JSON.stringify(listSchema)}
      </Script>
      <div
        className={cn(
          'bg-[#EEEEFD]',
          'flex flex-col items-center px-[100px] pb-[70px] pt-[191px]',
          'max-xl:px-14',
          'max-md:px-8',
          'max-sm:px-6'
        )}
      >
        <div className={'flex w-full max-w-[1100px] flex-col items-center'}>
          <h1
            className={cn(
              'whitespace-pre-wrap break-words text-center text-[58px] font-medium leading-[105%] tracking-[-1.16px]',
              'max-md:text-[8vw]'
            )}
          >
            BLOG | In the Flow
          </h1>
          <p className={cn('whitespace-pre-wrap break-words py-5 text-center text-[24px]', 'max-md:text-base')}>
            Receive the latest updates, stories, and tips from AppFlowy{' '}
          </p>
          <div className={cn('py-10', 'max-md:py-4')}>
            <Subscriber />
          </div>
        </div>
      </div>
      <div
        className={cn('bg-white', 'flex flex-col items-center py-[110px] max-xl:px-14', 'max-sm:px-6 max-sm:py-[60px]')}
      >
        <div className={cn('flex w-full max-w-[1100px] flex-col items-center gap-[100px]', 'max-md:gap-[60px]')}>
          <div className={'flex w-full gap-10 max-xl:gap-6 max-lg:flex-col'}>
            <div className={'h-auto w-[60%] max-lg:w-full'}>
              <PostItem post={pinnedPosts[0]} />
            </div>
            <div className={'flex flex-1 flex-col justify-center gap-10 max-lg:flex-row max-sm:flex-col'}>
              <PostItem post={pinnedPosts[1]} />
              <PostItem post={pinnedPosts[2]} />
            </div>
          </div>
          <Articles posts={posts} />
        </div>
      </div>
    </>
  );
}

export default Blog;
