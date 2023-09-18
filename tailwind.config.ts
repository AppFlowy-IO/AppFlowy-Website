import type { Config } from 'tailwindcss';

const config: Config = {
  important: '#body',
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        text: 'var(--color-text)',
        'text-caption': 'var(--color-text-caption)',
        'text-on-fill': 'var(--color-text-on-fill)',
        'primary-border': 'var(--color-primary-border)',
      },
    },
  },
  plugins: [],
};

export default config;
