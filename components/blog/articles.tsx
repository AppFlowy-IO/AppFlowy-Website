'use client';

import PostItem from '@/components/blog/post-item';
import SearchIcon from '@/components/icons/search-icon';
import { PostData } from '@/lib/posts';
import { cn } from '@/lib/utils';
import { Grid } from '@mui/material';
import React, { useMemo } from 'react';

function Articles({ posts }: { posts: PostData[] }) {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const categories = useMemo(() => {
    const categories = new Set<string>();

    posts.forEach((post) => {
      post.categories.forEach((category) => {
        categories.add(category);
      });
    });
    return categories;
  }, [posts]);

  const postResult = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategory && !post.categories.includes(selectedCategory)) {
        return false;
      }

      if (searchValue && !post.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [posts, searchValue, selectedCategory]);

  return (
    <div className={cn('flex w-full flex-col justify-start gap-10', 'max-md:gap-6')}>
      <div className={cn('text-[58px] font-medium', 'max-md:text-[8vw]')}>Articles</div>
      <div className={cn('flex items-center justify-between')}>
        <div className={cn('flex items-center gap-2 rounded-full bg-[#F5F5FA] px-4 py-3')}>
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
      <Grid
        container
        rowSpacing={{
          sm: 4,
        }}
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        columnSpacing={{ xs: 2, sm: 2, md: 3, lg: 3 }}
      >
        {postResult.map((post, index) => {
          return (
            <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
              <div className={'article-list-item h-[370px]'}>
                <PostItem post={post} showDescription />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Articles;
