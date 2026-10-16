'use client';

import BlogPostCard from '@/components/blog/blog-post-card';
import { BLOG_PAGE_SIZE, getBlogPageHref } from '@/lib/blog-pagination';
import TopicFilterChips from '@/components/blog/topic-filter-chips';
import type { PostMetadata } from '@/lib/posts';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useDeferredValue, useMemo, useRef, useState } from 'react';

type SortOrder = 'latest' | 'oldest' | 'popular';

const CATEGORY_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Open source', value: 'Open source' },
  { label: 'Using AppFlowy', value: 'Using AppFlowy' },
  { label: 'Product', value: 'Product' },
  { label: 'Developer', value: 'Developers' },
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
    <span
      aria-hidden='true'
      className='h-6 w-6 shrink-0 bg-current'
      style={{
        mask: 'url(/images/blog/icons/search.svg) center / 24px 24px no-repeat',
        WebkitMask: 'url(/images/blog/icons/search.svg) center / 24px 24px no-repeat',
      }}
    />
  );
}

function FilterIcon() {
  return (
    <svg aria-hidden='true' className='h-6 w-6' fill='none' viewBox='0 0 24 24'>
      <path d='M3 6H21M6 12H18M9 18H15' stroke='currentColor' strokeLinecap='round' strokeWidth='2' />
    </svg>
  );
}

