import IconButton from '@mui/material/IconButton';
import data from '@/data/home.json';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthOutlined';
import TocIcon from '@mui/icons-material/TocOutlined';
import GridViewIcon from '@mui/icons-material/GridViewOutlined';
import Box from '@mui/material/Box';
import TabPanel from '@/components/shared/tab-panel';
import Trans from 'next-translate/Trans';

const swipeData = data.introduce['table-board-calendar'];

enum SwipeType {
  Board = 0,
  TABLE = 1,
  CALENDAR = 2,
}

const options = [
  {
    type: SwipeType.Board,
    icon: <GridViewIcon />,
    data: swipeData.board,
    name: 'board',
  },
  {
    type: SwipeType.TABLE,
    icon: <TocIcon />,
    data: swipeData.table,
    name: 'table',
  },
  {
    type: SwipeType.CALENDAR,
    icon: <CalendarMonthIcon />,
    data: swipeData.calendar,
    name: 'calendar',
  },
];

export default function SwipeViews() {
  const [selected, setSelected] = useState<SwipeType>(SwipeType.Board);

  return (
    <Box className={'flex w-full flex-col items-center max-sm:my-10 max-sm:px-8 md:my-24 md:px-36'}>
      <div className={'max-sm:max-w-full md:mb-12'}>
        {options.map((option) => (
          <TabPanel key={option.type} selected={selected} index={option.type}>
            <div className={'relative flex items-center max-sm:flex-col'}>
              <div className={'aspect-auto px-6'}>
                <img className={'max-h-full max-w-full object-contain'} src={option.data.src} alt={option.data.alt} />
              </div>
              <div className={'my-10 flex h-[74px] items-center justify-center overflow-hidden text-center md:hidden'}>
                <span>
                  <Trans i18nKey={option.data.description} components={[<span key={0} className={'font-bold'} />]} />
                </span>
              </div>
              <Box
                sx={{
                  background: `var(--color-${option.name}-bg)`,
                  border: `1px solid var(--color-${option.name}-border)`,
                }}
                className={'absolute right-0 top-[50%] w-[250px] rounded-2xl p-8 max-sm:hidden md:visible'}
              >
                <Trans i18nKey={option.data.description} components={[<span key={0} className={'font-bold'} />]} />
              </Box>
            </div>
          </TabPanel>
        ))}
      </div>
      <div className={'bg-secondary flex rounded-2xl border border-[var(--button-secondary-contained-border)] p-1.5'}>
        {options.map((option) => (
          <div
            style={{
              background: selected === option.type ? `var(--color-${option.name}-contained)` : undefined,
              boxShadow: selected === option.type ? `var(--shadow-${option.name}-contained)` : undefined,
            }}
            onClick={() => setSelected(option.type)}
            key={option.type}
            className={
              'flex items-center justify-center rounded-2xl max-sm:h-[56px] max-sm:w-[56px] md:h-[60px] md:w-[60px]'
            }
          >
            <IconButton className={selected === option.type ? 'text-text-on-fill' : ''}>{option.icon}</IconButton>
          </div>
        ))}
      </div>
    </Box>
  );
}
