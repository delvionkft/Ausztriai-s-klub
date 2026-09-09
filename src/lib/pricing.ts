import type { AgeGroup, AvailabilityDay, TicketType } from '@/types';
import { fees, guesthouse } from '@/data/accommodation';
import { getAvailabilityRange } from '@/data/availability';
import { seasonPeriods, ticketTypes } from '@/data/tickets';
import { parseISODate } from './date';

/* -------------------------------------------------------------------------- */
/*  Jegyárak                                                                  */
/* -------------------------------------------------------------------------- */

/** Az adott naphoz tartozó szezonális ársáv. */
export function periodForDate(iso: string) {
  return seasonPeriods.find((p) => iso >= p.from && iso <= p.to) ?? null;
}

/** Felnőtt napijegy ára az adott napon. Szezonon kívül az alapár érvényes. */
export function adultDayPrice(iso: string): number {
  const period = periodForDate(iso);
  if (period) return period.adultDayPrice;
  return ticketTypes.find((t) => t.id === 'day')?.prices.adult ?? 58;
}

/** Egy jegytípus ára korosztály szerint. */
export function ticketPrice(ticket: TicketType, group: AgeGroup): number | null {
  return ticket.prices[group] ?? null;
}

/* -------------------------------------------------------------------------- */
/*  Jegyajánló                                                                */
/* -------------------------------------------------------------------------- */

export type PartySize = 'solo' | 'couple' | 'family' | 'group';
export type StayLength = 'one' | 'weekend' | 'week' | 'season';
export type AgeMix = 'adult' | 'family' | 'youth' | 'senior';

export interface Recommendation {
  ticketId: string;
  ageGroup: AgeGroup;
  /** Hány főre / hány jegyre vonatkozik a kalkuláció. */
  quantity: number;
  reasonKey: 'season' | 'multi-day' | 'family' | 'single-day' | 'group';
  savingsEur: number;
}

/**
 * A jegyajánló logikája. Szándékosan egyszerű és átlátható: a szabályok itt
 * módosíthatók, a felület változtatás nélkül követi.
 */
export function recommendTicket(party: PartySize, length: StayLength, ages: AgeMix): Recommendation {
  const ageGroup: AgeGroup =
    ages === 'youth' ? 'student' : ages === 'senior' ? 'senior' : 'adult';
  const quantity = party === 'solo' ? 1 : party === 'couple' ? 2 : party === 'family' ? 4 : 12;

  if (length === 'season') {
    const season = ticketTypes.find((t) => t.id === 'season');
    const day = ticketTypes.find((t) => t.id === 'day');
    const savings = Math.max(
      0,
      (day?.prices[ageGroup] ?? 0) * 12 - (season?.prices[ageGroup] ?? 0),
    );
    return { ticketId: 'season', ageGroup, quantity, reasonKey: 'season', savingsEur: Math.round(savings) };
  }

  if (party === 'family' && ages === 'family' && length === 'one') {
    const family = ticketTypes.find((t) => t.id === 'family-day');
    const day = ticketTypes.find((t) => t.id === 'day');
    const separate = (day?.prices.adult ?? 0) * 2 + (day?.prices.child ?? 0) * 2;
    return {
      ticketId: 'family-day', ageGroup: 'adult', quantity: 1, reasonKey: 'family',
      savingsEur: Math.max(0, Math.round(separate - (family?.prices.adult ?? 0))),
    };
  }

  if (length === 'week') {
    const six = ticketTypes.find((t) => t.id === 'multi-6');
    const day = ticketTypes.find((t) => t.id === 'day');
    const savings = (day?.prices[ageGroup] ?? 0) * 6 - (six?.prices[ageGroup] ?? 0);
    return { ticketId: 'multi-6', ageGroup, quantity, reasonKey: 'multi-day', savingsEur: Math.max(0, Math.round(savings)) };
  }

  if (length === 'weekend') {
    const three = ticketTypes.find((t) => t.id === 'multi-3');
    const day = ticketTypes.find((t) => t.id === 'day');
    const savings = (day?.prices[ageGroup] ?? 0) * 3 - (three?.prices[ageGroup] ?? 0);
    return { ticketId: 'multi-3', ageGroup, quantity, reasonKey: 'multi-day', savingsEur: Math.max(0, Math.round(savings)) };
  }

  if (party === 'group') {
    const day = ticketTypes.find((t) => t.id === 'day');
    const base = (day?.prices[ageGroup] ?? 0) * quantity;
    return { ticketId: 'day', ageGroup, quantity, reasonKey: 'group', savingsEur: Math.round(base * 0.15) };
  }

  return { ticketId: 'day', ageGroup, quantity, reasonKey: 'single-day', savingsEur: 0 };
}

/* -------------------------------------------------------------------------- */
/*  Szállásár                                                                 */
/* -------------------------------------------------------------------------- */

export interface StayQuote {
  nights: number;
  guests: number;
  days: AvailabilityDay[];
  accommodationEur: number;
  cleaningEur: number;
  touristTaxEur: number;
  linenEur: number;
  totalEur: number;
  depositEur: number;
  /** Igaz, ha a kiválasztott időszakban van foglalt vagy opciós nap. */
  hasUnavailable: boolean;
  /** A tartományra érvényes legmagasabb minimum éjszakaszám. */
  requiredMinNights: number;
}

export function buildStayQuote(arrival: string, departure: string, guests: number): StayQuote | null {
  if (!arrival || !departure) return null;
  if (parseISODate(departure) <= parseISODate(arrival)) return null;

  const days = getAvailabilityRange(arrival, departure);
  if (days.length === 0) return null;

  const accommodationEur = days.reduce((sum, d) => sum + d.priceEur, 0);
  const cleaningEur = fees.cleaningFeeEur;
  const touristTaxEur = Math.round(fees.touristTaxPerPersonPerNightEur * guests * days.length * 100) / 100;
  const linenEur = fees.linenFeePerPersonEur * guests;

  return {
    nights: days.length,
    guests,
    days,
    accommodationEur,
    cleaningEur,
    touristTaxEur,
    linenEur,
    totalEur: Math.round((accommodationEur + cleaningEur + touristTaxEur + linenEur) * 100) / 100,
    depositEur: fees.depositEur,
    hasUnavailable: days.some((d) => d.state === 'booked' || d.state === 'option'),
    requiredMinNights: Math.max(...days.map((d) => d.minNights)),
  };
}

export const MAX_GUESTS = guesthouse.maxGuests;
