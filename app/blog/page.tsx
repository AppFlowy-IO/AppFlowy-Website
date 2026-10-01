import BlogIndexPage, { createBlogIndexMetadata } from '@/components/blog/blog-index-page';

export const metadata = createBlogIndexMetadata(1);

export default function Blog() {
  return <BlogIndexPage currentPage={1} />;
}
