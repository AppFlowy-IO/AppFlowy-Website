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
      <span aria-hidden='true' className='template-hero__glow template-hero__glow--left'>
        <img src='/images/templates/hero/glow-purple.svg' alt='' width={2000} height={2000} />
      </span>
      <span aria-hidden='true' className='template-hero__glow template-hero__glow--right'>
        <img src='/images/templates/hero/glow-blue.svg' alt='' width={1800} height={1800} />
      </span>

      <div className='template-hero__inner'>
        <div className='template-hero__header'>
          <Link className='template-hero__back' href='/templates'>
            <span aria-hidden='true' className='template-hero__back-icon' />
            All templates
          </Link>
          <div className='template-hero__heading'>
            <h1>{template.name}</h1>
            <p className='template-hero__description'>{template.description}</p>
          </div>
          <div className='template-hero__content'>
            <div className='template-hero__copy'>
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
        </div>

        <div className='template-hero__preview'>
          <iframe loading='lazy' src={iframeUrl} title={`${template.name} template preview`} />
          <Link
            className='template-hero__open-preview'
            href={viewUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Open preview in a new tab'
          >
            <img src='/images/templates/icons/open-preview.svg' alt='' width={24} height={24} />
            Open preview
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TemplateSection;
