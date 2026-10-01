import BlogIndexPage, {
  createBlogIndexMetadata,
  getBlogIndexData,
  getBlogTotalPages,
} from '@/components/blog/blog-index-page';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { page: string };
}

export const dynamicParams = false;

function parsePage(value: string) {
  const page = Number(value);

  return Number.isInteger(page) ? page : 0;
}

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, getBlogTotalPages() - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const currentPage = parsePage(params.page);
  const { totalPages } = getBlogIndexData(Math.max(currentPage, 1));

  if (currentPage < 2 || currentPage > totalPages) return {};

  return createBlogIndexMetadata(currentPage);
}

export default function PaginatedBlog({ params }: Props) {
  const currentPage = parsePage(params.page);
  const { totalPages } = getBlogIndexData(Math.max(currentPage, 1));

  if (currentPage < 2 || currentPage > totalPages) notFound();

  return <BlogIndexPage currentPage={currentPage} />;
}
