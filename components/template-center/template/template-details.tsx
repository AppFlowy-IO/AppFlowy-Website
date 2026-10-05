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
import { CategoryIcon } from '@/components/template-center/icons';
import { getTemplateLabel } from '@/components/template-center/template/template-content';
import RelatedTemplates from '@/components/template-center/template/related-templates';
import { slugify } from '@/components/template-center/utils';
import { Template } from '@/lib/interface';
import Link from 'next/link';
import { ReactNode } from 'react';

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
                    style={{ backgroundColor: category.bg_color }}
                  >
                    <CategoryIcon icon={category.icon} />
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className='template-sidebar__section'>
              <h2>Share</h2>
              <Share compact content={`Check out the ${templateLabel} in AppFlowy.`} />
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
