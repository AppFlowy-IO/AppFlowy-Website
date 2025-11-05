'use client';

import PostItem from '@/components/blog/post-item';
import { useSubscriber } from '@/components/blog/use-subscriber';
import Reddit from '@/components/icons/reddit';
import SearchIcon from '@/components/icons/search-icon';
import Twitter from '@/components/icons/twitter';
import { PostMetadata } from '@/lib/posts';
import { cn } from '@/lib/utils';
import { Grid } from '@mui/material';
import { orderBy } from 'lodash-es';
import Link from 'next/link';
import React, { useMemo } from 'react';

function Articles({ posts }: { posts: PostMetadata[] }) {
  const { email, setEmail, handleSubscribe } = useSubscriber();

  const [searchValue, setSearchValue] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');

  const pinnedPosts = useMemo(() => {
    if (selectedCategory || searchValue) {
      return [];
    }

    return posts.filter((post) => post.pinned).sort((a, b) => a.pinned - b.pinned);
  }, [posts, searchValue, selectedCategory]);

  const categories = useMemo(() => {
    const categories = new Set<string>();

    posts.forEach((post) => {
      post.categories.forEach((tag) => {
        categories.add(tag);
      });
    });
    return categories;
  }, [posts]);

  const postResult = useMemo(() => {
    const condition = [['date'], ['desc']];

    return orderBy(
      posts.filter((post) => {
        if (selectedCategory && !post.categories.includes(selectedCategory)) {
          return false;
        }

        if (searchValue && !post.title.toLowerCase().includes(searchValue.toLowerCase())) {
          return false;
        }

        return true;
      }),
      ...condition
    );
  }, [posts, searchValue, selectedCategory]);

  return (
    <div className={cn('flex w-full flex-col justify-start gap-8', 'max-md:gap-4')}>
      <div className={cn('flex items-center justify-between', 'max-sm:w-full max-sm:flex-col')}>
        <div className={cn('flex items-center gap-2 rounded-full bg-[#F5F5FA] px-4 py-3', 'max-sm:w-full')}>
          <SearchIcon />
          <input
            placeholder={'Search'}
            className={'bg-transparent text-base focus:outline-none'}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className={cn('flex flex-wrap items-center gap-3')}>
        <div
          onClick={setSelectedCategory.bind(null, '')}
          className={cn('text-text-caption cursor-pointer rounded-full border px-4 py-2 text-sm hover:bg-gray-100', {
            'bg-primary border-primary hover:bg-primary text-white': !selectedCategory,
          })}
        >
          All
        </div>
        {Array.from(categories).map((category) => (
          <div
            key={category}
            onClick={setSelectedCategory.bind(null, category)}
            className={cn('text-text-caption cursor-pointer rounded-full border px-4 py-2 text-sm hover:bg-gray-100', {
              'bg-primary border-primary hover:bg-primary text-white': selectedCategory === category,
            })}
          >
            {category}
          </div>
        ))}
      </div>
      {pinnedPosts.length > 0 && (
        <div className='container mx-auto mb-[50px] max-sm:hidden'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-5'>
            <div className='md:col-span-3 md:row-span-2'>
              <PostItem post={pinnedPosts[0]} useThumbnail={false} imageClassName='h-80 md:h-96' />
            </div>
            <div className='md:col-span-2'>
              <PostItem post={pinnedPosts[1]} />
            </div>
            <div className={cn('md:col-span-2')}>
              <PostItem post={pinnedPosts[2]} />
            </div>
          </div>
        </div>
      )}

      <div className='container mx-auto mb-[50px] mt-4'>
        <Grid
          container
          rowSpacing={{
            xs: 4,
            sm: 6,
          }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          columnSpacing={{ xs: 2, sm: 34, md: 5, lg: 5 }}
        >
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <div
              className={
                'border-primary flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-[16px] border bg-[#EEEEFD] px-6 py-10'
              }
            >
              <div className={cn('flex flex-col items-center justify-center gap-2 text-center')}>
                <div className={cn('text-[24px] font-medium', 'max-md:text-base')}>In the Flow</div>
                <div className={cn('text-[18px] font-normal leading-[133%]', 'max-md:text-sm')}>
                  Receive the latest updates, stories, and tips from AppFlowy
                </div>
              </div>
              <div className={cn('flex flex-col items-center justify-center gap-2 text-center')}>
                <div className={'text-sm opacity-50'}>Follow us on</div>
                <div className={'share flex items-center gap-3'}>
                  <Link
                    target={'_blank'}
                    className={cn('share-btn hover:border-primary h-[52px] w-[52px] border-gray-300')}
                    href={'https://twitter.com/appflowy'}
                  >
                    <Twitter />
                  </Link>
                  <Link
                    target={'_blank'}
                    className={cn('share-btn hover:border-primary h-[52px] w-[52px] border-gray-300')}
                    href={'https://www.reddit.com/r/AppFlowy'}
                  >
                    <Reddit />
                  </Link>
                </div>
              </div>
              <div className={'flex items-center gap-[10px] max-md:flex-col max-md:gap-5'}>
                <div className={'flex h-[44px] max-sm:min-w-[240px] max-w-full min-w-[189px] items-center rounded-[12px] bg-white p-3 max-md:w-full'}>
                  <input
                    type={'email'}
                    className={'w-full text-sm outline-none'}
                    placeholder={'Enter your email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div
                  onClick={handleSubscribe}
                  className={'download-btn h-[44px] cursor-pointer rounded-[12px] px-3 text-sm max-md:w-full'}
                >
                  Subscribe
                </div>
              </div>
            </div>
          </Grid>
          {postResult.map((post, index) => {
            return (
              <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
                <div className={'article-list-item h-[370px] max-sm:h-auto'}>
                  <PostItem post={post} showDescription />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default Articles;
