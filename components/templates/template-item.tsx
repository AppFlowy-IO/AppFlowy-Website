import { Template, TemplateCategory } from '@/lib/interface';
import React, { useMemo } from 'react';

function TemplateItem({ template, category }: { template: Template; category?: TemplateCategory }) {
  const iframeUrl = useMemo(() => {
    const url = new URL(template.view_url);
    url.searchParams.set('theme', 'light');
    url.searchParams.set('embed', 'true');
    url.searchParams.set('thumb', 'true');
    return url.toString();
  }, [template.view_url]);

  return (
    <>
      <div
        className={'template-preview'}
        style={{
          backgroundColor: category?.bg_color,
        }}
      >
        <iframe loading={'lazy'} src={iframeUrl} />
      </div>
      <div className={'template-info'}>
        <div className={'template-creator'}>
          <div className={'avatar'}>
            <img className={'h-full w-full object-cover'} src={template.creator.avatar} alt={''} />
          </div>
          <div className={'right-info'}>
            <div className={'template-name'}>{template.name}</div>
            <div className={'creator-name'}>by {template.creator.name}</div>
          </div>
        </div>
        <div className={'template-desc'}>{template.desc}</div>
      </div>
    </>
  );
}

export default TemplateItem;
