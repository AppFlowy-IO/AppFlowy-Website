import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Storage } from '@/lib/storage';

export function useGithub() {
  const [state, setState] = useState({
    stars: 0,
  });
  const [loading, setLoading] = useState(false);
  const fetchGithub = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('');
      const { stargazers_count } = response.data;

      setState({
        stars: stargazers_count,
      });
      Storage.set('stars', stargazers_count);
    } catch (e) {
      // do nothing
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (Storage.get('stars') !== undefined) {
      setState({
        stars: Number(Storage.get('stars')),
      });
    }

    void fetchGithub();
  }, [fetchGithub]);

  return {
    ...state,
    loading,
  };
}
