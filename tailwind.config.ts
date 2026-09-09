import type { Config } from 'tailwindcss';

/**
 * Központi design token készlet.
 * Szín, tipográfia, térköz és árnyék módosítás kizárólag itt + a globals.css-ben.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Mélykék — elsődleges márkaszín
        deep: {
          50: '#F1F6FB',
          100: '#DEEAF5',
          200: '#BCD4E9',
          300: '#8FB5D7',
          400: '#5A8FBF',
          500: '#356EA3',
          600: '#245586',
          700: '#1B426C',
          800: '#143253',
          900: '#0E2540',
          950: '#08182B',
        },
        // Jeges világoskék — felületek, háttér
        ice: {
          50: '#F6FBFE',
          100: '#EAF4FB',
          200: '#D5E9F6',
          300: '#B6D8EF',
          400: '#8FC1E3',
          500: '#66A6D3',
          600: '#4488BC',
        },
        // Türkiz — visszafogott akcentus
        glacier: {
          50: '#EFFAFA',
          100: '#D6F2F3',
          200: '#AEE5E7',
          300: '#79D0D5',
          400: '#43B4BB',
          500: '#22959D',
          600: '#177880',
          700: '#136067',
        },
        // Státuszszínek
        status: {
          open: '#15803D',
          openBg: '#ECFDF3',
          warn: '#B45309',
          warnBg: '#FFF7ED',
          closed: '#B91C1C',
          closedBg: '#FEF2F2',
          neutral: '#475569',
          neutralBg: '#F1F5F9',
        },
        snow: '#FFFFFF',
        frost: '#F7FAFC',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        display: ['clamp(1.875rem, 4vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        h1: ['clamp(1.75rem, 3.4vw, 2.5rem)', { lineHeight: '1.14', letterSpacing: '-0.018em' }],
        h2: ['clamp(1.375rem, 2.4vw, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.014em' }],
        h3: ['clamp(1.125rem, 1.6vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.008em' }],
      },
      borderRadius: {
        card: '1rem',
        panel: '1.5rem',
        pill: '999px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(8, 24, 43, 0.04), 0 1px 3px rgba(8, 24, 43, 0.06)',
        card: '0 2px 4px rgba(8, 24, 43, 0.04), 0 8px 24px -8px rgba(8, 24, 43, 0.12)',
        lift: '0 4px 8px rgba(8, 24, 43, 0.05), 0 16px 40px -12px rgba(8, 24, 43, 0.18)',
        inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.35s ease both',
        shimmer: 'shimmer 1.6s infinite',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
