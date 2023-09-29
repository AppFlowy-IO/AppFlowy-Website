import React, { useMemo } from 'react';
import VersionGroup from '@/components/icons/version-group';
import VersionComponent from '@/components/what-is-new/version';
import { IVersion } from '@/lib/config/versions';
import { groupBy } from 'lodash-es';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

function Versions({ versions }: { versions: IVersion[] }) {
  const groupByMonth = useMemo(() => {
    return groupBy(versions, (item) => {
      const { time } = item;

      return dayjs(time).format('LL').split(' ')[0];
    });
  }, [versions]);

  return (
    <div className={'versions'}>
      {Object.keys(groupByMonth).map((month) => (
        <div className={'month-panel'} key={month}>
          <div className={'month'}>
            <i className={'text-primary'}>
              <VersionGroup />
            </i>
            {month}
          </div>
          {groupByMonth[month].map((item) => (
            <VersionComponent version={item} key={item.version} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Versions;
