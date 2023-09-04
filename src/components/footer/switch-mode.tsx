import { useEffect, useState } from 'react';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BedtimeIcon from '@mui/icons-material/BedtimeOutlined';
import { Storage } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';

export default function SwitchMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('dark-mode', String(darkMode));
  }, [darkMode]);
  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      Storage.set('darkMode', String(!prev));
      return !prev;
    });
  };

  useEffect(() => {
    const darkMode = Storage.get('darkMode');

    setDarkMode(darkMode === 'true');
  }, []);

  return (
    <div
      style={{
        justifyContent: !darkMode ? 'flex-start' : 'flex-end',
      }}
      className={`relative ml-4 box-border flex h-[41px] w-[85px] cursor-pointer items-center rounded-full bg-[var(--color-footer-switch-mode-bg)] transition-all duration-300`}
      onClick={handleToggleDarkMode}
    >
      <div
        className={'absolute left-0 top-0 flex h-full w-full items-center justify-between px-2 text-white opacity-50'}
      >
        <WbSunnyOutlinedIcon />
        <BedtimeIcon />
      </div>
      <motion.div
        layout
        className={`grid h-10 w-10 items-center justify-center overflow-hidden rounded-full ${
          !darkMode ? 'bg-white' : 'bg-gray-900'
        }`}
      >
        <AnimatePresence mode={'wait'} initial={false}>
          <motion.i
            key={darkMode ? 'dark' : 'light'}
            className={!darkMode ? 'text-text-icon' : 'text-white'}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {!darkMode ? <WbSunnyOutlinedIcon /> : <BedtimeIcon />}
          </motion.i>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
