import { Metadata } from 'next';
import React from 'react';
import { contributorsPageConfig } from '@/lib/config/pages';
import Link from 'next/link';
import '@/styles/contributors.scss';
import ContributorsList from '@/components/contributors/contributors-list';
import { fetchContributors } from '@/lib/githubAPI';

const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Open Source Contributors | AppFlowy',
    description:
      'Meet the open source contributors who build AppFlowy on GitHub, and find out how to make your own first contribution to the project.',
    alternates: {
      canonical: `${site_url}/contributors`,
    },
  };
}

async function Page() {
  const contributors = await getData();

  return (
    <div className={'contributors-page'}>
      <div className={'ellipse'} />
      <h1 className={'title'}>{contributorsPageConfig.mainTitle}</h1>
      <div className={'desc'}>{contributorsPageConfig.subtitle}</div>
      <ContributorsList contributors={contributors} />
      <div className={'title learn-more'}>{contributorsPageConfig.learnMoreTitle}</div>
      <Link
        href={contributorsPageConfig.learnMoreLink}
        target={'_blank'}
        className={'download-btn'}
      >
        Learn more
      </Link>
    </div>
  );
}

const getData = async() => {
  try {
    return await fetchContributors();
  } catch {
    return [];
  }
};

export default Page;
