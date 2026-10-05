import { getTopicsForTemplateCategory } from '@/lib/blog-topics';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface CategoryGuidesProps {
  categorySlugs: string[];
  className?: string;
  description?: string;
  title?: string;
}

function CategoryGuides({
  categorySlugs,
  className,
  description = 'Connect these templates with practical AppFlowy guidance, comparisons, and implementation ideas.',
  title = 'Learn how to build this workflow',
}: CategoryGuidesProps) {
  const topics = [
    ...new Map(
      categorySlugs.flatMap(getTopicsForTemplateCategory).map((topic) => [topic.slug, topic] as const)
    ).values(),
  ];

  if (!topics.length) return null;

  return (
    <aside
      className={cn('mb-24 rounded-2xl border border-[#E5E5EA] bg-[#F8F8FC] p-6 sm:p-8', className)}
      aria-labelledby='template-guides-title'
    >
      <p className='mb-2 text-sm font-medium uppercase tracking-[0.08em] text-primary'>Guides and examples</p>
      <h2 id='template-guides-title' className='mb-3 text-2xl font-semibold text-[#101012]'>
        {title}
      </h2>
      <p className='mb-5 max-w-3xl text-base leading-7 text-[#5D606B]'>{description}</p>
      <div className='flex flex-wrap gap-3'>
        {topics.map((topic) => (
          <Link
            className='border-primary/20 rounded-full border bg-white px-4 py-2 text-sm font-medium text-primary hover:border-primary hover:bg-[#FAF7FF]'
            href={`/blog/${topic.slug}`}
            key={topic.slug}
          >
            Explore {topic.name.toLowerCase()} guides and examples
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default CategoryGuides;
