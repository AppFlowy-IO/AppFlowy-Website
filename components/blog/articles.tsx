'use client';

import BlogPostCard from '@/components/blog/blog-post-card';
import { BLOG_PAGE_SIZE, getBlogPageHref } from '@/lib/blog-pagination';
import { BLOG_TOPICS } from '@/lib/blog-topics';
import type { PostMetadata } from '@/lib/posts';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useDeferredValue, useMemo, useState } from 'react';

type SortOrder = 'latest' | 'oldest' | 'popular';

const CATEGORY_FILTERS = [
  { label: 'All categories', value: '' },
  { label: 'Open source', value: 'Open source' },
  { label: 'Using AppFlowy', value: 'Using AppFlowy' },
  { label: 'Product', value: 'Product' },
  { label: 'Developers', value: 'Developers' },
] as const;

const SORT_OPTIONS: Array<{ label: string; value: SortOrder }> = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Most Popular', value: 'popular' },
];

const LOAD_MORE_COUNT = BLOG_PAGE_SIZE;

function getValidDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function getPostCategories(post: PostMetadata) {
  return Array.isArray(post.categories) ? post.categories : [];
}

function getPostTags(post: PostMetadata) {
  return Array.isArray(post.tags) ? post.tags : [];
}

function SearchIcon() {
  return (
    <svg aria-hidden='true' className='h-6 w-6 shrink-0' fill='none' viewBox='0 0 24 24'>
      <circle cx='10.5' cy='10.5' r='7.5' stroke='#AAAAAA' strokeWidth='1.8' />
      <path d='M16 16L21 21' stroke='#AAAAAA' strokeLinecap='round' strokeWidth='1.8' />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg aria-hidden='true' className='h-6 w-6' fill='none' viewBox='0 0 24 24'>
      <path d='M3 6H21M6 12H18M9 18H15' stroke='#140F28' strokeLinecap='round' strokeWidth='2' />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden='true' className='h-6 w-6 text-[#854CFF]' fill='none' viewBox='0 0 24 24'>
      <path
        d='M5 12.5L9.5 17L19 7.5'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  );
}

function getPostTime(post: PostMetadata) {
  return getValidDate(post.date)?.getTime() ?? 0;
}

interface ArticlesProps {
  posts: PostMetadata[];
  pagePosts: PostMetadata[];
  currentPage: number;
  totalPages: number;
}

