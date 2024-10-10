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
import { slugify } from '@/components/template-center/utils';
import { getTemplateById } from '@/lib/templateAPI';
import Link from 'next/link';
import React from 'react';
import '@/styles/template.scss';
import { notFound } from 'next/navigation';

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
            <div className={'w-full overflow-hidden whitespace-pre-wrap break-words leading-[26px]'}>{data.about}</div>
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
              <Share />
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
