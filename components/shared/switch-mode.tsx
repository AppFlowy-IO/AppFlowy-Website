'use client';

import LightIcon from '@/components/icons/light';
import DarkIcon from '@/components/icons/dark';
import {motion, AnimatePresence} from 'framer-motion';
import {setTheme} from '@/lib/set-theme';

export default function SwitchMode({
                                     onChangeMode,
                                     isDark,
                                   }: {
  isDark: boolean;
  onChangeMode: (dark?: boolean) => void;
}) {
  const handleToggleMode = () => {
    const dark = !isDark;

    setTheme(dark);
    onChangeMode(dark);
  };

  return (
    <div
      style={{
        justifyContent: !isDark ? 'flex-start' : 'flex-end',
      }}
      className={`switch-mode relative ml-4 box-border flex h-[45px] w-[85px] cursor-pointer items-center rounded-full bg-[#313339] transition-all duration-300`}
      onClick={handleToggleMode}
    >
      <div className={'absolute left-0 top-0 flex h-full w-full items-center justify-between text-white opacity-50'}>
        <i className={'pl-2'}>
          <LightIcon/>
        </i>
        <i className={'pr-2.5'}>
          <DarkIcon/>
        </i>
      </div>
      <motion.div layout className={`grid h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white`}>
        <AnimatePresence mode={'wait'} initial={false}>
          <motion.i
            key={isDark ? 'dark' : 'light'}
            className={'text-black'}
            initial={{y: -30, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: 30, opacity: 0}}
            transition={{duration: 0.2}}
          >
            {!isDark ? <LightIcon/> : <DarkIcon/>}
          </motion.i>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
