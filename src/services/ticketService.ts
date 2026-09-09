import { discounts, seasonalPriceBands, ticketProducts } from '@/data/tickets';
import type { AgeGroup, Discount, SeasonalPriceBand, TicketProduct } from '@/types';
import { recommendTicket, type TicketRecommendation } from '@/lib/pricing';
import { mockDelay } from './apiClient';

/**
 * JEGYSZOLGÁLTATÁS
 * INTEGRÁCIÓ: az online jegyértékesítő rendszer (pl. Skidata / Axess / saját
 * webshop) API-ját ide kell bekötni. A `startCheckout` jelenleg csak a jegyek
 * oldalra irányít — nincs fizetési folyamat.
 */

export async function getTicketProducts(): Promise<TicketProduct[]> {
  return mockDelay(ticketProducts, 200);
}

export async function getSeasonalPriceBands(): Promise<SeasonalPriceBand[]> {
  return mockDelay(seasonalPriceBands, 200);
}

export async function getDiscounts(): Promise<Discount[]> {
  return mockDelay(discounts, 200);
}

export function getRecommendation(people: number, days: number, ageGroup: AgeGroup): TicketRecommendation {
  return recommendTicket(people, days, ageGroup);
}

/**
 * INTEGRÁCIÓ: itt indul majd az online vásárlás.
 * Amíg nincs bekötve, a UI ezt jelzi is a felhasználónak.
 */
export const ONLINE_CHECKOUT_ENABLED = false;

export const checkoutUnavailableMessage =
  'Az online jegyvásárlás bekötése folyamatban. A jegy jelenleg a pénztárnál váltható meg.';
