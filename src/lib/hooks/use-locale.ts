import useTranslation from 'next-translate/useTranslation';
import { usePathname, useRouter } from 'next/navigation';
import { setLocaleCookie } from '@/lib/set-cookie';

export function useLocale() {
  const { lang } = useTranslation();
  const pathName = usePathname();
  const router = useRouter();

  const handleChange = (lang: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');

    segments[1] = lang;

    setLocaleCookie(lang);

    router.push(segments.join('/'));
    router.refresh();
  };

  return {
    lang,
    handleChange,
  };
}
