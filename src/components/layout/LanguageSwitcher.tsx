'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { localeLabels, siteConfig } from '@/data/site.config';
import { useI18n } from '@/i18n/I18nProvider';
import { cn } from '@/lib/cn';

/**
 * NYELVVÁLASZTÓ — DE / EN / HU
 * A választás azonnal érvényesül (`src/i18n/` szótárak), elmentődik, és a
 * `<html lang>` értékét is állítja. Hiányzó kulcs esetén a magyar szöveg marad.
 * A nyelvváltás mérési eseményt is küld (MÉRÉS 12).
 */
export function LanguageSwitcher({
  variant = 'compact',
  className,
}: {
  variant?: 'compact' | 'inline';
  className?: string;
}) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (variant === 'inline') {
    return (
      <div className={cn('inline-flex items-center gap-1 rounded-pill bg-white/10 p-1', className)} role="group" aria-label={t('lang.label')}>
        {siteConfig.locales.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-current={locale === code ? 'true' : undefined}
            className={cn(
              'min-h-[36px] min-w-[46px] rounded-pill px-3 text-sm font-semibold transition-colors',
              locale === code ? 'bg-white text-deep-900' : 'text-white/80 hover:bg-white/10 hover:text-white',
            )}
          >
            {localeLabels[code].short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-pill border border-deep-200 px-3 text-sm font-semibold text-deep-700 transition-colors hover:border-deep-300 hover:bg-deep-50"
      >
        <Globe aria-hidden="true" className="h-4 w-4" />
        {localeLabels[locale].short}
        <ChevronDown aria-hidden="true" className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t('lang.select')}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-card border border-deep-100 bg-white py-1 shadow-lift"
        >
          {siteConfig.locales.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className="flex w-full min-h-[42px] items-center justify-between px-3 text-left text-sm text-deep-800 transition-colors hover:bg-deep-50"
              >
                <span>
                  <span className="font-semibold">{localeLabels[code].short}</span>
                  <span className="ml-2 text-deep-500">{localeLabels[code].long}</span>
                </span>
                {locale === code ? <Check aria-hidden="true" className="h-4 w-4 text-glacier-600" /> : null}
              </button>
            </li>
          ))}
          <li className="mt-1 border-t border-deep-100 px-3 py-2 text-[0.7rem] leading-snug text-deep-500">
            {t('lang.partial')}
          </li>
        </ul>
      ) : null}
    </div>
  );
}
