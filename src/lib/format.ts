import { PLACEHOLDER_VALUE } from '@/data/placeholders';

/** Pénzösszeg formázása. `null` esetén helyőrző. */
export function formatCurrency(
  amount: number | null | undefined,
  currency = 'EUR',
  options: { decimals?: number } = {},
): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return PLACEHOLDER_VALUE;
  const decimals = options.decimals ?? (Number.isInteger(amount) ? 0 : 2);
  return new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/** Szám formázása mértékegységgel. `null` esetén helyőrző. */
export function formatNumber(value: number | null | undefined, suffix = ''): string {
  if (value === null || value === undefined || Number.isNaN(value)) return PLACEHOLDER_VALUE;
  return `${new Intl.NumberFormat('hu-HU').format(value)}${suffix}`;
}

/** Hosszúság méterben vagy kilométerben, olvashatóan. */
export function formatLength(meters: number | null | undefined): string {
  if (meters === null || meters === undefined) return PLACEHOLDER_VALUE;
  return meters >= 1000 ? `${(meters / 1000).toFixed(1).replace('.', ',')} km` : `${meters} m`;
}

export function formatTemperature(celsius: number | null | undefined): string {
  if (celsius === null || celsius === undefined) return PLACEHOLDER_VALUE;
  return `${celsius > 0 ? '+' : ''}${celsius} °C`;
}

export function formatRatio(open: number | null | undefined, total: number | null | undefined): string {
  if (open === null || open === undefined || total === null || total === undefined) return PLACEHOLDER_VALUE;
  return `${open}/${total}`;
}

/** Egyszerű e-mail formátum-ellenőrzés (kliensoldali űrlapvalidációhoz). */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Telefonszám: legalább 7 számjegy, opcionális + előtaggal. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, '');
  return digits.length >= 7 && /^\+?[\d\s()/-]+$/.test(value.trim());
}

/** `tel:` / `https://wa.me/` linkhez tisztított szám. */
export function toDialString(value: string): string {
  return value.replace(/[^\d+]/g, '');
}
