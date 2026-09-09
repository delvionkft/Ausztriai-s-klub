'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Locale } from '@/types';
import { siteConfig } from '@/data/site.config';

const STORAGE_KEY = 'sikozpont.locale';

/**
 * NYELVVÁLASZTÓ — DEMÓ
 * A felület jelenleg magyar nyelvű. A választás elmentődik, és a `lang`
 * attribútumot is állítja, de fordítási szótár még nincs.
 * INTEGRÁCIÓ: i18n könyvtár (pl. next-intl / react-i18next) bekötése esetén
 * ez a hook adja majd az aktív nyelvet.
 */
export function useLocale() {
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

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Nem kritikus.
    }
  }, []);

  return { locale, setLocale, ready };
}
