import { fetchGitStar, fetchLastVersion } from '@/lib/githubAPI';
import { cookies } from 'next/headers';
import { VISITED_NEW_VERSION_COOKIE_NAME } from '@/lib/cookie';

export const getGitData = async () => {
  try {
    const cookieStore = cookies();
    const stars = await fetchGitStar();
    const lastVersion = await fetchLastVersion();

    const visitedLatestVersion = cookieStore.get(VISITED_NEW_VERSION_COOKIE_NAME)?.value;

    return {
      stars,
      lastVersion,
      visitedLatestVersion,
    };
  } catch (e) {
    // nothing
  }

  return;
};
