import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        // Fade up and down
        'fade-up': 'fade-up 0.5s',
        'fade-down': 'fade-down 0.5s',
        // Tooltip
        'slide-up-fade': 'slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-fade': 'slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        // Fade up and down
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '80%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '80%': {
            opacity: '0.6',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
        },
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          100: 'var(--color-primary-100)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          100: 'var(--color-danger-100)',
        },
        text: {
          title: 'var(--color-text-title)',
          'on-fill': 'var(--color-text-on-fill)',
          placeholder: 'var(--color-text-placeholder)',
          gray: 'var(--color-text-gray)',
        },
        body: 'var(--color-body)',
        'gray-body': 'var(--color-gray-body)',
        dividers: 'var(--color-dividers)',
        footer: {
          DEFAULT: 'var(--color-footer)',
          text: 'var(--color-footer-text)',
        },
        border: {
          gray: 'var(--color-gray-border)',
          purple: 'var(--color-purple-border)',
        },
      },
      boxShadow: {
        button: 'var(--shadow-button)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(({ addVariant }: PluginAPI) => {
      addVariant('radix-side-top', '&[data-side="top"]');
      addVariant('radix-side-bottom', '&[data-side="bottom"]');
    }),
  ],
};

export default config;
