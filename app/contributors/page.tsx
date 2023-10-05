import React from 'react';
import { contributorsPageConfig } from '@/lib/config/pages';
import Link from 'next/link';
import '@/styles/contributors.scss';
import ContributorsList from '@/components/contributors/contributors-list';
import { fetchContributors } from '@/lib/githubAPI';

async function Page() {
  const contributors = await getData();

  return (
    <div className={'contributors-page'}>
      <div className={'ellipse'} />
      <div className={'title'}>{contributorsPageConfig.mainTitle}</div>
      <div className={'desc'}>{contributorsPageConfig.subtitle}</div>
      <ContributorsList contributors={contributors} />
      <div className={'title learn-more'}>{contributorsPageConfig.learnMoreTitle}</div>
      <Link href={contributorsPageConfig.learnMoreLink} target={'_blank'} className={'download-btn'}>
        Learn more
      </Link>
    </div>
  );
}

const getData = async () => {
  try {
    return await fetchContributors();
  } catch {
    return [];
  }
};

export default Page;
