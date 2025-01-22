import '@/styles/what-is-new.scss';
import { fetchVersions } from '@/lib/githubAPI';
import { whatIsNewConfig } from '@/lib/config/pages';
import Versions from '@/components/what-is-new/versions';
import { parseChangelog } from '@/lib/parseChangelog';
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
      <div className={'title'}>
        {whatIsNewConfig.title}
        <div className={'line'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 198 19"
            fill="none"
          >
            <path
              d="M196.216 14.5974C142.824 7.17755 105.479 -2.82286 17.9105 4.9016C15.5675 5.10828 15.4591 8.40096 17.7864 8.74184L74.3253 17.0231C39.8213 10.0151 20.9741 9.90925 2.19985 13.4713"
              stroke="#9327FF"
              strokeWidth="3"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
      <div className={'content'}>
        <Versions versions={versions.map(parseChangelog)} />
      </div>
    </div>
  );
}

const getData = async() => {
  try {
    return await fetchVersions();
  } catch {
    return [];
  }
};

export default Page;
