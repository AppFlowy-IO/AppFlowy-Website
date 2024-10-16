'use client';

import PostItem from '@/components/blog/post-item';
import SearchIcon from '@/components/icons/search-icon';
import { PostData } from '@/lib/posts';
import { cn } from '@/lib/utils';
import { Grid } from '@mui/material';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { orderBy } from 'lodash-es';
import React, { useMemo } from 'react';

function Articles({ posts }: { posts: PostData[] }) {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [tabKey, setTabKey] = React.useState<string>('recent');
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

    if (tabKey === 'popular') {
      condition[0] = ['is_popular', 'date'];
      condition[1] = ['asc', 'desc'];
    }

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
  }, [tabKey, posts, searchValue, selectedCategory]);

  const tabOptions = useMemo(() => {
    return [
      {
        value: 'popular',
        label: 'Popular',
      },
      {
        value: 'recent',
        label: 'Recent',
      },
    ];
  }, []);

  return (
    <div className={cn('flex w-full flex-col justify-start gap-10', 'max-md:gap-6')}>
      <div className={cn('text-[58px] font-medium', 'max-md:text-[8vw]')}>Articles</div>
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
        <MuiTabs
          className={'article-tabs max-sm:w-full'}
          orientation={'horizontal'}
          value={tabKey}
          onChange={(_, val) => setTabKey(val)}
        >
          {tabOptions.map((tab) => (
            <MuiTab
              className={`article-tab ${tabKey === tab.value ? 'opacity-100' : 'opacity-50'} transform max-sm:w-[50%]`}
              key={tab.value}
              value={tab.value}
              label={
                <div className={'flex w-full flex-col gap-2 max-md:gap-0'}>
                  <div className={'tab-title'}>
                    <div className={'tab-title-name text-black'}>{tab.label}</div>
                  </div>
                </div>
              }
            />
          ))}
        </MuiTabs>
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
