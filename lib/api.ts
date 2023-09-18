import axios from 'axios';
import { parseChangelog } from '@/lib/parseChangelog';
import { addVersion, addContributor } from '@/lib/db';
import { Storage } from '@/lib/storage';
import dayjs from 'dayjs';

export const GIT_HUB_REPO = 'https://api.github.com/repos/AppFlowy-IO/AppFlowy';

export const api = axios.create({
  baseURL: GIT_HUB_REPO,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getGithubStar() {
  try {
    const res = await api.get('');

    return res.data.stargazers_count;
  } catch {
    return Promise.reject();
  }
}

export async function loadContributors() {
  const lastTime = Storage.get('get-contributors-time');
  const diffHours = dayjs().diff(dayjs(lastTime), 'hours');

  // load versions at most once per hour
  if (diffHours <= 1 && lastTime) {
    return;
  }

  try {
    const res = await api.get('/contributors');

    for (const contributor of res.data) {
      await addContributor({
        contributorId: contributor.id,
        login: contributor.login,
        name: contributor.login,
        avatarUrl: contributor.avatar_url,
        contributionCount: contributor.contributions,
      });
    }

    return res.data;
  } catch {
    return Promise.reject();
  }
}

export async function loadVersions() {
  try {
    const res = await api.get('/releases');

    const versions = [];

    for (const item of res.data) {
      if (item.tag_name.split('.').length === 3) {
        const log = await api.get(`/releases/tags/${item.tag_name}`);

        if (typeof window !== 'undefined') {
          await addVersion(item.tag_name, item.html_url, log.data.body, log.data.published_at);
        }

        versions.push(
          parseChangelog({
            version: item.tag_name,
            changeLog: log.data.body,
            publishedAt: log.data.published_at,
            url: item.html_url,
          })
        );
      }
    }

    return versions;
  } catch (e) {
    console.log('Failed to load versions', e);
    return Promise.reject();
  }
}

export async function getLatestVersion() {
  try {
    const res = await api.get('/releases/latest');

    return res.data as {
      tag_name: string;
    };
  } catch (e) {
    return Promise.reject();
  }
}
