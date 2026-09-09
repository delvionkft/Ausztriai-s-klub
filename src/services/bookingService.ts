import type { AvailabilityState, QuoteRequestPayload, ServiceResult } from '@/types';
import { buildAvailabilityMap } from '@/lib/availability';
import { isValidEmail, isValidPhone } from '@/lib/format';
import { mockDelay } from './apiClient';

/**
 * FOGLALÁS ÉS AJÁNLATKÉRÉS SERVICE
 * ----------------------------------------------------------------------------
 * INTEGRÁCIÓ (Emergent):
 *   - `getAvailability()` → GET /availability  (channel manager / PMS)
 *   - `submitQuoteRequest()` → POST /quote-requests (e-mail + CRM)
 * A jelenlegi implementáció kliensoldali demó: nem küld adatot sehova.
 */

export async function getAvailability(): Promise<Map<string, AvailabilityState>> {
  // return apiFetch<AvailabilityDay[]>('/availability').then(toMap);
  return mockDelay(buildAvailabilityMap(), 300);
}

export interface QuoteValidationErrors {
  arrival?: string;
  departure?: string;
  guests?: string;
  groupType?: string;
  contactName?: string;
  email?: string;
  phone?: string;
}

/** Kliensoldali validáció — ugyanezt a backendnek is el kell végeznie. */
export function validateQuoteRequest(payload: Partial<QuoteRequestPayload>): QuoteValidationErrors {
  const errors: QuoteValidationErrors = {};

  if (!payload.arrival) errors.arrival = 'Add meg az érkezés dátumát.';
  if (!payload.departure) errors.departure = 'Add meg a távozás dátumát.';
  if (payload.arrival && payload.departure && payload.departure <= payload.arrival) {
    errors.departure = 'A távozás legyen későbbi, mint az érkezés.';
  }
  if (!payload.guests || payload.guests < 1) errors.guests = 'Add meg a létszámot (legalább 1 fő).';
  if (!payload.groupType) errors.groupType = 'Válaszd ki a csoport típusát.';
  if (!payload.contactName || payload.contactName.trim().length < 2) {
    errors.contactName = 'Add meg a kapcsolattartó nevét.';
  }
  if (!payload.email || !isValidEmail(payload.email)) {
    errors.email = 'Add meg egy érvényes e-mail címet.';
  }
  if (!payload.phone || !isValidPhone(payload.phone)) {
    errors.phone = 'Add meg egy érvényes telefonszámot.';
  }

  return errors;
}

export async function submitQuoteRequest(
  payload: QuoteRequestPayload,
): Promise<ServiceResult<{ reference: string }>> {
  const errors = validateQuoteRequest(payload);
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: 'Az űrlap hiányosan lett kitöltve.' };
  }

  // INTEGRÁCIÓ: return apiFetch('/quote-requests', { method: 'POST', body: JSON.stringify(payload) });
  // DEMÓ: az adat nem hagyja el a böngészőt.
  const reference = `DEMO-${payload.arrival.replace(/-/g, '')}`;
  return mockDelay({
    ok: true,
    message: 'Köszönjük! 24 órán belül személyes ajánlatot küldünk.',
    data: { reference },
  });
}
