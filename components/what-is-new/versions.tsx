import React from 'react';
import VersionComponent from '@/components/what-is-new/version';
import { IVersion } from '@/lib/config/versions';

function Versions({ versions }: { versions: IVersion[] }) {
  return (
    <div className={'versions'}>
      {versions.map((version, index) => (
        <React.Fragment key={version.version}>
          {index > 0 && <div className={'version-divider'} />}
          <VersionComponent version={version} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Versions;
