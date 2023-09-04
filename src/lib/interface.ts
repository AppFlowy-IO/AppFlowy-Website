export interface Locale {
  code: string;
  name: string;
}

export interface Page {
  key: string;
  link?: string;
  children?: Page[];
  iconName?: string;
  imageSrc?: string;
  imageAlt?: string;
  desc?: string;
}

export interface Store {
  newVersionState: {
    version: string;
    show: boolean;
  };
}
