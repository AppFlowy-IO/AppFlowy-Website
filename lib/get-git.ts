import { fetchGitStar, fetchLastVersion } from '@/lib/githubAPI';

export const getGitData = async () => {
  try {
    const stars = await fetchGitStar();
    const lastVersion = await fetchLastVersion();

    return {
      stars,
      lastVersion,
    };
  } catch (e) {
    // nothing
  }

  return;
};
