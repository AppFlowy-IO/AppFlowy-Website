import CreatorAvatar from '@/components/template-center/creator-avatar';
import { slugify } from '@/components/template-center/utils';
import { TemplateSummary, TemplateCategory } from '@/lib/interface';
import Link from 'next/link';
import React, { useMemo } from 'react';

function TemplateItem({ template, category }: { template: TemplateSummary; category: TemplateCategory }) {
  const iframeUrl = useMemo(() => {
    const url = new URL(template.view_url);
    const origin = url.origin;

    const newURL = new URL(origin);
    const publishInfo = template.publish_info;

    if (!publishInfo) {
      url.searchParams.set('theme', 'light');
      url.searchParams.set('template', 'true');
      url.searchParams.set('thumbnail', 'true');
      return url.toString();
    }

    newURL.pathname = `/${publishInfo.namespace}/${publishInfo.publish_name}`;

    newURL.searchParams.set('theme', 'light');
    newURL.searchParams.set('template', 'true');
    newURL.searchParams.set('thumbnail', 'true');
    return newURL.toString();
  }, [template.publish_info, template.view_url]);

  return (
    <>
      <Link
        href={`/templates/${slugify(category.name)}/${template.view_id}`}
        className={'template-preview relative overflow-hidden'}
        style={{
          backgroundColor: category?.bg_color,
        }}
      >
        <iframe loading={'lazy'} src={iframeUrl} />

        <div className={'iframe-shadow'} />
      </Link>
      <div className={'template-info'}>
        <div className={'template-creator'}>
          <CreatorAvatar src={template.creator.avatar_url} name={template.creator.name} />
          <div className={'right-info'}>
            <div className={'template-name'}>{template.name}</div>
            <div className={'creator-name'}>by {template.creator.name}</div>
          </div>
        </div>

        <div className={'template-desc'}>{template.description}</div>
      </div>
    </>
  );
}

export default TemplateItem;
