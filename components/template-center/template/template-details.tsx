import Article from '@/components/blog/article';
import Facebook from '@/components/icons/facebook';
import Instagram from '@/components/icons/instagram';
import LinkedInIcon from '@/components/icons/linked-in-icon';
import Tiktok from '@/components/icons/tiktok';
import Twitter from '@/components/icons/twitter';
import Website from '@/components/icons/website';
import Youtube from '@/components/icons/youtube';
import GetStart from '@/components/product/get-start';
import Share from '@/components/shared/share-group';
import { getTemplateLabel } from '@/components/template-center/template/template-content';
import RelatedTemplates from '@/components/template-center/template/related-templates';
import { slugify } from '@/components/template-center/utils';
import { Template } from '@/lib/interface';
import Link from 'next/link';
import Image from 'next/image';
import { CSSProperties, ReactNode } from 'react';

const categoryTagStyles: Record<string, CSSProperties & { '--tag-background': string; '--tag-hover-background': string }> = {
  'Project Management': { '--tag-background': '#EEFAFF', '--tag-hover-background': '#E9F5FA', color: '#285C86' },
  'Management': { '--tag-background': '#EEFAFF', '--tag-hover-background': '#E9F5FA', color: '#285C86' },
  'Human Resources': { '--tag-background': '#EEFAFF', '--tag-hover-background': '#E9F5FA', color: '#285C86' },
  'Team Meetings': { '--tag-background': '#EEFAFF', '--tag-hover-background': '#E9F5FA', color: '#285C86' },
  'Engineering': { '--tag-background': '#F1EDFA', '--tag-hover-background': '#ECE8F5', color: '#63518C' },
  'Product & Design': { '--tag-background': '#F1EDFA', '--tag-hover-background': '#ECE8F5', color: '#63518C' },
  'Startups': { '--tag-background': '#F1F2F4', '--tag-hover-background': '#ECEDEF', color: '#555D68' },
  'AI-powered': { '--tag-background': '#F1F2F4', '--tag-hover-background': '#ECEDEF', color: '#555D68' },
  'Education': { '--tag-background': '#FFFAE9', '--tag-hover-background': '#FAF5E4', color: '#7D641F' },
  'Marketing': { '--tag-background': '#FFF1E6', '--tag-hover-background': '#FAECE1', color: '#8C572D' },
  'Sales & CRM': { '--tag-background': '#FFF1E6', '--tag-hover-background': '#FAECE1', color: '#8C572D' },
  'Docs': { '--tag-background': '#E8F6F4', '--tag-hover-background': '#E3F1EF', color: '#286C68' },
  'Wiki': { '--tag-background': '#E8F6F4', '--tag-hover-background': '#E3F1EF', color: '#286C68' },
  'Database': { '--tag-background': '#E8F6F4', '--tag-hover-background': '#E3F1EF', color: '#286C68' },
  'Kanban': { '--tag-background': '#E8F6F4', '--tag-hover-background': '#E3F1EF', color: '#286C68' },
};

function TemplateDetails({ template, aboutContent }: { template: Template; aboutContent: string }) {
  const templateLabel = getTemplateLabel(template.name);

  return (
    <div className='template-details'>
      <section className='template-overview' aria-label={`About ${template.name}`}>
        <div className='template-details__inner template-overview__layout'>
          <div className='template-overview__article'>
            <Article content={aboutContent} />
          </div>

          <aside className='template-sidebar' aria-label='Template information'>
            <div className='template-sidebar__section'>
              <h2>Category</h2>
              <div className='template-sidebar__categories'>
                {template.categories.map((category) => (
                  <Link
                    href={`/templates/${slugify(category.name)}`}
                    key={category.id}
                    style={categoryTagStyles[category.name] ?? { '--tag-background': category.bg_color, '--tag-hover-background': category.bg_color, color: '#140F28' } as CSSProperties}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className='template-sidebar__section'>
              <h2>Share</h2>
              <Share
                compact
                content={`Check out the ${templateLabel} in AppFlowy.`}
                copyLinkIcon={
                  <span className='flex h-5 w-5 translate-y-[0.33px] items-center justify-center'>
                    <Image src='/images/blog/icons/copy-link.svg' alt='' width={16} height={16} />
                  </span>
                }
              />
            </div>

            {template.creator.account_links?.length ? (
              <div className='template-sidebar__section'>
                <h2>About the creator</h2>
                <div className='template-sidebar__creator-links'>
                  {template.creator.account_links.map((accountLink) => (
                    <Link
                      aria-label={`${template.creator.name} on ${accountLink.link_type}`}
                      href={accountLink.url}
                      key={`${accountLink.link_type}-${accountLink.url}`}
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      {accountLinkIcon(accountLink.link_type)}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {template.related_templates.length ? (
        <section className='template-related'>
          <div className='template-details__inner'>
            <RelatedTemplates templates={template.related_templates} />
          </div>
        </section>
      ) : null}

      <div className='template-get-started'>
        <GetStart />
      </div>
    </div>
  );
}

function accountLinkIcon(type: string): ReactNode {
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

export default TemplateDetails;
