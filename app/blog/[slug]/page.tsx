import Article from '@/components/blog/article';
import Outline from '@/components/blog/outline';
import RelatedPosts from '@/components/blog/related-posts';
import Subscriber from '@/components/blog/subscriber';
import Circle from '@/components/icons/Circle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { getAllPosts, PostData, getPostData, getRelatedPosts } from '@/lib/posts';
import { cn, formatDate } from '@/lib/utils';
import { TimerIcon, CalendarIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import Image from '@/components/blog/mdx-image';

import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import React from 'react';

interface Props {
  params: { slug: string };
}

const site_url = process.env.ENVIRONMEN === 'test' ? 'https://test.appflowy.io' : 'https://appflowy.io';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.slug);

  return {
    title: `${post.title} | AppFlowy Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${site_url}/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.og_image || `${site_url}/blog-og-image.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      videos: [
        {
          url: post.video_url || '',
          type: 'application/x-shockwave-flash',
          width: 640,
          height: 385,
        },
      ],
    },
    authors: [{ name: post.author }],
    keywords: post.tags.join(', '),
    category: post.categories.join(', '),
    creator: post.author,
    alternates: {
      canonical: `${site_url}/blog/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function generateListSchema(slug: string, post: PostData, siteUrl: string) {
  return {
    '@context': siteUrl,
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.og_image || `${siteUrl}/blog-og-image.png`,
    video: post.video_url || '',
    datePublished: post.date,
    dateModified: post.last_modified || post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AppFlowy',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/appflowy.svg`,
      },
    },
    description: post.description,
    keywords: post.tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${slug}`,
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);
  const relatedPosts = await getRelatedPosts(post);

  return (
    <>
      <div
        className={cn(
          'relative flex flex-col items-center bg-white px-[100px]',
          'py-[170px]',
          'max-lg:px-14',
          'max-md:px-8 max-md:py-[150px]',
          'max-sm:px-6'
        )}
      >
        <Link
          href={'/blog'}
          className={
            'hover:text-primary absolute left-[10%] top-[170px] flex cursor-pointer items-center gap-2 text-base'
          }
        >
          <ArrowLeftIcon />
          Back
        </Link>
        <div className={'grid w-full max-w-[1100px] grid-cols-12 gap-[70px] overflow-hidden lg:gap-16 xl:gap-8'}>
          <div
            className={
              'blog-container col-span-12 mb-[70px] flex-1 flex-grow overflow-x-hidden max-md:mb-6 lg:col-span-8 xl:col-span-8'
            }
          >
            <CardHeader className='blog-header flex w-full flex-col gap-5 p-0 pb-10'>
              <div className='flex w-full flex-col justify-start gap-5'>
                {post.categories && (
                  <div className='flex flex-wrap gap-2'>
                    {post.categories.map((tag) => (
                      <Badge key={tag} variant='outline'>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <CardTitle
                  className={cn(
                    'text-left font-medium',
                    'text-4xl sm:text-5xl md:text-6xl lg:text-[58px]',
                    'leading-tight'
                  )}
                >
                  {post.title}
                </CardTitle>
              </div>
              <div className='flex flex-col gap-6 text-sm text-gray-600'>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10 border'>
                      <AvatarImage src={post.author_image_url} alt={post.author} />
                      <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className='font-medium'>{post.author}</span>
                  </div>
                  <Circle />
                  <div className='flex items-center'>
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    <time dateTime={post.date}>Created {formatDate(new Date(post.date))}</time>
                  </div>
                  <Circle />
                  <div className='flex items-center'>
                    <TimerIcon className='text-primary mr-2 h-4 w-4' />
                    <span>{post.reading_time} minutes read</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            {post.og_image && (
              <Image
                fill
                className={cn('blog-cover m-0 rounded-[10px] object-cover', 'rounded-md border', 'wide')}
                zoomable={true}
                src={post.og_image}
                alt={post.title}
              />
            )}

            <Article post={post} />
          </div>

          {/* Table of Contents */}
          <Outline post={post} />
        </div>
        <div
          className={
            'flex w-full max-w-[1100px] items-center justify-center rounded-[8px] bg-[#EEEEFD] pb-[50px] pt-[80px]'
          }
        >
          <Subscriber />
        </div>
        <div className={'w-full max-w-[1100px] py-[110px]'}>
          <RelatedPosts relatedPosts={relatedPosts} />
        </div>
      </div>

      <Script id='ld-json' type='application/ld+json'>
        {JSON.stringify(generateListSchema(params.slug, post, site_url))}
      </Script>
    </>
  );
}
