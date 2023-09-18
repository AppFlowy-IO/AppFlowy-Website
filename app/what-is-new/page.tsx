import '@/styles/what-is-new.scss';
import Index from '@/components/what-is-new';
import { loadVersions } from '@/lib/api';

async function Page() {
  const versions = await getData();

  return <Index versions={versions} />;
}

async function getData() {
  // In development, we don't need to load versions from the server
  // because we will load them in the client side.
  if (process.env.NODE_ENV === 'development') {
    return [];
  }

  try {
    const versions = await loadVersions();

    return versions;
  } catch {
    return [];
  }
}

export default Page;
