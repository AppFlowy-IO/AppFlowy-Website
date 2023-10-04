/**
 * This code file is used to send requests to the GitHub API and implement a caching strategy.
 *
 * The purpose of caching is to reduce frequent requests to the GitHub API, improving performance and reducing the risk of access limitations.
 *
 * Caching Strategy:
 * - Use the Node.js caching library (NodeCache) to store retrieved API response data.
 * - Set the Time To Live (TTL) for the cache to 1 hour to ensure data is not stored for an extended period.
 *
 * TTL (Time To Live): The lifespan of cached data; it expires automatically after this time.
 * checkperiod: The interval for checking if data in the cache has expired.
 *
 * GitHub Repository API URL: GIT_HUB_REPO
 *
 * @param {number} ttl - Time to Live (TTL) for cached data in seconds (1 hour).
 * @param {number} checkperiod - Cache check period in seconds (12 minutes).
 * @param {object} cache - Node.js cache library instance.
 * @returns {object} - An object containing various API methods.
 */

import { addVersion, addContributor, hasVersion, Version } from '@/lib/db';
import NodeCache from 'node-cache';

const ttl = 60 * 60; // 1 hour
const checkperiod = 60 * 60 * 0.2; // 12 minutes
const cache = new NodeCache({
  stdTTL: ttl, // 1 hour
  checkperiod,
});
const baseCache = new NodeCache({
  stdTTL: 0, // standard time to live in seconds. 0 = infinity
});

export const GIT_HUB_REPO = 'https://api.github.com/repos/AppFlowy-IO/AppFlowy';

async function fetchAPI(url: string) {
  // Check cache, if exist return cache data
  const data = cache.get(url);

  if (data) {
    return data;
  }

  try {
    // Check base cache, if exist return base cache data and update cache in background
    if (baseCache.get(url)) {
      void asyncUpdateCache(url);
      return baseCache.get(url);
    }

    // If not exist in base cache, fetch data and update cache
    return asyncUpdateCache(url);
  } catch (e) {
    console.error(e);
  }
}

async function asyncUpdateCache(url: string) {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: ttl,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch API: ${url}, status: ${res.status}`);
  }

  const data = await res.json();

  // Set cache
  const success = cache.set(url, data) && baseCache.set(url, data);

  if (!success) {
    console.error('Failed to cache data', url, data);
  }

  return data;
}

/**
 * Fetch git star count
 * @returns {Promise<number>}
 */
export const fetchGitStar = async (): Promise<number> => {
  const data = await fetchAPI(`${GIT_HUB_REPO}`);

  return data?.stargazers_count;
};

/**
 * Fetch last version
 * @returns {Promise<string>}
 */
export const fetchLastVersion = async (): Promise<string> => {
  const data = await fetchAPI(`${GIT_HUB_REPO}/releases/latest`);

  return data?.tag_name;
};

/**
 * Fetch versions
 * @returns {Promise<Version[]>}
 */
export const fetchVersions = async (): Promise<Version[]> => {
  const data = await fetchAPI(`${GIT_HUB_REPO}/releases`);

  const versions: Version[] = [];

  for (const item of data) {
    if (item.tag_name.split('.').length === 3) {
      versions.push({
        version: item.tag_name,
        changeLog: item.body,
        publishedAt: item.published_at,
        url: item.html_url,
      });
    }
  }

  return versions;
};

export async function loadContributors() {
  try {
    const data = await fetchAPI(`${GIT_HUB_REPO}/contributors`);

    for (const contributor of data) {
      await addContributor({
        contributorId: contributor.id,
        login: contributor.login,
        name: contributor.login,
        avatarUrl: contributor.avatar_url,
        contributionCount: contributor.contributions,
      });
    }

    return data;
  } catch {
    return Promise.reject();
  }
}

export async function loadVersions() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data = await fetchAPI(`${GIT_HUB_REPO}/releases`);

    for (const item of data) {
      if (item.tag_name.split('.').length === 3) {
        const existingVersion = await hasVersion(item.tag_name);

        if (!existingVersion) {
          await addVersion(item.tag_name, item.html_url, item.body, item.published_at);
        }
      }
    }
  } catch (e) {
    console.error('Failed to load versions', e);
    return Promise.reject();
  }
}
