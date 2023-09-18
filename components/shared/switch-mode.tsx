'use client';

import { useEffect, useState } from 'react';
import LightIcon from '@/components/icons/light';
import DarkIcon from '@/components/icons/dark';
import { Storage } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';

export default function SwitchMode() {
  const [dataMode, setDataMode] = useState('');

  const isDark = dataMode === 'dark;';

  useEffect(() => {
    if (dataMode) {
      document.documentElement.setAttribute('data-mode', dataMode);
    } else {
      document.documentElement.removeAttribute('data-mode');
    }
  }, [dataMode]);
  const handleToggledataMode = () => {
    setDataMode((prev) => {
      const mode = prev === 'dark' ? '' : 'dark';

      Storage.set('dataMode', mode);
      return mode;
    });
  };

  useEffect(() => {
    const dataMode = Storage.get('dataMode');

    setDataMode(dataMode);
  }, []);

  return (
    <div
      style={{
        justifyContent: !dataMode ? 'flex-start' : 'flex-end',
      }}
      className={`relative ml-4 box-border flex h-[45px] w-[85px] cursor-pointer items-center rounded-full bg-[#313339] transition-all duration-300`}
      onClick={handleToggledataMode}
    >
      <div
        className={'absolute left-0 top-0 flex h-full w-full items-center justify-between px-2 text-white opacity-50'}
      >
        <LightIcon />
        <DarkIcon />
      </div>
      <motion.div
        layout
        className={`grid h-10 w-10 items-center justify-center overflow-hidden rounded-full ${
          !dataMode ? 'bg-white' : 'bg-gray-900'
        }`}
      >
        <AnimatePresence mode={'wait'} initial={false}>
          <motion.i
            key={isDark ? 'dark' : 'light'}
            className={!isDark ? 'text-text-icon' : 'text-white'}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {!isDark ? <LightIcon /> : <DarkIcon />}
          </motion.i>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
