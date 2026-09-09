'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Locale, Localized } from '@/types';
import { track } from '@/lib/analytics';
import { DEFAULT_LOCALE, getDictionary, isLocale, pick, type Dictionary } from './index';

const STORAGE_KEY = 'silbergrat.locale';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Teljes szótár — `t.nav.tickets` formában használható. */
  t: Dictionary;
  /** Nyelvfüggő adatmező kiolvasása visszaeséssel. */
  L: (value: Localized) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Frissítés után is megmarad a nyelvválasztás.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) setLocaleState(stored);
    } catch {
      /* privát böngészés — marad az alapértelmezett nyelv */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* nem kritikus */
    }
    track('change_language', { language: next });
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const t = getDictionary(locale);
    return { locale, setLocale, t, L: (v: Localized) => pick(v, locale) };
  }, [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Szerveroldali vagy provider nélküli render: magyar alapértelmezés.
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => undefined,
      t: getDictionary(DEFAULT_LOCALE),
      L: (v: Localized) => pick(v, DEFAULT_LOCALE),
    };
  }
  return ctx;
}
