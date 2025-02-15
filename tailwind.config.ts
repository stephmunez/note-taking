import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-noto-serif)', ...defaultTheme.fontFamily.serif],
        mono: ['var(--font-source-code-pro)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'neutral-950': '#0E121B',
        'neutral-900': '#191B25',
        'neutral-800': '#232530',
        'neutral-700': '#2B303B',
        'neutral-600': '#525866',
        'neutral-500': '#717784',
        'neutral-400': '#99A0AE',
        'neutral-300': '#CACFD8',
        'neutral-200': '#E0E4EA',
        'neutral-100': '#F3F5F8',
        'neutral-50': '#F5F7FA',
        'neutral-0': '#FFFFFF',
        'blue-700': '#2547D0',
        'blue-500': '#335CFF',
        'blue-50': '#EBF1FF',
        'green-500': '#21C16B',
        'green-100': '#D1FBE9',
        'red-500': '#FB3748',
        'red-100': '#FFD5D8',
      },
    },
  },
  plugins: [],
} satisfies Config;
