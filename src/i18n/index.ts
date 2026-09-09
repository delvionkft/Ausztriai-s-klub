import type { Locale, Localized } from '@/types';
import { hu, type Dictionary } from './hu';
import { de } from './de';
import { en } from './en';

export type { Dictionary };

export const dictionaries: Record<Locale, Dictionary> = { hu, de, en };

export const LOCALES: Locale[] = ['hu', 'de', 'en'];
export const DEFAULT_LOCALE: Locale = 'hu';

export const localeLabels: Record<Locale, { short: string; long: string; htmlLang: string }> = {
  hu: { short: 'HU', long: 'Magyar', htmlLang: 'hu' },
  de: { short: 'DE', long: 'Deutsch', htmlLang: 'de' },
  en: { short: 'EN', long: 'English', htmlLang: 'en' },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? hu;
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as string[]).includes(value);
}

/**
 * Nyelvfüggő adatmező kiolvasása visszaeséssel.
 * Ha az adott nyelvhez még nincs fordítás, a magyar szöveg jelenik meg —
 * így soha nem marad üres felület.
 */
export function pick(value: Localized, locale: Locale): string {
  return value[locale] ?? value.hu;
}

/** Egyszerű `{kulcs}` behelyettesítés a fordítási szövegekben. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
