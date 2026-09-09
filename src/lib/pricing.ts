import { pricingRules } from '@/data/availability';
import { multiDayMultipliers, seasonalPriceBands, ticketProducts } from '@/data/tickets';
import type { AgeGroup, TicketProduct } from '@/types';
import { addDays, isWithinRange, nightsBetween } from './date';

/**
 * ÁRLOGIKA — tiszta függvények.
 * Minden bemenő szám az adatfájlokból jön (`src/data/tickets.ts`,
 * `src/data/availability.ts`), így az árazás cseréje nem érint komponenst.
 */

/* ------------------------------- Szállásár ------------------------------- */

export interface PriceLine {
  id: string;
  label: string;
  detail?: string;
  amount: number | null;
}

export interface AccommodationQuote {
  nights: number;
  guests: number;
  lines: PriceLine[];
  total: number | null;
  deposit: number | null;
  currency: string;
  /** `true`, ha bármelyik tétel tulajdonosi adatra vár. */
  hasPendingValues: boolean;
}

function seasonalMultiplierFor(iso: string): number {
  const band = pricingRules.seasonalMultipliers.find((item) =>
    item.ranges.some((range) => isWithinRange(iso, range.from, range.to)),
  );
  return band?.multiplier ?? 1;
}

/** Éjszakánkénti szállásdíj összege szezonális szorzókkal. */
export function calculateAccommodationTotal(arrival: string, departure: string): number | null {
  if (pricingRules.baseNightlyPrice === null) return null;
  let sum = 0;
  for (let iso = arrival; iso < departure; iso = addDays(iso, 1)) {
    sum += pricingRules.baseNightlyPrice * seasonalMultiplierFor(iso);
  }
  return Math.round(sum);
}

export function buildAccommodationQuote(
  arrival: string,
  departure: string,
  guests: number,
): AccommodationQuote {
  const nights = Math.max(0, nightsBetween(arrival, departure));
  const stayTotal = nights > 0 ? calculateAccommodationTotal(arrival, departure) : 0;

  const touristTax =
    pricingRules.touristTaxPerPersonPerNight === null
      ? null
      : Math.round(pricingRules.touristTaxPerPersonPerNight * guests * nights * 100) / 100;

  const lines: PriceLine[] = [
    {
      id: 'stay',
      label: 'Szállásdíj',
      detail: `${nights} éjszaka × szezonális ár (teljes ház)`,
      amount: stayTotal,
    },
    {
      id: 'cleaning',
      label: 'Takarítási díj',
      detail: 'egyszeri',
      amount: pricingRules.cleaningFee,
    },
    {
      id: 'tourist-tax',
      label: 'Idegenforgalmi adó',
      detail: `${guests} fő × ${nights} éjszaka`,
      amount: touristTax,
    },
    ...pricingRules.extraMandatoryFees.map((fee) => ({
      id: fee.id,
      label: fee.label,
      detail: fee.note ?? undefined,
      amount:
        fee.amount === null
          ? null
          : fee.note === 'fő / tartózkodás'
            ? Math.round(fee.amount * guests)
            : Math.round(fee.amount * nights),
    })),
  ];

  const hasPendingValues = lines.some((line) => line.amount === null);
  const total = hasPendingValues
    ? null
    : Math.round(lines.reduce((sum, line) => sum + (line.amount ?? 0), 0) * 100) / 100;

  return {
    nights,
    guests,
    lines,
    total,
    deposit: pricingRules.deposit,
    currency: pricingRules.currency,
    hasPendingValues,
  };
}

/* --------------------------------- Jegyár --------------------------------- */

export interface TicketRecommendation {
  product: TicketProduct;
  ageGroup: AgeGroup;
  people: number;
  days: number;
  unitPrice: number | null;
  totalPrice: number | null;
  reason: string;
}

/** Szezonális szorzó a jegyárakhoz (naptáras árnézethez is használjuk). */
export function ticketSeasonMultiplier(iso: string): { multiplier: number; bandId: string; label: string } {
  const band = seasonalPriceBands.find((item) =>
    item.ranges.some((range) => isWithinRange(iso, range.from, range.to)),
  );
  return band
    ? { multiplier: band.multiplier, bandId: band.id, label: band.label }
    : { multiplier: 1, bandId: 'mid', label: 'Alapár' };
}

/**
 * Jegyajánló: létszám + napszám + korosztály → ajánlott jegytípus.
 * A logika átlátható és szándékosan egyszerű, hogy az üzemeltető is értse.
 */
export function recommendTicket(
  people: number,
  days: number,
  ageGroup: AgeGroup,
): TicketRecommendation {
  const byId = (id: string) => ticketProducts.find((p) => p.id === id)!;

  let product: TicketProduct;
  let reason: string;

  if (days >= 8) {
    product = byId('season');
    reason = '8 síelt nap felett a szezonbérlet kedvezőbb, mint a napijegyek összege.';
  } else if (days >= 2) {
    product = byId('multiday');
    reason = 'Egymást követő napokra a többnapos bérlet napi ára kedvezőbb.';
  } else {
    product = byId('day');
    reason = 'Egy teljes napra a napijegy a legegyszerűbb választás.';
  }

  const basePrice = product.priceByAgeGroup[ageGroup];
  let unitPrice: number | null = basePrice;

  if (basePrice !== null && product.duration === 'multiday') {
    const multiplier = multiDayMultipliers[Math.min(days, 7)] ?? days * 0.8;
    unitPrice = Math.round(basePrice * multiplier);
  }

  const totalPrice = unitPrice === null ? null : Math.round(unitPrice * people);

  return { product, ageGroup, people, days, unitPrice, totalPrice, reason };
}
