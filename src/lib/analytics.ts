/**
 * MÉRÉS ÉS KONVERZIÓKÖVETÉS
 * ============================================================================
 * Minden eseményküldés ezen az egy segédfüggvényen megy keresztül, hogy a
 * GTM / GA4 bekötés egyetlen ponton történjen meg.
 *
 * BEKÖTÉS:
 *  1. `.env` -> NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
 *  2. A `src/components/layout/AnalyticsScripts.tsx` betölti a konténert.
 *  3. Innentől a `track()` hívások a `window.dataLayer`-be kerülnek.
 *
 * Amíg nincs GTM-azonosító, az események csak a dataLayer tömbbe gyűlnek —
 * semmilyen külső kérés nem indul, és a felület működése változatlan.
 */

export type AnalyticsEvent =
  | 'view_snow_report'
  | 'open_slope_map'
  | 'select_slope'
  | 'view_webcam'
  | 'start_ticket_recommendation'
  | 'complete_ticket_recommendation'
  | 'begin_ticket_checkout'
  | 'start_ski_school_booking'
  | 'select_accommodation_dates'
  | 'start_accommodation_inquiry'
  | 'submit_accommodation_inquiry'
  | 'click_phone'
  | 'click_whatsapp'
  | 'click_email'
  | 'subscribe_snow_alert'
  | 'change_language'
  | 'open_directions';

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? '';
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? '';

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

/** Kattintható elemekre köthető segéd — nem nyeli el az eredeti eseményt. */
export function trackClick(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  return () => track(event, params);
}
