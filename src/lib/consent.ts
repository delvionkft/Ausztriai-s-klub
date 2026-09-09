/**
 * SÜTI- ÉS ADATVÉDELMI RÉTEG
 * ----------------------------------------------------------------------------
 * Keretrendszer-független (nincs benne React és Next.js) — az Emergentre
 * változtatás nélkül átvihető.
 *
 * Alapelv: MINDEN nem szükséges kategória alapértelmezetten TILTOTT.
 * Analitikai vagy marketing szkript csak elfogadás után tölthet be.
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO időbélyeg — a hozzájárulás bizonyítható időpontja (GDPR). */
  decidedAt: string | null;
  /** A szabályzat verziója; növelése újra bekéri a hozzájárulást. */
  version: number;
}

/** Ha a süti-tájékoztató változik, ezt kell növelni. */
export const CONSENT_VERSION = 1;

export const STORAGE_KEY = 'sikozpont.consent';

/** Az esemény, amire a React réteg feliratkozik. */
export const CONSENT_EVENT = 'sikozpont:consent-change';

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  decidedAt: null,
  version: CONSENT_VERSION,
};

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/** A mentett döntés, vagy `null`, ha még nem döntött (→ bannert kell mutatni). */
export function readConsent(): ConsentState | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      decidedAt: typeof parsed.decidedAt === 'string' ? parsed.decidedAt : null,
      version: CONSENT_VERSION,
    };
  } catch {
    // Letiltott localStorage → úgy kezeljük, mintha nem döntött volna.
    return null;
  }
}

export function writeConsent(next: Pick<ConsentState, 'analytics' | 'marketing'>): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: next.analytics,
    marketing: next.marketing,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Nem kritikus: a döntés a munkamenetre így is érvényes.
    }
    window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  }

  return state;
}

export function clearConsent(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nem kritikus.
  }
  window.dispatchEvent(new CustomEvent<ConsentState | null>(CONSENT_EVENT, { detail: null }));
}

/** Egyetlen kategória állapota. A `necessary` mindig igaz. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === 'necessary') return true;
  const state = readConsent();
  return state ? state[category] === true : false;
}
