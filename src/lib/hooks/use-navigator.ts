import { useGithub } from '@/lib/hooks/use-github';
import data from '@/data/navigation.json';
import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useClient } from '@/lib/hooks/use-client';

const pages = data.pages;

export function useNavigator() {
  const { stars, loading: loadingStars } = useGithub();
  const pathname = usePathname();
  const { isClient } = useClient();
  const onNavigateToGithub = useCallback(() => {
    window.open('https://github.com/AppFlowy-IO/AppFlowy', '_blank');
  }, []);

  const activePageKey = useMemo(() => {
    if (!isClient) return;
    const page = pages.find((page) => {
      if (!page.link) return false;
      if (page.link === '/') {
        return pathname === '/';
      }

      return pathname.startsWith(page.link);
    });

    return page?.key;
  }, [isClient, pathname]);

  return {
    pages,
    stars,
    loadingStars,
    onNavigateToGithub,
    activePageKey,
  };
}
