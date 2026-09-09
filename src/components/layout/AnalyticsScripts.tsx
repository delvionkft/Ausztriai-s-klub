'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GTM_ID, trackPageView } from '@/lib/analytics';
import { useConsent } from '@/hooks/useConsent';

/**
 * MÉRÉSI SZKRIPTEK BETÖLTÉSE — GA4 / Google Tag Manager
 * ----------------------------------------------------------------------------
 * A GTM konténer CSAK analitikai hozzájárulás után töltődik be, és csak akkor,
 * ha a `NEXT_PUBLIC_GTM_ID` ki van töltve. Enélkül a `trackEvent()` hívások
 * ugyanúgy lefutnak, csak a `window.dataLayer` tömbben állnak meg — így a
 * mérés bekötés előtt is tesztelhető a böngésző konzoljából.
 *
 * INTEGRÁCIÓ: `.env.local` → `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
 *
 * MIGRÁCIÓ (Emergent): a `usePathname()` helyére `useLocation().pathname` kerül.
 */
export function AnalyticsScripts() {
  const { consent } = useConsent();
  const pathname = usePathname();
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!GTM_ID || !consent.analytics || loadedRef.current) return;
    loadedRef.current = true;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    document.head.appendChild(script);
  }, [consent.analytics]);

  useEffect(() => {
    if (!consent.analytics || !pathname) return;
    trackPageView(pathname, typeof document !== 'undefined' ? document.title : undefined);
  }, [consent.analytics, pathname]);

  return null;
}
