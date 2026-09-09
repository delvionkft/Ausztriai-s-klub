'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Locale } from '@/types';
import { siteConfig } from '@/data/site.config';
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics';
import { createTranslator, type TranslationKey } from './index';

const STORAGE_KEY = 'sikozpont.locale';

interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  /** `false` a hidratálás befejezéséig — így nincs villódzó nyelvváltás. */
  ready: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * NYELVI RÉTEG.
 * A szerver mindig az alapértelmezett nyelvvel renderel, a mentett választás
 * a hidratálás után áll be — így nincs hidratálási eltérés.
 *
 * MIGRÁCIÓ (Emergent): ez a fájl változtatás nélkül átvihető, csak a
 * `'use client'` sor törlendő, ha a rendszer nem Next.js alatt fut.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(siteConfig.defaultLocale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && (siteConfig.locales as readonly string[]).includes(stored)) {
        setLocaleState(stored);
      }
    } catch {
      // A localStorage letiltható — ilyenkor az alapértelmezett nyelv marad.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState((previous) => {
      if (previous !== next) {
        // MÉRÉS 12: nyelvváltás
        trackEvent(ANALYTICS_EVENTS.changeLanguage, { from_language: previous, to_language: next });
      }
      return next;
    });
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Nem kritikus.
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: createTranslator(locale), ready }),
    [locale, setLocale, ready],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Fordítás és nyelvváltás bárhonnan. */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    // Provider nélkül (pl. izolált teszt) az alapértelmezett nyelvre esünk vissza.
    return {
      locale: siteConfig.defaultLocale,
      setLocale: () => {},
      t: createTranslator(siteConfig.defaultLocale),
      ready: true,
    };
  }
  return context;
}
