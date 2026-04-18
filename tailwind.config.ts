import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#0b1020',
          soft: '#121a33',
          muted: '#1a2446',
        },
        accent: {
          DEFAULT: '#6366f1',
          soft: '#818cf8',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(99,102,241,0.25), 0 10px 40px -10px rgba(99,102,241,0.35)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 200ms ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
