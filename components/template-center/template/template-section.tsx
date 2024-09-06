'use client';

import CreatorAvatar from '@/components/template-center/creator-avatar';
import TemplateCenterButton from '@/components/template-center/template-center-button';
import { slugify } from '@/components/template-center/utils';
import { Template } from '@/lib/interface';
import Link from 'next/link';
import React, { useMemo } from 'react';

function TemplateSection({ template, categoryName }: { template: Template; categoryName?: string }) {
  const category = useMemo(() => {
    return categoryName
      ? template.categories.find((category) => slugify(category.name) === categoryName)
      : template.categories[0];
  }, [template, categoryName]);

  const useTemplateURL = useMemo(() => {
    const url = new URL(template.view_url);

    url.searchParams.append('action', 'duplicate');
    return url.toString();
  }, [template]);

  const iframeUrl = useMemo(() => {
    const url = new URL(template.view_url);

    url.searchParams.delete('v');
    url.searchParams.set('theme', 'light');
    url.searchParams.set('template', 'true');
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
          <div className={'flex flex-1 flex-col gap-6'}>
            <div className={'template-section-main-header-title'}>
              {template.name}
              <div className={'template-section-main-header-desc mt-4'}>{template.description}</div>
            </div>
            <div className={'template-section-main-header-creator'}>
              <CreatorAvatar src={template.creator.avatar_url} name={template.creator.name} />
              <div className={'right-info'}>
                <div className={'creator-name'}>{template.creator.name}</div>
                <div className={'template-count'}>{template.creator.number_of_templates || 0} templates</div>
              </div>
            </div>
          </div>
          <div className={'template-section-main-header-actions'}>
            <Link href={template.view_url} target={'_blank'}>
              <button className={'live-demo-btn px-9 py-4 text-base font-medium'}>Preview</button>
            </Link>
            <Link href={useTemplateURL} target={'_blank'}>
              <button className={'download-btn px-9 py-4 text-base font-medium'}>Use this template</button>
            </Link>
          </div>
        </div>
        <div className={'flex flex-col gap-6'}>
          <div className={'template-preview'}>
            <iframe src={iframeUrl} />
          </div>
          <div className={'flex w-full items-center justify-center gap-5'}>
            <Link className={'text-primary flex items-center gap-2'} href={useTemplateURL} target={'_blank'}>
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <path
                  d='M5.75005 6.5C5.75005 6.91421 6.08584 7.25 6.50005 7.25C6.91426 7.25 7.25005 6.91421 7.25005 6.5H5.75005ZM6.50005 6.267H7.25006L7.25004 6.26283L6.50005 6.267ZM7.43892 3.96432L7.97218 4.49171L7.43892 3.96432ZM9.73105 3V2.24999L9.72691 2.25001L9.73105 3ZM13.769 3L13.7732 2.25H13.769V3ZM16.0612 3.96432L15.5279 4.49171V4.49171L16.0612 3.96432ZM17 6.267L16.25 6.26283V6.267H17ZM17 10.233H16.25L16.2501 10.2372L17 10.233ZM16.0612 12.5357L15.5279 12.0083L16.0612 12.5357ZM13.769 13.5V14.25L13.7732 14.25L13.769 13.5ZM13.5001 12.75C13.0858 12.75 12.7501 13.0858 12.7501 13.5C12.7501 13.9142 13.0858 14.25 13.5001 14.25V12.75ZM6.50005 7.25C6.91426 7.25 7.25005 6.91421 7.25005 6.5C7.25005 6.08579 6.91426 5.75 6.50005 5.75V7.25ZM6.23105 6.5V5.74999L6.22691 5.75001L6.23105 6.5ZM3.93892 7.46432L4.47218 7.99171L3.93892 7.46432ZM3.00005 9.767H3.75006L3.75004 9.76283L3.00005 9.767ZM3.00005 13.734L3.75005 13.7379V13.734H3.00005ZM6.23105 17L6.22691 17.75H6.23105V17ZM10.269 17V17.75L10.2732 17.75L10.269 17ZM12.5612 16.0357L12.0279 15.5083L12.5612 16.0357ZM13.5 13.733H12.75L12.7501 13.7372L13.5 13.733ZM14.25 13.5C14.25 13.0858 13.9143 12.75 13.5 12.75C13.0858 12.75 12.75 13.0858 12.75 13.5H14.25ZM6.5 5.75C6.08579 5.75 5.75 6.08579 5.75 6.5C5.75 6.91421 6.08579 7.25 6.5 7.25V5.75ZM10.269 6.5L10.2731 5.75H10.269V6.5ZM12.5611 7.46432L13.0944 6.93694L13.0944 6.93694L12.5611 7.46432ZM13.5 9.767L12.75 9.76283V9.767H13.5ZM12.75 13.5C12.75 13.9142 13.0858 14.25 13.5 14.25C13.9142 14.25 14.25 13.9142 14.25 13.5H12.75ZM7.25005 6.5V6.267H5.75005V6.5H7.25005ZM7.25004 6.26283C7.24636 5.60005 7.50612 4.96296 7.97218 4.49171L6.90566 3.43694C6.15985 4.19106 5.74417 5.21056 5.75006 6.27117L7.25004 6.26283ZM7.97218 4.49171C8.43824 4.02046 9.07241 3.75365 9.73519 3.74999L9.72691 2.25001C8.6663 2.25587 7.65146 2.68282 6.90566 3.43694L7.97218 4.49171ZM9.73105 3.75H13.769V2.25H9.73105V3.75ZM13.7649 3.74999C14.4277 3.75365 15.0619 4.02046 15.5279 4.49171L16.5944 3.43694C15.8486 2.68282 14.8338 2.25587 13.7732 2.25001L13.7649 3.74999ZM15.5279 4.49171C15.994 4.96296 16.2537 5.60005 16.2501 6.26283L17.75 6.27117C17.7559 5.21056 17.3402 4.19106 16.5944 3.43694L15.5279 4.49171ZM16.25 6.267V10.233H17.75V6.267H16.25ZM16.2501 10.2372C16.2537 10.8999 15.994 11.537 15.5279 12.0083L16.5944 13.0631C17.3402 12.3089 17.7559 11.2894 17.75 10.2288L16.2501 10.2372ZM15.5279 12.0083C15.0619 12.4795 14.4277 12.7463 13.7649 12.75L13.7732 14.25C14.8338 14.2441 15.8486 13.8172 16.5944 13.0631L15.5279 12.0083ZM13.769 12.75H13.5001V14.25H13.769V12.75ZM6.50005 5.75H6.23105V7.25H6.50005V5.75ZM6.22691 5.75001C5.1663 5.75587 4.15146 6.18282 3.40566 6.93694L4.47218 7.99171C4.93824 7.52046 5.57241 7.25365 6.23519 7.24999L6.22691 5.75001ZM3.40566 6.93694C2.65985 7.69106 2.24417 8.71056 2.25006 9.77117L3.75004 9.76283C3.74636 9.10005 4.00612 8.46296 4.47218 7.99171L3.40566 6.93694ZM2.25005 9.767V13.734H3.75005V9.767H2.25005ZM2.25006 13.7301C2.23847 15.9382 4.01879 17.7378 6.22691 17.75L6.2352 16.25C4.85533 16.2424 3.7428 15.1178 3.75004 13.7379L2.25006 13.7301ZM6.23105 17.75H10.269V16.25H6.23105V17.75ZM10.2732 17.75C11.3338 17.7441 12.3486 17.3172 13.0944 16.5631L12.0279 15.5083C11.5619 15.9795 10.9277 16.2463 10.2649 16.25L10.2732 17.75ZM13.0944 16.5631C13.8402 15.8089 14.2559 14.7894 14.25 13.7288L12.7501 13.7372C12.7537 14.3999 12.494 15.037 12.0279 15.5083L13.0944 16.5631ZM14.25 13.733V13.5H12.75V13.733H14.25ZM6.5 7.25H10.269V5.75H6.5V7.25ZM10.2649 7.24999C10.9276 7.25365 11.5618 7.52046 12.0279 7.99171L13.0944 6.93694C12.3486 6.18282 11.3337 5.75587 10.2731 5.75001L10.2649 7.24999ZM12.0279 7.99171C12.4939 8.46296 12.7537 9.10005 12.75 9.76283L14.25 9.77117C14.2559 8.71056 13.8402 7.69106 13.0944 6.93694L12.0279 7.99171ZM12.75 9.767V13.5H14.25V9.767H12.75Z'
                  fill='#8427E0'
                />
              </svg>
              <button>Copy base</button>
            </Link>
            <Link className={'text-primary flex items-center gap-2'} href={template.view_url} target={'_blank'}>
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <path
                  d='M16.944 4.434C16.873 4.26296 16.737 4.12703 16.566 4.056C16.4818 4.02013 16.3915 4.00111 16.3 4H12.1C11.9143 4 11.7363 4.07375 11.605 4.20503C11.4738 4.3363 11.4 4.51435 11.4 4.7C11.4 4.88565 11.4738 5.0637 11.605 5.19497C11.7363 5.32625 11.9143 5.4 12.1 5.4H14.613L4.4 15.613V13.1C4.4 12.9143 4.32625 12.7363 4.19497 12.605C4.0637 12.4738 3.88565 12.4 3.7 12.4C3.51435 12.4 3.3363 12.4738 3.20503 12.605C3.07375 12.7363 3 12.9143 3 13.1V17.3C3.00111 17.3915 3.02013 17.4818 3.056 17.566C3.12703 17.737 3.26296 17.873 3.434 17.944C3.51816 17.9799 3.60853 17.9989 3.7 18H7.9C8.08565 18 8.2637 17.9263 8.39497 17.795C8.52625 17.6637 8.6 17.4857 8.6 17.3C8.6 17.1143 8.52625 16.9363 8.39497 16.805C8.2637 16.6737 8.08565 16.6 7.9 16.6H5.387L15.6 6.387V8.9C15.6 9.08565 15.6737 9.2637 15.805 9.39497C15.9363 9.52625 16.1143 9.6 16.3 9.6C16.4857 9.6 16.6637 9.52625 16.795 9.39497C16.9263 9.2637 17 9.08565 17 8.9V4.7C16.9989 4.60853 16.9799 4.51816 16.944 4.434Z'
                  fill='#8427E0'
                />
              </svg>
              <button>View large version</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateSection;
