import '@/styles/what-is-new.scss';
import { fetchVersions } from '@/lib/githubAPI';
import { whatIsNewConfig } from '@/lib/config/pages';
import Versions from '@/components/what-is-new/versions';
import { parseChangelog } from '@/lib/parseChangelog';
import GetStart from '@/components/product/get-start';
import { Metadata } from 'next';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: `${site_url}/what-is-new`,
    },
  };
}

async function Page() {
  const versions = await getData();

  return (
    <div className="what-is-new-page">
      <div className="py-[80px] px-6 text-center max-sm:py-[60px] w-full">
        <div className="z-10 text-center text-style-h1 font-bold">{whatIsNewConfig.title}</div>
        <div className={'text-text-tertiary text-style-h5 font-normal mt-3'}>{whatIsNewConfig.subtitle}</div>
      </div>
      <div className={'content'}>
        <Versions versions={versions.map(parseChangelog)} />
      </div>
      <GetStart />
    </div>
  );
}

const getData = async () => {
  try {
    return await fetchVersions();
  } catch {
    return [];
  }
};

export default Page;
