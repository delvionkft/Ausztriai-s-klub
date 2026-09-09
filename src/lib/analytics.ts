/**
 * MÉRÉS — GA4 / Google Tag Manager előkészítés
 * ----------------------------------------------------------------------------
 * Keretrendszer-független (nincs benne React és Next.js).
 *
 * Működés:
 *  - Minden esemény a `window.dataLayer` tömbbe kerül (GTM szabvány).
 *  - GTM-ben elég `event` triggert létrehozni az alábbi nevekre, és GA4
 *    eseményre kötni — a kódot NEM kell módosítani.
 *  - Analitikai hozzájárulás nélkül SEMMI nem kerül a dataLayerbe.
 *  - Ha nincs bekötve GTM (`NEXT_PUBLIC_GTM_ID` üres), az események
 *    fejlesztői módban a konzolra kerülnek, hogy tesztelhetők legyenek.
 */
import { hasConsent } from './consent';

/** Az összes mért esemény neve — a brief 12 kötelező eseménye + 2 kiegészítő. */
export const ANALYTICS_EVENTS = {
  /** 1. Jegyvásárlás megkezdése */
  beginTicketPurchase: 'begin_ticket_purchase',
  /** 2. Ajánlott jegytípus megtekintése */
  viewRecommendedTicket: 'view_recommended_ticket',
  /** 3. Pályatérkép megnyitása */
  openSlopeMap: 'open_slope_map',
  /** 4. Webkamera megtekintése */
  viewWebcam: 'view_webcam',
  /** 5. Síiskolai foglalás megkezdése */
  beginSkiSchoolBooking: 'begin_ski_school_booking',
  /** 6. Dátum kiválasztása */
  selectDates: 'select_dates',
  /** 7. Szállásajánlat-kérés beküldése */
  submitQuoteRequest: 'submit_quote_request',
  /** 8. Telefonhívás indítása */
  clickPhone: 'click_phone',
  /** 9. WhatsApp-kattintás */
  clickWhatsapp: 'click_whatsapp',
  /** 10. E-mail-kattintás */
  clickEmail: 'click_email',
  /** 11. Hóértesítő feliratkozás */
  subscribeSnowAlert: 'subscribe_snow_alert',
  /** 12. Nyelvváltás */
  changeLanguage: 'change_language',
  /** + Süti-döntés (audithoz) */
  consentUpdate: 'consent_update',
  /** + Ajánlatkérő űrlap megkezdése (mikrokonverzió) */
  beginQuoteRequest: 'begin_quote_request',
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? '';

/** Az események, amelyek hozzájárulás nélkül is mehetnek (maga a döntés). */
const CONSENT_EXEMPT: AnalyticsEventName[] = [ANALYTICS_EVENTS.consentUpdate];

function pushToDataLayer(entry: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(entry);
}

/**
 * Esemény küldése.
 * @param name  az `ANALYTICS_EVENTS` egyik értéke
 * @param params tetszőleges GA4 paraméterek (snake_case kulcsokkal)
 */
export function trackEvent(name: AnalyticsEventName, params: AnalyticsPayload = {}): void {
  if (typeof window === 'undefined') return;

  if (!CONSENT_EXEMPT.includes(name) && !hasConsent('analytics')) {
    // Nincs analitikai hozzájárulás — az esemény eldobódik.
    return;
  }

  const entry = { event: name, ...params };
  pushToDataLayer(entry);

  if (!GTM_ID && process.env.NODE_ENV === 'development') {
    console.info('[analytics]', name, params);
  }
}

/**
 * Google Consent Mode v2 jelzés.
 * A GTM ezt olvassa ki, mielőtt bármilyen mérési szkriptet engedne.
 */
export function pushConsentState(state: { analytics: boolean; marketing: boolean }): void {
  pushToDataLayer({
    event: ANALYTICS_EVENTS.consentUpdate,
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: state.marketing ? 'granted' : 'denied',
  });
}

/** SPA oldalváltás jelzése (GTM „History Change” helyett megbízhatóbb). */
export function trackPageView(path: string, title?: string): void {
  if (!hasConsent('analytics')) return;
  pushToDataLayer({ event: 'page_view', page_path: path, page_title: title });
}
