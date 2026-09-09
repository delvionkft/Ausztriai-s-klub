import type { AgeGroup, Discount, SeasonalPriceBand, TicketProduct } from '@/types';

/**
 * JEGYEK ÉS ÁRAK
 * ----------------------------------------------------------------------------
 * FONTOS: az itt szereplő összegek DEMÓ ÉRTÉKEK, kizárólag azért, hogy a
 * jegyajánló és az árkalkulátor működését be lehessen mutatni.
 * A felületen ez láthatóan jelezve van (`DEMO_DATA_ENABLED`).
 * A végleges árlistát ebben a fájlban kell kicserélni — komponenst nem érint.
 */

export const currency = 'EUR';

export const ageGroupLabels: Record<AgeGroup, string> = {
  child: 'Gyermek',
  youth: 'Ifjúsági',
  adult: 'Felnőtt',
  senior: 'Szenior',
};

export const ageGroupHints: Record<AgeGroup, string> = {
  child: 'Korhatár megadása szükséges',
  youth: 'Korhatár megadása szükséges',
  adult: 'Korhatár megadása szükséges',
  senior: 'Korhatár megadása szükséges',
};

export const ticketProducts: TicketProduct[] = [
  {
    id: 'halfday',
    name: 'Félnapos jegy',
    duration: 'halfday',
    description: 'Délelőtti vagy délutáni belépés, ha csak pár órát töltenél a hegyen.',
    priceByAgeGroup: { child: 22, youth: 30, adult: 38, senior: 32 },
    highlights: ['Rugalmas kezdés', 'Minden nyitott felvonóra érvényes'],
    recommendedFor: 'Rövid látogatás, késői érkezés',
  },
  {
    id: 'day',
    name: 'Napijegy',
    duration: 'day',
    description: 'Teljes napos síelés nyitástól zárásig, minden üzemelő felvonóval.',
    priceByAgeGroup: { child: 30, youth: 42, adult: 52, senior: 44 },
    highlights: ['Teljes nyitvatartás', 'Minden nyitott felvonó', 'Esti síelés külön jegy'],
    recommendedFor: 'Egynapos síelés',
  },
  {
    id: 'multiday',
    name: 'Többnapos bérlet',
    duration: 'multiday',
    description: 'Egymást követő napokra szóló bérlet — minél több nap, annál kedvezőbb a napi ár.',
    priceByAgeGroup: { child: 27, youth: 38, adult: 47, senior: 40 },
    highlights: ['Napi ár kedvezménnyel', 'Egyszeri kiváltás', 'Csoportnak is ajánlott'],
    recommendedFor: '2–7 nap közötti tartózkodás',
  },
  {
    id: 'season',
    name: 'Szezonbérlet',
    duration: 'season',
    description: 'Korlátlan síelés a teljes szezonban. Elővételben a legkedvezőbb.',
    priceByAgeGroup: { child: 210, youth: 290, adult: 390, senior: 320 },
    highlights: ['Korlátlan használat', 'Elővételi kedvezmény', 'Esti síelés is'],
    recommendedFor: '8 napnál több síelés egy szezonban',
  },
];

/** Többnapos bérlet napi szorzói (demó logika). */
export const multiDayMultipliers: Record<number, number> = {
  1: 1,
  2: 1.92,
  3: 2.79,
  4: 3.6,
  5: 4.35,
  6: 5.04,
  7: 5.67,
};

export const seasonalPriceBands: SeasonalPriceBand[] = [
  {
    id: 'low',
    label: 'Alacsony szezon',
    multiplier: 0.85,
    colorToken: 'low',
    ranges: [
      { from: '2025-12-05', to: '2025-12-19' },
      { from: '2026-01-11', to: '2026-02-05' },
      { from: '2026-03-16', to: '2026-04-06' },
    ],
  },
  {
    id: 'mid',
    label: 'Közepes szezon',
    multiplier: 1,
    colorToken: 'mid',
    ranges: [
      { from: '2026-02-06', to: '2026-02-12' },
      { from: '2026-03-01', to: '2026-03-15' },
    ],
  },
  {
    id: 'high',
    label: 'Főszezon',
    multiplier: 1.18,
    colorToken: 'high',
    ranges: [
      { from: '2025-12-20', to: '2026-01-10' },
      { from: '2026-02-13', to: '2026-02-28' },
    ],
  },
];

export const discounts: Discount[] = [
  {
    id: 'student',
    title: 'Diákkedvezmény',
    description: 'Érvényes diákigazolvány felmutatásával, a pénztárnál igazolva.',
    requirement: null,
    percent: null,
  },
  {
    id: 'senior',
    title: 'Nyugdíjaskedvezmény',
    description: 'Nyugdíjas igazolvány vagy személyazonosító okmány alapján.',
    requirement: null,
    percent: null,
  },
  {
    id: 'family',
    title: 'Családi jegy',
    description: 'Szülők és gyermekek együttes váltása esetén kedvezőbb összesített ár.',
    requirement: null,
    percent: null,
  },
];

export const groupTicketNote =
  '10 fő felett csoportos ajánlatot készítünk, egy számlával és előre egyeztetett kiváltással.';
