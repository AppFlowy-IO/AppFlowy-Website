import { TemplateSummary } from '@/lib/interface';

type TemplateLinkSource = Pick<TemplateSummary, 'publish_info' | 'view_url'>;

export function getTemplateViewUrl(template: TemplateLinkSource) {
  const publishedUrl = new URL(template.view_url);
  const publishInfo = template.publish_info;

  if (!publishInfo) {
    return publishedUrl.toString();
  }

  publishedUrl.pathname = `/${publishInfo.namespace}/${publishInfo.publish_name}`;
  publishedUrl.search = '';

  return publishedUrl.toString();
}

export function getUseTemplateUrl(template: TemplateLinkSource) {
  const url = new URL(getTemplateViewUrl(template));

  url.searchParams.set('action', 'duplicate');

  return url.toString();
}

export function getTemplateIframeUrl(template: TemplateLinkSource) {
  const url = new URL(getTemplateViewUrl(template));

  url.searchParams.delete('v');
  url.searchParams.set('theme', 'light');
  url.searchParams.set('template', 'true');

  return url.toString();
}
