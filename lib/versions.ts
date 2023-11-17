import dayjs from 'dayjs';
import { IVersion } from '@/lib/config/versions';

export const getMonth = (time: string) => {
  const str = dayjs(time).format('LL');

  const [month] = str.split(' ');

  return month;
};

export const getVersions = (versions: IVersion[]) => {
  return versions.map((version, index) => {
    const month = getMonth(version.time);
    const prevMonth = getMonth(versions[index - 1]?.time || '');

    if (month === prevMonth) {
      return version;
    }

    return {
      ...version,
      month,
    };
  });
};
