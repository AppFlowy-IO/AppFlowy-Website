'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Storage } from '@/lib/storage';
import dayjs from 'dayjs';

export function useGithub() {
  const [stars, setStars] = useState(0);

  const [loading, setLoading] = useState(false);
  const fetchGithub = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('');
      const { stargazers_count } = response.data;

      setStars(stargazers_count);
      Storage.set('stars', stargazers_count);
      Storage.set('get-stars-time', dayjs().toString());
    } catch (e) {
      // do nothing
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const lastTime = Storage.get('get-stars-time');
    const diffHours = dayjs().diff(dayjs(lastTime), 'hours');

    if (diffHours > 24 || !lastTime) {
      void fetchGithub();
    } else {
      setStars(Number(Storage.get('stars')));
    }
  }, [fetchGithub]);

  return {
    stars,
    loading,
  };
}
