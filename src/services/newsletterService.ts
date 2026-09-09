import type { SubmitResult } from '@/types';
import { isLiveBackend, mockResponse, request } from './apiClient';

/**
 * HÓÉRTESÍTŐ FELIRATKOZÁS
 * ----------------------------------------------------------------------------
 * ÉLESÍTÉS: POST /newsletter — a hírlevélszolgáltató (pl. Mailchimp, Brevo)
 * kulcsa kizárólag szerveroldalon használható.
 */
export async function subscribeToSnowAlert(email: string): Promise<SubmitResult> {
  if (isLiveBackend) {
    return request<SubmitResult>('/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
  }
  return mockResponse({ ok: true }, 700);
}
