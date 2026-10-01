import CreatorAvatar from '@/components/template-center/creator-avatar';
import {
  getTemplateIframeUrl,
  getTemplateViewUrl,
  getUseTemplateUrl,
} from '@/components/template-center/template/template-links';
import TemplateUseLink from '@/components/template-center/template/template-use-link';
import { Template } from '@/lib/interface';
import Link from 'next/link';
import React from 'react';

function TemplateSection({ template }: { template: Template }) {
  const viewUrl = getTemplateViewUrl(template);
  const useTemplateUrl = getUseTemplateUrl(template);
  const iframeUrl = getTemplateIframeUrl(template);

  return (
    <section className='template-hero'>
      <span aria-hidden='true' className='template-hero__glow template-hero__glow--left' />
      <span aria-hidden='true' className='template-hero__glow template-hero__glow--right' />

      <div className='template-hero__inner'>
        <div className='template-hero__content'>
          <div className='template-hero__copy'>
            <h1>{template.name}</h1>
            <p className='template-hero__description'>{template.description}</p>

            <div className='template-hero__creator'>
              <CreatorAvatar src={template.creator.avatar_url} name={template.creator.name} />
              <div>
                <strong>{template.name}</strong>
                <span>by {template.creator.name}</span>
              </div>
            </div>
          </div>

          <div className='template-hero__actions' aria-label='Template actions'>
            <Link className='template-hero__secondary-action' href={viewUrl} rel='noopener noreferrer' target='_blank'>
              Preview
            </Link>
            <TemplateUseLink
              className='template-hero__primary-action'
              href={useTemplateUrl}
              placement='hero'
              templateId={template.view_id}
              templateName={template.name}
            >
              Use this template
            </TemplateUseLink>
          </div>
        </div>

        <div className='template-hero__preview'>
          <iframe loading='lazy' src={iframeUrl} title={`${template.name} template preview`} />
          <span aria-hidden='true' />
        </div>
      </div>
    </section>
  );
}

export default TemplateSection;
