import { cookies } from 'next/headers';

export function getModeForServer() {
  const cookieStore = cookies();

  return cookieStore.get('data-mode')?.value as 'dark' | 'light' | undefined;
}
