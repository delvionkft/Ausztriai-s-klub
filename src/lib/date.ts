import type { Locale } from '@/types';

const LOCALE_TAG: Record<Locale, string> = { hu: 'hu-HU', de: 'de-AT', en: 'en-GB' };

/** `YYYY-MM-DD` -> Date, időzóna-eltolódás nélkül. */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function toISODate(date: Date): string {
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function diffInNights(fromISO: string, toISO: string): number {
  const from = parseISODate(fromISO).getTime();
  const to = parseISODate(toISO).getTime();
  return Math.max(0, Math.round((to - from) / 86_400_000));
}

export function formatDate(iso: string, locale: Locale = 'hu', opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], opts ?? { year: 'numeric', month: 'long', day: 'numeric' }).format(
    parseISODate(iso),
  );
}

export function formatShortDate(iso: string, locale: Locale = 'hu'): string {
  return formatDate(iso, locale, { month: 'short', day: 'numeric' });
}

export function formatDateTime(iso: string, locale: Locale = 'hu'): string {
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso));
}

export function formatTimeOnly(iso: string, locale: Locale = 'hu'): string {
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], { hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
}

/** Naptárrács: az adott hónap napjai, hétfővel kezdve, előtte kitöltő cellák. */
export function buildMonthGrid(year: number, month: number): Array<string | null> {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leading = (first.getDay() + 6) % 7; // hétfő = 0
  const cells: Array<string | null> = Array.from({ length: leading }, () => null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(toISODate(new Date(year, month, d)));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function monthLabel(year: number, month: number, locale: Locale = 'hu'): string {
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], { year: 'numeric', month: 'long' }).format(new Date(year, month, 1));
}
