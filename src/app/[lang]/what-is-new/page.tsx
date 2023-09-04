import versions from '@/data/versions.json';
import { groupBy } from 'lodash-es';
import dayjs from 'dayjs';
import MonthFlag from '@/components/what-is-new/month-flag';
import Version from '@/components/what-is-new/version';
import pageKeys from '@/data/what-is-new.json';
import Box from '@mui/material/Box';
import Trans from 'next-translate/Trans';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

const groupByMonth = groupBy(versions, (item) => {
  const { time } = item;

  return dayjs(time).format('LL').split(' ')[0];
});

function Page() {
  return (
    <Box
      sx={{
        background: 'var(--linear-gradient-200)',
      }}
      className='flex w-full flex-col items-center pt-52'
    >
      <div className={'page-title mb-36 flex items-center justify-center max-sm:mb-28 '}>
        <div className={'inline-block'}>
          <Trans i18nKey={pageKeys.title} components={[<span key={0} className={'primary-underline'} />]} />
        </div>
      </div>
      <div className={'flex w-full max-sm:px-4 md:px-24'}>
        <div className={'timeline ml-4 border-l border-[var(--color-primary-divider)]'} />
        <div className={'flex-1 pb-36'}>
          <div className={'flex w-full flex-col'}>
            {Object.keys(groupByMonth).map((month) => (
              <div key={month} className={'relative w-full py-6'}>
                <MonthFlag title={month} />
                <div className={'mb-6 flex flex-col'}>
                  {groupByMonth[month].map((version, index) => (
                    <div key={version.version} className={'relative'}>
                      {index !== 0 && index !== versions.length - 1 && (
                        <div
                          className={
                            'absolute -left-[8px] top-0 h-[14px] w-[14px] rounded-full bg-[var(--color-primary-100)]'
                          }
                        />
                      )}
                      <Version
                        version={version.version}
                        image={version.image}
                        desc={version.desc}
                        time={dayjs(version.time).format('LL')}
                        update={version.update}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Page;
