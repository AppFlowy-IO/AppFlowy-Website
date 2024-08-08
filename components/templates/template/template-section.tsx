'use client';

import TemplateCenterButton from '@/components/templates/template-center-button';
import { Template } from '@/lib/interface';
import Link from 'next/link';
import React, { useMemo } from 'react';

function TemplateSection({ template, categoryId }: { template: Template; categoryId?: string }) {
  const category = useMemo(() => {
    return categoryId ? template.categories.find((category) => category.id === categoryId) : template.categories[0];
  }, [template, categoryId]);

  const useTemplateURL = useMemo(() => {
    const url = new URL(template.view_url);
    url.searchParams.append('action', 'duplicate');
    return url.toString();
  }, [template]);

  const iframeUrl = useMemo(() => {
    const url = new URL(template.view_url);
    url.searchParams.set('theme', 'light');
    url.searchParams.set('embed', 'true');
    return url.toString();
  }, [template.view_url]);

  return (
    <div
      className={'template-section'}
      style={{
        backgroundColor: category?.bg_color,
      }}
    >
      <div className={'template-section-main'}>
        <TemplateCenterButton />
        <div className={'template-section-main-header'}>
          <div className={'flex flex-col gap-6'}>
            <div className={'template-section-main-header-title'}>
              {template.name}
              <div className={'template-section-main-header-desc mt-4'}>{template.desc}</div>
            </div>
            <div className={'template-section-main-header-creator'}>
              <div className={'avatar'}>
                <img src={template.creator.avatar} alt={template.creator.name} />
              </div>
              <div className={'right-info'}>
                <div className={'creator-name'}>{template.creator.name}</div>
                <div className={'template-count'}>{template.creator.upload_template_count || 0} templates</div>
              </div>
            </div>
          </div>
          <div className={'template-section-main-header-actions'}>
            <Link href={useTemplateURL} target={'_blank'}>
              <button className={'download-btn px-9 py-4 text-base font-medium'}>Use this template</button>
            </Link>
            <Link href={template.view_url} target={'_blank'}>
              <button className={'live-demo-btn px-9 py-4 text-base font-medium'}>Preview</button>
            </Link>
          </div>
        </div>
        <div className={'template-preview'}>
          <iframe src={iframeUrl} />
        </div>
      </div>
    </div>
  );
}

export default TemplateSection;
