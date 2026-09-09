import type { Locale } from '@/types';

const LOCALE_TAG: Record<Locale, string> = { hu: 'hu-HU', de: 'de-AT', en: 'en-GB' };

/** Pénzösszeg — alapértelmezetten euró, tizedes nélkül. */
export function formatPrice(value: number, locale: Locale = 'hu', currency = 'EUR'): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: 'currency',
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, locale: Locale = 'hu'): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale]).format(value);
}

/** Hossz: 1200 m -> „1,2 km", 800 m -> „800 m". */
export function formatLength(meters: number, locale: Locale = 'hu'): string {
  if (meters >= 1000) return `${formatNumber(Math.round((meters / 1000) * 10) / 10, locale)} km`;
  return `${formatNumber(meters, locale)} m`;
}

export function formatTemperature(celsius: number, locale: Locale = 'hu'): string {
  const sign = celsius > 0 ? '+' : '';
  return `${sign}${formatNumber(celsius, locale)} °C`;
}

export function formatCm(value: number, locale: Locale = 'hu'): string {
  return `${formatNumber(value, locale)} cm`;
}

/** Telefonszám tárcsázható alakja. */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** WhatsApp mélylink — a szám nemzetközi formátumban, + nélkül. */
export function toWhatsAppHref(phone: string, message?: string): string {
  const digits = phone.replace(/[^\d]/g, '');
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${query}`;
}
