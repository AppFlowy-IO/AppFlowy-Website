import Trans from 'next-translate/Trans';
import pageKeys from '@/data/about-us.json';
import Box from '@mui/material/Box';

const missionBg = [
  'var(--about-us-card-bg-1)',
  'var(--about-us-card-bg-2)',
  'var(--about-us-card-bg-3)',
  'var(--about-us-card-bg-1)',
];

const missionBorder = [
  'var(--color-primary-divider)',
  'var(--color-primary-divider)',
  'var(--card-border-yellow)',
  'var(--color-primary-divider)',
];

export default function Mission() {
  return (
    <Box className={'flex flex-col items-center'}>
      <div className={'page-title mb-36 flex items-center justify-center max-sm:mb-28 max-sm:px-8'}>
        <div className={'inline-block max-sm:w-full md:max-w-screen-sm lg:max-w-screen-lg'}>
          <Trans i18nKey={pageKeys.mission.title} components={[<span key={0} className={'primary-underline'} />]} />
        </div>
      </div>
      <div className={'mb-12 flex aspect-auto w-full items-center justify-center px-16 max-sm:px-6'}>
        <img className={'object-contain'} src={pageKeys.mission.image.src} alt={pageKeys.mission.image.alt} />
      </div>
      <div className={'mb-12 flex w-full flex-col px-16 max-sm:px-6'}>
        {pageKeys.mission.things.map((thing, index) => (
          <div
            key={thing.title}
            style={{
              background: missionBg[index],
              border: `1px solid ${missionBorder[index]}`,
            }}
            className={`mb-6 flex items-center justify-between overflow-hidden rounded-2xl border max-sm:flex-col md:mx-16`}
          >
            <div className={'flex aspect-auto flex-1 items-end max-sm:order-2'}>
              <img className={'object-contain'} src={thing.image.src} alt={thing.image.alt} />
            </div>
            <div className={'flex flex-1 flex-col justify-center p-12 max-sm:p-6'}>
              <div className={'mb-6 text-[40px] font-medium leading-[44px] max-sm:text-[24px] max-sm:leading-[26px]'}>
                <Trans i18nKey={thing.title} />
              </div>
              <div className={'flex flex-col'}>
                <Trans
                  i18nKey={thing.description}
                  components={[
                    <div className={'mb-6'} key={0} />,
                    <div className={'mb-4 font-bold'} key={1} />,
                    <div key={2} className={'key-point mb-2 pl-3'} />,
                  ]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
}
