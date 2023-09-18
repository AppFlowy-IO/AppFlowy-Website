import Dexie, { Table } from 'dexie';

export interface Contributor {
  id?: number;
  contributorId: string;
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

class AppflowyDB extends Dexie {
  versions!: Table<Version>;
  contributors!: Table<Contributor>;

  constructor() {
    super('AppflowyDB');
    this.version(2).stores({
      versions: `
        ++id,
        version,
        changeLog,
        publishedAt,
        url
        `,
      contributors: `
        ++id,
        contributorId,
        login,
        name,
        avatarUrl,
        contributionCount
        `,
    });
  }
}

export const db = new AppflowyDB();

export async function addVersion(version: string, url: string, changeLog: string, publishedAt: string) {
  const v = await db.versions.get({ version });

  if (v) {
    db.versions.update(v, {
      version,
      changeLog,
      publishedAt,
      url,
    });
    return;
  }

  db.versions.add({
    version,
    changeLog,
    publishedAt,
    url,
  });
}

export async function addContributor(contributor: Contributor) {
  const v = await db.contributors.get({
    contributorId: contributor.contributorId,
  });

  if (v) {
    db.contributors.update(v, contributor);
    return;
  }

  db.contributors.add(contributor);
}
