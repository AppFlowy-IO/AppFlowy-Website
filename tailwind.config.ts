import type { Config } from 'tailwindcss';

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  important: '#body',
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      height: {
        22: '5.5rem',
      },
      width: {
        22: '5.5rem',
        21: '5.25rem',
      },
      colors: {
        text: {
          DEFAULT: 'var(--color-text)',
          'on-fill': 'var(--color-text-on-fill)',
          icon: 'var(--color-text-icon)',
          gray: 'var(--color-text-gray)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          divider: 'var(--color-primary-divider)',
          hover: 'var(--color-primary-hover)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
        },
        bg: {
          DEFAULT: 'var(--color-bg)',
          hover: 'var(--color-bg-hover)',
          footer: 'var(--color-bg-footer)',
        },
      },
      boxShadow: {},
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
