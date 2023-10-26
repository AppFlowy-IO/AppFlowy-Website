'use client';

import LightIcon from '@/components/icons/light';
import DarkIcon from '@/components/icons/dark';
import { motion } from 'framer-motion';
import { setTheme } from '@/lib/set-theme';
import { useDarkContext } from '@/lib/hooks/use-dark-context';
import { collectEvent, EventName } from '@/lib/collect';

export default function SwitchMode({ onChangeMode }: { onChangeMode: (dark?: boolean) => void }) {
  const isDark = useDarkContext();

  return (
    <div
      style={{
        justifyContent: !isDark ? 'flex-start' : 'flex-end',
      }}
      className={`switch-mode relative ml-4 box-border flex h-[45px] w-[85px] cursor-pointer items-center rounded-full bg-[#313339]`}
      onClick={() => {
        const dark = !isDark;

        collectEvent(EventName.switchMode, {
          mode: dark ? 'dark' : 'light',
        });
        setTheme(dark);
        onChangeMode(dark);
      }}
    >
      <div className={'absolute left-0 top-0 flex h-full w-full items-center justify-between text-white opacity-50'}>
        <i className={'pl-2.5'}>
          <LightIcon />
        </i>
        <i className={'pr-2.5'}>
          <DarkIcon />
        </i>
      </div>
      <div
        className={`dark:bg-primary relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white`}
      >
        <motion.i
          key={isDark ? 'dark' : 'light'}
          className={'text-black dark:text-white'}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{
            type: 'spring',
            stiffness: 700,
            damping: 30,
            duration: 0.2,
          }}
        >
          {!isDark ? <LightIcon /> : <DarkIcon />}
        </motion.i>
      </div>
    </div>
  );
}
