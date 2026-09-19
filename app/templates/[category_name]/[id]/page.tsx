import Article from '@/components/blog/article';
import Facebook from '@/components/icons/facebook';
import Instagram from '@/components/icons/instagram';
import LinkedInIcon from '@/components/icons/linked-in-icon';
import Tiktok from '@/components/icons/tiktok';
import Twitter from '@/components/icons/twitter';
import Website from '@/components/icons/website';
import Youtube from '@/components/icons/youtube';
import Share from '@/components/shared/share-group';
import Community from '@/components/template-center/community';
import { CategoryIcon } from '@/components/template-center/icons';
import RelatedTemplates from '@/components/template-center/template/related-templates';
import TemplateSection from '@/components/template-center/template/template-section';
import { canonicalTemplatePath, slugify } from '@/components/template-center/utils';
import { parseAbout } from '@/lib/template-about';
import { getTemplateById } from '@/lib/templateAPI';
import Link from 'next/link';
import React from 'react';
import '@/styles/template.scss';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import OpenGraphImage from '../../../../public/images/og-image.png';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL!;

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

  // Many template names already end in "Template"; don't stutter.
  const title = /template/i.test(template.name) ? `${template.name} | AppFlowy` : `${template.name} Template | AppFlowy`;
  const description = template.description.slice(0, 160);

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
      type: 'article',
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

  return (
    <div className={'template-center'}>
      <TemplateSection template={data} categoryName={params.category_name} />
      <div
        className={
          'flex w-full flex-col items-center gap-[70px] bg-white  px-[170px] py-[110px] max-lg:gap-[10vh] max-lg:px-[8vw]  max-lg:py-[10vh]'
        }
      >
        <div className={'flex w-[1100px] min-w-0 max-w-full gap-[100px] max-md:flex-col max-md:gap-10 '}>
          <div className={'template-about'}>
            <div className={'title'}>About this template</div>
            <Article content={about.content} />
          </div>
          <div className={'template-extra'}>
            <div className={'categories'}>
              <div className={'title'}>Category</div>
              {data.categories.map((category) => (
                <Link
                  href={`/templates/${slugify(category.name)}`}
                  style={{
                    backgroundColor: category.bg_color,
                  }}
                  key={category.id}
                  className={'category'}
                >
                  <span>
                    <CategoryIcon icon={category.icon} />
                  </span>
                  {category.name}
                </Link>
              ))}
            </div>
            <div className={'flex flex-col'}>
              <div className={'title'}>Share</div>
              <Share content={'Check out this template!'} />
            </div>
            <div className={'flex flex-col'}>
              <div className={'title'}>About the creator</div>
              <div className={'creator'}>
                {data.creator.account_links?.map((link) => (
                  <Link href={link.url} key={link.link_type}>
                    <button>{accountLinkIcon(link.link_type)}</button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <RelatedTemplates templates={data.related_templates} />
      </div>
      <Community />
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

function accountLinkIcon(type: string) {
  switch (type) {
    case 'youtube':
      return <Youtube />;
    case 'twitter':
      return <Twitter />;
    case 'tiktok':
      return <Tiktok />;
    case 'facebook':
      return <Facebook />;
    case 'instagram':
      return <Instagram />;
    case 'linkedin':
      return <LinkedInIcon />;
    default:
      return <Website />;
  }
}
