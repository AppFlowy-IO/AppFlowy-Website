export enum EventName {
  homePageDownloadBtn = 'home_page_download_btn',
  homePageTryForFreeBtn = 'home_page_try_for_free_btn',
  homePageWhatIsNewLink = 'home_page_what_is_new_link',
  homePageGetTemplatesLink = 'home_page_get_templates_link',
  homePageMorePlatformsLink = 'home_page_more_platforms_link',
  homePageGetStartedBtn = 'home_page_get_started_btn',
  homePageSwitchProductBtn = 'home_page_switch_product_btn',
  navigatorGithubBtn = 'navigator_github_btn',
  navigatorStartForFreeBtn = 'navigator_start_for_free_btn',
  download = 'download',
  switchMode = 'switch_mode',
  themeView = 'theme_view',
  downloadIOSTestFlightBtn = 'download_ios_testflight_btn',
  downloadAppleBtn = 'download_apple_btn',
  downloadAndroidBtn = 'download_android_btn',
  downloadIOSModalOkBtn = 'download_ios_modal_ok_btn',
  downloadIOSModalCancelBtn = 'download_ios_modal_cancel_btn',
  downloadAndroidModalOkBtn = 'download_android_modal_ok_btn',
  downloadAndroidModalCancelBtn = 'download_android_modal_cancel_btn',
  downloadBrowserBtn = 'download_browser_btn',
}

export interface DownloadParams extends BaseParams {
  platform: string;
  version: string;
  arch: string;
  file_extension: string;
}

export function collectEvent(
  eventName: EventName.homePageSwitchProductBtn,
  params: {
    product: string;
    type: 'view' | 'click';
  }
): void;
export function collectEvent(
  eventName:
    | EventName.homePageDownloadBtn
    | EventName.homePageTryForFreeBtn
    | EventName.navigatorGithubBtn
    | EventName.navigatorStartForFreeBtn
    | EventName.homePageGetStartedBtn
    | EventName.homePageGetTemplatesLink
    | EventName.homePageMorePlatformsLink
    | EventName.homePageWhatIsNewLink
    | EventName.downloadIOSModalOkBtn
    | EventName.downloadIOSModalCancelBtn
    | EventName.downloadAndroidModalOkBtn
    | EventName.downloadAndroidModalCancelBtn
    | EventName.downloadIOSTestFlightBtn
    | EventName.downloadAppleBtn
    | EventName.downloadAndroidBtn
    | EventName.downloadBrowserBtn,
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
