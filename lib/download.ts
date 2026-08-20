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
    // Temporarily back to the pre-modal flow: hand off to /downloaded, which fires
    // the actual download (and the collect event) via `download(url, false)`.
    // The modal path is kept in components/download/download-modal.tsx for reuse.
    if (transfer) {
      Storage.set('download_url', url);
      a.href = `/downloaded`;
    } else {
      a.href = url;
      const params = parseDownloadUrl(url);

      collectEvent(EventName.download, params);
    }
  }

  document.body.appendChild(a);
  a.style.display = 'none';
  a.click();
  document.body.removeChild(a);
}
