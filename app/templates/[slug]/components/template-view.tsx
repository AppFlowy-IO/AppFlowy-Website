import SeoData from '@/components/layout/seo-data';
import { getTemplateLabel } from '@/components/template-center/template/template-content';
import { getUseTemplateUrl } from '@/components/template-center/template/template-links';
import TemplateDetails from '@/components/template-center/template/template-details';
import TemplateSection from '@/components/template-center/template/template-section';
import { TemplateSlugProvider } from '@/components/template-center/template-slug-context';
import { canonicalTemplateCategory, canonicalTemplatePath, categorySlug } from '@/components/template-center/utils';
import { Template } from '@/lib/interface';
import { generateBreadcrumbSchema } from '@/lib/schema';
import { parseAbout } from '@/lib/template-about';
import { Metadata } from 'next';
import React from 'react';
import OpenGraphImage from '../../../../public/images/og-image.png';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://appflowy.com';

export function templateMetadata(template: Template, slug: string): Metadata {
  const templateLabel = getTemplateLabel(template.name);
  const title = `Free ${templateLabel} | AppFlowy`;
  const description = `Use the free ${templateLabel} in AppFlowy. ${template.description}`.slice(0, 160);
  // One template, one URL: the canonical is the page's own slug, so there are no
  // per-category copies left to consolidate.
  const canonicalUrl = `${site_url}${canonicalTemplatePath(slug)}`;

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
          alt: template.name,
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
    creator: template.creator.name,
    keywords: template.categories.map((category) => `${category.name} template`),
  };
}

function TemplateView({
  template,
  slug,
  templateSlugs,
}: {
  template: Template;
  slug: string;
  templateSlugs: Record<string, string>;
}) {
  const about = parseAbout(template.about);

  return (
    <div className={'template-center'}>
      <SeoData id='template-ld-json' data={generateTemplateSchema(template, slug)} />
      <TemplateSlugProvider slugs={templateSlugs}>
        <TemplateSection template={template} />
        <TemplateDetails template={template} aboutContent={about.content} />
      </TemplateSlugProvider>
    </div>
  );
}

export default TemplateView;

function generateTemplateSchema(template: Template, slug: string) {
  const canonicalPath = canonicalTemplatePath(slug);
  const canonicalUrl = `${site_url}${canonicalPath}`;
  // The URL is flat, but the breadcrumb still places the template under a category —
  // a BreadcrumbList describes the site's hierarchy, not the URL's nesting.
  const breadcrumbCategory = canonicalTemplateCategory(template.categories, template.primary_category_id);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: template.name,
        description: template.description,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        inLanguage: 'en',
        isAccessibleForFree: true,
        ...(template.publish_info?.publish_timestamp ? { datePublished: template.publish_info.publish_timestamp } : {}),
        image: `${site_url}${OpenGraphImage.src}`,
        creator: {
          '@type': template.creator.name === 'AppFlowy' ? 'Organization' : 'Person',
          name: template.creator.name,
        },
        keywords: template.categories.map((category) => category.name).join(', '),
        potentialAction: {
          '@type': 'UseAction',
          name: 'Use in AppFlowy',
          target: getUseTemplateUrl(template),
        },
      },
      generateBreadcrumbSchema([
        { name: 'Templates', path: '/templates' },
        ...(breadcrumbCategory
          ? [
              {
                name: `${breadcrumbCategory.name} templates`,
                path: `/templates/${categorySlug(breadcrumbCategory.name)}`,
              },
            ]
          : []),
        { name: template.name, path: canonicalPath as string },
      ]),
    ],
  };
}
