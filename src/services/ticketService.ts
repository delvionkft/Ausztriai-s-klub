import type { SubmitResult } from '@/types';
import { isLiveBackend, mockResponse, request } from './apiClient';

/**
 * JEGYÉRTÉKESÍTÉS
 * ----------------------------------------------------------------------------
 * ÉLESÍTÉS: itt indul a fizetési folyamat. A jegyértékesítő rendszer
 * (pl. Skidata, Axess, Skipass-webshop) `checkoutUrl`-t ad vissza, a felület
 * pedig oda irányít. A fizetési kulcs SOHA nem kerül a böngészőbe.
 */
export interface CheckoutRequest {
  ticketId: string;
  quantity: number;
  date: string;
  ageGroup: string;
}

export interface CheckoutResponse extends SubmitResult {
  checkoutUrl?: string;
}

export async function startTicketCheckout(payload: CheckoutRequest): Promise<CheckoutResponse> {
  if (isLiveBackend) {
    return request<CheckoutResponse>('/checkout', { method: 'POST', body: JSON.stringify(payload) });
  }
  // Mock: működő demo-folyamat valós fizetés nélkül.
  return mockResponse({ ok: true, reference: `DEMO-${payload.ticketId.toUpperCase()}` }, 850);
}
