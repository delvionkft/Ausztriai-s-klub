/**
 * I18N — HÁROMNYELVŰ MŰKÖDÉS (DE / EN / HU)
 * ----------------------------------------------------------------------------
 * Keretrendszer-független mag: nincs benne React és nincs benne Next.js,
 * ezért az Emergentre változtatás nélkül átvihető.
 *
 * Felépítés:
 *   hu.ts  → referencia nyelv, innen származik a `TranslationKey` típus
 *   de.ts  → német
 *   en.ts  → angol
 *
 * Hiányzó kulcs esetén a magyar szöveg jelenik meg (soha nem üres a felület).
 */
import type { Locale } from '@/types';
import { de } from './de';
import { en } from './en';
import { hu, type Dictionary, type TranslationKey } from './hu';

export type { Dictionary, TranslationKey };

export const dictionaries: Record<Locale, Dictionary> = { hu, de, en };

export const FALLBACK_LOCALE: Locale = 'hu';

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[FALLBACK_LOCALE];
}

/**
 * Fordító függvény egy nyelvhez.
 * @param locale a kért nyelv
 * @returns `t(key, vars?)` — a `vars` a `{név}` mintájú helyőrzőket cseréli le
 */
export function createTranslator(locale: Locale) {
  const dict = getDictionary(locale);
  const fallback = dictionaries[FALLBACK_LOCALE];

  return function t(key: TranslationKey, vars?: Record<string, string | number>): string {
    const template = dict[key] || fallback[key] || key;
    if (!vars) return template;
    return Object.entries(vars).reduce(
      (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
      template,
    );
  };
}

/** `<html lang>` értéke — a kód megegyezik a Locale típussal. */
export function htmlLang(locale: Locale): string {
  return locale;
}
