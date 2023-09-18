export interface IVersion {
  image: {
    src: string;
    alt: string;
  };
  url: string;
  version: string;
  time: string;
  desc: string;
  content: {
    name: string;
    type: string;
    items: string[];
  }[];
  downloadLinks?: {
    macos: {
      intel: string;
      'apple-silicon': string;
    };
    windows: string;
    linux: string;
    android: string;
    iOS: string;
    'app-store': string;
    'google-play': string;
  };
}