function CheckIcon() {
  return (
    <img
      alt=''
      aria-hidden='true'
      className='shrink-0'
      src='/images/blog/icons/topic-check.svg'
      width={24}
      height={24}
    />
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
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('latest');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(BLOG_PAGE_SIZE);
  const deferredSearchValue = useDeferredValue(searchValue.trim().toLowerCase());
  const hasActiveFilters = selectedCategory !== '' || sortOrder !== 'latest';
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
      <div className='mx-auto flex w-full max-w-[1120px] items-center justify-between gap-x-20 gap-y-5 max-xl:px-6 max-md:flex-col max-md:items-stretch max-md:px-4'>
        <TopicFilterChips />

        <div className='flex shrink-0 items-center gap-2 max-md:w-full'>
          <div
            className={cn(
              'flex h-12 w-[280px] items-center gap-3 rounded-lg border bg-white px-5 transition-colors focus-within:border-[#854CFF] focus-within:text-[#854CFF] max-md:w-0 max-md:min-w-0 max-md:flex-1',
              searchValue ? 'border-[#854CFF] text-[#854CFF]' : 'border-[#E6E6E6] text-[#AAAAAA]'
            )}
            onClick={() => searchInputRef.current?.focus()}
          >
            <SearchIcon />
            <input
              aria-label='Search articles'
              ref={searchInputRef}
              className='min-w-0 flex-1 appearance-none bg-transparent text-base font-medium leading-6 text-[#140F28] outline-none placeholder:text-[#AAAAAA] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden'
              onChange={(event) => {
                setSearchValue(event.target.value);
                setVisibleCount(BLOG_PAGE_SIZE);
              }}
              placeholder='Search article...'
              type='search'
              value={searchValue}
            />
            {searchValue ? (
              <button
                aria-label='Clear search'
                className='flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#AAAAAA] transition-colors hover:text-[#140F28] focus-visible:text-[#140F28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF]'
                onClick={() => {
                  setSearchValue('');
                  setVisibleCount(BLOG_PAGE_SIZE);
                  searchInputRef.current?.focus();
                }}
                type='button'
              >
                <span
                  aria-hidden='true'
                  className='h-6 w-6 bg-current'
                  style={{
                    mask: 'url(/images/blog/icons/search-clear.svg) center / 24px 24px no-repeat',
                    WebkitMask: 'url(/images/blog/icons/search-clear.svg) center / 24px 24px no-repeat',
                  }}
                />
              </button>
            ) : null}
          </div>

          <div className='relative'>
            <button
              aria-controls='blog-filter-panel'
              aria-expanded={filterMenuOpen}
              aria-label={`Filter and sort articles. Category: ${selectedCategory || 'All'}. Sort: ${SORT_OPTIONS.find((option) => option.value === sortOrder)?.label}.`}
              className={cn(
                'relative flex h-12 w-12 items-center justify-center rounded-lg border transition-colors hover:border-[#854CFF] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF]',
                hasActiveFilters
                  ? 'border-[#854CFF] bg-[rgba(133,76,255,0.1)] text-[#854CFF]'
                  : 'border-[#E6E6E6] bg-white text-[#140F28]'
              )}
              onClick={() => setFilterMenuOpen((open) => !open)}
              type='button'
            >
              <FilterIcon />
            </button>

            {filterMenuOpen ? (
              <div
                aria-label='Article filters and sort order'
                className='absolute right-0 top-[54px] z-20 w-[320px] max-w-[calc(100vw-32px)] rounded-2xl bg-white p-3 shadow-[0_0_6px_rgba(0,0,0,0.12)]'
                id='blog-filter-panel'
              >
                <fieldset className='min-w-0'>
                  <legend className='w-full px-4 py-3 text-sm font-normal leading-5 text-[#AAAAAA]'>Filter by category</legend>
                  <div className='flex flex-wrap gap-2 p-2'>
                    {CATEGORY_FILTERS.map((category) => {
                      const active = selectedCategory === category.value;

                      return (
                        <button
                          aria-pressed={active}
                          className={cn(
                            'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium leading-5 transition-colors',
                            category.value === '' && 'w-20',
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

                <fieldset className='min-w-0'>
                  <legend className='w-full px-4 py-3 text-sm font-normal leading-5 text-[#AAAAAA]'>Sort articles</legend>
                  <div>
                    {SORT_OPTIONS.map((option) => {
                      const selected = sortOrder === option.value;

                      return (
                        <button
                          aria-pressed={selected}
                          className={cn(
                            'flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-medium leading-6 text-[#140F28] transition-colors hover:bg-[rgba(20,15,40,0.04)]',
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
              <div className='mt-6 grid grid-cols-3 gap-x-5 gap-y-20 max-lg:grid-cols-2 max-sm:grid-cols-1'>
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
          className='mx-auto flex w-full max-w-[1120px] items-center justify-center gap-2 px-6 py-10 max-sm:justify-between max-sm:px-4'
        >
          {currentPage > 1 ? (
            <Link
              aria-label='Previous blog page'
              className='flex h-10 w-[96px] shrink-0 items-center justify-center rounded-lg border border-[#E6E6E6] bg-white text-sm font-medium text-[#140F28] transition-colors hover:border-[#B9A1EB] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF]'
              href={getBlogPageHref(currentPage - 1)}
              rel='prev'
            >
              Previous
            </Link>
          ) : (
            <span aria-disabled='true' className='flex h-10 w-[96px] shrink-0 items-center justify-center rounded-lg border border-[#E6E6E6] text-sm text-[#AAAAAA]'>
              Previous
            </span>
          )}

          <div className='flex items-center gap-2 max-sm:hidden'>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) =>
              page === currentPage ? (
                <span
                  aria-current='page'
                  className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#854CFF] bg-[rgba(133,76,255,0.1)] text-sm font-medium text-[#854CFF]'
                  key={page}
                >
                  {page}
                </span>
              ) : (
                <Link
                  aria-label={`Blog page ${page}`}
                  className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#E6E6E6] bg-white text-sm font-medium text-[#140F28] transition-colors hover:border-[#B9A1EB] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF]'
                  href={getBlogPageHref(page)}
                  key={page}
                >
                  {page}
                </Link>
              )
            )}
          </div>

          <span className='px-2 text-sm text-[#5A5A5A] sm:hidden'>
            {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              aria-label='Next blog page'
              className='flex h-10 w-[96px] shrink-0 items-center justify-center rounded-lg border border-[#E6E6E6] bg-white text-sm font-medium text-[#140F28] transition-colors hover:border-[#B9A1EB] hover:text-[#854CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF]'
              href={getBlogPageHref(currentPage + 1)}
              rel='next'
            >
              Next
            </Link>
          ) : (
            <span aria-disabled='true' className='flex h-10 w-[96px] shrink-0 items-center justify-center rounded-lg border border-[#E6E6E6] text-sm text-[#AAAAAA]'>
              Next
            </span>
          )}
        </nav>
      ) : null}
    </section>
  );
}

export default Articles;
