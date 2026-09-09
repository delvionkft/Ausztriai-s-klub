import type { AvailabilityDay, InquiryPayload, SubmitResult } from '@/types';
import { getAvailabilityMonth } from '@/data/availability';
import { isLiveBackend, mockResponse, request } from './apiClient';

/**
 * SZÁLLÁSFOGLALÁS
 * ----------------------------------------------------------------------------
 * ÉLESÍTÉS:
 *  - foglaltság:  GET  /availability?year=&month=
 *  - ajánlatkérés: POST /inquiries
 * A szerveroldali e-mail-küldést és a channel manager hívását a backend végzi,
 * hogy titkos kulcs ne kerüljön a böngészőbe.
 */

export async function fetchAvailability(year: number, month: number): Promise<AvailabilityDay[]> {
  if (isLiveBackend) return request<AvailabilityDay[]>(`/availability?year=${year}&month=${month + 1}`);
  return mockResponse(getAvailabilityMonth(year, month), 180);
}

function makeReference(): string {
  const now = new Date();
  const stamp = `${now.getFullYear()}${`${now.getMonth() + 1}`.padStart(2, '0')}${`${now.getDate()}`.padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ALM-${stamp}-${rand}`;
}

export async function submitInquiry(payload: InquiryPayload): Promise<SubmitResult> {
  if (isLiveBackend) {
    return request<SubmitResult>('/inquiries', { method: 'POST', body: JSON.stringify(payload) });
  }
  // Mock: a beküldés sikeres, és azonosítót ad vissza — a felület így teljes
  // értékűen kipróbálható éles backend nélkül is.
  return mockResponse({ ok: true, reference: makeReference() }, 900);
}
