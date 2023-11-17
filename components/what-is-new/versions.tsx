import React, { useMemo } from 'react';
import VersionGroup from '@/components/icons/version-group';
import VersionComponent from '@/components/what-is-new/version';
import { IVersion } from '@/lib/config/versions';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { getMonth, getVersions } from '@/lib/versions';

dayjs.extend(LocalizedFormat);

function Versions({ versions }: { versions: IVersion[] }) {
  const monthVersions = useMemo(() => getVersions(versions), [versions]);

  return (
    <div className={'versions'}>
      {monthVersions.map((version) => {
        const month = getMonth(version.time);

        return (
          <div className={'month-panel'} key={version.version}>
            {month ? (
              <div className={'month'}>
                <i className={'text-primary'}>
                  <VersionGroup />
                </i>
                {month}
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
