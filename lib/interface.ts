export interface Contributor {
  id: number;
  login: string;
  name: string;
  avatarUrl: string;
  contributionCount: number;
}

export interface Version {
  id?: string;
  version: string;
  changeLog: string;
  publishedAt: string;
  url: string;
}
