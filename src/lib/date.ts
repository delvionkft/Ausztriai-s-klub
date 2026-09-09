/**
 * Dátumkezelés — időzóna-független, ISO `YYYY-MM-DD` kulcsokkal dolgozik.
 * Szándékosan nem használ `new Date()`-et renderelés közben, hogy a szerver-
 * és kliensoldali kimenet mindig azonos legyen (nincs hidratálási eltérés).
 */

export const HU_MONTHS = [
  'január', 'február', 'március', 'április', 'május', 'június',
  'július', 'augusztus', 'szeptember', 'október', 'november', 'december',
];

export const HU_WEEKDAYS_SHORT = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
export const HU_WEEKDAYS_LONG = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];

/** `YYYY-MM-DD` → UTC-alapú Date (időzóna-eltolódás nélkül). */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return toISODate(date);
}

/** Éjszakák száma két dátum között (érkezés → távozás). */
export function nightsBetween(fromISO: string, toISO: string): number {
  const diff = parseISODate(toISO).getTime() - parseISODate(fromISO).getTime();
  return Math.round(diff / 86_400_000);
}

export function isWithinRange(iso: string, from: string, to: string): boolean {
  return iso >= from && iso <= to;
}

/** Hétfővel kezdődő hét index (0 = hétfő). */
export function weekdayIndex(iso: string): number {
  const day = parseISODate(iso).getUTCDay();
  return (day + 6) % 7;
}

export function formatDateHu(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = parseISODate(iso.slice(0, 10));
  return `${date.getUTCFullYear()}. ${HU_MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}.`;
}

export function formatDateShortHu(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = parseISODate(iso.slice(0, 10));
  return `${HU_MONTHS[date.getUTCMonth()].slice(0, 3)}. ${date.getUTCDate()}.`;
}

/** ISO időbélyeg → „2026. január 17. 07:40”. */
export function formatDateTimeHu(isoTimestamp: string): string {
  const datePart = isoTimestamp.slice(0, 10);
  const timePart = isoTimestamp.slice(11, 16);
  return `${formatDateHu(datePart)} ${timePart}`;
}

/** `YYYY-MM` → az adott hónap összes napja ISO formában. */
export function daysInMonth(monthKey: string): string[] {
  const [year, month] = monthKey.split('-').map(Number);
  const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return Array.from({ length: last }, (_, i) => `${monthKey}-${String(i + 1).padStart(2, '0')}`);
}

export function monthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-').map(Number);
  return `${year}. ${HU_MONTHS[month - 1]}`;
}

export function shiftMonth(monthKey: string, delta: number): string {
  const [year, month] = monthKey.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1 + delta, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}
