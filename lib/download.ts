import { collectEvent, DownloadParams, EventName } from '@/lib/collect';

export function parseDownloadUrl(url: string): DownloadParams {
  const infos = url.split('/Appflowy-')[1].split('-');
  const [version, platform, archAndExtension] = infos;
  const [arch, fileExtension] = archAndExtension.split('.');

  return {
    version,
    platform,
    arch,
    file_extension: fileExtension,
  };
}

export function download(url: string, transfer = true) {
  const a = document.createElement('a');

  if (transfer) {
    a.href = `/downloading?downloadUrl=${url}`;
  } else {
    a.href = url;
    const params = parseDownloadUrl(url);

    collectEvent(EventName.download, params);
  }

  document.body.appendChild(a);
  a.style.display = 'none';
  a.click();
  document.body.removeChild(a);
}
