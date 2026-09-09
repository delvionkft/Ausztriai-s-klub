import type { NewsletterPayload, ServiceResult } from '@/types';
import { isValidEmail } from '@/lib/format';
import { mockDelay } from './apiClient';

/**
 * HÓRIASZTÓ FELIRATKOZÁS
 * INTEGRÁCIÓ: POST /newsletter/subscribe (vagy külső lista-szolgáltató).
 * Jelenleg demó: az e-mail cím nem hagyja el a böngészőt.
 */
export async function subscribeToSnowAlert(
  payload: NewsletterPayload,
): Promise<ServiceResult> {
  if (!isValidEmail(payload.email)) {
    return { ok: false, message: 'Kérünk, adj meg egy érvényes e-mail címet.' };
  }

  // INTEGRÁCIÓ: return apiFetch('/newsletter/subscribe', { method: 'POST', ... });
  return mockDelay({
    ok: true,
    message: 'Feliratkoztunk! Szólunk, amint friss hó érkezik.',
  });
}
