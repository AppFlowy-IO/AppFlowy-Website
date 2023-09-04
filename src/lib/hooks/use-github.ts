'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Storage } from '@/lib/storage';

export function useGithub() {
  const [stars, setStars] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return Number(Storage.get('stars'));
  });

  const [loading, setLoading] = useState(false);
  const fetchGithub = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('');
      const { stargazers_count } = response.data;

      setStars(stargazers_count);
      Storage.set('stars', stargazers_count);
    } catch (e) {
      // do nothing
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchGithub();
  }, [fetchGithub]);

  return {
    stars,
    loading,
  };
}
