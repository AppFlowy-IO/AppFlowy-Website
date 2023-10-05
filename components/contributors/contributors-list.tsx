import React from 'react';

import { Contributor } from '@/lib/interface';

function ContributorsList({ contributors }: { contributors: Contributor[] }) {
  return (
    <div className={'contributors-list'}>
      {contributors?.map((item) => (
        <div key={item.id} className={'contributor-wrapper'}>
          <div className={'contributor'}>
            <div className={'contributor-avatar'}>
              <img src={item.avatarUrl} alt={item.name} />
            </div>
            <div className={'contributor-name'}>{item.name}</div>
            <div className={'contributor-login'}>@{item.login}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContributorsList;
