interface BaseParams extends Record<string, string | number | boolean | undefined> {}

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lottie: any;

  gtag: (type: string, event: string, params: BaseParams) => void;
}
