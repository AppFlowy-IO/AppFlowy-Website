import React, { useMemo } from 'react';
import VersionGroup from '@/components/icons/version-group';
import VersionComponent from '@/components/what-is-new/version';
import { IVersion } from '@/lib/config/versions';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { getVersions } from '@/lib/versions';

dayjs.extend(LocalizedFormat);

function Versions({ versions }: { versions: IVersion[] }) {
  const monthVersions: (IVersion & {
    month?: string;
  })[] = useMemo(() => getVersions(versions), [versions]);

  return (
    <div className={'versions'}>
      {monthVersions.map((version) => {
        return (
          <div className={'month-panel'} key={version.version}>
            {version.month ? (
              <div className={'month'}>
                <i className={'text-primary'}>
                  <VersionGroup />
                </i>
                {version.month}
              </div>
            ) : null}

            <VersionComponent version={version} key={version.version} />
          </div>
        );
      })}
    </div>
  );
}

export default Versions;