function Articles({ posts, pagePosts, currentPage, totalPages }: ArticlesProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(BLOG_PAGE_SIZE);
  const deferredSearchValue = useDeferredValue(searchValue.trim().toLowerCase());
  const isDefaultView = !searchValue.trim() && !selectedCategory && sortOrder === 'latest';

  const postResult = useMemo(() => {
    const result = posts.filter((post) => {
      const categories = getPostCategories(post);
      const tags = getPostTags(post);

      if (selectedCategory && !categories.includes(selectedCategory)) return false;

      if (!deferredSearchValue) return true;

      const searchableText = [post.title || '', post.description || '', ...categories, ...tags].join(' ').toLowerCase();

      return searchableText.includes(deferredSearchValue);
    });

    return result.sort((first, second) => {
      if (sortOrder === 'oldest') return getPostTime(first) - getPostTime(second);

      if (sortOrder === 'popular') {
        const firstRank = first.pinned || Number.MAX_SAFE_INTEGER;
        const secondRank = second.pinned || Number.MAX_SAFE_INTEGER;

        if (firstRank !== secondRank) return firstRank - secondRank;
      }

      return getPostTime(second) - getPostTime(first);
    });
  }, [deferredSearchValue, posts, selectedCategory, sortOrder]);

  const yearGroups = useMemo(() => {
    const groups = new Map<string, PostMetadata[]>();
    const visiblePosts = isDefaultView ? pagePosts : postResult.slice(0, visibleCount);

    visiblePosts.forEach((post) => {
      const date = getValidDate(post.date);

      if (!date) return;

      const year = String(date.getUTCFullYear());
      const group = groups.get(year);

      if (group) group.push(post);
      else groups.set(year, [post]);
    });

    return Array.from(groups.entries());
  }, [isDefaultView, pagePosts, postResult, visibleCount]);

  const updateCategory = (category: string) => {
    setSelectedCategory(category);
    setFilterMenuOpen(false);
    setVisibleCount(BLOG_PAGE_SIZE);
  };

  const updateSortOrder = (order: SortOrder) => {
    setSortOrder(order);
    setFilterMenuOpen(false);
    setVisibleCount(BLOG_PAGE_SIZE);
  };

  return (
    <section aria-label='Blog articles' className='w-full bg-white pb-20'>
      <div className='mx-auto flex w-full max-w-[1120px] items-center justify-between gap-6 max-xl:px-6 max-md:flex-col max-md:items-stretch'>
        <nav aria-label='Browse articles by topic' className='flex min-w-0 items-center gap-2 overflow-x-auto pb-1'>
          <Link
            aria-current='page'
            className='shrink-0 rounded-full border border-[#854CFF] bg-[rgba(133,76,255,0.1)] px-4 py-2 text-sm font-medium leading-5 text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-2'
            href='/blog'
          >
            All
          </Link>
          {BLOG_TOPICS.map((topic) => (
            <Link
              className='shrink-0 rounded-full border border-[#E6E6E6] bg-white px-4 py-2 text-sm font-medium leading-5 text-[#140F28] transition-colors hover:border-[#B9A1EB] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-2'
              href={`/blog/${topic.slug}`}
              key={topic.slug}
            >
              {topic.name}
            </Link>
          ))}
        </nav>

        <div className='flex shrink-0 items-center gap-2 max-md:w-full'>
          <label className='flex h-12 w-[280px] items-center gap-3 rounded-lg border border-[#E6E6E6] bg-white px-5 max-md:w-full'>
            <span className='sr-only'>Search articles</span>
            <SearchIcon />
            <input
              className='min-w-0 flex-1 bg-transparent text-base font-medium leading-6 text-[#140F28] outline-none placeholder:text-[#AAAAAA]'
              onChange={(event) => {
                setSearchValue(event.target.value);
                setVisibleCount(BLOG_PAGE_SIZE);
              }}
              placeholder='Search article...'
              type='search'
              value={searchValue}
            />
          </label>

          <div className='relative'>
            <button
              aria-controls='blog-filter-panel'
              aria-expanded={filterMenuOpen}
              aria-label={
                selectedCategory
                  ? `Filter and sort articles. Category filter: ${selectedCategory}`
                  : 'Filter and sort articles'
              }
              className={cn(
                'relative flex h-12 w-12 items-center justify-center rounded-lg border bg-white transition-colors hover:border-[#B9A1EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF]',
                selectedCategory ? 'border-[#854CFF]' : 'border-[#E6E6E6]'
              )}
              onClick={() => setFilterMenuOpen((open) => !open)}
              type='button'
            >
              <FilterIcon />
              {selectedCategory ? (
                <span
                  aria-hidden='true'
                  className='absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#854CFF] ring-2 ring-white'
                />
              ) : null}
            </button>

            {filterMenuOpen ? (
              <div
                aria-label='Article filters and sort order'
                className='absolute right-0 top-[54px] z-20 w-[300px] rounded-2xl border border-[#E6E6E6] bg-white p-4 shadow-[0_8px_24px_rgba(20,15,40,0.12)]'
                id='blog-filter-panel'
              >
                <fieldset>
                  <legend className='text-sm font-semibold leading-5 text-[#140F28]'>Filter by category</legend>
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {CATEGORY_FILTERS.map((category) => {
                      const active = selectedCategory === category.value;

                      return (
                        <button
                          aria-pressed={active}
                          className={cn(
                            'rounded-full border px-3 py-1.5 text-sm font-medium leading-5 transition-colors',
                            active
                              ? 'border-[#854CFF] bg-[rgba(133,76,255,0.1)] text-[#854CFF]'
                              : 'border-[#E6E6E6] bg-white text-[#140F28] hover:border-[#B9A1EB] hover:text-[#854CFF]'
                          )}
                          key={category.value || 'all-categories'}
                          onClick={() => updateCategory(category.value)}
                          type='button'
                        >
                          {category.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className='mt-5 border-t border-[#E6E6E6] pt-4'>
                  <legend className='px-0 text-sm font-semibold leading-5 text-[#140F28]'>Sort articles</legend>
                  <div className='mt-2'>
                    {SORT_OPTIONS.map((option) => {
                      const selected = sortOrder === option.value;

                      return (
                        <button
                          aria-pressed={selected}
                          className={cn(
                            'flex h-10 w-full items-center justify-between rounded-lg px-3 text-left text-sm font-medium leading-5 text-[#140F28] transition-colors hover:bg-[rgba(20,15,40,0.04)]',
                            selected && 'bg-[rgba(20,15,40,0.04)]'
                          )}
                          key={option.value}
                          onClick={() => updateSortOrder(option.value)}
                          type='button'
                        >
                          {option.label}
                          {selected ? <CheckIcon /> : null}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div aria-live='polite'>
        {yearGroups.length > 0 ? (
          yearGroups.map(([year, yearPosts]) => (
            <section
              aria-labelledby={`blog-year-${year}`}
              className='mx-auto w-full max-w-[1120px] py-10 max-xl:px-6'
              key={year}
            >
              <h2 className='text-[20px] font-medium leading-7 text-[#AAAAAA]' id={`blog-year-${year}`}>
                {year}
              </h2>
              <div className='mt-6 grid grid-cols-3 gap-x-5 gap-y-5 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-y-10'>
                {yearPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className='mx-auto w-full max-w-[1120px] py-20 text-center text-base text-[#5A5A5A] max-xl:px-6'>
            No articles match your search.
          </div>
        )}
      </div>

      {!isDefaultView && visibleCount < postResult.length ? (
        <div className='flex w-full items-center justify-center py-10'>
          <button
            className='rounded-lg border border-[#E6E6E6] bg-white px-5 py-3 text-base font-medium leading-6 text-[#140F28] transition-colors hover:border-[#B9A1EB] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF]'
            onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
            type='button'
          >
            Load more...
          </button>
        </div>
      ) : null}

      {isDefaultView && totalPages > 1 ? (
        <nav
          aria-label='Blog pagination'
          className='mx-auto flex w-full max-w-[1120px] items-center justify-center gap-2 px-6 py-10'
        >
          {currentPage > 1 ? (
            <Link
              aria-label='Previous blog page'
              className='rounded-lg border border-[#E6E6E6] bg-white px-4 py-2 text-sm font-medium text-[#140F28] transition-colors hover:border-[#B9A1EB] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF]'
              href={getBlogPageHref(currentPage - 1)}
              rel='prev'
            >
              Previous
            </Link>
          ) : (
            <span aria-disabled='true' className='rounded-lg border border-[#E6E6E6] px-4 py-2 text-sm text-[#AAAAAA]'>
              Previous
            </span>
          )}

          <div className='flex items-center gap-2 max-sm:hidden'>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) =>
              page === currentPage ? (
                <span
                  aria-current='page'
                  className='min-w-10 flex h-10 items-center justify-center rounded-lg border border-[#854CFF] bg-[rgba(133,76,255,0.1)] px-3 text-sm font-medium text-[#854CFF]'
                  key={page}
                >
                  {page}
                </span>
              ) : (
                <Link
                  aria-label={`Blog page ${page}`}
                  className='min-w-10 flex h-10 items-center justify-center rounded-lg border border-[#E6E6E6] bg-white px-3 text-sm font-medium text-[#140F28] transition-colors hover:border-[#B9A1EB] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF]'
                  href={getBlogPageHref(page)}
                  key={page}
                >
                  {page}
                </Link>
              )
            )}
          </div>

          <span className='px-2 text-sm text-[#5A5A5A] sm:hidden'>
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              aria-label='Next blog page'
              className='rounded-lg border border-[#E6E6E6] bg-white px-4 py-2 text-sm font-medium text-[#140F28] transition-colors hover:border-[#B9A1EB] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF]'
              href={getBlogPageHref(currentPage + 1)}
              rel='next'
            >
              Next
            </Link>
          ) : (
            <span aria-disabled='true' className='rounded-lg border border-[#E6E6E6] px-4 py-2 text-sm text-[#AAAAAA]'>
              Next
            </span>
          )}
        </nav>
      ) : null}
    </section>
  );
}

export default Articles;
