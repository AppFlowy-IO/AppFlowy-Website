'use client';
import { groupBy } from 'lodash-es';
import dayjs from 'dayjs';

import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { whatIsNewConfig } from '@/lib/config/pages';
import VersionGroup from '@/components/icons/version-group';

import Version from '@/components/what-is-new/version';
import { useEffect, useMemo, useState } from 'react';
import { IVersion } from '@/lib/config/versions';
import { useLoadVersion, useVersions } from '@/lib/hooks/use-versions';

dayjs.extend(LocalizedFormat);

function Index({ versions }: { versions: IVersion[] }) {
  const [data, setData] = useState(versions);

  useLoadVersion();
  const { versions: localVersions } = useVersions();
  const groupByMonth = useMemo(() => {
    return groupBy(data, (item) => {
      const { time } = item;

      return dayjs(time).format('LL').split(' ')[0];
    });
  }, [data]);

  useEffect(() => {
    setData(localVersions);
  }, [localVersions]);

  return (
    <div className='what-is-new-page'>
      <div className={'title'}>
        {whatIsNewConfig.title}
        <div className={'line'}>
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 198 19' fill='none'>
            <path
              d='M196.216 14.5974C142.824 7.17755 105.479 -2.82286 17.9105 4.9016C15.5675 5.10828 15.4591 8.40096 17.7864 8.74184L74.3253 17.0231C39.8213 10.0151 20.9741 9.90925 2.19985 13.4713'
              stroke='#9327FF'
              strokeWidth='3'
              strokeLinecap='square'
            />
          </svg>
        </div>
      </div>
      <div className={'content'}>
        <div className={'versions'}>
          {Object.keys(groupByMonth).map((month) => (
            <div className={'month-panel'} key={month}>
              <div className={'month'}>
                <VersionGroup />
                {month}
              </div>
              {groupByMonth[month].map((item) => (
                <Version version={item} key={item.version} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
