import { generateReadingTime } from '@/lib/utils';
import fs from 'fs';

import path from 'path';
import matter from 'gray-matter';
import { toc } from 'mdast-util-toc';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';

const processor = unified().use(remarkParse);

export interface PostData {
  slug: string;
  pinned: number;
  title: string;
  description: string;
  author: string;
  author_title: string;
  author_url: string;
  author_image_url: string;
  categories: string[];
  tags: string[];
  date: string;
  content: string;
  video_url?: string;
  og_image?: string;
  thumb_image?: string;
  reading_time?: number;
  last_modified: string;
  featured?: boolean;
  toc?: string;
  comments?: boolean;
  canonical_url?: string;
  series?: string;
  cover_image?: string;
  related_posts?: string[];
  word_count?: number;
  unpublished?: boolean;
}

// Metadata-only type (excludes heavy fields)
export type PostMetadata = Omit<PostData, 'content' | 'toc' | 'word_count' | 'reading_time'>;

const postsDirectory = path.join(process.cwd(), '_blog');

let cachedPosts: PostData[] | null = null;
let cachedMetadata: PostMetadata[] | null = null;
const postCache = new Map<string, PostData>();
const filenameLookup = new Map<string, string>();
const legacyFilenameLookup = new Map<string, string>();
let currentSignature: string | null = null;

const getSlugFromFilename = (fileName: string) => {
  const [, , , ...rest] = fileName.replace(/\.mdx$/, '').split('-');
  return rest.join('-');
};

const isMdxFile = (fileName: string) => fileName.endsWith('.mdx');

function ensureCacheFresh(): string[] {
  const fileNames = fs.readdirSync(postsDirectory).filter(isMdxFile).sort();

  const signature = fileNames
    .map((fileName) => {
      const { mtimeMs, size } = fs.statSync(path.join(postsDirectory, fileName));
      return `${fileName}:${mtimeMs}:${size}`;
    })
    .join('|');

  if (signature !== currentSignature) {
    cachedPosts = null;
    cachedMetadata = null;
    postCache.clear();
    filenameLookup.clear();

    fileNames.forEach((fileName) => {
      const slug = getSlugFromFilename(fileName);
      const baseName = fileName.replace(/\.mdx$/, '');

      if (slug) {
        filenameLookup.set(slug, fileName);
      }

      // legacy: related_posts may reference the date-prefixed filename
      legacyFilenameLookup.set(baseName, fileName);
    });

    currentSignature = signature;
  }

  return fileNames;
}

/**
 * Get all blog posts with full content.
 * Results are cached and invalidated when the underlying MDX files change.
 */
export function getAllPosts(): PostData[] {
  const fileNames = ensureCacheFresh();

  if (cachedPosts) {
    return cachedPosts;
  }

  cachedPosts = fileNames
    .map(getPostByFilename)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
    .filter((item) => !item.unpublished);

  return cachedPosts;
}

/**
 * Get all blog posts metadata only (fast operation)
 * Skips content parsing, TOC generation, word counting, etc.
 * Use this for listing pages where you don't need full content
 */
export function getAllPostsMetadata(): PostMetadata[] {
  const fileNames = ensureCacheFresh();

  if (cachedMetadata) {
    return cachedMetadata;
  }

  cachedMetadata = fileNames
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const slug = getSlugFromFilename(fileName);

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents); // Only parse frontmatter, skip content!

      return {
        slug,
        unpublished: data.unpublished || false,
        pinned: data.pinned || 0,
        title: data.title,
        description: data.description,
        author: data.author,
        author_title: data.author_title,
        author_url: data.author_url,
        author_image_url: data.author_image_url,
        categories: data.categories || [],
        tags: data.tags || [],
        date: data.date,
        video_url: data.video_url,
        og_image: data.image,
        thumb_image: data.thumb,
        last_modified: data.last_modified || data.date,
        featured: data.featured || false,
        comments: data.comments !== undefined ? data.comments : true,
        canonical_url: data.canonical_url,
        series: data.series,
        cover_image: data.image,
        related_posts: data.related,
      };
    })
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
    .filter((item) => !item.unpublished);

  return cachedMetadata;
}

/**
 * Get a single blog post by slug.
 * Returns a cached post when available; caches are reset if any MDX file
 * changes to keep content fresh.
 */
export async function getPostData(slug: string): Promise<PostData> {
  ensureCacheFresh();

  const fileName = filenameLookup.get(slug) ?? legacyFilenameLookup.get(slug);

  if (!fileName) {
    console.error(`[getPostData] Post not found for slug: "${slug}"`);
    console.error(`[getPostData] Posts directory: ${postsDirectory}`);
    console.error(`[getPostData] Available slugs: ${Array.from(filenameLookup.keys()).slice(0, 10).join(', ')}`);
    throw new Error('Post not found');
  }

  if (postCache.has(slug)) {
    return postCache.get(slug)!;
  }

  const post = getPostByFilename(fileName);
  postCache.set(slug, post);

  return post;
}

export async function getRelatedPosts(post: PostData): Promise<PostData[]> {
  const relatedPosts = post.related_posts || [];

  const posts = await Promise.all(
    relatedPosts.map(async (slug) => {
      try {
        return await getPostData(slug);
      } catch (error) {
        console.error(`[getRelatedPosts] Failed to load related post with slug: "${slug}" for post: "${post.slug}"`);
        console.error(`[getRelatedPosts] Error:`, error);
        return null;
      }
    })
  );

  return posts.filter((item) => item !== null && !item.unpublished) as PostData[];
}

export function getPostByFilename(fileName: string): PostData {
  const fullPath = path.join(postsDirectory, fileName);
  const [, , , ...rest] = fileName.replace(/\.mdx$/, '').split('-');

  const slug = rest.join('-');

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const tree = processor.parse(content);

  const tocResult = toc(tree, {
    maxDepth: data.toc_depth ? data.toc_depth : 2,
  }).map;

  return {
    slug,
    unpublished: data.unpublished || false,
    pinned: data.pinned || 0,
    title: data.title,
    description: data.description,
    author: data.author,
    author_title: data.author_title,
    author_url: data.author_url,
    author_image_url: data.author_image_url,
    categories: data.categories || [],
    tags: data.tags || [],
    date: data.date,
    content,
    word_count: content.split(/\s+/gu).length,

    // New fields
    video_url: data.video_url,
    og_image: data.image,
    thumb_image: data.thumb,
    reading_time: generateReadingTime(content),
    last_modified: data.last_modified || data.date,
    featured: data.featured || false,

    toc: tocResult
      ? unified()
        .use(remarkStringify)
        // eslint-disable-next-line
        .stringify(tocResult as any).replaceAll('**', '')
      : '',
    comments: data.comments !== undefined ? data.comments : true,
    canonical_url: data.canonical_url,
    series: data.series,
    cover_image: data.image,
    related_posts: data.related,
  };
}

export function clearPostsCache() {
  cachedPosts = null;
  cachedMetadata = null;
  postCache.clear();
  filenameLookup.clear();
  legacyFilenameLookup.clear();
  currentSignature = null;
}
