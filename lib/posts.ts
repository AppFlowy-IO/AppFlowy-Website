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

const postsDirectory = path.join(process.cwd(), '_blog');

export function getAllPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames

    .map(getPostByFilename)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
    .filter((item) => !item.unpublished);
}

export async function getPostData(slug: string): Promise<PostData> {
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((name) => name.includes(slug))!;

  if(!fileName) {
    throw new Error('Post not found');
  }

  return getPostByFilename(fileName);
}

export async function getRelatedPosts(post: PostData): Promise<PostData[]> {
  const relatedPosts = post.related_posts || [];

  const posts = await Promise.all(relatedPosts.map((slug) => getPostData(slug)));

  return posts.filter((item) => !item.unpublished);
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
