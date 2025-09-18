import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  important: '#body',
  darkMode: ['class'],
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          '10': 'var(--color-primary-10)',
          '20': 'var(--color-primary-20)',
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--primary-foreground)',
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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            code: {
              color: theme('colors.pink.600'),
              '&::before': { content: '"`"' },
              '&::after': { content: '"`"' },
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            pre: {
              color: theme('colors.gray.200'),
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'translate-z': (value) => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }), // this is actual CSS
        },
        { values: theme('translate'), supportsNegativeValues: true }
      );
    }),
    require('tailwindcss-animate'),
  ],
};

export default config;
