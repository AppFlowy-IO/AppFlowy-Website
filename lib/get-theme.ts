import { cookies } from 'next/headers';

export function isDarkForServer() {
  const cookieStore = cookies();

  const mode = cookieStore.get('data-mode')?.value as 'dark' | 'light' | undefined;

  return mode === 'dark';
}
