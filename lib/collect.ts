export enum EventName {
  btnClick = 'btn_click',
  btnDisplay = 'btn_display',
  download = 'download',
}

export interface DownloadParams extends BaseParams {
  platform: string;
  version: string;
  arch: string;
  file_extension: string;
}

export function collectEvent(
  eventName: EventName.btnDisplay | EventName.btnClick,
  params: {
    btn_type: string;
  } & Partial<DownloadParams>
): void;
export function collectEvent(eventName: EventName.download, params: DownloadParams): void;
export function collectEvent(eventName: EventName, params: BaseParams) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, params);
}
