import type { Config } from 'tailwindcss';

/**
 * KÖZPONTI DESIGN TOKENEK
 * ----------------------------------------------------------------------------
 * Szín, tipográfia, sugár, árnyék és animáció kizárólag itt és a
 * `src/app/globals.css` fájlban módosul. A komponensekben nincs beégetett
 * hexadecimális szín.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /** Mély éjkék — sötét szekciók alapja (#07111F). */
        night: {
          50: '#F2F6FB',
          100: '#E1EAF4',
          200: '#C2D3E7',
          300: '#95B2D2',
          400: '#5F86B2',
          500: '#3C6293',
          600: '#2C4A73',
          700: '#20375A',
          800: '#152742',
          900: '#102033',
          950: '#07111F',
        },
        /** Havas fehér és jeges világoskék felületek. */
        frost: {
          50: '#F8FBFF',
          100: '#EFF7FE',
          200: '#DCEFFC',
          300: '#C0E1F8',
          400: '#98CDF2',
          500: '#6FB4E8',
        },
        /** Élénk türkiz akcentus (#19C3E6). */
        glacier: {
          50: '#ECFCFF',
          100: '#CFF6FE',
          200: '#A5EDFD',
          300: '#66E0FA',
          400: '#19C3E6',
          500: '#0BA5C8',
          600: '#0C84A2',
          700: '#116984',
          800: '#17566C',
          900: '#17485C',
        },
        /** Világos kék CTA-kiemelés (#38BDF8). */
        sky: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        /** Státuszszínek — szöveg + ikon mindig kíséri őket. */
        state: {
          open: '#22C55E',
          openInk: '#15803D',
          openBg: '#EAFBF0',
          warn: '#F59E0B',
          warnInk: '#B45309',
          warnBg: '#FEF6E7',
          closed: '#EF4444',
          closedInk: '#B91C1C',
          closedBg: '#FEF0F0',
          idle: '#64748B',
          idleInk: '#475569',
          idleBg: '#F1F5F9',
        },
        /** Sípálya-nehézségek — nemzetközi jelölés. */
        piste: {
          blue: '#2563EB',
          red: '#DC2626',
          black: '#111827',
          skiroute: '#F97316',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Manrope', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4.6vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        display: ['clamp(1.75rem, 3.4vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.5rem, 2.6vw, 2.125rem)', { lineHeight: '1.16', letterSpacing: '-0.018em' }],
        h3: ['clamp(1.125rem, 1.7vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.0625rem, 1.3vw, 1.1875rem)', { lineHeight: '1.6' }],
      },
      borderRadius: {
        card: '1.25rem',
        panel: '1.75rem',
        pill: '999px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(7, 17, 31, 0.04), 0 2px 6px rgba(7, 17, 31, 0.05)',
        card: '0 2px 6px rgba(7, 17, 31, 0.05), 0 14px 34px -14px rgba(7, 17, 31, 0.22)',
        lift: '0 6px 14px rgba(7, 17, 31, 0.07), 0 26px 60px -22px rgba(7, 17, 31, 0.35)',
        glow: '0 10px 30px -10px rgba(25, 195, 230, 0.55)',
        ring: 'inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
      },
      maxWidth: {
        content: '1220px',
        wide: '1400px',
        prose: '68ch',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-down': { from: { opacity: '0', transform: 'translateY(-6px)' }, to: { opacity: '1', transform: 'none' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'pulse-dot': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        'drift-slow': { '0%, 100%': { transform: 'translate3d(0,0,0)' }, '50%': { transform: 'translate3d(-2%, -1%, 0)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.4s ease both',
        'slide-down': 'slide-down 0.22s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 1.6s infinite',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
        'drift-slow': 'drift-slow 26s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
