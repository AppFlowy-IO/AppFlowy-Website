import SeoData from '@/components/layout/seo-data';
import TemplateHome from '@/components/template-center/template-home';
import { TemplateSlugProvider } from '@/components/template-center/template-slug-context';
import { TemplatesProvider } from '@/components/template-center/templates-context';
import { slugify } from '@/components/template-center/utils';
import { TemplateCategory, TemplateSummary } from '@/lib/interface';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { Metadata } from 'next';
import React from 'react';
import OpenGraphImage from '../../../../public/images/og-image.png';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://appflowy.com';

export function categoryMetadata(category: TemplateCategory): Metadata {
  const title = `${category.name} Templates | AppFlowy`;
  const description = category.description.trim().slice(0, 160);
  const canonicalUrl = `${site_url}/templates/${slugify(category.name)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'AppFlowy',
      images: [
        {
          url: OpenGraphImage.src,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OpenGraphImage.src],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [`${category.name} templates`, 'AppFlowy templates', 'notion alternative templates'],
  };
}

function CategoryView({
  category,
  categories,
  templates,
  templateSlugs,
}: {
  category: TemplateCategory;
  categories: TemplateCategory[];
  templates: TemplateSummary[];
  templateSlugs: Record<string, string>;
}) {
  const categoryPath = `/templates/${slugify(category.name)}`;

  return (
    <div className='template-center template-home'>
      <SeoData
        id={`template-category-${slugify(category.name)}-ld-json`}
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name: `${category.name} templates`,
              description: category.description,
              url: `${site_url}${categoryPath}`,
            },
            generateBreadcrumbSchema([
              { name: 'Templates', path: '/templates' },
              { name: `${category.name} templates`, path: categoryPath },
            ]),
          ],
        }}
      />
      <TemplateSlugProvider slugs={templateSlugs}>
        <TemplatesProvider
          key={category.id}
          selectedCategoryId={category.id}
          categoryTemplates={templates}
          categories={categories}
        >
          <TemplateHome />
        </TemplatesProvider>
      </TemplateSlugProvider>
    </div>
  );
}

export default CategoryView;
