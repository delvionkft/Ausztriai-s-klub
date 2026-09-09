import { availabilitySeason, bookedRanges, optionRanges, pricingRules } from '@/data/availability';
import type { AvailabilityState } from '@/types';
import { addDays, isWithinRange, nightsBetween } from './date';

/**
 * Foglaltság-számítás — tiszta függvények, keretrendszertől függetlenek.
 * INTEGRÁCIÓ: éles működésben a `bookedRanges` / `optionRanges` a foglalási
 * rendszerből érkezik; az itteni logika változatlanul használható marad.
 */

function inAnyRange(iso: string, ranges: Array<{ from: string; to: string }>): boolean {
  return ranges.some((range) => isWithinRange(iso, range.from, range.to));
}

/** Alapállapot minimum-éjszaka vizsgálat nélkül. */
function baseState(iso: string): AvailabilityState {
  if (inAnyRange(iso, bookedRanges)) return 'booked';
  if (inAnyRange(iso, optionRanges)) return 'option';
  return 'free';
}

/**
 * Teljes állapottérkép a szezonra.
 * Egy szabad nap `min-stay-blocked`, ha a körülötte lévő összefüggő szabad
 * sáv rövidebb, mint a minimum tartózkodás.
 */
export function buildAvailabilityMap(): Map<string, AvailabilityState> {
  const map = new Map<string, AvailabilityState>();
  const days: string[] = [];
  for (let iso: string = availabilitySeason.from; iso <= availabilitySeason.to; iso = addDays(iso, 1)) {
    days.push(iso);
    map.set(iso, baseState(iso));
  }

  let runStart = 0;
  for (let i = 0; i <= days.length; i += 1) {
    const isFree = i < days.length && map.get(days[i]) === 'free';
    if (!isFree) {
      const runLength = i - runStart;
      if (runLength > 0 && runLength < pricingRules.minStayNights) {
        for (let j = runStart; j < i; j += 1) map.set(days[j], 'min-stay-blocked');
      }
      runStart = i + 1;
    }
  }

  return map;
}

export function getAvailabilityState(
  map: Map<string, AvailabilityState>,
  iso: string,
): AvailabilityState | 'out-of-season' {
  if (iso < availabilitySeason.from || iso > availabilitySeason.to) return 'out-of-season';
  return map.get(iso) ?? 'free';
}

export interface RangeValidation {
  ok: boolean;
  nights: number;
  error?: string;
}

/** Kiválasztott érkezés–távozás pár ellenőrzése. */
export function validateRange(
  map: Map<string, AvailabilityState>,
  arrival: string,
  departure: string,
): RangeValidation {
  const nights = nightsBetween(arrival, departure);

  if (nights <= 0) {
    return { ok: false, nights: 0, error: 'A távozás dátuma legyen későbbi, mint az érkezésé.' };
  }
  if (nights < pricingRules.minStayNights) {
    return {
      ok: false,
      nights,
      error: `A minimum tartózkodás ${pricingRules.minStayNights} éjszaka.`,
    };
  }

  // A távozás napja már nem éjszaka, ezért nem vizsgáljuk.
  for (let iso = arrival; iso < departure; iso = addDays(iso, 1)) {
    const state = getAvailationSafe(map, iso);
    if (state === 'booked' || state === 'option') {
      return { ok: false, nights, error: 'A kiválasztott időszakban van már lefoglalt vagy opciós nap.' };
    }
    if (state === 'out-of-season') {
      return { ok: false, nights, error: 'A kiválasztott időszak kívül esik a meghirdetett szezonon.' };
    }
  }

  return { ok: true, nights };
}

function getAvailationSafe(
  map: Map<string, AvailabilityState>,
  iso: string,
): AvailabilityState | 'out-of-season' {
  return getAvailabilityState(map, iso);
}
