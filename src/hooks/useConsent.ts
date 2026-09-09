'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  CONSENT_EVENT,
  DEFAULT_CONSENT,
  clearConsent,
  readConsent,
  writeConsent,
  type ConsentState,
} from '@/lib/consent';
import { pushConsentState } from '@/lib/analytics';

/**
 * SÜTI-HOZZÁJÁRULÁS ÁLLAPOTA.
 * `decided === false` → meg kell jeleníteni a bannert.
 */
export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [decided, setDecided] = useState(true); // SSR-en nincs banner → nincs villanás
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored ?? DEFAULT_CONSENT);
    setDecided(stored !== null);
    setHydrated(true);
    if (stored) pushConsentState(stored);

    function onChange(event: Event) {
      const detail = (event as CustomEvent<ConsentState | null>).detail;
      setConsent(detail ?? DEFAULT_CONSENT);
      setDecided(detail !== null);
    }

    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const save = useCallback((next: { analytics: boolean; marketing: boolean }) => {
    const state = writeConsent(next);
    pushConsentState(state);
    return state;
  }, []);

  const acceptAll = useCallback(() => save({ analytics: true, marketing: true }), [save]);
  const rejectAll = useCallback(() => save({ analytics: false, marketing: false }), [save]);

  /** „Süti-beállítások” link a láblécből — újranyitja a bannert. */
  const reopen = useCallback(() => clearConsent(), []);

  return { consent, decided, hydrated, save, acceptAll, rejectAll, reopen };
}
