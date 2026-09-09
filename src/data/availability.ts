import type { AvailabilityDay, Localized } from '@/types';
import { toISODate } from '@/lib/date';

/**
 * ============================================================================
 *  FOGLALTSÁGI NAPTÁR  —  ITT CSERÉLD A FOGLALÁSOKAT
 * ============================================================================
 *  A naptár most determinisztikus mintafoglaltságot állít elő 12 hónapra
 *  előre, hogy a felület mindig aktuális dátumokkal működjön.
 *
 *  ÉLESÍTÉS: kösd be a channel managert vagy a saját foglalási rendszert a
 *  `src/services/bookingService.ts`-ben. A `getAvailabilityRange()` ugyanezt a
 *  szerkezetet kell visszaadja — a naptár, az árösszesítő és az ajánlatkérő
 *  változtatás nélkül működik tovább.
 * ============================================================================
 */

/** Szezonális szállásárak — a teljes házra, éjszakánként. */
interface StaySeason {
  id: string;
  label: Localized;
  /** Hónap-nap tartomány (MM-DD), évfüggetlenül. */
  from: string;
  to: string;
  pricePerNightEur: number;
  minNights: number;
}

export const staySeasons: StaySeason[] = [
  {
    id: 'peak-winter',
    label: { hu: 'Karácsony és újév', de: 'Weihnachten und Neujahr', en: 'Christmas and New Year' },
    from: '12-20', to: '01-06', pricePerNightEur: 890, minNights: 7,
  },
  {
    id: 'high-winter',
    label: { hu: 'Téli főszezon', de: 'Winter-Hauptsaison', en: 'Winter high season' },
    from: '02-06', to: '03-08', pricePerNightEur: 780, minNights: 5,
  },
  {
    id: 'mid-winter',
    label: { hu: 'Téli alapszezon', de: 'Winter-Zwischensaison', en: 'Winter mid season' },
    from: '01-07', to: '02-05', pricePerNightEur: 690, minNights: 4,
  },
  {
    id: 'spring-winter',
    label: { hu: 'Tavaszi síszezon', de: 'Frühjahrs-Skisaison', en: 'Spring ski season' },
    from: '03-09', to: '04-12', pricePerNightEur: 620, minNights: 3,
  },
  {
    id: 'early-winter',
    label: { hu: 'Előszezon', de: 'Vorsaison', en: 'Early season' },
    from: '12-01', to: '12-19', pricePerNightEur: 590, minNights: 3,
  },
  {
    id: 'summer',
    label: { hu: 'Nyári szezon', de: 'Sommersaison', en: 'Summer season' },
    from: '06-15', to: '09-15', pricePerNightEur: 540, minNights: 3,
  },
];

const OFF_SEASON: StaySeason = {
  id: 'off',
  label: { hu: 'Csendes időszak', de: 'Ruhige Zeit', en: 'Quiet season' },
  from: '04-13', to: '06-14', pricePerNightEur: 460, minNights: 2,
};

function inMonthDayRange(iso: string, from: string, to: string): boolean {
  const md = iso.slice(5); // MM-DD
  // Évfordulón átnyúló tartomány (pl. 12-20 -> 01-06)
  if (from > to) return md >= from || md <= to;
  return md >= from && md <= to;
}

export function seasonForDate(iso: string): StaySeason {
  return staySeasons.find((s) => inMonthDayRange(iso, s.from, s.to)) ?? OFF_SEASON;
}

/**
 * Determinisztikus álvéletlen a dátumsztringből.
 * Fontos: szerver- és böngészőoldalon is ugyanazt adja, így nincs hidratálási
 * eltérés a naptárban.
 */
function hashDate(iso: string): number {
  let h = 2166136261;
  for (let i = 0; i < iso.length; i += 1) {
    h ^= iso.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

/**
 * Mintafoglaltság: a téli hétvégék és az ünnepi hetek nagyobb eséllyel
 * foglaltak, a csendesebb időszakok szabadok.
 */
function stateForDate(iso: string, weekday: number, seasonId: string): AvailabilityDay['state'] {
  const r = hashDate(iso);
  const isWeekend = weekday === 5 || weekday === 6 || weekday === 0;

  if (seasonId === 'peak-winter') return r < 0.82 ? 'booked' : r < 0.92 ? 'option' : 'free';
  if (seasonId === 'high-winter') return r < 0.55 ? 'booked' : r < 0.68 ? 'option' : 'free';
  if (seasonId === 'mid-winter') return r < (isWeekend ? 0.5 : 0.28) ? 'booked' : r < 0.38 ? 'option' : 'free';
  if (seasonId === 'spring-winter' || seasonId === 'early-winter') {
    return r < (isWeekend ? 0.34 : 0.16) ? 'booked' : r < 0.24 ? 'option' : 'free';
  }
  if (seasonId === 'summer') return r < 0.22 ? 'booked' : r < 0.3 ? 'option' : 'free';
  return r < 0.1 ? 'booked' : 'free';
}

/** Egy nap adata. A múltbeli napokat a naptár külön kezeli. */
export function getAvailabilityDay(iso: string): AvailabilityDay {
  const season = seasonForDate(iso);
  const weekday = new Date(`${iso}T00:00:00`).getDay();
  return {
    date: iso,
    state: stateForDate(iso, weekday, season.id),
    priceEur: season.pricePerNightEur,
    minNights: season.minNights,
    seasonLabel: season.label,
  };
}

/** Egy hónap napjai. */
export function getAvailabilityMonth(year: number, month: number): AvailabilityDay[] {
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => getAvailabilityDay(toISODate(new Date(year, month, i + 1))));
}

/** Tartomány lekérése (érkezés – távozás előtti éjszaka). */
export function getAvailabilityRange(fromISO: string, toISO: string): AvailabilityDay[] {
  const out: AvailabilityDay[] = [];
  const cursor = new Date(`${fromISO}T00:00:00`);
  const end = new Date(`${toISO}T00:00:00`);
  while (cursor < end) {
    out.push(getAvailabilityDay(toISODate(cursor)));
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}
