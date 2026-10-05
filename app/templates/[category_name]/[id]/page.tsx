import SeoData from '@/components/layout/seo-data';
import TemplateDetails from '@/components/template-center/template/template-details';
import { getTemplateLabel } from '@/components/template-center/template/template-content';
import { getUseTemplateUrl } from '@/components/template-center/template/template-links';
import TemplateSection from '@/components/template-center/template/template-section';
import { canonicalTemplatePath, slugify } from '@/components/template-center/utils';
import { parseAbout } from '@/lib/template-about';
import { getTemplateById } from '@/lib/templateAPI';
import { generateBreadcrumbSchema } from '@/lib/schema';
import React from 'react';
import '@/styles/template.scss';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import OpenGraphImage from '../../../../public/images/og-image.png';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://appflowy.com';

interface Props {
  params: { id: string; category_name: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let template;

  try {
    template = await getData(params.id);
  } catch (error) {
    // The page itself renders notFound() for this id; without per-page metadata
    // it would inherit the root canonical, so return nothing rather than
    // pointing a missing template at the homepage.
    return {};
  }

  const templateLabel = getTemplateLabel(template.name);
  const title = `Free ${templateLabel} | AppFlowy`;
  const description = `Use the free ${templateLabel} in AppFlowy. ${template.description}`.slice(0, 160);

  // Canonicalize to a single category path so the copies of this template under
  // its other categories consolidate instead of competing.
  const canonicalPath =
    canonicalTemplatePath(template.categories, params.id) ?? `/templates/${params.category_name}/${params.id}`;
  const canonicalUrl = `${site_url}${canonicalPath}`;

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

async function Page({ params }: { params: { id: string; category_name: string } }) {
  const id = params.id;

  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
    return null;
  }

  let data = null;

  try {
    data = await getData(id);
  } catch (error) {
    console.error(error);
    notFound();
  }

  const about = parseAbout(data.about);
  const canonicalPath =
    canonicalTemplatePath(data.categories, params.id) ?? `/templates/${params.category_name}/${params.id}`;
  const canonicalUrl = `${site_url}${canonicalPath}`;

  return (
    <div className={'template-center'}>
      <SeoData id='template-ld-json' data={generateTemplateSchema(data, canonicalUrl)} />
      <TemplateSection template={data} />
      <TemplateDetails template={data} aboutContent={about.content} />
    </div>
  );
}

export const revalidate = 10;

export default Page;

async function getData(id: string) {
  const data = await getTemplateById(id);

  if (!data) throw new Error(`Template not found ${id}`);
  return data;
}

function generateTemplateSchema(template: Awaited<ReturnType<typeof getData>>, canonicalUrl: string) {
  const canonicalCategory = [...template.categories].sort((a, b) => a.name.localeCompare(b.name))[0];
  const canonicalPath = new URL(canonicalUrl).pathname;

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
        ...(canonicalCategory
          ? [
              {
                name: `${canonicalCategory.name} templates`,
                path: `/templates/${slugify(canonicalCategory.name)}`,
              },
            ]
          : []),
        { name: template.name, path: canonicalPath },
      ]),
    ],
  };
}
