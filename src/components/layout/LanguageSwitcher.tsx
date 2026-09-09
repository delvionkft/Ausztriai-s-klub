'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';
import type { Locale } from '@/types';
import { LOCALES, localeLabels } from '@/i18n';
import { useI18n } from '@/i18n/LocaleProvider';
import { cn } from '@/lib/cn';

/**
 * NYELVVÁLASZTÓ
 * ----------------------------------------------------------------------------
 * A választás a `localStorage`-ban marad meg, így oldalváltáskor és frissítés
 * után is érvényes. A gomb legalább 44 pixel magas, mobilon is használható.
 */
export function LanguageSwitcher({ invert = false, variant = 'dropdown' }: { invert?: boolean; variant?: 'dropdown' | 'inline' }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (next: Locale) => { setLocale(next); setOpen(false); };

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-1" role="group" aria-label={t.a11y.languageSwitcher}>
        {LOCALES.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => choose(code)}
            aria-pressed={locale === code}
            className={cn(
              'tap-target rounded-pill px-3 text-sm font-bold transition-colors',
              locale === code
                ? 'bg-glacier-400 text-night-950'
                : invert ? 'text-frost-300 hover:bg-white/10 hover:text-white' : 'text-night-500 hover:bg-night-50 hover:text-night-900',
            )}
          >
            {localeLabels[code].short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.a11y.languageSwitcher}
        className={cn(
          'tap-target inline-flex items-center gap-1.5 rounded-pill px-3 text-sm font-semibold transition-colors',
          invert ? 'text-frost-200 hover:bg-white/10 hover:text-white' : 'text-night-700 hover:bg-night-50 hover:text-night-950',
        )}
      >
        <Globe aria-hidden="true" className="h-4 w-4" />
        {localeLabels[locale].short}
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 animate-slide-down overflow-hidden rounded-card border border-night-100 bg-white p-1.5 shadow-lift"
        >
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => choose(code)}
                className={cn(
                  'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
                  locale === code ? 'bg-frost-200 text-night-950' : 'text-night-700 hover:bg-frost-100',
                )}
              >
                <span>{localeLabels[code].long}</span>
                {locale === code ? <Check aria-hidden="true" className="h-4 w-4 text-glacier-500" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
