import type { PricingRules } from '@/types';

/**
 * FOGLALTSÁG ÉS ÁRAZÁS (teljes ház)
 * ----------------------------------------------------------------------------
 * DEMÓ ADAT. A naptár és az árkalkulátor kliensoldali demóként működik.
 * INTEGRÁCIÓ: a `src/services/bookingService.ts` fájlban cseréld a
 * `getAvailability()` hívást valós foglalási rendszerre (channel manager / PMS).
 */

/** A demó naptár által lefedett szezon. */
export const availabilitySeason = {
  from: '2025-12-01',
  to: '2026-04-30',
  /** A naptárban alapértelmezetten megnyíló hónap. */
  defaultMonth: '2026-01',
} as const;

/** Már lefoglalt időszakok (zárt intervallum, mindkét végpont foglalt). */
export const bookedRanges: Array<{ from: string; to: string }> = [
  { from: '2025-12-20', to: '2025-12-27' },
  { from: '2026-01-02', to: '2026-01-06' },
  { from: '2026-01-23', to: '2026-01-25' },
  { from: '2026-02-13', to: '2026-02-21' },
  { from: '2026-03-06', to: '2026-03-09' },
];

/** Opciós (előfoglalt, még nem véglegesített) időszakok. */
export const optionRanges: Array<{ from: string; to: string }> = [
  { from: '2026-01-30', to: '2026-02-01' },
  { from: '2026-03-20', to: '2026-03-22' },
];

export const pricingRules: PricingRules = {
  /** DEMÓ bázisár — teljes ház / éjszaka. */
  baseNightlyPrice: 480,
  cleaningFee: 120,
  touristTaxPerPersonPerNight: 2.5,
  extraMandatoryFees: [
    { id: 'linen', label: 'Ágynemű és törölköző', amount: 8, note: 'fő / tartózkodás' },
    { id: 'energy', label: 'Fűtés és energia átalány', amount: 25, note: 'éjszaka' },
  ],
  /** Kaució — visszatérítendő, az összesítőben külön kezelve. */
  deposit: 500,
  currency: 'EUR',
  minStayNights: 3,
  /** Maximális létszám tulajdonosi adat → `null`. */
  maxGuests: null,
  seasonalMultipliers: [
    {
      id: 'high',
      label: 'Főszezon',
      multiplier: 1.25,
      ranges: [
        { from: '2025-12-20', to: '2026-01-10' },
        { from: '2026-02-13', to: '2026-02-28' },
      ],
    },
    {
      id: 'mid',
      label: 'Közepes szezon',
      multiplier: 1,
      ranges: [
        { from: '2026-01-11', to: '2026-02-12' },
        { from: '2026-03-01', to: '2026-03-15' },
      ],
    },
    {
      id: 'low',
      label: 'Alacsony szezon',
      multiplier: 0.85,
      ranges: [
        { from: '2025-12-01', to: '2025-12-19' },
        { from: '2026-03-16', to: '2026-04-30' },
      ],
    },
  ],
};

export const availabilityLegend = [
  { state: 'free', label: 'Szabad' },
  { state: 'booked', label: 'Foglalt' },
  { state: 'option', label: 'Opciós' },
  { state: 'min-stay-blocked', label: `Min. ${pricingRules.minStayNights} éjszaka miatt zárt` },
] as const;

export const groupTypeOptions = [
  { value: 'friends', label: 'Baráti társaság' },
  { value: 'families', label: 'Több család' },
  { value: 'club', label: 'Sportklub / egyesület' },
  { value: 'company', label: 'Céges csapat' },
  { value: 'other', label: 'Egyéb' },
];

/** Ajánlatkérés folyamatjelző (drótváz 10/02). */
export const quoteProcessSteps = [
  { id: 'calendar', label: 'Naptár' },
  { id: 'request', label: 'Ajánlatkérés' },
  { id: 'offer', label: 'Ajánlat' },
  { id: 'booking', label: 'Foglalás' },
  { id: 'payment', label: 'Fizetés' },
] as const;
