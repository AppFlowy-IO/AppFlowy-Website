import { collectEvent, DownloadParams, EventName } from '@/lib/collect';
import { Storage } from '@/lib/storage';

export const DOWNLOAD_MODAL_EVENT = 'appflowy-download-modal-open';

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

export function download(url: string, transfer = true, isMobile = false) {
  const a = document.createElement('a');

  if (isMobile) {
    a.href = url;
    a.target = '_blank';
  } else {
    a.href = url;
    const params = parseDownloadUrl(url);

    collectEvent(EventName.download, params);

    if (transfer) {
      Storage.set('manually_download_url', url);
      window.dispatchEvent(new Event(DOWNLOAD_MODAL_EVENT));
    }
  }

  document.body.appendChild(a);
  a.style.display = 'none';
  a.click();
  document.body.removeChild(a);
}
