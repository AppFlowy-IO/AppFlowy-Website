import React from 'react';
import { contributorsPageConfig } from '@/lib/config/pages';
import Link from 'next/link';
import '@/styles/contributors.scss';
import ContributorsList from '@/components/contributors/contributors-list';

function Page() {
  return (
    <div className={'contributors-page'}>
      <div className={'ellipse'} />
      <div className={'title'}>{contributorsPageConfig.mainTitle}</div>
      <div className={'desc'}>{contributorsPageConfig.subtitle}</div>
      <ContributorsList />
      <div className={'title learn-more'}>{contributorsPageConfig.learnMoreTitle}</div>
      <Link href={contributorsPageConfig.learnMoreLink} target={'_blank'} className={'download-btn'}>
        Learn more
      </Link>
    </div>
  );
}

export default Page;
