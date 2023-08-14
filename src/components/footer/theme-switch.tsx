'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

const lightBgCls = 'bg-gradient-to-b from-white via-purple-100 to-white';
const darkBgCls = 'bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800';

function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <div
      style={{
        justifyContent: !isDarkMode ? 'flex-start' : 'flex-end',
      }}
      className={`box-border flex h-[40px] w-[70px] cursor-pointer items-center rounded-full px-2 transition-all duration-300 ${
        !isDarkMode ? lightBgCls : darkBgCls
      }`}
      onClick={() => setIsDarkMode((prev) => !prev)}
    >
      <motion.div
        layout
        className={`grid h-[30px] w-[30px] items-center justify-center overflow-hidden rounded-full ${
          !isDarkMode ? 'bg-white' : 'bg-black'
        }`}
      >
        <AnimatePresence mode={'wait'} initial={false}>
          <motion.i
            key={isDarkMode ? 'dark' : 'light'}
            className={!isDarkMode ? 'text-text-title' : 'text-white'}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {!isDarkMode ? <SunIcon /> : <MoonIcon />}
          </motion.i>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ThemeSwitch;
