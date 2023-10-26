export enum EventName {
  homePageDownloadBtn = 'home_page_download_btn',
  homePageWhatIsNewLink = 'home_page_what_is_new_link',
  homePageGetTheCloudBetaLink = 'home_page_get_the_cloud_beta_link',
  homePageMorePlatformsLink = 'home_page_more_platforms_link',
  homePageGetStartedBtn = 'home_page_get_started_btn',
  navigatorGithubBtn = 'navigator_github_btn',
  navigatorStartForFreeBtn = 'navigator_start_for_free_btn',
  download = 'download',
  switchMode = 'switch_mode',
  themeView = 'theme_view',
}

export interface DownloadParams extends BaseParams {
  platform: string;
  version: string;
  arch: string;
  file_extension: string;
}

export function collectEvent(
  eventName:
    | EventName.homePageDownloadBtn
    | EventName.navigatorGithubBtn
    | EventName.navigatorStartForFreeBtn
    | EventName.homePageGetStartedBtn
    | EventName.homePageGetTheCloudBetaLink
    | EventName.homePageMorePlatformsLink
    | EventName.homePageWhatIsNewLink,
  params: {
    type: 'view' | 'click';
  }
): void;
export function collectEvent(
  eventName: EventName.switchMode | EventName.themeView,
  params: {
    mode: 'light' | 'dark';
  }
): void;
export function collectEvent(eventName: EventName.download, params: DownloadParams): void;
export function collectEvent(eventName: EventName, params: BaseParams) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, params);
}
