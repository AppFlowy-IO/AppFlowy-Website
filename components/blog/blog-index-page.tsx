import Articles from '@/components/blog/articles';
import FeaturedPost from '@/components/blog/featured-post';
import SeoData from '@/components/layout/seo-data';
import { BLOG_PAGE_SIZE } from '@/lib/blog-pagination';
import { BLOG_TOPICS } from '@/lib/blog-topics';
import { getAllPostsMetadata, PostMetadata } from '@/lib/posts';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { Metadata } from 'next';
import OpenGraphImage from '../../public/images/og-image.png';

const siteUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://appflowy.com';
const blogName = 'AppFlowy Blog | In the Flow';
const blogDescription =
  'Explore AppFlowy product updates, engineering stories, practical guides, comparisons, templates, self-hosting, private AI, and open-source insights.';

function absoluteUrl(value: string | undefined) {
  if (!value) return `${siteUrl}${OpenGraphImage.src}`;

  return value.startsWith('http://') || value.startsWith('https://') ? value : `${siteUrl}${value}`;
}

function getFeaturedPost(posts: PostMetadata[]) {
  return posts.filter((post) => post.pinned > 0).sort((first, second) => first.pinned - second.pinned)[0] || posts[0];
}

export function getBlogIndexData(currentPage: number) {
  const posts = getAllPostsMetadata();
  const featuredPost = getFeaturedPost(posts);
  const articlePosts = featuredPost ? posts.filter((post) => post.slug !== featuredPost.slug) : posts;
  const totalPages = Math.max(1, Math.ceil(articlePosts.length / BLOG_PAGE_SIZE));
  const startIndex = (currentPage - 1) * BLOG_PAGE_SIZE;
  const pagePosts = articlePosts.slice(startIndex, startIndex + BLOG_PAGE_SIZE);

  return { posts, featuredPost, articlePosts, pagePosts, totalPages };
}

export function getBlogTotalPages() {
  return getBlogIndexData(1).totalPages;
}

export function createBlogIndexMetadata(currentPage: number): Metadata {
  const posts = getAllPostsMetadata();
  const categories = [...new Set(posts.flatMap((post) => post.categories || []))];
  const authors = [...new Set(posts.map((post) => post.author).filter(Boolean))];
  const keywords = [...new Set(posts.flatMap((post) => post.tags || []))].slice(0, 20);
  const pagePath = currentPage === 1 ? '/blog' : `/blog/page/${currentPage}`;
  const canonicalUrl = `${siteUrl}${pagePath}`;
  const title = currentPage === 1 ? blogName : `AppFlowy Blog | Page ${currentPage} | In the Flow`;

  return {
    title,
    description: blogDescription,
    openGraph: {
      title,
      description: blogDescription,
      url: canonicalUrl,
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
    twitter: {
      card: 'summary_large_image',
      title,
      description: blogDescription,
      images: [OpenGraphImage.src],
    },
    category: categories.join(', '),
    creator: authors.join(', '),
    alternates: {
      canonical: canonicalUrl,
      ...(currentPage === 1
        ? {
            types: {
              'application/rss+xml': `${siteUrl}/blog/feed.xml`,
            },
          }
        : {}),
    },
    keywords,
  };
}

function generateListSchema(currentPage: number, posts: PostMetadata[], visiblePosts: PostMetadata[]) {
  const pagePath = currentPage === 1 ? '/blog' : `/blog/page/${currentPage}`;
  const pageUrl = `${siteUrl}${pagePath}`;
  const modifiedDates = posts
    .map((post) => new Date(post.last_modified || post.date))
    .filter((date) => !Number.isNaN(date.getTime()));
  const dateModified = modifiedDates.length
    ? new Date(Math.max(...modifiedDates.map((date) => date.getTime()))).toISOString()
    : undefined;
  const blogSchema = {
    '@type': 'Blog',
    '@id': `${siteUrl}/blog#blog`,
    url: `${siteUrl}/blog`,
    name: blogName,
    description: blogDescription,
    dateModified,
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
    hasPart: BLOG_TOPICS.map((topic) => ({
      '@type': 'CollectionPage',
      name: topic.title,
      url: `${siteUrl}/blog/${topic.slug}`,
    })),
  };
  const itemListSchema = {
    '@type': 'ItemList',
    '@id': `${pageUrl}#articles`,
    mainEntityOfPage: {
      '@type': 'CollectionPage',
      '@id': pageUrl,
    },
    name: currentPage === 1 ? blogName : `${blogName}, page ${currentPage}`,
    description: 'Explore AppFlowy product updates, engineering stories, guides, comparisons, and templates.',
    numberOfItems: visiblePosts.length,
    itemListElement: visiblePosts.map((post, index) => ({
      '@type': 'ListItem',
      position: (currentPage === 1 ? 0 : 1 + (currentPage - 1) * BLOG_PAGE_SIZE) + index + 1,
      item: {
        '@type': 'BlogPosting',
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.title,
        headline: post.title,
        description: post.seo_description || post.description,
        image: absoluteUrl(post.cover_image),
        datePublished: post.date,
        dateModified: post.last_modified || post.date,
        author: {
          '@type': ['appflowy', 'appflowy team', 'the appflowy team'].includes(post.author.toLowerCase())
            ? 'Organization'
            : 'Person',
          name: post.author,
          url: post.author.toLowerCase().includes('appflowy') ? siteUrl : post.author_url || siteUrl,
        },
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [blogSchema, itemListSchema, generateBreadcrumbSchema([{ name: 'Blog', path: '/blog' }])],
  };
}

export default function BlogIndexPage({ currentPage }: { currentPage: number }) {
  const { posts, featuredPost, articlePosts, pagePosts, totalPages } = getBlogIndexData(currentPage);
  const visiblePosts = currentPage === 1 && featuredPost ? [featuredPost, ...pagePosts] : pagePosts;
  const listSchema = generateListSchema(currentPage, posts, visiblePosts);

  return (
    <>
      <SeoData id={`blog-page-${currentPage}-ld-json`} data={listSchema} />
      <div className='bg-white'>
        <header className='mx-auto flex w-full max-w-[1160px] flex-col gap-3 px-6 pb-20 pt-[148px] max-sm:pb-12 max-sm:pt-[112px] xl:px-0'>
          <div className='flex items-start gap-1 whitespace-nowrap'>
            <h1 className='text-[56px] font-bold leading-[68px] text-[#140F28] max-sm:text-[40px] max-sm:leading-[48px]'>
              In the Flow
            </h1>
            <span className='text-[20px] font-normal leading-7 text-[#AAAAAA] max-sm:text-base max-sm:leading-6'>
              Blog
            </span>
          </div>
          <p className='text-[20px] font-medium leading-7 text-[#5A5A5A] max-sm:text-base max-sm:leading-6'>
            {blogDescription}
          </p>
          {currentPage > 1 ? <p className='text-sm font-medium text-[#854CFF]'>Page {currentPage}</p> : null}
        </header>

        {currentPage === 1 && featuredPost ? <FeaturedPost post={featuredPost} /> : null}
        <Articles posts={articlePosts} pagePosts={pagePosts} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
}
