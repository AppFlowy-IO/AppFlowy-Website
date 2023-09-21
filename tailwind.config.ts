import type { Config } from 'tailwindcss';

const config: Config = {
  important: '#body',
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          20: 'var(--color-primary-20)',
          10: 'var(--color-primary-10)',
        },
        'night-blue': '#000212',
        midnight: '#12101E',

        'dark-card': 'rgba(38, 32, 59, 0.80)',
        'purple-dream': '#A952FF',
        'royal-purple': '#8427E0',
        'magic-orchid': '#7D26DE',
        'deep-indigo': '#7033B2',
        'midnight-plum': '#571a99',
        'deep-violet': '#593388',
        'fresh-purple': '#A074D0',
        'sky-blue': '#D6F9FF',
        'fresh-azure': '#00B5FF',
        'ice-blue': '#00BCF0',
        'lake-blue': '#007297',
        'pastel-pink': '#FDDCFA',
        'rose-red': '#7F1B4F',
        'fresh-red': '#FB006D',
        'light-pink': '#FFE6EE',
        'rust-brown': '#7E4523',
        'pale-yellow': '#FFEFE3',
        'olive-green': '#605D0B',
        'mint-green': '#DDFFD6',
        'forest-green': '#10672E',
        'light-gray': '#F2F2F2',
        'light-gray-40': 'rgba(229, 229, 229, 0.40)',
        'gray-10': 'rgba(247, 248, 248, 0.10)',
        'gray-15': 'rgba(247, 248, 248, 0.15)',
        'gray-03': 'rgba(247, 248, 248, 0.03)',
        'gray-40': 'rgba(242, 241, 241, 0.40)',
        'light-blue-gray': '#EEF1FF',
        'lavender-purple': '#8A5EB7',
        'dark-gray': 'rgba(247, 248, 248, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
