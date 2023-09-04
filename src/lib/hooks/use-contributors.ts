import { useCallback, useEffect, useState } from 'react';
import { api, GET_CONTRIBUTORS } from '@/lib/api';

export interface Contributor {
  login: string;
  name: string;
  id: number;
  avatar_url: string;
  contributions: number;
}

export function useContributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchGithub = useCallback(async () => {
    setLoading(true);
    const response = await api.get(GET_CONTRIBUTORS);
    const contributors = response.data.slice(0, 16);

    for (const contributor of contributors) {
      const { data: user } = await api.get(contributor.url);

      contributor.name = user.name;
    }

    setContributors(contributors);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchGithub();
  }, [fetchGithub]);

  return {
    contributors,
    loading,
  };
}
