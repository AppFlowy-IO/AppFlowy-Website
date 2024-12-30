import Article from '@/components/blog/article';
import Outline from '@/components/blog/outline';
import RelatedPosts from '@/components/blog/related-posts';
import Subscriber from '@/components/blog/subscriber';
import Circle from '@/components/icons/Circle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { getAllPosts, PostData, getPostData, getRelatedPosts } from '@/lib/posts';
import { cn, colorArrayTint, formatDate, stringToColor } from '@/lib/utils';
import { TimerIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import Image from '@/components/blog/mdx-image';

import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import React from 'react';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

const site_url = process.env.ENVIRONMENT === 'test' ? 'https://test.appflowy.io' : 'https://appflowy.io';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostData(params.slug);

  return {
    title: `${post.title}`,
    description: post.description.slice(0, 160),
    openGraph: {
      title: `${post.title}`,
      description: post.description,
      url: `${site_url}/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      siteName: 'AppFlowy Blog | In the Flow',
      images: [
        {
          url:
            (post.thumb_image?.startsWith('http') ? post.thumb_image : `${site_url}${post.thumb_image}`) ||
            `${site_url}/blog-og-image.png`,
          width: 640,
          height: 385,
          alt: post.title,
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
    '@context': 'https://schema.org',
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
        url: `${siteUrl}/appflowy.ico`,
      },
    },
    description: post.description,
    keywords: post.tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${slug}`,
    },
    articleBody: post.content,
    wordCount: post.word_count,
    articleSection: post.categories.join(', '),
  };
}

async function getData(slug: string) {
  try {
    const post = await getPostData(slug);
    const relatedPosts = await getRelatedPosts(post);

    return { post, relatedPosts };
  } catch (error) {
    notFound();
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { post, relatedPosts } = await getData(params.slug);

  return (
    <>
      <div
        className={cn(
          'relative flex flex-col items-center gap-[40px] overflow-hidden bg-white px-[100px] max-sm:gap-5',
          'pb-[170px] pt-[170px]',
          'max-xl:px-14',
          'max-md:px-8 max-md:pb-[150px]',
          'max-sm:px-6 max-sm:pb-[100px]'
        )}
      >
        <Link
          href={'/blog'}
          className={
            'hover:text-primary absolute left-[56px] top-[160px] flex cursor-pointer select-none items-center gap-2 py-2 text-base max-xl:top-[120px] max-md:left-0 max-md:top-[100px] max-md:w-full max-md:justify-start max-sm:px-6'
          }
        >
          <ArrowLeftIcon />
          Back
        </Link>
        <div
          className={'grid w-full max-w-[1100px] grid-cols-12 gap-10 overflow-hidden max-xl:gap-3 lg:gap-16 xl:gap-8'}
        >
          <div
            className={
              'blog-container col-span-12 flex max-w-full flex-1 flex-grow flex-col overflow-hidden overflow-x-hidden max-md:mb-6 '
            }
          >
            <CardHeader className='blog-header flex w-full flex-col gap-5 p-0'>
              <div className='flex w-full flex-col justify-start gap-5'>
                {post.categories && (
                  <div className='flex w-full flex-wrap gap-2  max-sm:justify-center'>
                    {post.categories.map((tag) => (
                      <Badge
                        style={{
                          borderColor: 'transparent',
                          background: stringToColor(tag, colorArrayTint),
                        }}
                        key={tag}
                        variant='outline'
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <CardTitle
                  className={cn(
                    'whitespace-pre-wrap break-words text-left font-medium',
                    'text-4xl !leading-[120%] sm:text-5xl md:text-6xl lg:text-[58px]',
                    'leading-tight',
                    'max-sm:text-center'
                  )}
                >
                  {post.title}
                </CardTitle>
              </div>
              <div className='flex flex-col gap-6 text-sm text-gray-600'>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-2 max-sm:justify-center'>
                  <Link
                    href={post.author_url}
                    className='flex max-w-[200px]  items-center gap-3 truncate max-sm:mb-4 max-sm:w-full max-sm:max-w-full max-sm:justify-center'
                  >
                    <Avatar className='h-10 w-10 border'>
                      <AvatarImage src={post.author_image_url} alt={post.author} />
                      <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className='font-medium'>{post.author}</span>
                  </Link>
                  <div className={'max-sm:hidden'}>
                    <Circle />
                  </div>

                  <div className='flex items-center'>
                    <time className={''} dateTime={post.date}>
                      {formatDate(new Date(post.date))}
                    </time>
                  </div>
                  <div>
                    <Circle />
                  </div>

                  <div className='flex items-center'>
                    <TimerIcon className='text-primary mr-2 h-4 w-4' />
                    <span>{post.reading_time} min read</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </div>
        </div>
        <div
          className={'grid w-full max-w-[1100px] grid-cols-12 gap-10 overflow-hidden max-xl:gap-3 lg:gap-16 xl:gap-8'}
        >
          <div
            className={
              'blog-container col-span-12 mb-[70px] flex max-w-full flex-1 flex-grow flex-col overflow-hidden overflow-x-hidden max-md:mb-6 lg:col-span-8 xl:col-span-8'
            }
          >
            {post.cover_image && (
              <Image
                fill
                loading={'eager'}
                className={cn('blog-cover m-0 rounded-[10px] object-cover', 'rounded-md border', 'wide')}
                zoomable={true}
                src={post.cover_image}
                alt={post.title}
              />
            )}

            {post.content && <Article content={post.content} />}
          </div>

          {/* Table of Contents */}
          <Outline post={post} />
        </div>
        <div
          className={
            'flex w-full max-w-[1100px] items-center justify-center rounded-[8px] bg-[#EEEEFD] pb-[50px] pt-[110px] max-md:pb-[30px] max-md:pt-[60px]'
          }
        >
          <Subscriber />
        </div>
        {relatedPosts.length > 0 && (
          <div className={'w-full max-w-[1100px] py-[110px] max-md:py-[50px]'}>
            <RelatedPosts relatedPosts={relatedPosts} />
          </div>
        )}
      </div>

      <Script id='ld-json' type='application/ld+json'>
        {JSON.stringify(generateListSchema(params.slug, post, site_url))}
      </Script>
    </>
  );
}
